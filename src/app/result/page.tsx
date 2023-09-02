import Background from "@/components/bg/Background";
import ResultContainer from "./components/ResultContainer";
import Link from "next/link";
import styles from "./result.module.css";

export default function ResultPage() {
  return (
    <>
      <Background />
      <div className={styles.container}>
        <ResultContainer />
        <div className={`${styles.btns}`}>
          <button className={`${styles.btn} ${styles.retryBtn}`}>
            <Link href={"/resume"}>다시 생성하기</Link>
          </button>
          <button className={`${styles.btn} ${styles.saveBtn}`}>
            <Link href={"/resume"}>저장하기</Link>
          </button>
        </div>
      </div>
    </>
  );
}
