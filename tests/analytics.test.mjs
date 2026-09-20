import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";

const loader = await readFile(new URL("../public/analytics.js", import.meta.url), "utf8");
const siteToken = "0123456789abcdef0123456789abcdef";

function run({ hostname = "yipei-portfolio.github.io", token = siteToken, search = "", doNotTrack, globalPrivacyControl, existing = false } = {}) {
  const inserted = [];
  runInNewContext(loader, {
    URLSearchParams,
    navigator: { doNotTrack, globalPrivacyControl },
    window: { location: { hostname, search } },
    document: {
      querySelector: () => ({ getAttribute: () => token }),
      getElementById: () => existing ? {} : null,
      createElement: () => ({ attributes: {}, setAttribute(name, value) { this.attributes[name] = value; } }),
      head: { appendChild: (element) => inserted.push(element) },
    },
  });
  return inserted;
}

test("analytics inserts one official beacon only on the public site", () => {
  const [beacon] = run();
  assert.equal(beacon.id, "portfolio-cloudflare-beacon");
  assert.equal(beacon.type, "module");
  assert.equal(beacon.src, `https://static.cloudflareinsights.com/beacon.min.js?token=${siteToken}`);
  assert.deepEqual(JSON.parse(beacon.attributes["data-cf-beacon"]), { token: siteToken });
  assert.equal(run({ existing: true }).length, 0);
  for (const hostname of ["localhost", "127.0.0.1", "preview.example.com", "yipei-portfolio.github.io.example.com"]) {
    assert.equal(run({ hostname }).length, 0);
  }
});

test("analytics respects opt-outs and does not load with a missing or malformed identifier", () => {
  for (const options of [
    { token: "" }, { token: "not-an-analytics-site-token" },
    { doNotTrack: "1" }, { globalPrivacyControl: true }, { search: "?analytics=off" },
  ]) assert.equal(run(options).length, 0);
  assert.doesNotMatch(loader, /localStorage|sessionStorage|document\.cookie|fingerprint/i);
});

test("analytics is global, non-blocking, and disabled until its site token is configured", async () => {
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const component = await readFile(new URL("../app/analytics.tsx", import.meta.url), "utf8");
  const workflow = await readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8");
  assert.match(layout, /<Analytics \/>/);
  assert.match(component, /return null/);
  assert.match(component, /strategy="afterInteractive"/);
  assert.match(component, /NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN/);
  assert.match(workflow, /vars\.CLOUDFLARE_ANALYTICS_TOKEN/);
});

test("static export includes the configured analytics loader on every portfolio page", async () => {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN?.trim();
  const configured = Boolean(token && /^[a-f0-9]{32}$/i.test(token));
  for (const route of ["", "work/chorusgo/", "work/ora-coffee/", "work/choir/", "work/photography/"]) {
    const html = await readFile(new URL(`../out/${route}index.html`, import.meta.url), "utf8");
    assert.equal(html.includes("portfolio-analytics-loader"), configured, route || "home");
    if (configured) {
      assert.ok(html.includes(token));
      assert.ok(html.includes("/analytics.js"));
    }
  }
});
