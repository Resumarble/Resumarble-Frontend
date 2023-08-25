"use client";
import Image from "next/image";
import React from "react";
import bg from "public/bg.png";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={`${styles.container}`}>
      <Image className={styles.bg} quality={100} alt="bg" src={bg}></Image>
      <div className={styles.content}>
        <div className={styles.topContent}>
          <h1 className={styles.title}>Resumarble</h1>
          <p className={styles.desc}>이력서 기반 면접 예상 질문 서비스</p>
        </div>

        <div className={`${styles.joinWrapper} ${styles.bottomContent}}`}>
          {/* 회원가입 기능 추가 시 로그인 버튼으로 변경하기 */}
          <button className={`${styles.btn} ${styles.login}`}>시작하기</button>
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
