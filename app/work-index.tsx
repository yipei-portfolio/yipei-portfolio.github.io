"use client";

import { useState } from "react";

const work = [
  {
    slug: "chorusgo",
    name: "ChorusGO",
    category: "产品实践",
    title: "把课前练习，连成一条线",
    tags: ["真实需求", "练习体验", "教师反馈"],
  },
  {
    slug: "ora-coffee",
    name: "Ora Coffee",
    category: "数据分析",
    title: "让经营数据，回答业务问题",
    tags: ["门店经营", "商品分析", "指标梳理"],
  },
  {
    slug: "choir",
    name: "Choir",
    category: "组织协作",
    title: "让不同声音，完成同一件事",
    tags: ["排练组织", "团队沟通", "舞台实践"],
  },
  {
    slug: "photography",
    name: "Photography",
    category: "摄影",
    title: "把日常里值得停留的瞬间，留下来",
    tags: ["日常观察", "光影", "生活片段"],
  },
];

export function WorkIndex() {
  const [active, setActive] = useState(0);

  return (
    <section className="work-index theme-section" id="work" data-bg="#e8e5df" data-ink="#171717" aria-labelledby="work-heading">
      <div className="work-index-head reveal">
        <h2 id="work-heading">Work<span aria-hidden="true">.</span></h2>
        <p>从真实的问题出发。<br />用数据理解，用产品连接，用协作完成。</p>
      </div>
      <div className="work-index-body" data-active={active}>
        <div className="work-index-previews" aria-hidden="true">
          <figure className={`work-cover cover-chorus ${active === 0 ? "is-active" : ""}`}>
            <div className="work-mini-stage"><img src="/media/chorusgo-practice-capture.webp" alt="" width="282" height="606" loading="lazy" /></div>
            <figcaption><span>CHORUSGO / PRACTICE</span><strong>从自己的声部，开始练习。</strong><small>小程序练习页 · 历史快照</small></figcaption>
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
        <div className="work-index-list reveal">
          {work.map((project, index) => (
            <a key={project.slug} className={`work-index-link ${active === index ? "is-active" : ""}`} href={`/work/${project.slug}/`} onPointerEnter={() => setActive(index)} onFocus={() => setActive(index)} aria-label={`${project.name}：${project.title}，阅读${project.category}案例`}>
              <div className="work-index-meta"><span>0{index + 1} / {project.category}</span><span>{project.tags.join(" · ")}</span></div>
              <div className={`work-index-title title-${project.slug}`}><h3>{project.name}</h3><span aria-hidden="true">↗</span></div>
              <div className="work-mobile-image" aria-hidden="true"><img src={["/media/chorusgo-practice-capture.webp", "/media/ora-store.webp?v=20260918", "/media/choir-conducting.webp", "/media/photography-gulls.webp"][index]} alt="" loading="lazy" />{index === 0 && <small>小程序练习页 · 历史快照</small>}</div>
              <p>{project.title}</p>
            </a>
          ))}
        </div>
      </div>
      <div className="work-index-foot reveal"><span>WORK & LIFE / 01—04</span><p>产品、经营、合唱，以及镜头里的日常。</p></div>
    </section>
  );
}
