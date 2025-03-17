import { AUTH_ERROR_MESSAGE } from '@/constants/error-validation-message'
import z from 'zod'

export const LoginBody = z
  .object({
    email: z.string().min(1, { message: AUTH_ERROR_MESSAGE.EMAIL_REQUIRED }).email({
      message: AUTH_ERROR_MESSAGE.EMAIL_INVALID
    }),
    password: z
      .string()
      .min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN })
      .max(100, { message: AUTH_ERROR_MESSAGE.PASSWORD_MAX })
  })
  .strict()

export type LoginBodyType = z.infer<typeof LoginBody>

export const LoginRes = z.object({
  message: z.string(),
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string()
  })
})

export type LoginResType = z.TypeOf<typeof LoginRes>

export const SignUpBody = z
  .object({
    name: z.string().min(1, { message: AUTH_ERROR_MESSAGE.NAME_REQUIRED }),
    email: z.string().email({ message: AUTH_ERROR_MESSAGE.EMAIL_INVALID }),
    password: z.string().min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN }),
  })
export type SignUpBodyType = z.infer<typeof SignUpBody>

export const SignUpRes = z.object({
  message: z.string(),
  data: z.object({
    access_token: z.string(),
    refresh_token: z.string()
  })
})

export type SignUpResType = z.TypeOf<typeof SignUpRes>

// Forgot password schemas
export const ForgotPasswordEmailBody = z.object({
  email: z.string().min(1, { message: AUTH_ERROR_MESSAGE.EMAIL_REQUIRED }).email({
    message: AUTH_ERROR_MESSAGE.EMAIL_INVALID
  }),
});
export type ForgotPasswordEmailBodyType = z.infer<typeof ForgotPasswordEmailBody>;

export const ForgotPasswordOtpBody = z.object({
  otp: z.string().min(8, { message: AUTH_ERROR_MESSAGE.OTP_MIN }),
});
export type ForgotPasswordOtpBodyType = z.infer<typeof ForgotPasswordOtpBody>;

export const ForgotPasswordResetBody = z.object({
  password: z.string()
    .min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN })
    .max(100, { message: AUTH_ERROR_MESSAGE.PASSWORD_MAX }),
  confirmPassword: z.string()
    .min(6, { message: AUTH_ERROR_MESSAGE.PASSWORD_MIN })
}).refine((data) => data.password === data.confirmPassword, {
  message: AUTH_ERROR_MESSAGE.PASSWORD_MATCH,
  path: ["confirmPassword"],
});
export type ForgotPasswordResetBodyType = z.infer<typeof ForgotPasswordResetBody>;