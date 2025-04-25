import http from '@/lib/http';
import { AccountResType } from '@/schemas/account.schema';

const accountApiRequest = {
  me: () =>
    http.get<AccountResType>('users/profile', {
      baseUrl: '',
    }),

  sMe: (access_token: string) =>
    http.get<AccountResType>('users/profile', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }),
};
export default accountApiRequest;
