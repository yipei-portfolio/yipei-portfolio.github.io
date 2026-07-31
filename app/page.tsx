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
          <p className="reveal">ChorusPrep 来自我在合唱团管理与排练中的真实观察。它也是一次从问题定义、流程设计到工程实现的完整产品练习。</p>
        </section>

        <section className="chorus-project theme-section" data-bg="#e8e5df" data-ink="#171717">
          <div className="project-heading reveal">
            <span>01 / FEATURED PROJECT</span><span>2026</span>
          </div>
          <div className="project-title reveal">
            <h2>ChorusPrep</h2><p>大学合唱团课前预习与分声部练习平台</p>
          </div>
          <div className="project-stage">
            <div className="project-shot reveal">
              <img src="/chorusprep-practice.png" alt="ChorusPrep 分声部乐谱练习室界面" width="1304" height="1243" />
            </div>
            <span className="stage-note note-a">SATB<br />VOICE MIX</span>
            <span className="stage-note note-b">REAL AUDIO<br />FEEDBACK</span>
          </div>
          <div className="project-story">
            <div className="story-intro reveal">
              <span>从排练现场到可以使用的产品</span>
              <p className="story-lead">
                把指挥布置任务、团员分声部练习、录音提交和教师复盘连接成一条完整流程，让课前排练更有针对性。
              </p>
              <p className="story-context">
                作为合唱团团长和助理指挥，我观察到课前练习经常分散在不同文件、消息和录音里：团员不容易快速找到自己的声部，教师也很难及时了解练习完成情况。ChorusPrep 尝试把这些环节放进同一条清晰、可反馈的流程。
              </p>
            </div>
            <div className="story-list reveal">
              <div><span>01</span><p>上传 MusicXML、PDF 或 MuseScore 乐谱，识别并校对 SATB 声部。</p></div>
              <div><span>02</span><p>分声部播放与混音，支持节拍器、调速和指定小节循环。</p></div>
              <div><span>03</span><p>分析录音的音准、节奏与完整度，生成个人及教师报告。</p></div>
            </div>
          </div>
          <div className="project-reflection reveal">
            <span>WHAT I LEARNED</span>
            <p>
              这个项目让我练习把模糊的现场需求拆成角色、任务和反馈节点，也让我不断在产品体验与技术可行性之间做取舍。比起一次性做出所有功能，我更重视先建立可使用的核心流程，再通过测试和复盘逐步改善。
            </p>
          </div>
          <div className="tech-line reveal">
            <span>NEXT.JS</span><span>FASTAPI</span><span>SQLITE</span>
            <span>VEROVIO</span><span>MUSESCORE</span><span>PYIN</span>
          </div>
        </section>

        <section className="interests theme-section" data-bg="#f1efeb" data-ink="#171717">
          <div className="interests-head reveal">
            <span>MORE THINGS I CARE ABOUT</span><span>02 — 04</span>
          </div>
          <div className="interest-row reveal">
            <span className="interest-number">02</span><h3>数据故事</h3>
            <p>我喜欢从公开数据中找到一个足够具体的问题，再用清楚的图表和文字解释变化从哪里来。它训练我区分事实、假设与结论。</p>
          </div>
          <div className="interest-row reveal">
            <span className="interest-number">03</span><h3>AI 工具实验</h3>
            <p>我会把日常重复的小任务做成轻量工具，实际使用后再判断它是否真的节省时间。比起展示“智能”，我更关心体验是否可靠。</p>
          </div>
          <div className="interest-row reveal">
            <span className="interest-number">04</span><h3>城市咖啡观察</h3>
            <p>咖啡店也是观察城市的一扇窗口。我记录菜单、空间、街区与人的关系，希望慢慢整理出一份带有个人视角的上海咖啡地图。</p>
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
