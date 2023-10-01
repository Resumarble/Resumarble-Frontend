"use client";
import Link from "next/link";
import styles from "./nav.module.css";
import useStore from "@/store/zustand/login";
import { useRouter } from "next/navigation";
import customFetch from "@/utils/customFetch";
import { useEffect } from "react";

export default function Nav() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const login = useStore((state) => state.login);
  const logout = useStore((state) => state.logout);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // TODO 토큰 유효한지 체크하는 API 요청하기
    if (token) {
      login();
    }
  }, []);

  const onClickLogout = async () => {
    try {
      const res = await customFetch({
        url: "/users/logout",
        header: {
          Authorization: localStorage.getItem("token")!,
        },
        method: "POST",
      });

      if (res.code !== 200) {
        return window.alert(res.message);
      }

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      logout();
      router.push("/");
    } catch (err) {
      console.error("Logout Error");
    }
  };

  return (
    <nav className={styles.nav}>
      <h1>
        <Link href="/">RESUMARBLE</Link>
      </h1>
      <ul>
        {isLoggedIn ? (
          <>
            <li className={styles.bold}>
              <Link href="/resume">질문생성</Link>
            </li>
            <li className={styles.bold}>
              <Link href="/mypage">마이페이지</Link>
            </li>
            <li className={styles.logout} onClick={onClickLogout}>
              <Link href="/">로그아웃</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">로그인</Link>
            </li>
            <li className={styles.bold}>
              <Link href="/join">회원가입</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
