import z from 'zod';

export const MessageRes = z
  .object({
    message: z.string(),
    errors: z.record(
      z.string(), // key lỗi
      z.object({
        type: z.string(),
        value: z.any(),
        msg: z.string(),
        path: z.string(),
        location: z.string(),
      })
    ),
  })
  .strict();

export type MessageResType = z.TypeOf<typeof MessageRes>;
