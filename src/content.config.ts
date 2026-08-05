import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const modules = [
  'ROOT',
  'A1', 'A2', 'A3', 'A4',
  'B1', 'B2', 'B3', 'B4',
  'C1', 'C2', 'C3', 'C4',
] as const;

const articles = defineCollection({
  loader: glob({ base: './src/content/articles', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(20),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    trilogy: z.enum(['asset', 'startup', 'os', 'cross']),
    module: z.enum(modules),
    theme: z.enum([
      'ai-future',
      'irreplaceable',
      'category',
      'good-business',
      'founder-system',
      'cases',
    ]),
    articleType: z.enum(['insight', 'canon', 'case', 'tool', 'library']),
    userSymptoms: z.array(z.string()).default([]),
    expensiveJob: z.string().min(1),
    coreConcepts: z.array(z.string()).default([]),
    evidenceLevel: z.enum(['hypothesis', 'derived', 'verified', 'canon']),
    canonStatus: z.enum(['public_projection', 'canon_aligned', 'canon_candidate']),
    featured: z.boolean().default(false),
    readingMinutes: z.number().int().positive(),
    nextAction: z.object({
      label: z.string(),
      href: z.string(),
    }).optional(),
  }),
});

export const collections = { articles };
