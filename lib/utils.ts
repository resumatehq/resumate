// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }
import { toast } from '@/components/ui/use-toast';
import { EntityError } from '@/lib/http';
import { type ClassValue, clsx } from 'clsx';
import { UseFormSetError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import jwt from 'jsonwebtoken';

/**
 * Combine Tailwind CSS classes conditionally.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalize route path (remove leading slash if exists).
 */
export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

/**
 * Decode JWT token into its payload.
 */
export const decodeJWT = <Payload = any>(token: string) => {
  return jwt.decode(token) as Payload;
};

/**
 * Format ISO date string into readable format.
 */
export const formatDate = (isoDate: string) => {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Handle server validation errors and map to form fields.
 */
export const handleFormError = (
  error: EntityError,
  setError: UseFormSetError<any>
) => {
  const fieldErrors = error.payload;
  Object.entries(fieldErrors).forEach(([field, messages]) => {
    const message = Array.isArray(messages) ? messages[0] : messages;
    setError(field as any, { message });
  });

  toast({
    variant: 'destructive',
    title: 'Đã xảy ra lỗi!',
    description: error.message || 'Vui lòng kiểm tra lại thông tin.',
  });
};
