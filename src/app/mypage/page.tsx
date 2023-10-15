"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Container from "@/components/common/Container";
import ToggleBox from "@/components/common/ToggleBox";
import styles from "./mypage.module.css";
import customFetch from "@/utils/customFetch";
import useStore from "@/store/zustand/login";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/common/Button";
import Badge from "@/components/common/Badge";

export default function MyPage() {
  const [userId, setUserId] = useState<number>(); // token 복호화 후 id 값 추출
  const route = useRouter();

  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const logout = useStore((state) => state.logout);
  useEffect(() => {
    if (!isLoggedIn) {
      return route.push("/");
    }

    // TODO token 유효 확인
    const getDecodedToken = async () => {
      const data = {
        token: localStorage.getItem("token")?.split(" ").pop(),
      };
      if (!data.token) return;

      try {
        const res = await fetch("/api/token", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });
        const { id: userId } = await res.json();
        setUserId(() => userId);
      } catch (err) {
        console.error(err, "token error");

        // TODO 리프레시 토큰 로직 추가 전까지 강제 로그아웃
        window.alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        route.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        logout();
      }
    };
    getDecodedToken();
  }, []);

  const {
    data: predictions,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getMyPage", userId],
    queryFn: async () => {
      const data = await customFetch({
        // url: `/predictions/${userId}`,
        url: "/users/me",
        method: "GET",
      });

      return data.data.predictions;
    },
    enabled: !!userId,
  });

  const deleteQnA =
    (qna: { qaId: number; answer: string; question: string }) => () => {
      console.log(qna);
      // TODO  id값이 이상함 백엔드에 체크 요청
    };

  return (
    <div className={styles.container}>
      <Container
        showTopWhite
        overflowYScroll
        style={{ padding: "10px", overflowY: "scroll", marginTop: "30px" }}
      >
        <div className={styles.headerTitle}>
          <h5>MyPage</h5>
          <p>
            <strong>생성한 모든 질문과 답변을 확인하실 수 있어요.</strong>
          </p>
          <p>비로그인일 때 생성한 결과는 저장되지 않습니다.</p>
        </div>
        <br />
        {isLoading || !userId ? (
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
                <Link href={"/resume"}>
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
                              key={`${qna} ${i}`}
                              title={qna.question}
                              contents={qna.answer}
                            >
                              <div className={styles.badgeContainer}>
                                <Badge text={job} />
                                <Badge text={category} />
                                <button
                                  className={styles.delete}
                                  onClick={deleteQnA(predictions)}
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
