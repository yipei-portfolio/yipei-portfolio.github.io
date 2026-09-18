import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const styles = await readFile(
  new URL("../public/styles.css", import.meta.url),
  "utf8",
);
const script = await readFile(
  new URL("../public/script.js", import.meta.url),
  "utf8",
);

function rule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = styles.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(match, `Missing CSS rule for ${selector}`);
  return match[1];
}

test("keeps the LYP wordmark expansive on wide screens", () => {
  assert.match(rule(".hero-wordmark"), /width:\s*min\(94vw,\s*1500px\)/);
  assert.match(
    rule(".hero-wordmark span"),
    /font-size:\s*clamp\(330px,\s*34vw,\s*680px\)/,
  );
});

test("drives the approved A2 motion continuously instead of using a canned animation", () => {
  assert.match(script, /sampleHeadShake/);
  assert.match(script, /requestAnimationFrame\(tick\)/);
  assert.doesNotMatch(script, /letter\.animate\(/);
});

test("About uses three layered paper photos with reference fade and hover timings", async () => {
  const css = await readFile(new URL("../public/photo-motion.css", import.meta.url), "utf8");
  for (const className of ["photo-main", "photo-left", "photo-right"]) {
    assert.ok(css.includes(".about-gallery ." + className));
  }
  for (const delay of ["860ms", "1040ms", "1220ms"]) assert.ok(css.includes("--photo-delay: " + delay));
  assert.match(css, /portrait-arrive 760ms ease/);
  assert.match(css, /translateY\(-10px\) scale\(1\.06\) rotate\(var\(--photo-angle\)\)/);
  assert.match(css, /z-index: 12/);
  assert.match(css, /clip-path: polygon/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /width: min\(100%, 360px\)/);
});

test("retains every original homepage animation family", () => {
  for (const name of ["nav-in", "wordmark-in", "wipe-in", "char-in", "soft-up", "contact-drift"]) {
    assert.ok(styles.includes("@keyframes " + name), name + " should remain");
  }
  assert.match(script, /themeObserver/);
  assert.match(script, /getThemeSectionIndex/);
  assert.match(script, /window\.addEventListener\("scroll", queueSectionThemeUpdate/);
  assert.match(script, /magneticNav/);
  assert.match(script, /updateParallax/);
  assert.doesNotMatch(script, /wechatParts|resolveWechat|clipboard/);
});

test("new case styles cannot change the original homepage", async () => {
  const { default: postcss } = await import("postcss");
  for (const file of ["case-studies.css", "case-evidence.css"]) {
    const caseCss = await readFile(new URL(`../public/${file}`, import.meta.url), "utf8");
    postcss.parse(caseCss).walkRules((rule) => {
      for (const selector of rule.selectors) {
        assert.ok(selector.startsWith(".case-page"), "unscoped selector: " + selector);
      }
    });
  }
});

test("work preview and case exploration support keyboard focus and reduced motion", async () => {
  const work = await readFile(new URL("../app/work-index.tsx", import.meta.url), "utf8");
  const explorer = await readFile(new URL("../app/work/explorer.tsx", import.meta.url), "utf8");
  const workCss = await readFile(new URL("../public/work-index.css", import.meta.url), "utf8");
  assert.match(work, /onPointerEnter/);
  assert.match(work, /onFocus/);
  assert.match(work, /className="work-index-list reveal"/);
  assert.doesNotMatch(work, /work-index-link reveal/);
  assert.match(workCss, /prefers-reduced-motion/);
  for (const key of ["ArrowLeft", "ArrowRight", "Home", "End"]) assert.ok(explorer.includes(key));
  assert.match(explorer, /aria-selected/);
  assert.match(explorer, /hidden=\{selected !== index\}/);
});

test("QR remains available with a native dialog and no-script fallback", async () => {
  const contact = await readFile(new URL("../app/wechat-contact.tsx", import.meta.url), "utf8");
  assert.match(contact, /showModal\(\)/);
  assert.match(contact, /关闭微信二维码/);
  assert.match(contact, /<noscript>/);
  assert.doesNotMatch(contact, /clipboard|canvas|wechatParts/);
});
