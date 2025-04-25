import authApiRequest from '@/apiRequest/auth.api';
import { SignUpBodyType } from '@/schemas/auth.schema';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { HttpError } from '@/lib/http';
export async function POST(request: Request) {
  const body = (await request.json()) as SignUpBodyType;
  const cookieStore = cookies();
  try {
    const response = await authApiRequest.register(body);
    if (!response) {
      throw new Error(
        'Unexpected undefined response from authApiRequest.register'
      );
    }
    const { payload } = response;
    const { access_token, refresh_token } = payload.data;
    const decodedAccessToken = jwt.decode(access_token) as { exp: number };
    const decodedRefreshToken = jwt.decode(refresh_token) as { exp: number };
    (await cookieStore).set('access_token', access_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    (await cookieStore).set('refresh_token', refresh_token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: decodedRefreshToken.exp * 1000,
    });
    return Response.json(payload);
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
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
