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
          <p className="reveal">ChorusGO 来自我在合唱团管理与排练中的真实观察。它把一次产品练习推进成了可验证的 RC1：从问题定义、角色权限，到小程序交互、后端契约与发布门禁。</p>
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
              <img src="/chorusprep-practice.png" alt="ChorusGO 分声部乐谱练习室界面" width="1304" height="1243" />
            </div>
            <span className="stage-note note-a">WECHAT<br />RC1</span>
            <span className="stage-note note-b">MANUAL<br />REVIEW</span>
          </div>
          <div className="project-snapshot reveal" aria-label="ChorusGO RC1 本地快照">
            <div className="snapshot-head">
              <span>LOCAL RC1 SNAPSHOT</span>
              <span>FACT-CHECKED · 2026.08.30</span>
            </div>
            <div className="snapshot-grid">
              <article>
                <span className="snapshot-label">PRODUCT</span>
                <strong>一条完整的人工回课链路</strong>
                <p>指挥发布示范音频与练习任务，团员分声部练习、录音并提交，教师保存草稿后再发布分数、评语与通过 / 重录结论。</p>
              </article>
              <article>
                <span className="snapshot-label">VERIFIED LOCALLY</span>
                <strong>1,166 checks across the stack</strong>
                <p>API 496 项、Web 68 项、小程序 596 项测试通过，另有 6 条隔离 E2E；TypeScript 与 release 构建通过。</p>
              </article>
              <article>
                <span className="snapshot-label">ENGINEERING</span>
                <strong>把失败也设计成可定位的状态</strong>
                <p>围绕 PDF、录音与调音器建立权限、超时和错误分类诊断；同时保留角色隔离、逾期标记、批改历史与指挥转让约束。</p>
              </article>
              <article className="snapshot-gate">
                <span className="snapshot-label">OPEN GATE</span>
                <strong>RC1 candidate — not production yet</strong>
                <p>线上 API 升级、微信平台配置、iOS / Android 真机与弱网回归仍待完成。这里展示的是本地验证快照，不把模拟器结果写成上线证明。</p>
              </article>
            </div>
          </div>
          <div className="project-story">
            <div className="story-intro reveal">
              <span>从排练现场到可以使用的产品</span>
              <p className="story-lead">
                把谱面、声部练习、示范音频、录音提交和教师人工回课连接成一条清晰流程，让课前准备不再散落在文件与群消息里。
              </p>
              <p className="story-context">
                作为合唱团团长和助理指挥，我观察到课前练习经常分散在不同文件、消息和录音里：团员不容易快速找到自己的声部，教师也很难及时了解练习完成情况。ChorusGO 用微信小程序承接高频练习场景，并用清楚的角色权限与发布边界保护反馈过程。
              </p>
            </div>
            <div className="story-list reveal">
              <div><span>01</span><p>以 PDF 为主谱面，可选补充 MusicXML 或 MuseScore 播放源；即使播放源失败，谱面仍可阅读。</p></div>
              <div><span>02</span><p>按 SATB 声部播放与混音，支持节拍器、调速、指定小节循环与自主练习。</p></div>
              <div><span>03</span><p>团员回听后提交真实录音；教师人工评分、写评语并决定通过或重录，结果发布后才对团员可见。</p></div>
            </div>
          </div>
          <div className="project-reflection reveal">
            <span>WHAT I LEARNED</span>
            <p>
              这个项目让我把现场需求拆成产品契约、角色权限、失败状态与发布证据。更重要的是，我学会区分“代码已经完成”“本地已经验证”和“用户环境已经通过”——可靠的产品不仅要能运行，也要诚实地说明尚未完成的最后一公里。
            </p>
          </div>
          <div className="tech-line reveal">
            <span>TARO / REACT</span><span>WECHAT MINI PROGRAM</span><span>NEXT.JS</span>
            <span>FASTAPI</span><span>SQLITE</span><span>VEROVIO</span><span>MUSESCORE</span>
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
              <button className="contact-item copy-wechat" type="button" data-copy="13482117805">
                <span>WECHAT</span><strong>13482117805</strong><b>点击复制 ↗</b>
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
