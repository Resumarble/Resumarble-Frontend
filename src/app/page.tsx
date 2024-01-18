'use client';

import React, { useEffect } from 'react';
import styles from './page.module.css';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Transition from '@/components/animation/Transition';

export default function Home() {
  // TODO 카카오 로그인시 next auth 로직으로 인해 임시 추가
  // 아래 로직 개선 필요.
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) return;

    localStorage.setItem('token', session?.user.accessToken!);
    localStorage.setItem('refreshToken', session?.user.refreshToken!);
  }, [session]);

  return (
    <Container showMarbleImg={true}>
      <div className={styles.textContainer}>
        <Transition animation='move'>
          <p className={`${styles.subTitle}`}>
            이력서 기반 면접 질문/답변 생성 서비스
          </p>
        </Transition>

        <Transition animation='move' delay={0.3}>
          <h2 className={`${styles.title}`}>Resumarble</h2>
        </Transition>

        <Transition animation='lazy-show' delay={0.6}>
          <p className={`${styles.desc}`}>
            레주마블은 사용자가 작성한 내용을 기반으로
            <strong>AI가 생성한 면접 질문/답변 목록을 제공</strong>합니다.
            <br />
            비회원으로도 이용할 수 있으나, 재열람 기능은 제공되고 있지 않습니다.
            <br />
            회원가입 후 이용 시 생성된 결과가 자동 저장되어 마이페이지에서
            언제든지 다시 열람할 수 있습니다. (베타버전)
          </p>
        </Transition>

        <Transition delay={0.9} animation='lazy-show'>
          <div className={`${styles.btns}`}>
            <Link href={'/resume'}>
              <Button size='full' label='생성하기' />
            </Link>
            {!session && (
              <Link href={'/auth/login'}>
                <Button size='full' label='로그인(beta)' variant='dark' />
              </Link>
            )}
          </div>
        </Transition>
      </div>
    </Container>
  );
}
