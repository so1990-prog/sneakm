import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum(['newbalance', 'shoes', 'bag', 'apparel', 'favorite', 'gadget']),
    type: z.enum(['site', 'note']).default('site'),
    excerpt: z.string().optional(),
    cover: image().optional(),
    coverAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // 商品紹介記事用
    product: z.object({
      price: z.number().optional(),
      status: z.enum(['sale', 'sold', 'affiliate']).optional(),
      buyUrl: z.string().optional(),
    }).optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { posts }
