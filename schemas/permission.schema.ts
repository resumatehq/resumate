import { z } from 'zod';

export const PermissionsSchema = z.object({
  maxResumes: z.number(),
  maxCustomSections: z.number(),
  allowedSections: z.array(z.string()),
  allowedFeatures: z.array(z.string()),
  allowedExportFormats: z.array(z.string()),
  aiRequests: z.object({
    maxPerDay: z.number(),
    maxPerMonth: z.number(),
    usedToday: z.number(),
    usedThisMonth: z.number(),
    lastResetDay: z.string(),
    lastResetMonth: z.string(),
  }),
});

export type PermissionsType = z.TypeOf<typeof PermissionsSchema>;
