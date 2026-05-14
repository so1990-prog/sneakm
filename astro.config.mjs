import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'

export default defineConfig({
  site: 'https://www.sagacity.bz',
  integrations: [mdx(), sitemap()],
  output: 'static',
  image: {
    // 画像最適化の設定
    domains: ['www.sagacity.bz'],
  },
})
