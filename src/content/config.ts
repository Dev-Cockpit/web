import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    author: z.string().default('Dev Cockpit Team'),
    category: z.enum(['Announcement', 'Tutorial', 'Engineering', 'Update', 'Tips']),
    tags: z.array(z.string()),
    excerpt: z.string(),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    readTime: z.string(),
  }),
});

export const collections = {
  blog: blogCollection,
};