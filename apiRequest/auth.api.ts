import http from '@/lib/http';
import {
  LoginBodyType,
  LoginResType,
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
  SignUpBodyType,
  SignUpResType,
} from '@/schemas/auth.schema';

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,

  sSignup: (body: SignUpBodyType) =>
    http.post<SignUpResType>('auth/register', body),

  signup: (body: SignUpBodyType) =>
    http.post<SignUpResType>('auth/register', body),

  sLogin: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),

  login: (body: LoginBodyType) => http.post<LoginResType>('auth/login', body),

  sLogout: (
    body: LogoutBodyType & {
      access_token: string;
    }
  ) =>
    http.post(
      '/api/v1/auth/logout',
      {
        refresh_token: body.refresh_token,
      },
      {
        headers: {
          Authorization: `Bearer ${body.access_token}`,
        },
      }
    ),

  logout: () => http.post('/api/auth/logout', null, { baseUrl: '' }), // client gọi đến route handler, không cần truyền AT và RT vào body vì AT và RT tự  động gửi thông qua cookie rồi

  sRefreshToken: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>('/api/v1/auth/refresh-token', body),

  async refreshToken() {
    // Nếu refreshTokenRequest đã tồn tại thì trả về luôn, không gọi request mới
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }
    this.refreshTokenRequest = http
      .post<RefreshTokenResType>('/api/auth/refresh-token', null, {
        baseUrl: '',
      })
      .then((response) => {
        if (!response) {
          throw new Error('Failed to fetch refresh token');
        }
        return response;
      });
    const result = await this.refreshTokenRequest;
    this.refreshTokenRequest = null;
    return result;
  },

  setTokenToCookie: (body: { access_token: string; refresh_token: string }) =>
    http.post('/api/auth/token', body, { baseUrl: '' }),
};

export default authApiRequest;
