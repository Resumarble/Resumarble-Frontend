'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';

import Container from '@/components/common/Container';
import Input from '@/components/common/Input';
import styles from './login.module.css';
import Button from '@/components/common/Button';
import { useFormInput } from '@/hooks/useFormInput';

// ! TODO 카카오 로그인 시 로그인 페이지 접속 막기
export default function LoginPage() {
  const [id, setId] = useFormInput();
  const [pw, setPw] = useFormInput();

  const router = useRouter();

  // oauth 로그인
  const loginKakao = () => {
    signIn('kakao');
  };

  // 일반 로그인
  const submitLoginForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !pw) {
      return window.alert('아이디 또는 비밀번호를 입력해주세요.');
    }

    const result = await signIn('credentials', {
      redirect: false,
      account: id,
      password: pw,
    });

    if (result?.error) {
      return window.alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    }

    if (result?.ok) {
      const session = await getSession();
      localStorage.setItem('token', session?.user.accessToken!);
      localStorage.setItem('refreshToken', session?.user.refreshToken!);
      router.push('/');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <Container showTopWhite>
          <h3>LOGIN</h3>
          <form action='post'>
            <Input
              onChange={setId}
              required
              placeholder='아이디를 입력해주세요.'
              id='id'
              type='text'
              label='아이디'
            />

            <Input
              onChange={setPw}
              required
              placeholder='비밀번호를 입력해주세요.'
              id='pw'
              type='password'
              label='비밀번호'
            />

            <Button
              type='submit'
              onClick={submitLoginForm}
              variant='dark'
              label='로그인'
            />

            {/* // TODO 회원가입 버튼  */}
          </form>

          <div className={styles.snsContainer}>
            <button className={styles.kakao} onClick={loginKakao}>
              <Image src='/kakao.svg' width='12' height='12' alt='kakao icon' />
              <p>카카오톡 로그인</p>
            </button>
          </div>
        </Container>
      </div>
    </>
  );
}
