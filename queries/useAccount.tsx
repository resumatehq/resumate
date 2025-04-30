import accountApiRequest from '@/apiRequest/account.api';
import { useMutation } from '@tanstack/react-query';

export const useGetMeMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.me,
  });
};
