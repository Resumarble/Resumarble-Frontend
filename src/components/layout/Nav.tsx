'use client';
import Link from 'next/link';
import styles from './nav.module.css';
import { useRouter } from 'next/navigation';
import customFetch from '@/utils/customFetch';
import { signOut, useSession } from 'next-auth/react';
import { PATH } from '@/constants/path';

export default function Nav() {
  const router = useRouter();

  const { data: session } = useSession();

  const onClickLogout = async () => {
    signOut();

    try {
      const res = await customFetch({
        path: '/users/logout',
        header: {
          Authorization: localStorage.getItem('token')!,
        },
        method: 'POST',
      });

      if (res.code !== 200) {
        return window.alert(res.message);
      }
    } catch (err) {
      console.error('Logout Error');
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      router.push(PATH.ROOT);
    }
  };

  return (
    <nav className={styles.nav}>
      <h1>
        <Link href={PATH.ROOT}>RESUMARBLE</Link>
      </h1>
      <ul>
        {session ? (
          <>
            <li className={styles.bold}>
              <Link href={PATH.RESUME}>질문생성</Link>
            </li>
            <li className={styles.bold}>
              <Link href={PATH.MY_PAGE}>마이페이지</Link>
            </li>
            <li className={styles.logout} onClick={onClickLogout}>
              <Link href={PATH.ROOT}>로그아웃</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={PATH.LOGIN}>로그인 (beta)</Link>
            </li>
            <li className={styles.bold}>
              <Link href={PATH.JOIN}>회원가입 (beta)</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
