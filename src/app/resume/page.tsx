"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./resume.module.css";
import Background from "@/components/bg/Background";
import { Form } from "@/components/resume/Form";
import { useQueries } from "@tanstack/react-query";
import { fetchCareers } from "./api/fetchCareers";
import type { Career } from "@/service/getCareer";
import { fetchQuestions } from "./api/fetchQuestions";
import type { Question } from "@/service/getQuestion";
import { fetchJobs } from "./api/fetchJobs";
import type { Job } from "@/service/getJobs";

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);

  const datas = useQueries({
    queries: [
      {
        queryKey: ["getJobs"],
        queryFn: fetchJobs,
      },
      {
        queryKey: ["getCareers"],
        queryFn: fetchCareers,
      },
      {
        queryKey: ["getQuestions"],
        queryFn: fetchQuestions,
      },
    ],
  });

  const options: [jobs: Job[], careers: Career[], questions: Question[]] = [
    datas[0].data,
    datas[1].data,
    datas[2].data,
  ];

  useEffect(() => {
    ref.current?.classList.add("move-to-left-and-show");
  }, []);

  if (datas.every((data) => data.isLoading)) {
    return <div>데이터를 불러오고 있어요.</div>;
  }

  if (datas.every((data) => data.isError)) {
    return <div>잠시 후 다시 시도해주세요.</div>;
  }

  return (
    <>
      <Background />
      <div ref={ref} className={styles.container}>
        <Form options={options} />
      </div>
    </>
  );
}
