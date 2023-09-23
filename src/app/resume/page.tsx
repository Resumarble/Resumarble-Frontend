"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./resume.module.css";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Job, getJobs } from "@/service/getJobs";
import { fetchCareers } from "./api/fetchCareers";
import { Career } from "@/service/getCareer";
import { fetchQuestions } from "./api/fetchQuestions";
import { Question } from "@/service/getQuestion";
import { Form } from "./components/Form";

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);

  const datas = useQueries({
    queries: [
      {
        queryKey: ["getJobs"],
        queryFn: getJobs,
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
      <div ref={ref} className={styles.container}>
        <Form options={options} />
      </div>
    </>
  );
}
