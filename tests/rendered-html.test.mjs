import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders the approved editorial personal portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /ChorusPrep/);
  assert.match(html, /WHAT I LEARNED/);
  assert.match(html, /Ora Coffee/);
  assert.match(html, /Jack/);
  assert.match(html, /name="theme-color"/);
});

test("keeps every full-color photo story inside the About section", async () => {
  const requiredPhotos = [
    "travel-macau.jpg",
    "nature-waterfall.jpg",
    "performance-stage.jpg",
    "stage-memory.jpg",
  ];

  await Promise.all(
    requiredPhotos.map((name) =>
      access(new URL(`../public/${name}`, import.meta.url)),
    ),
  );

  const response = await render();
  const html = await response.text();
  const aboutStart = html.indexOf('id="about"');
  const aboutEnd = html.indexOf("</section>", aboutStart);

  assert.ok(aboutStart >= 0, "About section must render");
  assert.ok(aboutEnd > aboutStart, "About section must have a closing tag");
  const aboutHtml = html.slice(aboutStart, aboutEnd);

  const namedFigures =
    aboutHtml.match(/<figure[^>]+aria-label="个人影像：[^"]+"/g) ?? [];
  assert.equal(namedFigures.length, 4);
  for (const photo of requiredPhotos) {
    assert.match(aboutHtml, new RegExp(`/${photo.replace(".", "\\.")}`));
  }

  assert.match(
    aboutHtml,
    /alt="李忆沛身着正装手捧鲜花的舞台留影"/,
  );
  assert.match(aboutHtml, /loading="lazy"/);
  assert.match(aboutHtml, /decoding="async"/);
  assert.doesNotMatch(html, /class="photo-journal/);
  await assert.rejects(access(new URL("../public/avatar.png", import.meta.url)));
});
