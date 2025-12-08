import tools from '../data/tools.json';

// 1. Define your live domain here
const SITE_URL = 'https://www.facelessstacks.com';

export async function GET() {
  // 2. Start with your static pages
  const pages = [
    { url: '', changefreq: 'daily', priority: 1.0 },          // Homepage
    { url: '/blog', changefreq: 'daily', priority: 0.8 },     // Blog Index
  ];

  // 3. Automatically add all TOOLS from your JSON
  tools.forEach((tool) => {
    pages.push({
      url: `/tool/${tool.id}`,
      changefreq: 'weekly',
      priority: 0.9,
    });
  });

  // 4. Automatically add all BLOG POSTS
  // This finds all .md files in your blog folder
  const blogFiles = import.meta.glob('./blog/*.md');
  
  for (const path in blogFiles) {
    // Extract slug from path (e.g., "./blog/my-post.md" -> "my-post")
    const slug = path.split('/').pop().replace('.md', '');
    pages.push({
      url: `/blog/${slug}`,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  // 5. Generate the XML
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map((page) => `
        <url>
          <loc>${SITE_URL}${page.url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>
  `.trim();

  // 6. Return the file
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}