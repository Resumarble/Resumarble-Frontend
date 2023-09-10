import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <p>404 NOT FOUND, 잘못된 경로입니다. </p>
      <Link href="/">메인 페이지로 이동</Link>
    </div>
  );
}
