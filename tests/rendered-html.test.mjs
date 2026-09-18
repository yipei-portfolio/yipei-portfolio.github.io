import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);
const home = await readFile(new URL("index.html", output), "utf8");
const slugs = ["chorusgo", "ora-coffee", "choir"];

test("home retains its animated section rhythm and links to three exported case studies", async () => {
  assert.ok(home.indexOf('id="about"') < home.indexOf('id="work"'));
  assert.ok(home.includes('class="hero-wordmark"'));
  for (const letter of ['L', 'Y', 'P']) assert.ok(home.includes(`data-letter="${letter}"`));
  assert.ok(home.includes('class="nav-magnetic"'));
  assert.ok(home.includes('class="custom-cursor"'));
  assert.ok(home.includes('data-split="true"') || home.includes('data-split=""'));
  assert.ok(home.includes('/script.js'));
  for (const slug of slugs) {
    assert.ok(home.includes(`href="/work/${slug}/"`));
    const html = await readFile(new URL(`work/${slug}/index.html`, output), "utf8");
    assert.equal((html.match(/class="narrative-section"/g) ?? []).length, slug === "chorusgo" ? 3 : 2);
    assert.doesNotMatch(html, /STAR|star-section|star-label|案例目录|业务背景|项目目标|工作目标|承担任务|阶段成果|经历收获/);
    assert.ok(html.includes('href="/#work"'));
    assert.ok(html.includes('class="next-project wrap"'));
    assert.ok(html.includes('aria-haspopup="dialog"'));
  }
});

test("uses three original photos in the reference-style About collage", async () => {
  const start = home.indexOf('id="about"');
  const about = home.slice(start, home.indexOf("</section>", start));
  assert.equal((about.match(/<figure[^>]*aria-label="个人影像：/g) ?? []).length, 3);
  assert.ok(about.includes('id="photos"'));
  assert.doesNotMatch(about, /about-frame-stack|about-photo-rail|FOUR MOMENTS/);
  for (const name of ["stage-memory.jpg", "travel-macau.jpg", "nature-waterfall.jpg"]) {
    await access(new URL(name, output));
    assert.ok(about.includes(`src="/${name}"`));
  }
  assert.match(about, /loading="lazy"/);
  assert.match(about, /decoding="async"/);
});

test("contact uses the supplied QR image and leaves email unchanged", async () => {
  assert.ok(home.includes('src="/wechat-qr.jpg"'));
  assert.ok(home.includes('href="mailto:l1634123654@163.com"'));
  assert.ok(home.includes('aria-labelledby="wechat-title"'));
  assert.ok(home.includes('download="李忆沛-微信二维码.jpg"'));
  assert.doesNotMatch(home, /wechat-canvas|点击复制|微信号已复制/);
  assert.deepEqual(await readFile(new URL("wechat-qr.jpg", output)), await readFile(new URL("../public/wechat-qr.jpg", import.meta.url)));
});

test("exported pages contain no phone display or legacy segmented copy code", async () => {
  const files = await readdir(output, { recursive: true });
  const previousContact = ["134", "8211", "7805"].join("");
  for (const file of files.filter((name) => /\.(html|js|txt|map)$/.test(name))) {
    const text = await readFile(new URL(file, output), "utf8");
    assert.ok(!text.includes(previousContact), `previous phone in ${file}`);
    assert.doesNotMatch(text, /wechatParts|resolveWechat|wechat-canvas|copy-wechat/, file);
    if (file.endsWith('.html')) {
      const visibleText = text.replace(/<script\b[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, '');
      assert.doesNotMatch(visibleText, /(?<!\d)1[3-9]\d{9}(?!\d)/, `phone-like text in ${file}`);
    }
  }
});

test("work directory separates four subjects and never reuses About portraits", () => {
  const start = home.indexOf('id="work"');
  const directory = home.slice(start, home.indexOf('</section>', start));
  assert.equal((directory.match(/class="work-index-link /g) ?? []).length, 4);
  assert.equal((directory.match(/class="work-cover /g) ?? []).length, 4);
  assert.doesNotMatch(directory, /stage-memory.jpg|performance-stage.jpg|travel-macau.jpg|nature-waterfall.jpg|chorusgo-miniprogram.jpeg/);
  for (const image of ["chorusgo-practice-capture.webp", "ora-store.webp", "choir-conducting.webp", "photography-gulls.webp"]) assert.ok(directory.includes(image));
  assert.match(directory, /历史快照/);
  assert.match(directory, /href="\/work\/photography\/"/);
});

test("photography and choir have distinct real-photo collections", async () => {
  const photography = await readFile(new URL("work/photography/index.html", output), "utf8");
  const choir = await readFile(new URL("work/choir/index.html", output), "utf8");
  for (const name of ["gulls", "mountains", "harbour", "street", "blossoms", "coffee"]) assert.ok(photography.includes(`photography-${name}.webp`));
  assert.doesNotMatch(photography, /src="\/media\/choir-|star-section/);
  for (const name of ["live", "hall", "ensemble", "campus", "gathering", "conducting"]) assert.ok(choir.includes(`choir-${name}.webp`));
  assert.match(photography, /<dialog/);
  assert.match(choir, /不作为个人摄影作品署名/);
  const ora = await readFile(new URL("work/ora-coffee/index.html", output), "utf8");
  assert.match(ora, /Ora Coffee · 门店实景/);
  assert.doesNotMatch(ora, /上观新闻|网络配图|图片来源/);
});

test("web image derivatives remove private metadata and preserve valid dimensions", async () => {
  const { default: sharp } = await import("sharp");
  const { fileURLToPath } = await import("node:url");
  const files = await readdir(new URL("media/", output));
  assert.equal(files.length, 14);
  for (const file of files) {
    const meta = await sharp(fileURLToPath(new URL(`media/${file}`, output))).metadata();
    assert.equal(meta.format, "webp");
    assert.ok(meta.width > 0 && meta.height > 0);
    assert.equal(meta.exif, undefined);
    assert.equal(meta.xmp, undefined);
  }
});

test("project stories use subject-specific sections and retain linked exploratory panels", async () => {
  const sections = { chorusgo: ["rehearsal", "practice", "in-progress"], "ora-coffee": ["behind-the-numbers", "reading-the-business"], choir: ["singing-together", "beyond-the-stage"] };
  for (const slug of slugs) {
    const html = await readFile(new URL(`work/${slug}/index.html`, output), "utf8");
    for (const anchor of sections[slug]) {
      assert.ok(html.includes(`id="${anchor}"`));
    }
    if (slug === "choir") continue;
    const prefix = slug === "chorusgo" ? "practice" : "analysis";
    const count = slug === "chorusgo" ? 4 : 3;
    assert.equal((html.match(/role="tab"/g) ?? []).length, count);
    assert.equal((html.match(/role="tabpanel"/g) ?? []).length, count);
    for (let i = 0; i < count; i++) {
      assert.ok(html.includes(`aria-controls="${prefix}-panel-${i}"`));
      assert.ok(html.includes(`aria-labelledby="${prefix}-tab-${i}"`));
    }
  }
});

test("case copy is business-oriented and honest about product maturity", async () => {
  for (const slug of slugs) {
    const html = await readFile(new URL(`work/${slug}/index.html`, output), "utf8");
    const main = html.slice(html.indexOf('<main'), html.indexOf('</main>'));
    assert.doesNotMatch(main, /RC1|API|passed|release gate|ChorusPrep/);
  }
  const chorus = await readFile(new URL("work/chorusgo/index.html", output), "utf8");
  assert.match(chorus, /尚未以真实用户的长期使用数据证明效果/);
  assert.doesNotMatch(chorus, /登录界面/);
});
