import { z } from 'zod';

export const AnalyticsSchema = z.object({
  resumesCreated: z.number(),
  lastActive: z.string(),
});

export type AnalyticsType = z.TypeOf<typeof AnalyticsSchema>;
