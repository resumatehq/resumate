import envConfig from '@/config';
import {
  getAccessToken,
  normalizePath,
  removeTokens,
  setAccessToken,
  setRefreshToken,
} from '@/lib/utils';
import { LoginResType } from '@/schemas/auth.schema';
import { ErrorPayload } from '@/types/error.type';
import Cookies from 'js-cookie';

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
  payload: ErrorPayload;
  constructor({
    status,
    payload,
    message,
  }: {
    status: number;
    payload: any;
    message?: string;
  }) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: typeof ENTITY_ERROR_STATUS;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: typeof ENTITY_ERROR_STATUS;
    payload: any;
  }) {
    super({ status, payload, message: payload.message || 'Lỗi thực thể' });
    this.status = status;
    this.payload = {
      message: payload.message || 'Lỗi thực thể',
      errors: payload.errors || {},
    };
  }
}

let clientLogoutRequest: null | Promise<any> = null;

const isClient = typeof window !== 'undefined';
const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: CustomOptions | undefined
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

  const access_token = isClient
    ? getAccessToken()
    : Cookies.get('access_token');

  if (access_token) {
    baseHeaders.Authorization = `Bearer ${access_token}`;
  }

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers: {
        ...baseHeaders,
        ...options?.headers,
      } as any,
      body,
      method,
    });

    let payload: any = null;
    const contentType = res.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      payload = await res.json();
    } else {
      payload = await res.text();
    }

    const data = {
      status: res.status,
      payload,
    };

    if (!res.ok) {
      if (res.status === ENTITY_ERROR_STATUS) {
        throw new EntityError({
          status: ENTITY_ERROR_STATUS,
          payload: payload,
        });
      } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
        if (isClient) {
          if (!clientLogoutRequest) {
            clientLogoutRequest = fetch('auth/logout', {
              method: 'POST',
              body: null,
              headers: { ...baseHeaders },
            });

            try {
              await clientLogoutRequest;
            } catch (error) {
              console.error('Lỗi khi logout:', error);
            } finally {
              removeTokens();
              clientLogoutRequest = null;
              location.href = '/auth/login';
            }
          }
        } else {
          Cookies.set('access_token', '', { path: '/', expires: new Date(0) });
          Cookies.set('refresh_token', '', { path: '/', expires: new Date(0) });
          if (isClient) {
            location.href = '/auth/login';
          }
        }
      } else {
        console.error(
          `Lỗi HTTP: ${res.status}`,
          typeof payload === 'object' ? payload : { message: payload }
        );

        throw new HttpError({
          status: res.status,
          payload:
            typeof payload === 'object'
              ? payload
              : { message: payload || 'Đã có lỗi xảy ra' },
        });
      }
    }

    // Lưu token khi cần
    if (isClient) {
      const normalizeUrl = normalizePath(url);
      if (
        ['auth/login', 'auth/refresh-token', 'auth/token'].includes(
          normalizeUrl
        )
      ) {
        const { access_token, refresh_token } = (payload as any).data;
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
      } else if (normalizeUrl === 'auth/logout') {
        removeTokens();
      }
    }

    return data;
  } catch (error: any) {
    if (error instanceof HttpError || error instanceof EntityError) {
      throw error;
    }

    console.error('Lỗi mạng hoặc không xác định:', error);

    throw new HttpError({
      status: 500,
      payload: {
        message: 'Lỗi mạng hoặc không xác định. Vui lòng thử lại sau.',
      },
    });
  }
};

// const request = async <Response>(
//   method: 'GET' | 'POST' | 'PUT' | 'DELETE',
//   url: string,
//   options?: CustomOptions | undefined
// ) => {
//   let body: FormData | string | undefined = undefined;
//   if (options?.body instanceof FormData) {
//     body = options.body;
//   } else if (options?.body) {
//     body = JSON.stringify(options.body);
//   }
//   const baseHeaders: {
//     [key: string]: string;
//   } =
//     body instanceof FormData
//       ? {}
//       : {
//           'Content-Type': 'application/json',
//         };

//   // Xử lý access_token từ localStorage hoặc từ cookie (server-side)
//   if (isClient) {
//     const access_token = getAccessToken();
//     if (access_token) {
//       baseHeaders.Authorization = `Bearer ${access_token}`;
//     }
//   } else {
//     const access_token = Cookies.get('access_token')?.valueOf;
//     if (access_token) {
//       baseHeaders.Authorization = `Bearer ${access_token}`;
//     }
//   }
//   // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
//   // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

//   const baseUrl =
//     options?.baseUrl === undefined
//       ? envConfig.NEXT_PUBLIC_API_ENDPOINT
//       : options.baseUrl;

//   const fullUrl = `${baseUrl}/${normalizePath(url)}`;

//   const res = await fetch(fullUrl, {
//     ...options,
//     headers: {
//       ...baseHeaders,
//       ...options?.headers,
//     } as any,
//     body,
//     method,
//   });

//   const payload: Response = await res.json();
//   const data = {
//     status: res.status,
//     payload,
//   };

//   // Interceptor là nời chúng ta xử lý request và response [các trường hợp lỗi từ phía server (Entity và Authentication)] trước khi trả về cho phía component
//   if (!res.ok) {
//     if (res.status === ENTITY_ERROR_STATUS) {
//       throw new EntityError({
//         status: ENTITY_ERROR_STATUS,
//         payload: data.payload,
//       });
//     } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
//       // Xử lý đăng xuất và điều hướng khi bị lỗi xác thực
//       if (isClient) {
//         // const locale = Cookies.get('NEXT_LOCALE');
//         if (!clientLogoutRequest) {
//           // Đảm bảo rằng chỉ có 1 request logout được gửi đi
//           clientLogoutRequest = fetch('auth/logout', {
//             method: 'POST',
//             body: null, // Logout mình sẽ cho phép luôn luôn thành công
//             headers: {
//               ...baseHeaders,
//             } as any,
//           });
//           try {
//             await clientLogoutRequest;
//           } catch (error) {
//             console.error('Error during logout:', error);
//           } finally {
//             removeTokens();
//             clientLogoutRequest = null;
//             // Redirect về trang login có thể dẫn đến loop vô hạn
//             // Nếu không không được xử lý đúng cách
//             // Vì nếu rơi vào trường hợp tại trang Login, chúng ta có gọi các API cần access token
//             // Mà access token đã bị xóa thì nó lại nhảy vào đây, và cứ thế nó sẽ bị lặp
//             location.href = `/auth/login`;
//           }
//         }
//       } else {
//         // Đây là trường hợp khi mà chúng ta vẫn còn access token (còn hạn)
//         // Và chúng ta gọi API ở Next.js Server (Route Handler , Server Component) đến Server Backend
//         // const access_token = (options?.headers as any)?.Authorization.split('Bearer ')[1]
//         // redirect(`/login?accessToken=${access_token}`)
//         Cookies.set('access_token', '', { path: '/', expires: new Date(0) });
//         Cookies.set('refresh_token', '', { path: '/', expires: new Date(0) });
//         if (isClient) {
//           window.location.href = '/auth/login';
//         }
//       }
//     } else {
//       throw new HttpError(data);
//     }
//   }

//   // Lưu lại token sau khi đăng nhập hoặc làm mới token
//   if (isClient) {
//     const normalizeUrl = normalizePath(url);
//     // Xử lý khi đăng nhập
//     if ('auth/login' === normalizeUrl) {
//       const { access_token, refresh_token } = (payload as LoginResType).data;
//       setAccessToken(access_token);
//       setRefreshToken(refresh_token);
//     }
//     // Xử lý khi làm mới token (làm mới access_token và refresh_token)
//     else if ('auth/refresh-token' === normalizeUrl) {
//       const { access_token, refresh_token } = payload as {
//         access_token: string;
//         refresh_token: string;
//       };
//       setAccessToken(access_token);
//       setRefreshToken(refresh_token);
//     } else if ('auth/token' === normalizeUrl) {
//       const { access_token, refresh_token } = payload as {
//         access_token: string;
//         refresh_token: string;
//       };
//       setAccessToken(access_token);
//       setRefreshToken(refresh_token);
//     }
//     // Xử lý khi đăng xuất
//     else if ('auth/logout' === normalizeUrl) {
//       removeTokens();
//     }
//   }
//   return data;
// };

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
