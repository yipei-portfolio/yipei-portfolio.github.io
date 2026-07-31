# Personal Site Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved A2 editorial direction to the real portfolio: bring LYP closer together, give each letter its own pointer-entry bounce, keep all photos in full color inside framed About-side compositions, tighten the page rhythm, and publish the validated result privately.

**Architecture:** Keep the existing vinext/Next single-page architecture and static assets. Extract deterministic motion math and theme application into a small browser-safe ES module so behavior can be tested without a DOM, then let `public/script.js` own event wiring. Keep the page server-rendered in `app/page.tsx`, use one shared stylesheet for the visual system, and verify both rendered HTML and live browser behavior.

**Tech Stack:** Next.js 16, React 19 server components, vinext/Vite, plain CSS, browser Web Animations API, Node built-in test runner, Sites private hosting.

## Global Constraints

- Preserve the supplied Chinese biography, ChorusPrep content, WeChat, email, and resume download.
- Use the four supplied personal photos without AI edits, color overlays, grayscale, or desaturation.
- Keep the accepted A2 off-white/black editorial direction and dotted letter echoes.
- L, Y, and P must sit closer together and use visibly different fixed motion profiles.
- Letter motion is pointer-entry triggered, predominantly horizontal, damped, and always returns to the exact rest position.
- Respect `prefers-reduced-motion`; touch/coarse-pointer layouts remain static.
- Remove the separate long photo-journal section and place the framed photo composition beside About on desktop, below it on mobile.
- Keep the deployed site private.

---

### Task 1: Testable motion and theme contracts

**Files:**
- Create: `public/site-motion.js`
- Create: `tests/site-motion.test.mjs`
- Modify: `public/script.js`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: `LETTER_MOTION_PROFILES`, `getEntryVector(rect, pointer, speed, profile)`, `buildBounceKeyframes(vector, profile)`, and `applySectionTheme(rootStyle, themeMeta, background, ink)`.
- Consumes: browser pointer coordinates, letter bounding rectangles, a measured horizontal pointer speed, and section `data-bg`/`data-ink`.

- [ ] **Step 1: Write the failing motion-profile test**

```js
import {
  LETTER_MOTION_PROFILES,
  buildBounceKeyframes,
  getEntryVector,
} from "../public/site-motion.js";

test("each LYP letter has a distinct damped entry motion that settles exactly", () => {
  const signatures = Object.values(LETTER_MOTION_PROFILES).map(
    ({ distance, duration, rebound, settle, rotation }) =>
      `${distance}:${duration}:${rebound}:${settle}:${rotation}`,
  );
  assert.equal(new Set(signatures).size, 3);

  for (const profile of Object.values(LETTER_MOTION_PROFILES)) {
    const vector = getEntryVector(
      { left: 100, top: 0, width: 200, height: 300 },
      { x: 80, y: 140 },
      24,
      profile,
    );
    assert.ok(vector.x > 0, "the letter moves away from a pointer entering on its left");

    const frames = buildBounceKeyframes(vector, profile);
    assert.equal(frames.at(0).offset, 0);
    assert.equal(frames.at(-1).offset, 1);
    assert.equal(frames.at(-1).transform, "translate3d(0px, 0px, 0) rotate(0deg)");
    assert.ok(parseFloat(frames[1].transform.match(/translate3d\(([-\d.]+)px/)[1]) > 0);
    assert.ok(parseFloat(frames[2].transform.match(/translate3d\(([-\d.]+)px/)[1]) < 0);
  }
});
```

- [ ] **Step 2: Run the motion test and verify RED**

Run: `node --test tests/site-motion.test.mjs`

Expected: FAIL because `public/site-motion.js` does not exist.

- [ ] **Step 3: Write the failing null-safe theme test**

```js
test("section theme applies even when a theme-color meta tag is unavailable", () => {
  const values = new Map();
  const rootStyle = { setProperty: (key, value) => values.set(key, value) };

  assert.doesNotThrow(() =>
    applySectionTheme(rootStyle, null, "#141414", "#f8f7f5"),
  );
  assert.equal(values.get("--current-bg"), "#141414");
  assert.equal(values.get("--current-ink"), "#f8f7f5");
});
```

- [ ] **Step 4: Run the theme test and verify RED**

Run: `node --test tests/site-motion.test.mjs`

Expected: FAIL because `applySectionTheme` is not exported.

- [ ] **Step 5: Implement the minimal pure ES module**

Create three fixed profiles:

```js
export const LETTER_MOTION_PROFILES = {
  L: { distance: 0.82, duration: 2860, rebound: -0.36, settle: 0.16, rotation: 7.5, arc: -0.08 },
  Y: { distance: 1, duration: 3180, rebound: -0.47, settle: 0.22, rotation: 5.8, arc: 0.05 },
  P: { distance: 0.72, duration: 2660, rebound: -0.29, settle: 0.11, rotation: 9.2, arc: -0.03 },
};
```

`getEntryVector` must choose the horizontal sign away from the pointer, cap the horizontal displacement, and keep vertical travel under 14px. `buildBounceKeyframes` must return four or five frames using profile-specific offsets and scalars ending at the exact zero transform. `applySectionTheme` must update both root CSS variables and use `themeMeta?.setAttribute(...)`.

- [ ] **Step 6: Run the unit tests and verify GREEN**

Run: `node --test tests/site-motion.test.mjs`

Expected: PASS with no warnings.

- [ ] **Step 7: Wire the browser runtime**

Change the page script to `type="module"`. In `public/script.js`, import the four helpers, measure pointer speed once with a passive global `pointermove` listener, trigger an animation only on each letter's `pointerenter`, give each letter its own cooldown, and cancel/replace only that letter's previous animation. Remove the existing continuous pointer-follow spring.

Add `<meta name="theme-color" content="#f8f7f5" />` to `app/layout.tsx` and route theme changes through `applySectionTheme`.

- [ ] **Step 8: Run the complete tests**

Run: `npm test`

Expected: build succeeds and all Node tests pass.

### Task 2: Move the full-color photo story into About

**Files:**
- Modify: `app/page.tsx`
- Modify: `public/styles.css`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Produces: `.about-content`, `.about-gallery`, `.portrait-frame`, and four rendered, captioned photo figures inside `#about`.
- Consumes: `/travel-macau.jpg`, `/nature-waterfall.jpg`, `/performance-stage.jpg`, and `/stage-memory.jpg`.

- [ ] **Step 1: Write the failing rendered-page test**

Extend the rendered HTML test so it asserts that `#about` contains an `.about-gallery` with all four accessible images and that the old `.photo-journal` section is absent.

```js
assert.match(html, /id="about"[\s\S]*class="about-gallery"/);
for (const name of requiredPhotos) {
  assert.match(html, new RegExp(`id="about"[\\s\\S]*\\/${name.replace(".", "\\.")}`));
}
assert.doesNotMatch(html, /class="photo-journal/);
```

- [ ] **Step 2: Run the rendered-page test and verify RED**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: FAIL because the gallery is still in the separate photo-journal section.

- [ ] **Step 3: Implement the About-side gallery**

In `app/page.tsx`, keep the current biography verbatim. Replace the separate photo-journal section with a gallery inside `.about-content`:

- a large 3:2 ceremony frame as the anchor;
- a 3:4 Macau frame offset at the lower left;
- a 3:4 waterfall frame offset at the upper right;
- a narrow 3:2 performance frame finishing the stack;
- concise existing editorial captions and real alt text.

- [ ] **Step 4: Implement full-color framed styling**

Use thin charcoal borders, a small off-white mat, restrained 8-14px offsets, and stable aspect ratios. Set all images to `filter: none`; hover may scale by at most `1.012` and must not change saturation or contrast. Keep the gallery sticky beside the biography above 900px and flow it normally below the copy on narrower screens.

- [ ] **Step 5: Run the rendered-page test and verify GREEN**

Run: `npm run build && node --test tests/rendered-html.test.mjs`

Expected: PASS.

### Task 3: Apply the approved editorial rhythm to the full page

**Files:**
- Modify: `public/styles.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: the existing section order, copy, photos, project screenshot, and contact actions.
- Produces: a compact first viewport, calmer project scale, higher-contrast contact section, and responsive continuation.

- [ ] **Step 1: Tighten the LYP composition**

Replace `space-between` with a centered flex/grid composition using `gap: clamp(6px, 1.4vw, 22px)`. Remove continuous `lyp-letter-stack` keyframes. Use a fixed condensed rest transform per letter and preserve dotted echoes.

- [ ] **Step 2: Rebalance desktop sections**

Use the approved palette:

```css
:root {
  --paper: #f8f7f5;
  --ink: #171717;
  --muted: #67635f;
  --stone: #e8e5df;
  --soft: #f1efeb;
}
```

Reduce oversized repeated headings, shorten empty vertical intervals, and keep section transitions within the white/stone/charcoal system. Preserve the open editorial layout rather than adding cards.

- [ ] **Step 3: Rebalance mobile**

Fit the LYP mark and main headline into the initial 760px viewport, eliminate the blank first screen, stack the About gallery after the biography, keep project content within the viewport, and make all contact rows readable at 360px width.

- [ ] **Step 4: Improve contact clarity**

Use a near-black background with off-white text, reduce the decorative `HELLO` footprint, raise its contrast only enough to be legible, and preserve keyboard focus/hover states for WeChat, email, resume, and back-to-top.

- [ ] **Step 5: Run build and lint**

Run: `npm run build`

Expected: exit 0.

Run: `npm run lint`

Expected: exit 0 with no errors.

### Task 4: Social preview asset

**Files:**
- Create: `public/og-v2.png`
- Modify: `app/layout.tsx`

**Interfaces:**
- Produces: a landscape social card matching the finished site.
- Consumes: the final off-white/black palette, condensed LYP mark, dotted echo, and exact text `Stay curious. Make things clear.` and `YIPEI LI / SHANGHAI`.

- [ ] **Step 1: Generate exactly one finished social card**

Use the built-in image generation path with this locked brief:

```text
Use case: ads-marketing
Asset type: personal portfolio social preview
Primary request: Create a complete restrained editorial landscape social card for Yipei Li's finished personal site.
Scene/backdrop: exact warm off-white paper-like field, no texture noise.
Subject: oversized condensed black “LYP” cropped slightly at the top, with a subtle fine dotted echo offset behind the letters.
Style/medium: high-end Swiss/editorial web-design art direction, minimal and typographic.
Composition/framing: 1.91:1 landscape; LYP occupies the upper two-thirds; headline below left; small identity line below right.
Color palette: #f8f7f5, #171717, subtle #b8b3ad dots only.
Text (verbatim): “LYP” / “Stay curious. Make things clear.” / “YIPEI LI / SHANGHAI”
Constraints: exact text only; no portrait; no logos; no icons; no gradients; no extra labels; no watermark.
```

- [ ] **Step 2: Inspect text and composition**

Use `view_image` on the generated result. If the exact text is materially wrong, omit the new image rather than shipping a broken card; otherwise copy it into `public/og-v2.png`.

- [ ] **Step 3: Wire metadata and rebuild**

Update Open Graph and X metadata to `/og-v2.png` using the generated image dimensions, then run `npm run build`.

Expected: exit 0.

### Task 5: Browser fidelity and interaction QA

**Files:**
- Create temporarily, then remove: `audit/2026-07-30/final-*.png`
- Modify after each captured mismatch: `public/styles.css`, `public/script.js`, `app/page.tsx`

**Interfaces:**
- Consumes: accepted concept `audit/2026-07-30/concept-a2.png`.
- Produces: verified desktop/mobile screenshots and working core interactions.

- [ ] **Step 1: Open the healthy local site in the in-app browser**

Use the exact local URL printed by `npm run dev`. Keep one site tab.

- [ ] **Step 2: Verify desktop motion**

At the accepted concept viewport, enter L, Y, and P from the side. Confirm each letter:

- kicks primarily sideways and away from the pointer;
- has a visibly different duration/amplitude/rebound pattern;
- never drifts continuously;
- returns to the exact rest transform;
- remains close to the other two letters.

- [ ] **Step 3: Verify desktop page rhythm**

Capture hero, About with framed photos, ChorusPrep, interests, and contact. Confirm full-color imagery, readable biography, stable crops, restrained headline sizes, correct contact contrast, and no console/runtime error.

- [ ] **Step 4: Verify mobile**

Resize to 390×844. Confirm hero copy is visible in the first viewport, no horizontal overflow exists, photos stack cleanly in color, and all contact rows remain tappable/readable.

- [ ] **Step 5: Compare accepted concept and implementation**

Use `view_image` on `concept-a2.png` and the latest hero screenshot in the same QA pass. Record at least these five comparison points in the fidelity ledger: LYP spacing, dotted echo, headline placement, paper/ink palette, and pointer-entry motion/rest state.

- [ ] **Step 6: Remove temporary QA artifacts**

Delete temporary screenshots and scratch reports after the comparison unless they are needed for deployment evidence.

### Task 6: Review, final verification, and private publish

**Files:**
- Review all changed files.
- Package exact validated source for Sites.

**Interfaces:**
- Consumes: successful unit tests, rendered-page tests, build, lint, browser screenshots, and fidelity ledger.
- Produces: one private Sites deployment of the exact reviewed commit.

- [ ] **Step 1: Request independent code review**

Provide the reviewer with the approved requirements, base state, final diff, and verification commands. Fix all Critical and Important findings.

- [ ] **Step 2: Run fresh final verification**

Run:

```powershell
npm test
npm run lint
```

Expected: both exit 0.

- [ ] **Step 3: Push the exact validated source**

Commit only the intended site files, push the resulting branch head to the existing Sites source repository, and use that exact SHA for version saving.

- [ ] **Step 4: Package and save a version**

Use the Sites packaging helper against the validated project. Save one version with the exact archive and pushed SHA.

- [ ] **Step 5: Deploy privately and poll to success**

Use private deployment for existing project `appgprj_6a685a3fa1b48191873411da1a14d376`, poll until terminal status, then open the returned deployed URL in Codex.

## Visual QA fidelity ledger

Compared `audit/2026-07-30/concept-a2.png` with the final desktop and mobile captures on 2026-07-30.

| Point | Result | Notes |
| --- | --- | --- |
| LYP spacing | Match | The final CSS closes the desktop gap by 20px versus the prior version while retaining independent letter silhouettes; measured visual gaps are 123px and 124px at 1440px. |
| Dotted echo | Match | Each letter keeps a localized dotted after-image with individual offsets instead of the former broad grey haze. |
| Headline placement | Match | The large serif statement sits below the wordmark on desktop and remains fully visible in the first 390×844 viewport. |
| Paper/ink palette | Match | Warm paper `#f8f7f5`, near-black ink `#171717`, stone project surface, and full-color photography match the approved restrained direction. |
| Pointer-entry motion and rest | Match | L, Y, and P use distinct durations (3120ms, 2680ms, 3380ms), trajectories, arcs, and rebound profiles; all three return exactly to their initial transform. |
| About photography | Intentional difference | The concept explored the hero only; the implementation extends the same editorial language with a main framed stage portrait, secondary travel frame, and two compact supporting moments. |
| Mobile composition | Intentional difference | Letter scale and headline size step down below 420px to preserve the same hierarchy without horizontal overflow. |
