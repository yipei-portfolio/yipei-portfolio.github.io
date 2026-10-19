import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact, Header } from "../../ui";
import { projects } from "../content";
import { CaseEvidence, PhoneScreens } from "../evidence";
import { ImageGallery } from "../image-gallery";
import { choirImages } from "../gallery-content";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return { title: project ? `${project.name} · 李忆沛` : "案例未找到", description: project?.intro };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <>
      <Header detail />
      <main id="main" className={`case-${slug} case-layout`}>
        <div className="case-grid wrap">
        <aside className="case-hero">
          <a className="text-link back-link" href="/#work">← 全部作品</a>
          <div className="case-topline">
            <span className="eyebrow">{project.name} / {project.category}</span>
            <span className="status-pill">{project.status}</span>
          </div>
          <h1>{project.headline.split("\n").map((line, index) => <span key={line}>{index === 1 ? <em>{line}</em> : line}</span>)}</h1>
          <p className="case-intro">{project.intro}</p>
          <dl className="case-facts">
            <div><dt>角色</dt><dd>{project.role}</dd></div>
            <div><dt>场景</dt><dd>{project.context}</dd></div>
            <div><dt>产出</dt><dd>{project.deliverable}</dd></div>
            <div><dt>工具</dt><dd>{project.toolkit}</dd></div>
            <div><dt>时间</dt><dd>{project.period}</dd></div>
          </dl>
          <ul className="case-tags" aria-label="关键词">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </aside>

        <div className="case-body">
        {slug === "ora-coffee" && <figure className="project-opening">
          <img src="/media/ora-store.webp?v=20260918" alt="Ora Coffee 门店外立面与入口" width="1080" height="1441" />
          <figcaption>Ora Coffee · 门店实景</figcaption>
        </figure>}
        {slug === "chorusgo" && <div className="project-opening opening-screens">
          <PhoneScreens
            note="小程序界面预览 · 示例数据，不含真实团员信息"
            screens={[
              { src: "/media/chorusgo-ui-home.webp", alt: "ChorusGO 团员首页：一起，为下一次合唱做准备，含乐谱、作业、记录与活动接龙入口", label: "团员 · 今日" },
              { src: "/media/chorusgo-ui-assignments.webp", alt: "ChorusGO 作业列表：进行中的声部练习作业与提交进度", label: "作业 · 提交进度" },
              { src: "/media/chorusgo-ui-detail.webp", alt: "ChorusGO 作业详情：目标声部、练习范围、示范音频与开始练习按钮", label: "练习 · 示范与要求" },
            ]}
          />
        </div>}

        <dl className="case-stats" aria-label="项目范围">
          {project.stats.map((stat) => <div key={stat.label}><dt>{stat.value}</dt><dd>{stat.label}</dd></div>)}
        </dl>

        <section className="project-narrative" aria-label={`${project.name}的故事`}>
            {project.sections.map((part, index) => (
              <article className="narrative-section" id={part.id} key={part.id}>
                <span className="narrative-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h2>{part.title}</h2><p>{part.body}</p>
                {part.evidence.map((stage) => <CaseEvidence key={stage} slug={slug} stage={stage} />)}
              </article>
            ))}
        </section>

        <section className="case-reflection">
          <span className="eyebrow">REFLECTION / 收获</span>
          <blockquote>{project.learning}</blockquote>
        </section>
        </div>
        </div>
        {slug === "choir" && <section className="photo-story wrap" aria-label="合唱影像">
          <div className="photo-story-heading"><h2>合唱现场</h2><p>演出、相聚，以及一起留在舞台上的记忆。</p></div>
          <ImageGallery images={choirImages} label="合唱演出与合影大图" />
          <p className="image-note">合唱经历影像，按活动内容归档；不作为个人摄影作品署名。</p>
          <a className="text-link" href="/work/photography/">看看我的摄影与观察 ↗</a>
        </section>}
        <a className="next-project wrap" href={`/work/${next.slug}/`}>
          <div><span className="eyebrow">继续阅读 / NEXT CASE</span><h2>{next.name}</h2><p>{next.title}</p></div>
          <span className="next-arrow" aria-hidden="true">↗</span>
        </a>
      </main>
      <Contact />
    </>
  );
}
