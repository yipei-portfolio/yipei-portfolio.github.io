# Personal Photo Journal and Balanced Narrative Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add four personal photos, the user-provided professional introduction, richer supporting copy, and an XRUI-inspired interactive `LYP` hero to the existing portfolio while preserving its editorial visual system and URL.

**Architecture:** Keep the current single-page React structure in `app/page.tsx`, the shared visual rules in `public/styles.css`, and progressive enhancement in `public/script.js`. Store optimized, metadata-free photos in `public/`, verify rendered content and required assets with the existing Node test suite, then publish the exact committed source and build archive through the existing Sites project.

**Tech Stack:** React 19, Next.js 16, vinext, CSS, browser JavaScript, Node test runner, Pillow for image optimization, OpenAI Sites hosting.

## Global Constraints

- Use a natural, sincere tone that retains professional clarity.
- Do not invent user counts, awards, event names, project outcomes, or unprovided biographical claims.
- Keep the current single-page navigation, contact actions, resume download, theme transitions, reveal animation, and reduced-motion support.
- Use all four supplied personal photographs with accurate Chinese alternative text.
- Strip image metadata before placing the fourth photograph in `public/`.
- Preserve the current public Sites project and production URL.
- Keep the site owner-only until the user explicitly asks to make it public again.
- Use the self-introduction supplied by the user without changing its factual meaning.
- Borrow the reference site's motion language without copying its identity, text, or implementation.

---

### Task 1: Replace Starter Tests with Portfolio Content Checks

**Files:**
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `dist/server/index.js`, `app/page.tsx`, `public/styles.css`, `public/script.js`, and the four public photo files.
- Produces: `npm test` coverage for rendered copy, photo references, required assets, responsive CSS, and reduced-motion behavior.

- [ ] **Step 1: Write the failing portfolio tests**

Replace the starter-specific assertions with tests that:

```js
test("renders the balanced personal portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /在路上，/);
  assert.match(html, /ChorusPrep/);
  assert.match(html, /从排练现场到可以使用的产品/);
  assert.match(html, /FOUR MOMENTS/);
  assert.match(html, /\/stage-memory\.jpg/);
  assert.match(html, /WHAT I LEARNED/);
  assert.match(html, /Ora Coffee/);
  assert.match(html, /也可以叫我 Jack/);
});

test("ships every photo and preserves accessible motion handling", async () => {
  const requiredPhotos = [
    "travel-macau.jpg",
    "nature-waterfall.jpg",
    "performance-stage.jpg",
    "stage-memory.jpg",
  ];
  await Promise.all(
    requiredPhotos.map((name) => access(new URL(`../public/${name}`, import.meta.url))),
  );

  const [page, css, script] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/styles.css", import.meta.url), "utf8"),
    readFile(new URL("../public/script.js", import.meta.url), "utf8"),
  ]);

  for (const photo of requiredPhotos) {
    assert.match(page, new RegExp(`/${photo.replace(".", "\\.")}`));
  }
  assert.match(page, /alt="李忆沛身着正装手捧鲜花的舞台留影"/);
  assert.match(css, /\.photo-ceremony/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(script, /\.photo-frame/);
  assert.match(script, /hero-wordmark/);
  assert.match(script, /--pointer-x/);
});
```

- [ ] **Step 2: Build and run the tests to verify they fail**

Run: `npm test`

Expected: the build completes, then at least one assertion fails because `stage-memory.jpg`, `FOUR MOMENTS`, and the expanded copy are not present yet.

- [ ] **Step 3: Keep the failing output as the implementation baseline**

Confirm the failure concerns only the new portfolio requirements, not a build or dependency error.

### Task 2: Optimize the Fourth Photograph

**Files:**
- Create: `public/stage-memory.jpg`

**Interfaces:**
- Consumes: `D:\xwechat_files\wxid_15o1oshujehv21_bf56\temp\RWTemp\2026-07\9e20f478899dc29eb19741386f9343c8\3076eeef3a1029e1ba2005180b53fd49.jpg`.
- Produces: a web-ready RGB JPEG at `public/stage-memory.jpg`, maximum dimension 1800 pixels, without EXIF metadata.

- [ ] **Step 1: Optimize and strip metadata**

Use Pillow with `ImageOps.exif_transpose`, convert to RGB, apply `thumbnail((1800, 1800), Image.Resampling.LANCZOS)`, and save with `quality=86`, `optimize=True`, and `progressive=True`.

- [ ] **Step 2: Verify the generated asset**

Run a Pillow inspection that prints size, mode, byte length, and EXIF entry count.

Expected: mode `RGB`, maximum dimension no greater than `1800`, file size below the source file, and EXIF entry count `0`.

### Task 3: Add the Supplied Introduction, Supporting Narrative, and Fourth Photo

**Files:**
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `public/stage-memory.jpg` and the approved copy direction.
- Produces: four-photo journal markup plus expanded about, ChorusPrep, and interest narratives.

- [ ] **Step 1: Replace the about copy with the supplied introduction**

Use the following text in paragraph form without changing its factual meaning:

```text
你好，我是李忆沛，也可以叫我 Jack。

我目前就读于上海海事大学电子信息工程专业，关注数据分析、商业智能与数字化运营。现在，我正在皮氏咖啡旗下新品牌 Ora Coffee 担任数据分析实习生，围绕门店经营、商品表现、会员与渠道数据开展分析，并参与 BI 看板优化、指标口径梳理和数据分析工具开发。

相比单纯呈现数字，我更在意数据能否真正帮助业务发现问题、提高效率并支持决策。为此，我持续学习 Python、SQL、Excel、Streamlit 和数据可视化，也尝试将业务需求转化为清晰的指标体系、分析框架与可落地的解决方案。

数据之外，我也长期参与合唱与艺术实践，曾担任大学合唱团团长和助理指挥，负责团队管理、排练组织与舞台演出。这段经历让我学会了倾听、协作、表达，也让我相信：无论是分析数据还是带领团队，真正重要的都是理解问题、连接人与信息，并推动事情向前发展。

我希望成为一名既理解业务、又具备技术能力的数据分析与数字化人才，用清晰的分析和可靠的工具，帮助团队做出更好的决策。
```

- [ ] **Step 2: Complete the photo journal**

Change `THREE MOMENTS` to `FOUR MOMENTS`, expand the journal introduction to:

```text
我喜欢在不同的环境里重新认识自己：旅行让我保持好奇，自然让我放慢节奏，而舞台教会我专注、表达，以及如何与身边的人共同完成一件事。
```

Add a fourth figure with class `photo-frame photo-ceremony reveal`, image source `/stage-memory.jpg`, alternative text `李忆沛身着正装手捧鲜花的舞台留影`, intrinsic dimensions matching the optimized file, and caption `04` / `TOGETHER · A MOMENT TO REMEMBER`.

- [ ] **Step 3: Expand the ChorusPrep story**

Add the visible heading `从排练现场到可以使用的产品`, explain that the idea came from observing fragmented pre-rehearsal practice and feedback, and add a `WHAT I LEARNED` reflection describing requirement decomposition, product/technical trade-offs, and iterative verification without claiming unprovided outcomes.

- [ ] **Step 4: Expand the interests**

Rewrite the three interest descriptions so each answers both why it matters and what may be explored next:

```text
数据故事：我喜欢从公开数据中找到一个足够具体的问题，再用清楚的图表和文字解释变化从哪里来。它训练我区分事实、假设与结论。

AI 工具实验：我会把日常重复的小任务做成轻量工具，实际使用后再判断它是否真的节省时间。比起展示“智能”，我更关心体验是否可靠。

城市咖啡观察：咖啡店也是观察城市的一扇窗口。我记录菜单、空间、街区与人的关系，希望慢慢整理出一份带有个人视角的上海咖啡地图。
```

### Task 4: Finish the Photo Layout and Interactive Hero

**Files:**
- Modify: `public/styles.css`
- Modify: `public/script.js`

**Interfaces:**
- Consumes: `.photo-main`, `.photo-waterfall`, `.photo-stage`, and `.photo-ceremony` markup from Task 3.
- Produces: a desktop editorial collage, a stable mobile grid, and hover/cursor behavior for all photographs.

- [ ] **Step 1: Update the desktop collage**

Increase `.photo-editorial` to a minimum height around `1380px`. Keep the two portrait photographs at the top, place `.photo-stage` on the right in the middle, and place `.photo-ceremony` as a wider landscape frame toward the lower left. Give both landscape images `aspect-ratio: 3 / 2`.

- [ ] **Step 2: Add supporting content styles**

Add spacing for consecutive about paragraphs, a `.story-intro` container, a readable `.story-context`, and a bordered `.project-reflection` grid consistent with the existing serif/monospace editorial hierarchy.

- [ ] **Step 3: Update tablet and mobile layouts**

At `max-width: 900px`, keep the collage proportions without overlap. At `max-width: 600px`, use the existing two-column grid, make the primary travel image and both landscape images span both columns, and stagger the waterfall image without clipping captions.

- [ ] **Step 4: Preserve interactions and accessibility**

Keep `.photo-frame` in the custom cursor target list, retain the image hover transition, and confirm the reduced-motion media query disables transitions and animations.

- [ ] **Step 5: Add XRUI-inspired pointer motion to `LYP`**

Add hero-scoped pointer variables (`--pointer-x`, `--pointer-y`, and per-letter depth values). Use `requestAnimationFrame` in `public/script.js` to ease each large letter toward a small translate/rotate/skew target derived from the pointer position. On direct letter hover, apply a restrained scale/stretch state; on pointer leave, ease all values back to zero. Skip pointer tracking for coarse pointers and when reduced motion is enabled.

### Task 5: Verify and Commit the Website Update

**Files:**
- Verify: `app/page.tsx`
- Verify: `public/styles.css`
- Verify: `public/script.js`
- Verify: `public/*.jpg`
- Verify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: all implementation tasks.
- Produces: a tested Git commit whose SHA exactly identifies the source used for publishing.

- [ ] **Step 1: Run the full test**

Run: `npm test`

Expected: vinext production build succeeds and all Node tests pass.

- [ ] **Step 2: Inspect the build output**

Confirm `dist/server/index.js` exists and all four photo filenames appear under the generated client/static output.

- [ ] **Step 3: Review the working tree**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; only the intended page, styles, script, tests, plan, and photo assets are included.

- [ ] **Step 4: Commit the implementation**

Run:

```powershell
git add app/page.tsx public/styles.css public/script.js tests/rendered-html.test.mjs public/travel-macau.jpg public/nature-waterfall.jpg public/performance-stage.jpg public/stage-memory.jpg docs/superpowers/plans/2026-07-29-photo-journal-and-balanced-narrative.md
git commit -m "Add personal photo journal and richer narrative"
git rev-parse HEAD
```

Expected: the final command returns the exact commit SHA used in Task 6.

### Task 6: Publish the Exact Commit to the Existing Public Site

**Files:**
- Read: `.openai/hosting.json`
- Create outside source tree: `work/site-packages/yipei-portfolio-v2.tar.gz`

**Interfaces:**
- Consumes: the Task 5 commit SHA and Sites project ID `appgprj_6a685a3fa1b48191873411da1a14d376`.
- Produces: a saved Sites version and a successful public deployment at the existing production URL.

- [ ] **Step 1: Push the exact committed source**

Create a fresh Sites source-repository write credential for project `appgprj_6a685a3fa1b48191873411da1a14d376`, then push `HEAD` to the returned branch using the credential without printing or storing its token in project files.

- [ ] **Step 2: Package the built site**

Run the Sites packaging helper against the project directory and write `C:\Users\Jack\Documents\Codex\2026-07-13\ba\work\site-packages\yipei-portfolio-v2.tar.gz`.

- [ ] **Step 3: Save a new Sites version**

Call Sites `save_site_version` with project ID `appgprj_6a685a3fa1b48191873411da1a14d376`, the exact Task 5 commit SHA, and the new archive.

- [ ] **Step 4: Deploy publicly and poll status**

Call the public deployment operation for the saved version and poll deployment status until it reports success or a terminal failure.

- [ ] **Step 5: Hand off the production URL**

Report the unchanged public URL `https://yipei-personal-portfolio.jack-piscator.chatgpt.site` only after the deployment status is successful.
