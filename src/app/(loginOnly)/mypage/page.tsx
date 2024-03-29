'use client';

import { MouseEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import styles from './mypage.module.css';

import ToggleItem from './_components/ToggleItem';
import NoDatas from './_components/NoDatas';
import Container from '@/components/common/Container';

import { useMypageInfiniteQuery } from '@/store/react-query/hooks/mypage';
import { useInView } from 'react-intersection-observer';

const deleteQuestionAnswer = async (qaId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/interview-questions/${qaId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token') ?? '',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
};

export default function MyPage() {
  // const [userId, setUserId] = useState<number>(); // token 복호화 후 id 값 추출
  const route = useRouter();

  const { data: session } = useSession();

  const queryClient = new QueryClient();
  const mutation = useMutation(deleteQuestionAnswer);

  // TODO 토큰 유효기간 확인 로직 추가

  const {
    data: predictions, // ! TODO 데이터가 없는 경우 문제가 있음
    fetchNextPage,
    isLoading,
    isError,
  } = useMypageInfiniteQuery();

  const deleteQnA = (
    e: React.MouseEvent<Element, MouseEvent>,
    qaId: number
  ) => {
    e.stopPropagation();

    // 임시 확인 로직
    const confirm = window.confirm('정말 삭제할까요?');
    if (!confirm) return;

    mutation.mutate(qaId, {
      onSuccess: () => {
        queryClient.invalidateQueries(['mypage']);
        window.alert('성공적으로 삭제했어요.');
      },
      onError: (error) => {
        console.log(error);
        window.alert('삭제에 실패했어요. 잠시 후 다시 시도해주세요.');
      },
    });
  };

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);


  if (!predictions) return <></>;

  return (
    <Container
      showTopWhite
      overflowYScroll
      style={{ padding: '10px', overflowY: 'scroll' }}
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
          {!predictions.pages[0].interviewQuestions.length ? (
            <NoDatas />
          ) : (
            <>
              <ToggleItem
                deleteQnA={deleteQnA}
                predictions={predictions.pages}
              />
              <div ref={ref} style={{ height: '20px' }}></div>
            </>
          )}
        </div>
      )}
    </Container>
  );
}
