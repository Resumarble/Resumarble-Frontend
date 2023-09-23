import Link from "next/link";
import styles from "./nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <h1>
        <Link href="/">RESUMARBLE</Link>
      </h1>
      <ul>
        <li>
          <Link href="/login">로그인</Link>
        </li>
        <li>
          <Link href="/join">회원가입</Link>
        </li>
      </ul>
    </nav>
  );
}
