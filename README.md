# SNEAKm — Astro サイト

ニューバランスとライフスタイルをテーマにした個人アーカイブサイト。
WordPress から Astro へ移行したもの。

---

## セットアップ

```bash
npm install
npm run dev      # localhost:4321
npm run build    # dist/ に静的出力
npm run preview  # ビルド確認
```

---

## ディレクトリ構成

```
src/
├── components/
│   ├── Header.astro       # ハンバーガーメニュー付きヘッダー
│   ├── Footer.astro
│   ├── GalleryGrid.astro  # トップのモザイクギャラリー（最新6件）
│   ├── ArticleCard.astro  # 記事カード（SITE / NOTE 両対応）
│   └── ProductCard.astro  # 商品紹介カード（横スクロール用）
├── layouts/
│   ├── BaseLayout.astro   # 全ページ共通レイアウト（head / header / footer）
│   └── PostLayout.astro   # 記事ページ用レイアウト
├── pages/
│   ├── index.astro              # トップページ
│   ├── [slug].astro             # 個別記事ページ
│   └── category/[category].astro # カテゴリーページ
├── content/
│   ├── config.ts          # Content Collections スキーマ定義
│   └── posts/             # Markdown 記事ファイル置き場
│       ├── nb-m2001-usa.md
│       ├── nb-boom-over.md
│       └── porter-tanker-camera.md
└── styles/
    └── global.css         # デザイントークン・リセット・共通スタイル
```

---

## デザイントークン（global.css）

| 変数 | 値 | 用途 |
|---|---|---|
| `--cream` | `#fdfaf5` | 背景色 |
| `--ink` | `#1c1208` | メインテキスト・ボーダー |
| `--rust` | `#c85c1a` | NOTE タグ・アクセント |
| `--muted` | `rgba(28,18,8,0.42)` | サブテキスト |
| `--border` | `rgba(28,18,8,0.14)` | 薄いボーダー |
| `--font-serif` | Shippori Mincho | 本文・見出し |
| `--font-sans` | ui-sans-serif | ラベル・UI |
| `--font-display` | Bebas Neue | 大きな数字 |

---

## Content Collections スキーマ（config.ts）

記事 Markdown の frontmatter で指定できるフィールド：

```yaml
---
title: '記事タイトル'
date: 2025-04-18          # 必須
updatedDate: 2025-05-01   # 任意
category: newbalance      # newbalance / shoes / bag / apparel / favorite / gadget
type: site                # site（サイト記事） / note（noteエッセイ）
excerpt: '一言説明'        # カード・OGP に使用
cover: ./images/hero.jpg  # アイキャッチ画像（src/content/posts/ からの相対パス）
coverAlt: '画像の説明'
tags: ['NewBalance', 'USA製']
draft: false              # true にすると非公開
# 商品紹介記事の場合のみ
product:
  price: 28600
  status: sale            # sale / sold / affiliate
  buyUrl: 'https://...'
---
```

---

## 今後やること（Claude Code で続ける）

- [ ] `public/images/logo.png` にロゴ画像を配置
- [ ] WordPress からの記事を `src/content/posts/` に移行（MDに変換）
- [ ] 画像を `src/content/posts/images/` に配置して frontmatter の `cover` に指定
- [ ] Vercel / Cloudflare Pages にデプロイ
- [ ] `astro.config.mjs` の `site` を本番URLに変更
- [ ] OGP デフォルト画像を `public/images/og-default.jpg` に配置
- [ ] RSS フィード追加（`@astrojs/rss`）
- [ ] 検索機能（pagefind など）
- [ ] アバウトページ（`src/pages/about.astro`）

---

## WordPress からの移行メモ

既存 URL 構造 → Astro のスラッグ対応：

| WordPress URL | Astro |
|---|---|
| `/m2001-review/` | `/nb-m2001-usa` |
| `/category/newbalance22/` | `/category/newbalance` |

リダイレクトは Vercel の `vercel.json` か Cloudflare の `_redirects` で対応。
