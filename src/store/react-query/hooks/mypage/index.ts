import customFetch from '@/utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

export const useMypageQuery = (session: Session) => {
  return useQuery({
    queryKey: ['getMyPage', session?.user.id],
    queryFn: async () => {
      const data = await customFetch({
        // url: `/predictions/${userId}`,
        url: '/users/me',
        method: 'GET',
        params: '2',
      });

      return data.data.predictions;
    },
    enabled: !!(session?.user.id! >= 0),
  });
};
