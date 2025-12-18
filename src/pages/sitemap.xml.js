import tools from "@data/tools.json";

export async function GET({ site }) {
  // Normalize base URL (remove trailing slash)
  const baseUrl = (site?.href || "http://localhost:4321").replace(/\/$/, "");

  const urls = new Set();

  // Homepage
  urls.add(`${baseUrl}/`);

  // Tool pages
  tools.forEach(tool => {
    if (tool.slug) {
      urls.add(`${baseUrl}/tools/${tool.slug}`);
    }
  });

  // Use-case pages
  tools.forEach(tool => {
    tool.useCases?.forEach(u => {
      urls.add(`${baseUrl}/use-case/${u}`);
    });
  });

  // Platform pages
  tools.forEach(tool => {
    tool.platforms?.forEach(p => {
      urls.add(`${baseUrl}/platform/${p}`);
    });
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...urls].map(url => `
  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  });
}
