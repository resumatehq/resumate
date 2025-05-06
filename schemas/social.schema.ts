import { z } from 'zod';

export const SocialLinksSchema = z.object({
  linkedin: z.string(),
  github: z.string(),
  twitter: z.string(),
  website: z.string(),
});

export type SocialLinksType = z.TypeOf<typeof SocialLinksSchema>;
