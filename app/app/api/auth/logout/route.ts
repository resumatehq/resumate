import authApiRequest from '@/apiRequest/auth.api';
import { cookies } from 'next/headers';
export async function POST(request: Request) {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get('access_token')?.value;
  const refresh_token = (await cookieStore).get('refresh_token')?.value;
  (await cookieStore).delete('access_token');
  (await cookieStore).delete('refresh_token');
  if (!access_token || !refresh_token) {
    return Response.json(
      {
        message: 'Không tìm thấy access_token hoặc refresh_token',
      },
      {
        status: 200,
      }
    );
  }
  try {
    const res = await authApiRequest.logout({
      access_token: access_token,
      refresh_token: refresh_token,
    });
    if (res) {
      return Response.json(res.payload);
    } else {
      return Response.json(
        {
          message: 'Response is undefined',
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
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
