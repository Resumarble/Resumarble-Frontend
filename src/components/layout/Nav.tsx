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

    const isTokenExpired = async () => {
      try {
        const res = await fetch("/api/token/exp", {
          method: "GET",
          headers: {
            Authorization: localStorage.getItem("token")!,
          },
        });

        return await res.json();
      } catch (err) {
        window.alert("로그인이 만료되었습니다. 재로그인해주세요.");
        router.push("/login");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        logout();
      }
    };

    if (token) {
      (async () => {
        const res = await isTokenExpired();

        // 서버 응답 코드 401번 가지고 만료를 체크하는 방법도 있을듯함
        if (res?.isExpired) {
          try {
            const reissueRes = await customFetch({
              url: "/users/reissue",
              method: "POST",
              body: {
                accessToken: localStorage.getItem("token")?.split(" ").pop(),
                refreshToken: localStorage
                  .getItem("refreshToken")
                  ?.split(" ")
                  .pop(),
              },
            });

            localStorage.setItem("token", reissueRes.data.accessToken);
            localStorage.setItem("refreshToken", reissueRes.data.refreshToken);

            // window.alert("토큰 재발급");
            // if (reissueRes.code !== 200) {
            //   throw new Error();
            // }
          } catch (err) {
            window.alert("로그인이 만료되었습니다. 재로그인해주세요.");
            router.push("/login");
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            logout();
          }
        }
      })();
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
    } catch (err) {
      console.error("Logout Error");
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      logout();
      router.push("/");
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
              <Link href="/login">로그인 (beta)</Link>
            </li>
            <li className={styles.bold}>
              <Link href="/join">회원가입 (beta)</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
