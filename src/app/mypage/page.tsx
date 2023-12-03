'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from '@/components/common/Container';
import ToggleBox from '@/components/common/ToggleBox';
import styles from './mypage.module.css';
import customFetch from '@/utils/customFetch';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';
import { useSession } from 'next-auth/react';

export default function MyPage() {
  // const [userId, setUserId] = useState<number>(); // token 복호화 후 id 값 추출
  const route = useRouter();
  const { data: session } = useSession();

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

  if (!predictions) return;

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
              <div className={styles.noData}>
                <h2>No data</h2>
                <p>생성한 질문을 누적해서 볼 수 있는 페이지입니다.</p>
                <br />
                <br />
                <Link href={'/resume'}>
                  <Button isDark>생성하기</Button>
                </Link>
              </div>
            ) : (
              predictions.map(
                ({
                  category,
                  createdDate,
                  job,
                  predictionId,
                  questionAndAnswer,
                }: {
                  category: string;
                  createdDate: string;
                  job: string;
                  predictionId: number;
                  questionAndAnswer: {
                    qaId: number;
                    answer: string;
                    question: string;
                  }[];
                }) => {
                  return (
                    <div
                      className={styles.content}
                      key={`${questionAndAnswer} ${createdDate}`}
                    >
                      {questionAndAnswer?.map((qna, i) => {
                        return (
                          <>
                            <ToggleBox
                              key={`${qna} ${qna.qaId}`}
                              title={qna.question}
                              contents={qna.answer}
                            >
                              <div className={styles.badgeContainer}>
                                <Badge text={job} />
                                <Badge text={category} />
                                <button
                                  onClick={(e) => {
                                    // TODO mutation 사용 ?

                                    e.stopPropagation();
                                    const confirm = window.confirm(
                                      `'${qna.question}'\n이 질문을 삭제할까요?`
                                    );

                                    if (confirm) {
                                      customFetch({
                                        url: `/question-answers/${qna.qaId}`,
                                        method: 'DELETE',
                                      });
                                    }
                                  }}
                                  className={styles.delete}
                                  // onClick={deleteQnA(predictions)}
                                >
                                  삭제
                                </button>
                              </div>
                            </ToggleBox>
                          </>
                        );
                      })}
                    </div>
                  );
                }
              )
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
