"use client";
import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import Background from "@/components/bg/Background";

export default function Home() {
  return (
    <div className={`${styles.container}`}>
      <Background />
      <div className={styles.content}>
        <div className={styles.topContent}>
          <h1 className={styles.title}>Resumarble</h1>
          <p className={styles.desc}>이력서 기반 면접 예상 질문 서비스</p>
        </div>

        <div className={`${styles.joinWrapper} ${styles.bottomContent}}`}>
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
          현재는 로그인, 회원가입 없이 사용해보실 수 있어요.
        </div>
      </div>
    </div>
  );
}
