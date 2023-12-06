import customFetch from '@/utils/customFetch';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

export const useMypageInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: ['mypage'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(`/api/mock?page=${pageParam}`);
      const data = await res.json();
      return data;
    },
    getNextPageParam: (page, allPages) => {
      return page.hasNextPage ? allPages.length : undefined;
    },
  });
};

// TODO  아래 코드는 필요없으면 제거
export const useMypageQuery = (session: Session) => {
  return useQuery({
    queryKey: ['mypage', session?.user.id],
    queryFn: async () => {
      const data = await customFetch({
        url: '/users/me',
        method: 'GET',
        params: `?page=${2}`,
      });

      return data.data.predictions;
    },
    enabled: !!(session?.user.id! >= 0), //  * enabled 왜 넣었었지 ?
  });
};
