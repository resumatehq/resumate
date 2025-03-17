import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconFidgetSpinner } from "@tabler/icons-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useState } from "react";
import { IconArrowLeft } from "@tabler/icons-react";
import {
  ForgotPasswordEmailBody,
  ForgotPasswordEmailBodyType,
  ForgotPasswordOtpBody,
  ForgotPasswordOtpBodyType,
  ForgotPasswordResetBody,
  ForgotPasswordResetBodyType,
} from "@/schemas/auth.schema";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  // Email form
  const emailForm = useForm<ForgotPasswordEmailBodyType>({
    resolver: zodResolver(ForgotPasswordEmailBody),
    defaultValues: {
      email: "",
    },
  });

  // OTP form
  const otpForm = useForm<ForgotPasswordOtpBodyType>({
    resolver: zodResolver(ForgotPasswordOtpBody),
    defaultValues: {
      otp: "",
    },
  });

  // Reset password form
  const resetPasswordForm = useForm<ForgotPasswordResetBodyType>({
    resolver: zodResolver(ForgotPasswordResetBody),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onEmailSubmit(data: ForgotPasswordEmailBodyType) {
    setIsLoading(true);
    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmail(data.email);
      setCurrentStep("otp");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onOtpSubmit(data: ForgotPasswordOtpBodyType) {
    setIsLoading(true);
    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCurrentStep("reset");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function onResetPasswordSubmit(data: ForgotPasswordResetBodyType) {
    setIsLoading(true);
    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // After successful password reset, redirect or show success message
      window.location.href = "/auth/login?reset=success";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]">
      <div className="p-8 pb-6">
        <div>
          <Link href="/" aria-label="go home">
            <Logo />
          </Link>
          <h1 className="mb-1 mt-4 text-xl font-semibold">
            {currentStep === "email" && "Forgot Password"}
            {currentStep === "otp" && "Verify Your Email"}
            {currentStep === "reset" && "Reset Your Password"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentStep === "email" &&
              "We'll send you a code to reset your password"}
            {currentStep === "otp" && `Enter the code sent to ${email}`}
            {currentStep === "reset" &&
              "Create a new password for your account"}
          </p>
        </div>

        {currentStep === "email" && (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit(onEmailSubmit)}
              className="space-y-4 mt-6"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <IconFidgetSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Sending code...
                  </>
                ) : (
                  "Send Reset Code"
                )}
              </Button>
            </form>
          </Form>
        )}

        {currentStep === "otp" && (
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onOtpSubmit)}
              className="space-y-4 mt-6"
            >
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <div className="flex flex-col space-y-2 justify-center items-center text-center">
                      <FormControl className="flex items-center justify-center">
                        <InputOTP
                          maxLength={8}
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                            <InputOTPSlot index={6} />
                            <InputOTPSlot index={7} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </div>
                    <FormDescription>
                      Enter the 6-digit code sent to your email
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <IconFidgetSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <Button
                type="button"
                variant="link"
                className="w-full p-0"
                onClick={() => setCurrentStep("email")}
              >
                Back to email
              </Button>

              <Button
                type="button"
                variant="link"
                className="w-full p-0"
                onClick={() => {
                  // Resend code logic
                  emailForm.handleSubmit(async (data) => {
                    setIsLoading(true);
                    try {
                      // Simulate API call to resend code
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                    } catch (error) {
                      console.error(error);
                    } finally {
                      setIsLoading(false);
                    }
                  })();
                }}
                disabled={isLoading}
              >
                Didn't receive a code? Resend
              </Button>
            </form>
          </Form>
        )}

        {currentStep === "reset" && (
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)}
              className="space-y-4 mt-6"
            >
              <FormField
                control={resetPasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={resetPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <IconFidgetSpinner className="mr-2 h-4 w-4 animate-spin" />
                    Resetting password...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>

      <div className="bg-muted rounded-(--radius) border p-3">
        <p className="text-accent-foreground text-center text-sm">
          Remember your password?
          <Button asChild variant="link" className="px-2">
            <Link href="/auth/login">Login</Link>
          </Button>
        </p>
      </div>
    </div>
  );
}
