import Script from "next/script";
import { WechatContact } from "./wechat-contact";
import { WorkIndex } from "./work-index";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">跳转到正文</a>
      <div className="page-background" aria-hidden="true" />
      <div className="custom-cursor" aria-hidden="true" />

      <header className="top-nav">
        <a className="brand-mark" href="#top" aria-label="返回顶部">LYP</a>
        <nav className="nav-magnetic" aria-label="页面导航" data-active="none">
          <span className="nav-orb" aria-hidden="true" />
          <a className="nav-action" href="#about" aria-label="关于">
            <span aria-hidden="true">←</span><small>ABOUT</small>
          </a>
          <a className="nav-action nav-grid" href="#work" aria-label="项目">
            <i /><i /><i /><i />
          </a>
          <a className="nav-action" href="#contact" aria-label="联系">
            <span aria-hidden="true">→</span><small>CONTACT</small>
          </a>
        </nav>
        <span className="local-time">SHANGHAI <b>--:--</b></span>
      </header>

      <main id="main">
        <section className="hero theme-section" id="top" data-bg="#f8f7f5" data-ink="#171717">
          <div className="hero-wordmark" aria-hidden="true">
            <span data-letter="L">L</span>
            <span data-letter="Y">Y</span>
            <span data-letter="P">P</span>
          </div>
          <div className="hero-copy">
            <h1 aria-label="Stay curious. Make things clear.">
              <span className="wipe-line">Stay curious.</span>
              <span className="wipe-line">Make things clear.</span>
            </h1>
            <p className="hero-description" data-split>
              我是李忆沛，关注数据分析、产品实践与团队协作。我喜欢理解真实业务，把复杂问题理清楚，再把想法做成有用的工具。
            </p>
          </div>
          <div className="hero-meta">
            <span>YIPEI LI / 2026</span>
            <a href="#work">EXPLORE MY WORK ↓</a>
          </div>
        </section>

        <section className="about theme-section" id="about" data-bg="#f8f7f5" data-ink="#171717">
          <div className="pill-row reveal">
            <span>Electronic Engineering</span><span>Data Analytics</span>
            <span>BI &amp; Operations</span><span>Choir</span><span>Shanghai</span>
          </div>
          <div className="about-layout">
            <div className="about-title reveal">
              <span>ABOUT</span><h2>YIPEI</h2>
            </div>
            <div className="about-content">
              <div className="about-copy reveal">
                <p className="about-lead">你好，我是李忆沛，也可以叫我 Jack。</p>
                <p>我就读于上海海事大学电子信息工程专业，在皮氏咖啡旗下新品牌 Ora Coffee 参与数据分析。围绕门店经营、商品表现、会员与渠道，我参与指标梳理、经营看板优化和分析工具整理。</p>
                <p>相比单纯呈现数字，我更在意它能否帮助团队看清问题、形成判断。我的习惯是先明确业务问题，再梳理事实、可能原因与需要进一步确认的部分。</p>
                <p>数据之外，我曾担任大学合唱团团长和助理指挥，参与团队管理、排练组织与演出。这段经历让我学会倾听与协作，也成为 ChorusGO 的灵感来源。</p>
                <p>无论面对数据还是团队，我都希望让信息更清楚，让每个人的部分能够接起来。</p>
              </div>
              <aside className="about-gallery" id="photos" aria-label="生活与舞台照片拼贴">
                <div className="photo-reveal photo-main">
                  <figure className="portrait-frame portrait-main" aria-label="个人影像：舞台留影" tabIndex={0}>
                    <div className="portrait-media">
                      <img src="/stage-memory.jpg" alt="李忆沛身着正装手捧鲜花的舞台留影" width="1800" height="1200" loading="lazy" decoding="async" />
                    </div>
                  </figure>
                </div>
                <div className="photo-reveal photo-left">
                  <figure className="portrait-frame portrait-secondary" aria-label="个人影像：澳门旅行" tabIndex={0}>
                    <div className="portrait-media">
                      <img src="/travel-macau.jpg" alt="李忆沛在澳门大三巴牌坊前旅行" width="1279" height="1705" loading="lazy" decoding="async" />
                    </div>
                  </figure>
                </div>
                <div className="photo-reveal photo-right">
                  <figure className="portrait-frame portrait-nature" aria-label="个人影像：瀑布旅行" tabIndex={0}>
                    <div className="portrait-media">
                      <img src="/nature-waterfall.jpg" alt="李忆沛在瀑布前旅行留影" width="1350" height="1800" loading="lazy" decoding="async" />
                    </div>
                    <figcaption>keep exploring.</figcaption>
                  </figure>
                </div>
              </aside>
              <a className="about-work-link reveal" href="#work">看看我的作品 <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </section>

        <WorkIndex />

        <section className="contact theme-section" id="contact" data-bg="#141414" data-ink="#f8f7f5">
          <div className="contact-wordmark" aria-hidden="true">HELLO</div>
          <div className="contact-copy">
            <p className="reveal">THANKS FOR STOPPING BY.</p>
            <h2 className="reveal">保持联系。<br /><em>Say hello.</em></h2>
            <div className="contact-list reveal">
              <WechatContact />
              <a className="contact-item" href="mailto:l1634123654@163.com">
                <span>EMAIL</span><strong>l1634123654@163.com</strong><b>发送邮件 ↗</b>
              </a>
              <a className="contact-item" href="/resume.pdf" download>
                <span>RESUME</span><strong>个人简历 PDF</strong><b>下载文件 ↓</b>
              </a>
            </div>
          </div>
          <footer>
            <span>© 2026 李忆沛</span><span>MADE WITH CURIOSITY</span>
            <a href="#top">BACK TO TOP ↑</a>
          </footer>
        </section>
      </main>
      <Script src="/script.js" strategy="afterInteractive" type="module" />
    </>
  );
}
