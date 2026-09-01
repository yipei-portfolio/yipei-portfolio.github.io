import Script from "next/script";

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
              关注数据分析、商业智能与数字化运营。我喜欢把业务问题整理成清晰结构，再用可靠的数据与工具支持决策。
            </p>
          </div>
          <div className="hero-meta">
            <span>YIPEI LI / 2026</span>
            <a href="#about">SCROLL TO EXPLORE ↓</a>
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
                <p className="about-lead">
                  你好，我是李忆沛，也可以叫我 Jack。
                </p>
                <p>
                  我目前就读于上海海事大学电子信息工程专业，关注数据分析、商业智能与数字化运营。现在，我正在皮氏咖啡旗下新品牌 Ora Coffee 担任数据分析实习生，围绕门店经营、商品表现、会员与渠道数据开展分析，并参与 BI 看板优化、指标口径梳理和数据分析工具开发。
                </p>
                <p>
                  相比单纯呈现数字，我更在意数据能否真正帮助业务发现问题、提高效率并支持决策。为此，我持续学习 Python、SQL、Excel、Streamlit 和数据可视化，也尝试将业务需求转化为清晰的指标体系、分析框架与可落地的解决方案。
                </p>
                <p>
                  数据之外，我也长期参与合唱与艺术实践，曾担任大学合唱团团长和助理指挥，负责团队管理、排练组织与舞台演出。这段经历让我学会了倾听、协作、表达，也让我相信：无论是分析数据还是带领团队，真正重要的都是理解问题、连接人与信息，并推动事情向前发展。
                </p>
                <p>
                  我希望成为一名既理解业务、又具备技术能力的数据分析与数字化人才，用清晰的分析和可靠的工具，帮助团队做出更好的决策。
                </p>
              </div>
              <aside className="about-gallery reveal" aria-label="生活与舞台照片">
                <div className="about-gallery-head">
                  <span>BEYOND THE SCREEN</span>
                  <span>FOUR MOMENTS / 2026</span>
                </div>
                <div className="about-frame-stack">
                  <figure className="portrait-frame portrait-main" aria-label="个人影像：舞台留影">
                    <div className="portrait-media">
                      <img
                        src="/stage-memory.jpg"
                        alt="李忆沛身着正装手捧鲜花的舞台留影"
                        width="1800"
                        height="1200"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption><span>01</span><span>TOGETHER · ON STAGE</span></figcaption>
                  </figure>
                  <figure className="portrait-frame portrait-secondary" aria-label="个人影像：澳门旅行">
                    <div className="portrait-media">
                      <img
                        src="/travel-macau.jpg"
                        alt="李忆沛在澳门大三巴牌坊前旅行"
                        width="1279"
                        height="1705"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption><span>02</span><span>MACAU · ON THE ROAD</span></figcaption>
                  </figure>
                </div>
                <p className="about-gallery-note">
                  旅行让我保持好奇，自然让我放慢节奏，而舞台教会我倾听、表达，并与身边的人共同完成一件事。
                </p>
                <div className="about-photo-rail">
                  <figure className="portrait-frame rail-stage" aria-label="个人影像：舞台演唱">
                    <div className="portrait-media">
                      <img
                        src="/performance-stage.jpg"
                        alt="李忆沛在舞台上演唱"
                        width="1620"
                        height="1080"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption><span>03</span><span>FINDING MY VOICE</span></figcaption>
                  </figure>
                  <figure className="portrait-frame rail-nature" aria-label="个人影像：瀑布旅行">
                    <div className="portrait-media">
                      <img
                        src="/nature-waterfall.jpg"
                        alt="李忆沛在瀑布前旅行留影"
                        width="1350"
                        height="1800"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption><span>04</span><span>KEEP EXPLORING</span></figcaption>
                  </figure>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="work-intro theme-section" id="work" data-bg="#f8f7f5" data-ink="#171717">
          <span className="section-kicker reveal">SELECTED EXPLORATION</span>
          <h2 className="reveal">A real problem.<br />A working product.</h2>
          <p className="reveal">ChorusGO 来自我在合唱团管理与排练中的真实观察。我把一次分散的课前练习过程，重新组织成人人都知道下一步该做什么的协作体验。</p>
        </section>

        <section className="chorus-project theme-section" data-bg="#e8e5df" data-ink="#171717">
          <div className="project-heading reveal">
            <span>01 / FEATURED PROJECT</span><span>2026</span>
          </div>
          <div className="project-title reveal">
            <h2>ChorusGO</h2><p>大学合唱团课前预习、分声部练习与人工回课平台</p>
          </div>
          <div className="project-stage">
            <div className="project-shot reveal">
              <img src="/chorusprep-practice.png" alt="ChorusGO 分声部乐谱练习室界面" width="974" height="768" />
            </div>
            <span className="stage-note note-a">SCORE<br />PRACTICE</span>
            <span className="stage-note note-b">RECORD<br />FEEDBACK</span>
          </div>
          <div className="project-snapshot reveal" aria-label="ChorusGO STAR 项目案例">
            <div className="snapshot-head">
              <span>CASE STUDY / STAR</span>
              <span>FROM REHEARSAL TO FEEDBACK</span>
            </div>
            <div className="snapshot-grid">
              <article>
                <span className="snapshot-label">S / SITUATION · 业务背景</span>
                <strong>课前练习散落在不同地方</strong>
                <p>谱面、示范音频、群消息和录音彼此分散。团员要反复寻找自己的声部，指挥也很难在排练前了解大家的准备情况。</p>
              </article>
              <article>
                <span className="snapshot-label">T / TASK · 项目目标</span>
                <strong>把每个人的下一步变清楚</strong>
                <p>围绕真实排练节奏，把布置、分声部练习、录音提交和教师反馈串成一条简单路径，让不同角色都能快速完成自己的任务。</p>
              </article>
              <article>
                <span className="snapshot-label">A / ACTION · 实现方式</span>
                <strong>从排练现场重新组织体验</strong>
                <p>把团内谱库、SATB 声部练习、示范音频、录音回听与人工批改集中到小程序中；先梳理角色和反馈节点，再逐步打磨每一步。</p>
              </article>
              <article className="snapshot-result">
                <span className="snapshot-label">R / RESULT · 业务结果</span>
                <strong>形成从练习到回课的完整闭环</strong>
                <p>团员能更快进入自己的练习内容并提交录音；教师也能在同一处查看提交、给出评语并发布结果，让课前准备更连续。</p>
              </article>
            </div>
          </div>
        </section>

        <section className="interests theme-section" data-bg="#f1efeb" data-ink="#171717">
          <div className="interests-head reveal">
            <span>MORE THINGS I CARE ABOUT</span><span>02 — 03</span>
          </div>
          <div className="interest-row reveal">
            <span className="interest-number">02</span><h3>数据故事</h3>
            <p>我喜欢从公开数据中找到一个足够具体的问题，再用清楚的图表和文字解释变化从哪里来。它训练我区分事实、假设与结论。</p>
          </div>
          <div className="interest-row reveal">
            <span className="interest-number">03</span><h3>AI 工具实验</h3>
            <p>我会把日常重复的小任务做成轻量工具，实际使用后再判断它是否真的节省时间。比起展示“智能”，我更关心体验是否可靠。</p>
          </div>
        </section>

        <section className="contact theme-section" id="contact" data-bg="#141414" data-ink="#f8f7f5">
          <div className="contact-wordmark" aria-hidden="true">HELLO</div>
          <div className="contact-copy">
            <p className="reveal">THANKS FOR STOPPING BY.</p>
            <h2 className="reveal">保持联系。<br /><em>Say hello.</em></h2>
            <div className="contact-list reveal">
              <button className="contact-item copy-wechat" type="button">
                <span>WECHAT</span>
                <canvas className="wechat-canvas" role="img" aria-label="微信号，点击可复制" />
                <b>点击复制 ↗</b>
              </button>
              <a className="contact-item" href="mailto:l1634123654@163.com">
                <span>EMAIL</span><strong>l1634123654@163.com</strong><b>发送邮件 ↗</b>
              </a>
              <a className="contact-item" href="/resume.pdf" download>
                <span>RESUME</span><strong>个人简历 PDF</strong><b>下载文件 ↓</b>
              </a>
            </div>
            <p className="copy-feedback" role="status" aria-live="polite">微信号已复制</p>
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
