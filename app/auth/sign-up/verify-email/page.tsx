"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import http from "@/lib/http";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  // Extract token from URL query parameter
  const token = searchParams.get("token");

  // Verify the email token on page load if it exists
  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  // Function to send token to backend API
  const verifyEmail = async (token: string) => {
    setIsVerifying(true);
    setVerificationStatus("idle");
    try {
      await http.post("auth/verify-email", { token });
      setVerificationStatus("success");
      toast({
        title: "Email verified successfully",
        description: "Your account has been verified. You can now log in.",
        variant: "default",
      });
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error: any) {
      setVerificationStatus("error");
      setErrorMessage(
        error.message ||
          "Failed to verify your email. Please try again or request a new verification email."
      );
      toast({
        title: "Verification failed",
        description: error.message || "Failed to verify your email.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Function to resend verification email
  const resendVerificationEmail = async (data: { email: string }) => {
    try {
      await http.post("auth/resend-verification-email", { email: data.email });
      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
        variant: "default",
      });
    } catch (error: any) {
      toast({
        title: "Failed to resend email",
        description:
          error.message ||
          "An error occurred while sending the verification email.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Email Verification
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {token
              ? "Verifying your email address..."
              : "Resend verification email if needed"}
          </p>
        </div>

        {/* Verification Status */}
        {isVerifying && (
          <div className="text-center py-4">
            <p className="text-gray-600">Verifying your email address...</p>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="rounded-md bg-green-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Email verified successfully
                </h3>
                <div className="mt-2 text-sm text-green-700">
                  <p>You will be redirected to the login page shortly.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Verification failed
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{errorMessage}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resend Verification Form */}
        <div className="mt-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(resendVerificationEmail)}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Resend Verification Email"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
