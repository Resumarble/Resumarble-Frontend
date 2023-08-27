"use client";
import React, { useEffect, useRef } from "react";
import styles from "./resume.module.css";
import Background from "@/components/bg/Background";
import { Form } from "@/components/resume/Form";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/service/getJobs";

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);
  const {
    data: jobs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getJobs"],
    queryFn: getJobs,
  });

  useEffect(() => {
    ref.current?.classList.add("move-to-left-and-show");
  }, []);

  if (isLoading) {
    return <div>데이터를 불러오고 있어요.</div>;
  }

  if (isError) {
    return <div>잠시 후 다시 시도해주세요.</div>;
  }

  return (
    <>
      <Background />
      <div ref={ref} className={styles.container}>
        <Form options={jobs} />
      </div>
    </>
  );
}
