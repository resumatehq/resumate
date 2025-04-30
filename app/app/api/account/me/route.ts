import { cookies } from 'next/headers';
import accountApiRequest from '@/apiRequest/account.api';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get('access_token')?.value;

  if (!access_token) {
    return Response.json(
      {
        message: 'Không tìm thấy access_token',
      },
      {
        status: 400,
      }
    );
  }
  try {
    const response = await accountApiRequest.sMe(access_token);

    if (!response || !response.payload) {
      return Response.json(
        {
          message: 'Invalid response from accountApiRequest.sMe',
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(response.payload);
  } catch (error) {
    return Response.json(
      {
        message: 'Có lỗi xảy ra',
      },
      {
        status: 401,
      }
    );
  }
}
