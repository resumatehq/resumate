import { decodeToken } from '@/lib/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const access_token = request.cookies.get('access_token');
  const refresh_token = request.cookies.get('refresh_token');

  // 1. Nếu người dùng chưa đăng nhập (không có access token và refresh token)
  if (!access_token && !refresh_token) {
    // Nếu họ cố truy cập vào /app, chuyển hướng về trang chủ /auth/login
    if (pathname.startsWith('/app')) {
      const redirectUrl = new URL('auth/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Cho phép truy cập tiếp tục nếu ở trang chủ /
    return NextResponse.next();
  }

  // 2. Nếu người dùng đã đăng nhập (có access token và refresh token)
  // Kiểm tra xem access token còn hạn không
  if (access_token && refresh_token) {
    const decodedAccessToken = decodeToken(
      typeof access_token === 'string' ? access_token : access_token?.value
    );
    const decodedRefreshToken = decodeToken(
      typeof refresh_token === 'string' ? refresh_token : refresh_token?.value
    );

    const now = Math.round(new Date().getTime() / 1000);

    // Nếu access token hết hạn
    if (decodedAccessToken && decodedAccessToken.exp <= now) {
      // Kiểm tra xem refresh token còn hạn không
      if (decodedRefreshToken && decodedRefreshToken.exp <= now) {
        // Nếu cả access token và refresh token đều hết hạn
        // Chuyển hướng về trang login
        const redirectUrl = new URL('auth/login', request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Nếu chỉ access token hết hạn, ta có thể gọi API refresh token (hoặc chuyển hướng về trang refresh)
      const refreshUrl = new URL('/refresh-token', request.url);
      return NextResponse.redirect(refreshUrl);
    }

    // 3. Nếu access token còn hạn
    // Cho phép truy cập tiếp tục
    // Nếu người dùng cố truy cập vào trang login hoặc trang chủ, chuyển hướng về trang dashboard
    if (pathname === 'auth/login') {
      const redirectUrl = new URL('/app', request.url);
      return NextResponse.redirect(redirectUrl);
    }
    // Cho phép truy cập tiếp tục nếu ở trang dashboard
    return NextResponse.next();
  }

  // Cho phép truy cập tiếp tục nếu không phải trường hợp nào ở trên
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/app', '/auth/login', '/refresh-token'],
};
