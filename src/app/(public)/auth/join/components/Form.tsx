'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '@/components/common/Input';
import customFetch from '@/utils/customFetch';
import styles from '../join.module.css';
import { PATH } from '@/constants/path';
import Button from '@/components/common/Button';

export default function Form() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [pw, setPw] = useState({
    pw: '',
    rePw: '',
  });
  const [$message, $setMessage] = useState<JSX.Element | null>(null);

  const [isCheckId, setIsCheckId] = useState(false);

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

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckId(false);
    setId(e.target.value);
    $setMessage(null);
  };

  const isValidId = () => {
    if (!isCheckId) {
      window.alert('아이디 중복 확인을 해주세요.');
      return false;
    }
    return true;
  };

  const isValidPw = () => {
    if (!pw.pw) {
      window.alert('비밀번호를 입력해주세요.');
      return false;
    }

    if (pw.pw !== pw.rePw) {
      window.alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
      return false;
    }
    return true;
  };

  const fetchJoin = async () => {
    const res = await customFetch({
      path: '/users/join',
      method: 'POST',
      body: {
        account: id,
        password: pw.pw,
      },
    });

    return res;
  };

  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidId() || !isValidPw()) return;

    const res = await fetchJoin();

    if (res.code === 200) {
      window.alert('회원이 되신 것을 환영합니다.');
      return router.push(`${PATH.LOGIN}`);
    }
  };

  const changePw =
    (target: 'pw' | 're') => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (target === 're') {
        return setPw((prev) => ({ ...prev, rePw: e.target.value }));
      }

      return setPw((prev) => ({ ...prev, pw: e.target.value }));
    };

  return (
    <form action='post'>
      <Input
        onChange={onChangeId}
        required
        placeholder='아이디를 입력해주세요.'
        id='id'
        type='text'
        label='아이디'
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
        id='pw'
        type='password'
        label='비밀번호'
      />

      <Input
        onChange={changePw('re')}
        required
        placeholder='비밀번호를 다시 입력해주세요.'
        id='re-pw'
        type='password'
        label='비밀번호 확인'
      />

      <div className={styles.joinBtn}>
        <Button
          size='full'
          onClick={onSubmitForm}
          type='submit'
          variant='dark'
          label='회원가입'
        />
      </div>
    </form>
  );
}
