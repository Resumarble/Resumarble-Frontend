'use client';

import React, { useRef, useEffect } from 'react';
import styles from './page.module.css';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type TitleRefType = {
  title: null | undefined | HTMLElement;
  subTitle: null | undefined | HTMLElement;
};

export default function Home() {
  const titleRef = useRef<TitleRefType>({
    subTitle: null,
    title: null,
  });
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  // TODO 카카오 로그인시 next auth 로직으로 인해 임시 추가
  // 아래 로직 개선 필요.
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) return;

    localStorage.setItem('token', session?.user.accessToken!);
    localStorage.setItem('refreshToken', session?.user.refreshToken!);
  }, [session]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const DELAY = 300;

    Object.keys(titleRef.current).forEach((key: string, idx: number) => {
      const currentKey = key as keyof typeof titleRef.current;

      const timer = setTimeout(() => {
        titleRef.current[currentKey]?.classList.add('move');
      }, idx * DELAY);

      timers.push(timer);
    });

    setTimeout(() => {
      descRef.current?.classList.add('lazy-show');
    }, DELAY);

    setTimeout(() => {
      btnsRef.current?.classList.add('lazy-show');
    }, 2 * DELAY);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className={`${styles.container}`}>
      <Container showMarbleImg={true}>
        <div className={styles.textContainer}>
          <p
            ref={(el) => {
              titleRef.current.subTitle = el;
            }}
            className={styles.subTitle}
          >
            이력서 기반 면접 질문/답변 생성 서비스
          </p>
          <h2
            ref={(el) => (titleRef.current.title = el)}
            className={`${styles.title}`}
          >
            Resumarble
          </h2>
          <p className={styles.desc} ref={descRef}>
            레주마블은 사용자가 작성한 내용을 기반으로
            <strong>AI가 생성한 면접 질문/답변 목록을 제공</strong>합니다.
            <br />
            비회원으로도 이용할 수 있으나, 재열람 기능은 제공되고 있지 않습니다.
            <br />
            회원가입 후 이용 시 생성된 결과가 자동 저장되어 마이페이지에서
            언제든지 다시 열람할 수 있습니다. (베타버전)
          </p>

          <div ref={btnsRef} className={styles.btns}>
            <Link href={'/resume'}>
              <Button label='생성하기' />
            </Link>
            {!session && (
              <Link href={'/login'}>
                <Button label='로그인(beta)' variant='dark' />
              </Link>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
