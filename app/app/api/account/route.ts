import { cookies } from 'next/headers';
import accountApiRequest from '@/apiRequest/account.api';

export async function GET() {
  const cookieStore = cookies();
  const access_token = (await cookieStore).get('access_token')?.value;
  if (!access_token) {
    return new Response(JSON.stringify({}), { status: 401 });
  }
  try {
    const result = await accountApiRequest.sMe(access_token);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({}), { status: 500 });
  }
}
