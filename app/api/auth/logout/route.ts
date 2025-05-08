import authApiRequest from '@/apiRequest/auth.api';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = await cookies(); // Sử dụng await để lấy giá trị từ cookies
  const access_token = cookieStore.get('access_token')?.value;
  const refresh_token = cookieStore.get('refresh_token')?.value;

  const response = NextResponse.json(
    {
      message:
        !access_token || !refresh_token
          ? 'Không tìm thấy access_token hoặc refresh_token'
          : 'Đăng xuất thành công',
    },
    {
      status: 200,
    }
  );

  // Xóa cookies bằng cách set expires trong quá khứ
  response.cookies.set('access_token', '', {
    path: '/',
    expires: new Date(0),
  });
  response.cookies.set('refresh_token', '', {
    path: '/',
    expires: new Date(0),
  });

  if (!access_token || !refresh_token) {
    return response;
  }

  try {
    const res = await authApiRequest.sLogout({
      access_token,
      refresh_token,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: 'Có lỗi xảy ra khi logout' },
      { status: 500 }
    );
  }
}
