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
          <Link href={"/resume"}>
            <button className={`${styles.btn} ${styles.retryBtn}`}>
              다시 생성하기
            </button>
          </Link>

          <Link href={"/resume"}>
            <button className={`${styles.btn} ${styles.saveBtn}`}>
              저장하기
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
