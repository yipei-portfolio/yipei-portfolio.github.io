import { WechatContact } from "./wechat-contact";

export function Header({ detail = false }: { detail?: boolean }) {
  return (
    <>
      <a className="skip-link" href="#main">跳转到正文</a>
      <header className="site-header wrap">
        <a className="brand" href="/" aria-label="李忆沛，返回首页">LYP<span aria-hidden="true">.</span></a>
        <nav aria-label="主导航">
          <a href={detail ? "/#work" : "#work"}>作品</a>
          <a href={detail ? "/#about" : "#about"}>关于</a>
          <a href="#contact">联系 <span aria-hidden="true">↗</span></a>
        </nav>
        <a className="nav-resume" href="/resume.pdf" download>简历 PDF <span aria-hidden="true">↓</span></a>
      </header>
    </>
  );
}

export function MiniProgram() {
  return (
    <div className="mini-device">
      <div className="mini-capture">
        <img src="/chorusgo-miniprogram.jpeg" alt="ChorusGO 小程序练习页：男高声部课前预习、跟唱音频和谱面入口" width="974" height="768" loading="lazy" decoding="async" />
      </div>
      <span className="mini-caption">小程序练习页 · 现有快照</span>
    </div>
  );
}

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-heading">
          <span className="eyebrow">LET’S CONNECT</span>
          <h2 id="contact-title">下一个好问题，<br /><em>一起聊聊。</em></h2>
          <p>关于数据、产品、合唱，<br />或者一个值得动手的想法。</p>
        </div>
        <div className="contact-list">
          <WechatContact />
          <a className="contact-item" href="mailto:l1634123654@163.com">
            <span>EMAIL</span><strong>l1634123654@163.com</strong><b>发送邮件 ↗</b>
          </a>
          <a className="contact-item" href="/resume.pdf" download>
            <span>RESUME</span><strong>个人简历 PDF</strong><b>下载文件 ↓</b>
          </a>
        </div>
        <footer>
          <span>© 2026 李忆沛 / YIPEI LI</span><span>STAY CURIOUS. MAKE IT CLEAR.</span>
          <a href="#main">返回顶部 ↑</a>
        </footer>
      </div>
    </section>
  );
}
