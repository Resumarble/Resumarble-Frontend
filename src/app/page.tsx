"use client";

import React, { useRef, useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Background from "@/components/bg/Background";

type TitleRefType = {
  title: null | undefined | HTMLElement;
  desc: null | undefined | HTMLElement;
};

export default function Home() {
  const titleRef = useRef<TitleRefType>({
    title: null,
    desc: null,
  });
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    const DELAY = 500;

    Object.keys(titleRef.current).forEach((key: string, idx: number) => {
      const currentKey = key as keyof typeof titleRef.current;

      const timer = setTimeout(() => {
        if (currentKey === "title") {
          titleRef.current[currentKey]?.classList.add("scaleUp");
        }

        titleRef.current[currentKey]?.classList.add("move");
      }, idx * DELAY);

      timers.push(timer);
    });

    btnsRef.current?.classList.add("lazy-show");

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className={`${styles.container}`}>
      <Background />
      <div className={styles.content}>
        <div className={styles.topContent}>
          <h1
            ref={(el) => (titleRef.current.title = el)}
            className={`${styles.title}`}
          >
            Resumarble
          </h1>
          <p
            ref={(el) => {
              titleRef.current.desc = el;
            }}
            className={styles.desc}
          >
            이력서 기반 면접 예상 질문 서비스
          </p>
        </div>

        <div
          ref={btnsRef}
          className={`${styles.joinWrapper} ${styles.bottomContent}}`}
        >
          {/* 회원가입 기능 추가 시 로그인 버튼으로 변경하기 */}

          <Link href={"/resume"}>
            <button className={`${styles.btn} ${styles.login}`}>
              시작하기
            </button>
          </Link>

          <button
            onClick={() => {
              window.alert("준비중");
            }}
            className={`${styles.btn} ${styles.join}`}
          >
            회원가입
          </button>
        </div>
        <div className={styles.banner}>
          <p className="marquee">
            현재는 로그인, 회원가입 없이 사용해보실 수 있어요.
          </p>
        </div>
      </div>
    </div>
  );
}
