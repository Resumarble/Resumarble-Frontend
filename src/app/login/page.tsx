'use client';

import Container from '@/components/common/Container';
import styles from './login.module.css';
import Input from '@/components/common/Input';
import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';
import customFetch from '@/utils/customFetch';
import { useRouter } from 'next/navigation';
import useStore from '@/store/zustand/login';
import Image from 'next/image';

export default function LoginPage() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setLogin = useStore((state) => state.login);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      return router.push('/');
    }
  }, [isLoggedIn]);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !pw) {
      return window.alert('아이디 또는 비밀번호를 입력해주세요.');
    }

    try {
      const res = await customFetch({
        url: '/users/login',
        method: 'POST',
        body: {
          account: id,
          password: pw,
        },
      });

      if (res.code !== 200) {
        return window.alert(res.message);
      }

      const accessToken = res.data.accessToken;
      const refreshtoken = res.data.refreshToken;
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refreshToken', refreshtoken);

      router.push('/');
      setLogin();
    } catch (err) {
      console.error(`Login Error`, err);
    }
  };

  return (
    <>
      {!isLoggedIn && (
        <div className={styles.container}>
          <Container showTopWhite>
            <h3>LOGIN</h3>
            <form action='post'>
              <Input
                onChange={onChangeId}
                required
                placeholder='아이디를 입력해주세요.'
                htmlFor='id'
                id='id'
                type='text'
                labelChild='아이디'
              />

              <Input
                onChange={onChangePw}
                required
                placeholder='비밀번호를 입력해주세요.'
                htmlFor='pw'
                id='pw'
                type='password'
                labelChild='비밀번호'
              />

              <Button type='submit' onClick={submitLoginForm} isDark>
                로그인
              </Button>

              {/* // TODO 회원가입 버튼  */}
            </form>

            <div className={styles.snsContainer}>
              <button className={styles.kakao}>
                <Image
                  src='/kakao.svg'
                  width='12'
                  height='12'
                  alt='kakao icon'
                />
                <p>카카오톡 로그인</p>
              </button>
            </div>
          </Container>
        </div>
      )}
    </>
  );
}
