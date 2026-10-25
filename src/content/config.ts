import { z, defineCollection } from 'astro:content';

const diariesCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    date: z.union([z.string(), z.date()]).transform(d => typeof d === 'string' ? d : d.toISOString().split('T')[0]),
    title: z.union([z.string(), z.date()]).transform(t => typeof t === 'string' ? t : '').optional(),
    titleEn: z.string().optional(),
    summary: z.string().optional(),
    summaryEn: z.string().optional(),
    category: z.string().nullable().optional().transform(c => c || ''),
    categoryEn: z.string().optional(),
    dayNum: z.number().optional(),
  }),
});

const articlesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.union([z.string(), z.null()]).transform(s => s || ''),
    date: z.union([z.string(), z.date()]).transform(d => typeof d === 'string' ? d : d.toISOString().split('T')[0]),
    tag: z.union([z.string(), z.null()]).transform(t => t || ''),
    author: z.union([z.string(), z.null()]).transform(a => a || '吴总'),
    summary: z.union([z.string(), z.null()]).transform(s => s || ''),
  }),
});

export const collections = {
  'diaries': diariesCollection,
  'articles': articlesCollection,
};
