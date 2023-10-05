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

  if (!predictions) return;

  return (
    <div className={styles.container}>
      <Container showTopWhite overflowYScroll>
        <p>
          보고 계신 화면은 <strong>개발 진행중</strong>으로 미완성된
          페이지입니다.
        </p>
        <br />
        {isLoading || !userId ? (
          <div>데이터를 불러오고 있어요.</div>
        ) : (
          <div>
            {!predictions.length ? (
              <div>
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
                  created_date,
                  job,
                  prediction_id,
                  question_and_answer,
                }: {
                  category: string;
                  created_date: string;
                  job: string;
                  prediction_id: number;
                  question_and_answer: {
                    answer: string;
                    question: string;
                  }[];
                }) => {
                  return (
                    <div key={`${question_and_answer} ${created_date}`}>
                      {question_and_answer?.map((qna, i) => {
                        return (
                          <ToggleBox
                            key={`${qna} ${i}`}
                            title={qna.question}
                            contents={qna.answer}
                          ></ToggleBox>
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
