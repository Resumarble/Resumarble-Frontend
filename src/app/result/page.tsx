import ResultContainer from "./components/ResultContainer";
import Link from "next/link";
import styles from "./result.module.css";

export default function ResultPage() {
  return (
    <>
      <div className={styles.container}>
        <ResultContainer />
      </div>
    </>
  );
}
