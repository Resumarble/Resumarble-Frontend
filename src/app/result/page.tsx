import Background from "@/components/bg/Background";
import ResultContainer from "./components/ResultContainer";
import Link from "next/link";
import styles from "./result.module.css";

export default function ResultPage() {
  return (
    <>
      <Background />
      <div className={styles.container}>
        <ResultContainer>
          <button className={`${styles.retryBtn}`}>
            <Link href={"/resume"}>다시 생성하기</Link>
          </button>
        </ResultContainer>
      </div>
    </>
  );
}
