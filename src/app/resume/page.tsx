"use client";
import React, { useEffect, useRef } from "react";

import styles from "./resume.module.css";

import Background from "@/components/bg/Background";
import { Form } from "@/components/resume/Form";

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.classList.add("move-to-left-and-show");
  }, []);

  return (
    <>
      <Background />
      <div ref={ref} className={styles.container}>
        <Form />
      </div>
    </>
  );
}
