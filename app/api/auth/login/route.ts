import { NextResponse } from 'next/server';
import authApiRequest from '@/apiRequest/auth.api';
import { LoginBodyType } from '@/schemas/auth.schema';
import jwt from 'jsonwebtoken';
import { HttpError } from '@/lib/http';

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType;

  try {
    const response = await authApiRequest.sLogin(body);
    if (!response) {
      throw new Error('Login response is undefined');
    }

    const { payload } = response;
    const { access_token, refresh_token } = payload.data;

    const decodedAccessToken = jwt.decode(access_token) as { exp: number };
    const decodedRefreshToken = jwt.decode(refresh_token) as { exp: number };

    const res = NextResponse.json(payload);

    // Set cookies using NextResponse
    res.cookies.set('access_token', access_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(decodedAccessToken.exp * 1000),
    });

    res.cookies.set('refresh_token', refresh_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: new Date(decodedRefreshToken.exp * 1000),
    });

    return res;
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(error.payload, {
        status: error.status,
      });
    } else {
      return NextResponse.json(
        {
          message: 'Có lỗi xảy ra',
        },
        {
          status: 500,
        }
      );
    }
  }
}
