"use client";
import { useEffect, useState } from "react";
import styles from "./resultContainer.module.css";
import { Result } from "@/components/resume/Form";
import Link from "next/link";
import ToggleBox from "@/components/common/ToggleBox";
import SaveButton from "./SaveButton";

type Props = {
  children?: React.ReactNode;
};

export default function ResultContainer({ children }: Props) {
  const [results, setResults] = useState<Result[]>();
  const [hasResult, setHasResult] = useState(false);

  const [resultsForDownload, setResultForDownload] = useState<string>("");

  useEffect(() => {
    const result = localStorage.getItem("result");
    setHasResult(!!result?.length);
    setResults(JSON.parse(localStorage.getItem("result")!) ?? []);

    if (result) {
      const parseResult = JSON.parse(result);
      const resultList = parseResult.map(
        (res: { question: string; bestAnswer: string }, idx: number) =>
          `0${idx + 1} Q. : ${res.question}\n0${idx + 1} A. ${
            res.bestAnswer
          } \n\n`
      );

      const resultTxt = resultList.join("");

      setResultForDownload(resultTxt);
    }
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
    <>
      <SaveButton txt={resultsForDownload} />
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
                <ToggleBox
                  title={result.question}
                  contents={result.bestAnswer}
                />
              </div>
            );
          })}

          {children}
        </div>
      </section>

      <div className={`${styles.btns}`}>
        <Link href={"/resume"}>
          {/* TODO: 정말 다시 생성할 건지 물어보기 */}
          <button className={`${styles.btn} ${styles.retryBtn}`}>
            다시 생성하기
          </button>
        </Link>
        <Link href={"/"}>
          <button className={`${styles.btn} ${styles.retryBtn}`}>
            메인으로
          </button>
        </Link>
      </div>
    </>
  );
}
