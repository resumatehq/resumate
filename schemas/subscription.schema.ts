import { z } from 'zod';

export const SubscriptionSchema = z.object({
  plan: z.string(),
  status: z.string(),
  startDate: z.string(),
  expiryDate: z.string(),
  endDate: z.string(),
  trialEndsAt: z.string(),
  autoRenew: z.boolean(),
  paymentProvider: z.string().nullable(),
});

export type SubscriptionType = z.TypeOf<typeof SubscriptionSchema>;
