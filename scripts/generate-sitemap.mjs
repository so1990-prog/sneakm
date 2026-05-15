import { readdirSync, statSync, writeFileSync } from 'fs'
import { join } from 'path'

const SITE = 'https://www.sagacity.bz'
const DIST = './dist'

function findPages(dir, pages = []) {
  for (const file of readdirSync(dir)) {
    const fullPath = join(dir, file)
    if (statSync(fullPath).isDirectory()) {
      findPages(fullPath, pages)
    } else if (file === 'index.html') {
      const urlPath = fullPath.replace(DIST, '').replace('/index.html', '') || '/'
      pages.push(urlPath)
    }
  }
  return pages
}

const pages = findPages(DIST)
const urls = pages.map(p => `${SITE}${p === '' ? '' : p}/`.replace(/\/\/$/, '/'))

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`

writeFileSync(join(DIST, 'sitemap-0.xml'), sitemap)

const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE}/sitemap-0.xml</loc></sitemap>
</sitemapindex>`

writeFileSync(join(DIST, 'sitemap-index.xml'), index)
console.log(`Sitemap generated: ${urls.length} URLs`)
