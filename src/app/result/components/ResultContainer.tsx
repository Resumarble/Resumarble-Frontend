"use client";
import { useEffect, useState } from "react";
import styles from "./resultContainer.module.css";
import { Result } from "@/components/resume/Form";
import Link from "next/link";
import ToggleBox from "@/components/common/ToggleBox";

type Props = {
  children: React.ReactNode;
};

export default function ResultContainer({ children }: Props) {
  const [results, setResults] = useState<Result[]>();
  const hasResult = localStorage.getItem("result")?.length;

  useEffect(() => {
    if (!hasResult) return;

    setResults(JSON.parse(localStorage.getItem("result")!) ?? []);
  }, []);

  if (!hasResult) {
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <h3>ERROR!</h3>
          <h4>올바르지 않은 요청입니다.</h4>
          <Link href={"/resume"}>다시 작성하기</Link>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.header}>
          <h2>생성된 질문/답변을 확인해보세요.</h2>
          <p>자세히 작성할수록 예상 질문과 답변의 퀄리티가 높아집니다.</p>
          <hr />
        </div>

        {results?.map((result, idx) => {
          return (
            <div key={`${result} ${idx}`}>
              <ToggleBox title={result.question} contents={result.bestAnswer} />
            </div>
          );
        })}

        {children}
      </div>
    </section>
  );
}
