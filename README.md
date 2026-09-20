# 李忆沛 · Personal Portfolio

个人主页与作品集，发布于：

<https://yipei-portfolio.github.io>

## Local development

```bash
npm ci
npm run dev
```

## GitHub Pages build

```bash
npm run build:pages
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布网站。

## 查看访问统计

使用 Cloudflare Web Analytics，无需服务器或更换域名。登录自己的 Cloudflare 账号，进入 **Web Analytics**，选择 `yipei-portfolio.github.io`，可以查看访问次数、页面浏览量、来源、国家／地区和设备类型。

- 统计只能从正式启用后开始；没有历史数据补录，也不能知道访客姓名或微信身份。
- Visits 是访问次数，不等同于去重后的真实人数；广告拦截器、网络问题和隐私设置可能导致漏计。
- 本地预览不发送统计。浏览器启用 Do Not Track 或 Global Privacy Control 时不加载统计。自己预览正式站可使用 `https://yipei-portfolio.github.io/?analytics=off#work`，这个选项仅作用于当前带参数的页面。
- Cloudflare 不使用 Cookie 或浏览器持久化标识来做这项统计。统计请求由 Cloudflare 接收和处理。

### 接入与停用（维护说明）

1. 在 Cloudflare **Web Analytics → Add a site** 添加 `yipei-portfolio.github.io`，采用手动安装脚本，不需要迁移 DNS。
2. 从该网站的安装代码中取出 32 位 `token`，保存到 GitHub 仓库 Actions variable `CLOUDFLARE_ANALYTICS_TOKEN`。这是可公开的网站标识，**不要使用账号 API Token、密码或 Global API Key**。
3. 重新运行 **Deploy portfolio to GitHub Pages**，并在 Cloudflare 面板验证实际访问记录。
4. 未配置标识时不加载统计；删除该 variable 后重新部署即可停用。不要只删除 variable 而遗漏重新部署。

官方说明：[安装方法](https://developers.cloudflare.com/web-analytics/get-started/)、[统计口径](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/)、[隐私与数据处理](https://developers.cloudflare.com/speed/observatory/rum-beacon/)。
