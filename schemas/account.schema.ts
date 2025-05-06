import { z } from 'zod';
import { SubscriptionSchema } from './subscription.schema';
import { PermissionsSchema } from './permission.schema';
import { UsageSchema } from './usage.schema';
import { AnalyticsSchema } from './analytics.schema';
import { SocialLinksSchema } from './social.schema';

export const AccountSchema = z.object({
  _id: z.string(),
  username: z.string(),
  email: z.string(),
  date_of_birth: z.string(),
  tier: z.string(),
  subscription: SubscriptionSchema,
  permissions: PermissionsSchema,
  usage: UsageSchema,
  analytics: AnalyticsSchema,
  bio: z.string(),
  industry: z.string(),
  experience: z.string(),
  location: z.string(),
  phone: z.string(),
  social_links: SocialLinksSchema,
  googleId: z.string().nullable(),
  avatar_url: z.string().nullable(),
  verify: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  last_login_time: z.string(),
  status: z.string(),
});

export type AccountType = z.TypeOf<typeof AccountSchema>;

export const AccountRes = z
  .object({
    data: AccountSchema,
    message: z.string(),
  })
  .strict();

export type AccountResType = z.TypeOf<typeof AccountRes>;
