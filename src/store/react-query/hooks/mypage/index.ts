import customFetch from '@/utils/customFetch';
import { useInfiniteQuery } from '@tanstack/react-query';

const FETCH_MYPAGE = '/users/me';

export const useMypageInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['mypage'],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await customFetch({
        path: FETCH_MYPAGE,
        method: 'GET',
        params: `?page=${pageParam}`,
      });

      return data.data;
    },
    getNextPageParam: (page, allPages) => {
      return page.hasNext ? allPages.length : undefined;
    },
  });
};
