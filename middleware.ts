import { decodeToken } from '@/lib/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const isAuthenticated = accessToken && refreshToken;

  // 1. Trường hợp người dùng CHƯA đăng nhập
  if (!isAuthenticated) {
    // Cho phép truy cập trang landing page và login
    if (pathname === '/auth/login') {
      return NextResponse.next();
    }

    // Nếu truy cập /app → redirect về /auth/login
    if (pathname.startsWith('/app')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Các route khác → cũng redirect về /auth/login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 2. Trường hợp người dùng ĐÃ đăng nhập
  const decodedAccessToken = decodeToken(accessToken);
  const decodedRefreshToken = decodeToken(refreshToken);

  const now = Math.floor(Date.now() / 1000);

  const isAccessTokenExpired =
    decodedAccessToken?.exp && decodedAccessToken.exp <= now;
  const isRefreshTokenExpired =
    decodedRefreshToken?.exp && decodedRefreshToken.exp <= now;

  // Nếu cả access và refresh token đều hết hạn → xóa cookies và redirect
  if (isAccessTokenExpired && isRefreshTokenExpired) {
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.set('access_token', '', {
      path: '/',
      expires: new Date(0),
    });
    response.cookies.set('refresh_token', '', {
      path: '/',
      expires: new Date(0),
    });
    return response;
  }

  // Nếu chỉ access token hết hạn → chuyển sang route /refresh-token
  if (isAccessTokenExpired && !isRefreshTokenExpired) {
    return NextResponse.redirect(new URL('/refresh-token', request.url));
  }

  // Nếu token còn hạn mà vào landing page hoặc login → redirect về /app
  if (pathname === '/' || pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/app', request.url));
  }

  // Cho phép vào các route khác
  return NextResponse.next();
}

export const config = {
  matcher: [ '/app/:path*', '/auth/login', '/refresh-token'],
};
