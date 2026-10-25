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

export const collections = {
  'diaries': diariesCollection,
};
