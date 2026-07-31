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

test("lays out every About photo without overlap or cropping", () => {
  const stack = rule(".about-frame-stack");
  assert.match(stack, /display:\s*grid/);
  assert.match(
    stack,
    /grid-template-columns:\s*minmax\(0,\s*1\.45fr\)\s+minmax\(0,\s*1fr\)/,
  );

  const stackedFrame = rule(".about-frame-stack .portrait-frame");
  assert.match(stackedFrame, /position:\s*relative/);
  assert.doesNotMatch(stackedFrame, /position:\s*absolute/);

  assert.match(
    rule(".portrait-main .portrait-media"),
    /aspect-ratio:\s*3\s*\/\s*2/,
  );
  assert.match(rule(".portrait-media img"), /object-fit:\s*contain/);
  assert.match(rule(".about-photo-rail"), /1\.45fr/);
});
