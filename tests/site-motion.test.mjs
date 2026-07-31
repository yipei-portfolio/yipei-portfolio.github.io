import assert from "node:assert/strict";
import test from "node:test";

import {
  LETTER_MOTION_PROFILES,
  applySectionTheme,
  getEntryVector,
  sampleHeadShake,
} from "../public/site-motion.js";

test("uses the exact approved A2 motion profiles", () => {
  assert.deepEqual(LETTER_MOTION_PROFILES.L, {
    duration: 3050,
    distance: 1.08,
    rebound1: -0.38,
    rebound2: 0.16,
    arc: 10,
    rotation: 0.9,
  });
  assert.deepEqual(LETTER_MOTION_PROFILES.Y, {
    duration: 2820,
    distance: 0.94,
    rebound1: -0.5,
    rebound2: 0.22,
    arc: -13,
    rotation: 1.08,
  });
  assert.deepEqual(LETTER_MOTION_PROFILES.P, {
    duration: 3180,
    distance: 1.12,
    rebound1: -0.42,
    rebound2: 0.18,
    arc: 10,
    rotation: 1,
  });
});

test("A2 kicks away, rebounds twice, and returns exactly to rest", () => {
  const profile = LETTER_MOTION_PROFILES.L;
  const rect = { left: 100, top: 20, width: 200, height: 300 };
  const vector = getEntryVector(
    rect,
    { x: 80, y: 170 },
    { x: 18, y: 4 },
    profile,
  );

  const start = sampleHeadShake(0, vector, profile);
  const kick = sampleHeadShake(0.24, vector, profile);
  const reboundOne = sampleHeadShake(0.52, vector, profile);
  const reboundTwo = sampleHeadShake(0.76, vector, profile);
  const rest = sampleHeadShake(1, vector, profile);

  assert.deepEqual(start, { x: 0, y: 0, rotation: 0 });
  assert.ok(kick.x > 100);
  assert.ok(reboundOne.x < 0);
  assert.ok(reboundTwo.x > 0);
  assert.ok(Math.abs(reboundTwo.x) < Math.abs(reboundOne.x));
  assert.deepEqual(rest, { x: 0, y: 0, rotation: 0 });
});

test("entry direction follows the A2 side-aware head-shake logic", () => {
  const profile = LETTER_MOTION_PROFILES.Y;
  const rect = { left: 100, top: 20, width: 200, height: 300 };

  const fromLeft = getEntryVector(
    rect,
    { x: 80, y: 170 },
    { x: 10, y: 2 },
    profile,
  );
  const fromRight = getEntryVector(
    rect,
    { x: 320, y: 170 },
    { x: -10, y: 2 },
    profile,
  );

  assert.equal(fromLeft.awayX, 1);
  assert.equal(fromRight.awayX, -1);
  assert.ok(fromLeft.rotationAmplitude > 0);
  assert.ok(fromRight.rotationAmplitude < 0);
  assert.ok(Math.abs(fromLeft.awayY) <= 0.16);
  assert.ok(Math.abs(fromRight.awayY) <= 0.16);
});

test("section theme remains safe when the theme-color meta tag is missing", () => {
  const values = new Map();
  const rootStyle = {
    setProperty(name, value) {
      values.set(name, value);
    },
  };

  assert.doesNotThrow(() =>
    applySectionTheme(rootStyle, null, "#141414", "#f8f7f5"),
  );
  assert.equal(values.get("--current-bg"), "#141414");
  assert.equal(values.get("--current-ink"), "#f8f7f5");
});

test("section theme updates the browser theme color when the meta tag exists", () => {
  const values = new Map();
  const attributes = new Map();
  const rootStyle = {
    setProperty(name, value) {
      values.set(name, value);
    },
  };
  const meta = {
    setAttribute(name, value) {
      attributes.set(name, value);
    },
  };

  applySectionTheme(rootStyle, meta, "#e8e5df", "#171717");

  assert.equal(values.get("--current-bg"), "#e8e5df");
  assert.equal(values.get("--current-ink"), "#171717");
  assert.equal(attributes.get("content"), "#e8e5df");
});
