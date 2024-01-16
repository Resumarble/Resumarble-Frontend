'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@/components/common/Container';
import styles from './join.module.css';

import useStore from '@/store/zustand/login';
import Image from 'next/image';
// import Link from 'next/link';

// import { KAKAO_JOIN_URL } from './constants/kakao';
import { signIn } from 'next-auth/react';
import { PATH } from '@/constants/path';
import Form from './components/Form';

export default function JoinPage() {
  const router = useRouter();
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      return router.push('/');
    }
  }, [isLoggedIn]);

  // oauth 로그인
  const loginKakao = () => {
    signIn('kakao');
  };

  return (
    <div className={styles.container}>
      <Container showTopWhite>
        <h3>JOIN</h3>

        <Form />

        <div className={styles.snsContainer}>
          <div
            // href={KAKAO_JOIN_URL}
            onClick={loginKakao}
            className={styles.kakao}
          >
            <Image src='/kakao.svg' width='12' height='12' alt='kakao icon' />
            <p>카카오톡으로 회원가입</p>
          </div>
        </div>
      </Container>

      <div className='deco'></div>
    </div>
  );
}
