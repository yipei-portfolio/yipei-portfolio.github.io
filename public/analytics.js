// Keep preview visits and visitors' privacy opt-outs out of the statistics.
const analyticsTag = document.querySelector("script[data-portfolio-analytics]");
const analyticsToken = analyticsTag?.getAttribute("data-portfolio-analytics") ?? "";
const productionHost = window.location.hostname === "yipei-portfolio.github.io";
const optedOut = navigator.doNotTrack === "1"
  || navigator.globalPrivacyControl === true
  || new URLSearchParams(window.location.search).get("analytics") === "off";

if (productionHost && !optedOut && /^[a-f0-9]{32}$/i.test(analyticsToken)
  && !document.getElementById("portfolio-cloudflare-beacon")) {
  const beacon = document.createElement("script");
  beacon.id = "portfolio-cloudflare-beacon";
  beacon.type = "module";
  beacon.src = `https://static.cloudflareinsights.com/beacon.min.js?token=${analyticsToken}`;
  beacon.setAttribute("data-cf-beacon", JSON.stringify({ token: analyticsToken }));
  document.head.appendChild(beacon);
}
