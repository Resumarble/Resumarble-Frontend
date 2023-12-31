'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import styles from './mypage.module.css';

import ToggleItem from './_components/ToggleItem';
import NoDatas from './_components/NoDatas';
import Container from '@/components/common/Container';

import customFetch from '@/utils/customFetch';

export default function MyPage() {
  // const [userId, setUserId] = useState<number>(); // token 복호화 후 id 값 추출
  const route = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    // TODO token 유효 확인
    //     const getDecodedToken = async () => {
    //       const data = {
    //         token: localStorage.getItem('token')?.split(' ').pop(),
    //       };
    //       if (!data.token) return;
    //       try {
    //         const res = await fetch('/api/token', {
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           method: 'POST',
    //           body: JSON.stringify(data),
    //         });
    //         const { id: userId } = await res.json();
    //         setUserId(() => userId);
    //       } catch (err) {
    //         console.error(err, 'token error');
    //         // TODO 리프레시 토큰 로직 추가 전까지 강제 로그아웃
    //         window.alert('세션이 만료되었습니다. 다시 로그인해주세요.');
    //         route.push('/login');
    //         localStorage.removeItem('token');
    //         localStorage.removeItem('refreshToken');
    //         logout();
    //       }
    //     };
    //     getDecodedToken();
  }, []);

  const {
    data: predictions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['getMyPage', session?.user.id],
    queryFn: async () => {
      const data = await customFetch({
        // url: `/predictions/${userId}`,
        url: '/users/me',
        method: 'GET',
        params: '0',
      });

      return data.data.predictions;
    },
    enabled: !!(session?.user.id! >= 0),
  });

  const deleteQnA = () => {};

  if (!predictions) return <></>;

  return (
    <div className={styles.container}>
      <Container
        showTopWhite
        overflowYScroll
        style={{ padding: '10px', overflowY: 'scroll', marginTop: '30px' }}
      >
        <div className={styles.headerTitle}>
          <h5>MyPage</h5>
          <p>
            <strong>생성한 모든 질문과 답변을 확인하실 수 있어요.</strong>
          </p>
          <p>비로그인일 때 생성한 결과는 저장되지 않습니다.</p>
        </div>
        <br />

        {isLoading || !(session?.user.id! >= 0) ? (
          <div className={styles.contentsContainer}>
            데이터를 불러오고 있어요.
          </div>
        ) : (
          <div className={styles.contentsContainer}>
            {!predictions.length ? (
              <NoDatas />
            ) : (
              <ToggleItem predictions={predictions} />
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
