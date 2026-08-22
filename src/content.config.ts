import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const retailer = z.object({
  name: z.string(),
  url: z.string(),
});

const kit = z.object({
  type: z.enum(['form', 'landing']),
  id: z.string(),
  uid: z.string().optional(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    template: z.enum(['page', 'catalog', 'map', 'form']).default('page'),
    kit: kit.optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    series: z.enum([
      'starside-saga',
      'starside-tales',
      'scion-chronicles',
      'bigfoot-galaxy',
      'sal-van-sleen',
    ]),
    seriesName: z.string(),
    seriesOrder: z.number(),
    catalogOrder: z.number(),
    genres: z.array(z.string()).default([]),
    price: z.string().optional(),
    cover: z.string().optional(),
    retailers: z.array(retailer).default([]),
  }),
});

export const collections = { pages, books };
