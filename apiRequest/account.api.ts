import http from '@/lib/http';
import envConfig from '@/config';
import { AccountResType } from '@/schemas/account.schema';

const accountApiRequest = {
  me: () =>
    http.get<AccountResType>('api/account/me', {
      baseUrl: '',
    }),

  sMe: (access_token: string) =>
    http.get<AccountResType>('users/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),
  updateMe: async (data: any, token: string) => {
    return http.put('/users/profile', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },
};
export default accountApiRequest;
