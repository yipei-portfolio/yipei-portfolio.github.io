import type { Metadata } from "next";
import { Contact, Header } from "../../ui";
import { ImageGallery } from "../image-gallery";
import { photographyImages } from "../gallery-content";

export const metadata: Metadata = { title: "摄影与观察 · 李忆沛", description: "用镜头留下日常中的光影与生活片段。" };

export default function Photography() {
  return <div className="case-page photography-page">
    <Header detail />
    <main id="main">
      <section className="case-hero wrap">
        <a className="text-link back-link" href="/#work">← 全部作品</a>
        <p className="eyebrow">PHOTOGRAPHY / 摄影与观察</p>
        <h1><span>日常，也值得</span><span><em>认真看。</em></span></h1>
        <p className="case-intro">除了数据、产品与合唱，我也喜欢摄影。这里放一些自己的摄影素材，记录日常里值得停留的片刻。</p>
      </section>
      <section className="photo-story wrap" aria-label="个人摄影作品">
        <div className="photo-story-heading"><h2>沿途与日常</h2><p>山间的光、海上的风，以及城市里的生活。</p></div>
        <ImageGallery images={photographyImages} label="个人摄影作品大图" />
      </section>
      <a className="next-project wrap" href="/work/choir/"><div><span className="eyebrow">另一种表达</span><h2>合唱与协作</h2><p>从自己的视角，走向共同的声音。</p></div><span className="next-arrow" aria-hidden="true">↗</span></a>
    </main>
    <Contact />
  </div>;
}
