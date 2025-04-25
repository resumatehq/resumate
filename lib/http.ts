import envConfig from '@/config/env';
import { normalizePath } from '@/lib/utils';
import { LoginResType } from '@/schemas/auth.schema';
import { redirect } from 'next/navigation';

type CustomOptions = Omit<RequestInit, 'method'> & {
  baseUrl?: string | undefined;
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: { [key: string]: any };
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

let clientLogoutRequest: null | Promise<any> = null;
export const isClient = () => typeof window !== 'undefined';
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions
) => {
  let body: FormData | string | undefined = undefined;

  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }

  const baseHeaders: Record<string, string> =
    body instanceof FormData
      ? {}
      : {
          'Content-Type': 'application/json',
        };

  if (isClient()) {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      baseHeaders.Authorization = `Bearer ${sessionToken}`;
    }
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    } as any,
    body,
    method,
  });

  const payload = await res.json();

  // Nếu lỗi, xử lý và ném lỗi phù hợp
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      // 422 - Validation Error
      const error = new EntityError({
        status: 422,
        payload,
      });
      console.error('Validation Error:', error.payload.errors);
      throw error;
    }

    if (res.status === AUTHENTICATION_ERROR_STATUS) {
      // 401 - Unauthorized
      if (isClient()) {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch('/api/auth/logout', {
            method: 'POST',
            body: JSON.stringify({ force: true }),
            headers: { ...baseHeaders },
          });

          try {
            await clientLogoutRequest;
          } catch (error) {
            console.error('Logout error:', error);
          } finally {
            localStorage.removeItem('sessionToken');
            clientLogoutRequest = null;
            location.href = '/login';
          }
        }
      } else {
        const sessionToken = (options?.headers as any)?.Authorization?.split(
          'Bearer '
        )[1];
        redirect(`/logout?sessionToken=${sessionToken}`);
      }
      return;
    }

    // Các lỗi khác
    const error = new HttpError({ status: res.status, payload });
    console.error('HTTP Error:', error.payload.message);
    throw error;
  }

  // Lưu token khi đăng nhập hoặc đăng ký
  if (isClient()) {
    const normalizedPath = normalizePath(url);
    if (['auth/login', 'auth/register'].includes(normalizedPath)) {
      const { access_token } = (payload as LoginResType).data;
      localStorage.setItem('sessionToken', access_token);
    } else if ('auth/logout' === normalizedPath) {
      localStorage.removeItem('sessionToken');
    }
  }

  return {
    status: res.status,
    payload: payload as Response,
  };
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options });
  },
};

export default http;
