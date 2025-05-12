import { toast } from '@/hooks/use-toast';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UseFormSetError } from 'react-hook-form';
import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';
import envConfig from '@/config';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload } from '@/types/jwt.type';
import authApiRequest from '@/apiRequest/auth.api';
import Cookies from 'js-cookie';

const isClient = typeof window !== 'undefined';

// Constants
const TOKEN_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
} as const;

// Utility functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    return jwtDecode(token) as TokenPayload;
  } catch (err) {
    console.error('Error decoding token:', err);
    return null;
  }
};

// Token management functions
export const getAccessToken = (): string | null => {
  if (!isClient) return null;
  return (
    localStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN) ||
    Cookies.get(TOKEN_KEYS.ACCESS_TOKEN) ||
    null
  );
};

export const getRefreshToken = (): string | null => {
  if (!isClient) return null;
  return (
    localStorage.getItem(TOKEN_KEYS.REFRESH_TOKEN) ||
    Cookies.get(TOKEN_KEYS.REFRESH_TOKEN) ||
    null
  );
};

export const setAccessToken = (token: string) => {
  if (!isClient) return;

  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      throw new Error('Invalid access token');
    }

    localStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, token);
    Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, token, {
      ...COOKIE_OPTIONS,
      expires: new Date(decodedToken.exp * 1000),
    });
  } catch (error) {
    console.error('Error setting access token:', error);
    removeTokens();
  }
};

export const setRefreshToken = (token: string) => {
  if (!isClient) return;

  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      throw new Error('Invalid refresh token');
    }

    localStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, token);
    Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, token, {
      ...COOKIE_OPTIONS,
      expires: new Date(decodedToken.exp * 1000),
    });
  } catch (error) {
    console.error('Error setting refresh token:', error);
    removeTokens();
  }
};

export const removeTokens = () => {
  if (!isClient) return;

  localStorage.removeItem(TOKEN_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(TOKEN_KEYS.REFRESH_TOKEN);
  Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
  Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken = decodeToken(token);
    if (!decodedToken) return true;

    const now = Math.round(Date.now() / 1000);
    return decodedToken.exp <= now;
  } catch {
    return true;
  }
};

export const checkAndRefreshToken = async (param?: {
  onError?: () => void;
  onSuccess?: () => void;
  force?: boolean;
}) => {
  const access_token = getAccessToken();
  const refresh_token = getRefreshToken();

  if (!access_token || !refresh_token) {
    console.warn('No tokens found for authentication');
    param?.onError?.();
    return;
  }

  const decodedAccessToken = decodeToken(access_token);
  const decodedRefreshToken = decodeToken(refresh_token);

  if (!decodedAccessToken || !decodedRefreshToken) {
    console.warn('Invalid tokens');
    removeTokens();
    param?.onError?.();
    return;
  }

  const now = Math.round(Date.now() / 1000);

  // Check if refresh token is expired
  if (decodedRefreshToken.exp <= now) {
    console.warn('Refresh token has expired');
    removeTokens();
    param?.onError?.();
    return;
  }

  // Check if access token needs refresh
  const shouldRefresh =
    param?.force ||
    decodedAccessToken.exp - now <
      (decodedAccessToken.exp - decodedAccessToken.iat) / 3;

  if (shouldRefresh) {
    try {
      const { payload } = await authApiRequest.refreshToken({
        refresh_token,
      });

      const { access_token: newAccessToken, refresh_token: newRefreshToken } =
        payload.data;

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      param?.onSuccess?.();
    } catch (error) {
      console.error('Error refreshing token:', error);
      removeTokens();
      param?.onError?.();
    }
  }
};

// Error handling
export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error?.payload?.errors && setError) {
    Object.entries(error.payload.errors).forEach(
      ([field, errorDetail]: [string, any]) => {
        setError(field, {
          type: 'server',
          message: errorDetail.msg,
        });
      }
    );
  } else {
    toast({
      title: 'Error',
      description: error?.payload?.message ?? 'Unknown error occurred',
      variant: 'destructive',
      duration: duration ?? 5000,
    });
  }
};

export const normalizePath = (path: string) => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const encryptData = (data: string): string => {
  return AES.encrypt(data, `${envConfig?.NEXT_PUBLIC_SECRET_KEY}`).toString();
};

export const decryptData = (encryptedData: string): string => {
  try {
    const bytes = AES.decrypt(
      encryptedData,
      `${envConfig?.NEXT_PUBLIC_SECRET_KEY}`
    );
    return bytes.toString(Utf8);
  } catch (error) {
    console.error('Lỗi khi giải mã:', error);
    return '';
  }
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });
};
