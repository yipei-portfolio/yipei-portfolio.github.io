import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Contact, Header } from "../../ui";
import { projects } from "../content";
import { CaseEvidence } from "../evidence";
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
      <main id="main" className={`case-${slug}`}>
        <section className="case-hero wrap">
          <a className="text-link back-link" href="/#work">← 全部作品</a>
          <div className="case-topline">
            <span className="eyebrow">{project.name} / {project.category}</span>
            <span className="status-pill">{project.status}</span>
          </div>
          <h1>{project.headline.split("\n").map((line, index) => <span key={line}>{index === 1 ? <em>{line}</em> : line}</span>)}</h1>
          <p className="case-intro">{project.intro}</p>
          <dl className="case-facts">
            <div><dt>我的角色</dt><dd>{project.role}</dd></div>
            <div><dt>业务场景</dt><dd>{project.context}</dd></div>
            <div><dt>主要产出</dt><dd>{project.deliverable}</dd></div>
          </dl>
        </section>

        {slug === "ora-coffee" && <figure className="project-opening wrap">
          <img src="/media/ora-store.webp?v=20260918" alt="Ora Coffee 门店外立面与入口" width="1080" height="1441" />
          <figcaption>Ora Coffee · 门店实景</figcaption>
        </figure>}
        {slug === "chorusgo" && <figure className="project-opening opening-mini wrap">
          <div><img src="/media/chorusgo-practice-capture.webp" alt="ChorusGO 小程序练习页，展示男高声部课前预习与跟唱音频入口" width="282" height="606" /></div>
          <figcaption>小程序练习页 · 历史快照。保留真实界面，仅裁去周围工具窗口。</figcaption>
        </figure>}

        <section className="project-narrative wrap" aria-label={`${project.name}的故事`}>
            {project.sections.map((part) => (
              <article className="narrative-section" id={part.id} key={part.id}>
                <h2>{part.title}</h2><p>{part.body}</p>
                {part.evidence.map((stage) => <CaseEvidence key={stage} slug={slug} stage={stage} />)}
              </article>
            ))}
        </section>

        <section className="case-reflection wrap">
          <blockquote>{project.learning}</blockquote>
        </section>
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
