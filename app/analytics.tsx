import Script from "next/script";

export function Analytics() {
  // A public site identifier, never a Cloudflare account API key.
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN?.trim();
  if (!token || !/^[a-f0-9]{32}$/i.test(token)) return null;

  return (
    <Script
      id="portfolio-analytics-loader"
      src="/analytics.js"
      type="module"
      strategy="afterInteractive"
      data-portfolio-analytics={token}
    />
  );
}
