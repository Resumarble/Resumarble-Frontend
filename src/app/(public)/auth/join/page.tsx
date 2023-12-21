'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@/components/common/Container';
import styles from './join.module.css';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';

import customFetch from '@/utils/customFetch';
import useStore from '@/store/zustand/login';
import Image from 'next/image';
// import Link from 'next/link';

// import { KAKAO_JOIN_URL } from './constants/kakao';
import { signIn } from 'next-auth/react';

export default function JoinPage() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState({
    pw: '',
    rePw: '',
  });
  const [$message, $setMessage] = useState<JSX.Element | null>(null);

  const [isCheckId, setIsCheckId] = useState(false);
  const [isSamePw, setIsSamePw] = useState(false);

  const router = useRouter();
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      return router.push('/');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (pw.pw && pw.rePw) {
      setIsSamePw(pw.pw === pw.rePw);
    }
  }, [pw.pw, pw.rePw]);

  // oauth 로그인
  const loginKakao = () => {
    signIn('kakao');
  };

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckId(false);
    setId(e.target.value);
    $setMessage(null);
  };

  const clickDuplicateCheck = async () => {
    const isOk = await customFetch({
      path: '/users/duplicate-account',
      method: 'POST',
      body: {
        account: id,
      },
    }).then((res) => res.code === 200);

    createAllowedIdMsg(isOk);
  };

  const checkAllowedId = () => {
    // 올바른 아이디인지 체크 (정규식 검사)
    // 올바르면 중복확인 post 요청
    const REG_EXP = /^[a-zA-Z0-9]{2,10}$/;
    const isCorrect = REG_EXP.test(id);

    return isCorrect
      ? clickDuplicateCheck()
      : $setMessage(() => <p>2~10글자 영문/숫자만 사용할 수 있어요.</p>);
  };

  const createAllowedIdMsg = (CheckDuplicate: boolean) => {
    const $msg = CheckDuplicate ? (
      <p className={styles.ok}>사용 가능한 아이디입니다.</p>
    ) : (
      <p className={styles.warning}>이미 사용중인 아이디입니다.</p>
    );

    $setMessage($msg);
    setIsCheckId(CheckDuplicate);
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCheckId) {
      return window.alert('아이디 중복 확인을 해주세요.');
    }

    if (!isSamePw) {
      return window.alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
    }

    const res = await customFetch({
      path: '/users/join',
      method: 'POST',
      body: {
        account: id,
        password: pw.pw,
      },
    });

    if (res.code === 200) {
      window.alert('회원이 되신 것을 환영합니다.');
      return router.push('/login');
    }

    return window.alert('에러가 발생했어요. 새로고침 후 다시 시도해주세요.');
  };

  const changePw =
    (target: 'pw' | 're') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (target === 're') {
        return setPw((prev) => ({ ...prev, rePw: e.target.value }));
      }

      return setPw((prev) => ({ ...prev, pw: e.target.value }));
    };

  return (
    <div className={styles.container}>
      <Container showTopWhite>
        <h3>JOIN</h3>

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

          <div className={styles.msg}>{$message}</div>

          <button
            onClick={checkAllowedId}
            type='button'
            className={styles.duplication}
          >
            중복 확인
          </button>

          <Input
            onChange={changePw('pw')}
            required
            placeholder='비밀번호를 입력해주세요.'
            htmlFor='pw'
            id='pw'
            type='password'
            labelChild='비밀번호'
          />

          <Input
            onChange={changePw('re')}
            required
            placeholder='비밀번호를 다시 입력해주세요.'
            htmlFor='re-pw'
            id='re-pw'
            type='password'
            labelChild='비밀번호 확인'
          />

          <div className={styles.joinBtn}>
            <Button
              onClick={onSubmitForm}
              type='submit'
              variant='dark'
              label='회원가입'
            />
          </div>
        </form>

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
