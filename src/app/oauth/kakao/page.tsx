'use client';

import { useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import useStore from '@/store/zustand/login';

type Props = {
  searchParams: { [key: string]: string };
};

export default function KakaoLogin({ searchParams }: Props) {
  const router = useRouter();
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setLogin = useStore((state) => state.login);

  useEffect(() => {
    if (isLoggedIn) {
      return router.push('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!searchParams) {
      return notFound();
    }

    const fetchKakao = async () => {
      try {
        const kakaoRes = await fetch(
          `http://localhost:3000/api/oauth/kakao?code=${searchParams.code}`
        );
        const data = await kakaoRes.json();

        // 백엔드 서버로 요청
        const kakaoLogin = await fetch(
          'https://waveofmymind.shop/oauth/kakao',
          {
            method: 'POST',
            headers: {
              Authorization: data.token.access_token,
            },
          }
        );

        const res = await kakaoLogin.json();

        localStorage.setItem('token', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        setLogin();

        window.alert('카카오 로그인 완료, 메인 페이지로 이동합니다.');
        router.push('/');
      } catch (err) {
        console.log(err);
        window.alert('잘못된 요청입니다. 잠시 후 다시 시도해주세요.');
      }
    };

    fetchKakao();
  }, []);

  return <></>;
}
