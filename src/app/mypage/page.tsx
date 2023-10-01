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

  const { data: predictions, isLoading } = useQuery({
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

  console.log(predictions);

  return (
    <div className={styles.container}>
      <Container showTopWhite overflowYScroll>
        <p>
          보고 계신 화면은 <strong>개발 진행중</strong>으로 미완성된
          페이지입니다.
        </p>
        <br />
        {isLoading ? (
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
              )
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
