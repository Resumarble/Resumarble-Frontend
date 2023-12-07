import customFetch from '@/utils/customFetch';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

export const useMypageInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['mypage'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await customFetch({
        url: '/users/me',
        method: 'GET',
        params: `?page=${pageParam}`,
      });
      return data.data.predictions;
    },
    getNextPageParam: (page, allPages) => {
      return page.hasNextPage ? allPages.length : undefined;
    },
  });
};
