import { z } from 'zod';

export const UsageSchema = z.object({
  createdResumes: z.number(),
  aiRequestsCount: z.number(),
  exportsCount: z.object({
    pdf: z.number(),
    docx: z.number(),
    png: z.number(),
  }),
  lastResumeCreatedAt: z.string(),
});

export type UsageType = z.TypeOf<typeof UsageSchema>;
