"use client";

import { useEffect, useState } from "react";

const work = [
  {
    slug: "chorusgo",
    name: "ChorusGO",
    category: "产品实践",
    title: "把课前练习，连成一条线",
    tags: ["AI 辅助开发", "角色权限", "练习闭环"],
    color: "#becdbb",
  },
  {
    slug: "ora-coffee",
    name: "Ora Coffee",
    category: "数据分析",
    title: "让经营数据，回答业务问题",
    tags: ["观远 BI", "SQL", "指标体系"],
    color: "#e5c992",
  },
  {
    slug: "choir",
    name: "Choir",
    category: "组织协作",
    title: "让不同声音，完成同一件事",
    tags: ["110 人团队", "排练组织", "专场演出"],
    color: "#b7acce",
  },
  {
    slug: "photography",
    name: "Photography",
    category: "摄影",
    title: "把日常里值得停留的瞬间，留下来",
    tags: ["日常观察", "光影", "生活片段"],
    color: "#cfb8a9",
  },
];

export function WorkIndex() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = hovered ?? focused;

  useEffect(() => {
    // The scroll-theme controller decides which section owns the page color.
    window.dispatchEvent(new Event("portfolio:themechange"));
  }, [active]);

  return (
    <section className="work-index theme-section" id="work" data-bg={active === null ? "#e8e5df" : work[active].color} data-ink="#171717" aria-labelledby="work-heading">
      <div className="work-index-head reveal">
        <h2 id="work-heading">Work</h2>
        <p>从真实的问题出发。<br />用数据理解，用产品连接，用协作完成。</p>
      </div>
      <div className="work-index-body" data-active={active ?? "none"}>
        <div className="work-index-previews" aria-hidden="true">
          <figure className={`work-cover cover-chorus ${active === 0 ? "is-active" : ""}`}>
            <div className="work-mini-stage"><img src="/media/chorusgo-ui-home.webp" alt="" width="390" height="844" loading="lazy" /></div>
            <figcaption><span>CHORUSGO / PRACTICE</span><strong>从自己的声部，开始练习。</strong><small>小程序界面 · 示例数据</small></figcaption>
          </figure>
          <figure className={`work-cover cover-ora ${active === 1 ? "is-active" : ""}`}>
            <img src="/media/ora-store.webp?v=20260918" alt="" width="1080" height="1441" loading="lazy" />
            <figcaption><span>ORA COFFEE / BUSINESS</span><strong>从门店现场，理解经营。</strong><small>Ora Coffee · 门店实景</small></figcaption>
          </figure>
          <figure className={`work-cover cover-choir ${active === 2 ? "is-active" : ""}`}>
            <img src="/media/choir-conducting.webp" alt="" width="2200" height="1346" loading="lazy" />
            <figcaption><span>LISTEN. CONNECT. PERFORM.</span><strong>台前的声音，幕后的协作。</strong><small>团长 · 助理指挥</small></figcaption>
          </figure>
          <figure className={`work-cover cover-photography ${active === 3 ? "is-active" : ""}`}>
            <img src="/media/photography-gulls.webp" alt="" width="1350" height="1800" loading="lazy" />
            <figcaption><span>PHOTOGRAPHY / EVERYDAY</span><strong>日常，也值得认真看。</strong><small>个人摄影 · 落日与海鸥</small></figcaption>
          </figure>
        </div>
        <div className="work-index-list reveal" onPointerLeave={() => setHovered(null)}>
          {work.map((project, index) => (
            <a
              key={project.slug}
              className={`work-index-link ${active === index ? "is-active" : ""}`}
              href={`/work/${project.slug}/`}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") setHovered(index);
              }}
              onFocus={() => {
                setHovered(null);
                setFocused(index);
              }}
              onBlur={() => setFocused(null)}
              aria-label={`${project.name}：${project.title}，阅读${project.category}案例`}
            >
              <div className={`work-index-title title-${project.slug}`}><h3>{project.name}</h3><span className="work-open-arrow" aria-hidden="true">↗</span></div>
              <div className="work-index-details">
                <p>{project.title}</p>
                <div className="work-index-tags"><span>{project.category}</span>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div className="work-mobile-image" aria-hidden="true"><img src={["/media/chorusgo-ui-home.webp", "/media/ora-store.webp?v=20260918", "/media/choir-conducting.webp", "/media/photography-gulls.webp"][index]} alt="" loading="lazy" />{index === 0 && <small>小程序界面 · 示例数据</small>}</div>
            </a>
          ))}
        </div>
      </div>
      <div className="work-index-foot reveal"><span>WORK & LIFE / 01—04</span><p>产品、经营、合唱，以及镜头里的日常。</p></div>
    </section>
  );
}
