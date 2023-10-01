import ResultContainer from "./components/ResultContainer";
import Link from "next/link";
import styles from "./result.module.css";

export default function ResultPage() {
  return (
    <>
      <div className={styles.container}>
        <p>
          보고 계신 화면은 <strong>구버전</strong>으로 리뉴얼 진행중인
          페이지입니다.
        </p>
        <ResultContainer />
      </div>
    </>
  );
}
