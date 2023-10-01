"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Container from "@/components/common/Container";
import ToggleBox from "@/components/common/ToggleBox";
import styles from "./mypage.module.css";
import customFetch from "@/utils/customFetch";
import useStore from "@/store/zustand/login";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const [userId, setUserId] = useState<number>(); // token 복호화 후 id 값 추출
  const route = useRouter();

  const isLoggedIn = useStore((state) => state.isLoggedIn);
  useEffect(() => {
    // TODO 비회원이 접속 시 메인으로 라우트
    if (!isLoggedIn) {
      return route.push("/");
    }

    // TODO token 유효 확인
    const getDecodedToken = async () => {
      const data = {
        token: localStorage.getItem("token")?.split(" ").pop(),
      };
      if (!data.token) return;
      const res = await fetch("/api/token", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const { id: userId } = await res.json();
      setUserId(() => userId);
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

      return data.data.predictions
        .map(
          (prediction: {
            userId: number;
            questionAndAnswer: { question: string; answer: string };
          }) => prediction.questionAndAnswer
        )
        .flat();
    },
    enabled: !!userId,
  });

  console.log(isError);

  return (
    <div className={styles.container}>
      <Container showTopWhite overflowYScroll>
        {isLoading ? (
          <div>데이터를 불러오고 있어요.</div>
        ) : (
          <div>
            {predictions.map(
              (
                // TODO 추후 삭제 요청 하려면 각 post별 id값 있어야 할듯
                prediction: { question: string; answer: string },
                idx: number
              ) => {
                return (
                  <div key={`${prediction.question} ${idx}`}>
                    <ToggleBox
                      title={prediction.question}
                      contents={prediction.answer}
                    ></ToggleBox>
                  </div>
                );
              }
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
