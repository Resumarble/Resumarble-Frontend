"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./resume.module.css";
import Container from "@/components/common/Container";
import customFetch from "@/utils/customFetch";
import Spinner from "@/components/common/Spinner";
import { useRouter } from "next/navigation";
import FormSection from "./components/FormSection";

const jobsMapping = {
  0: "Backend Engineer",
  1: "Frontend Engineer",
  2: "Fullstack Engineer",
  3: "Data Engineer",
};

const careersMapping = {
  0: "Newcomer",
  1: "1~3 years (Junior)",
  2: "4~7 years (middle)",
  3: "7 years and up (senior)",
};

const questionMapping = {
  0: "introduction",
  1: "technology stack",
  2: "career history",
  3: "project experience",
};

const MIN_STEP = 0;
const MAX_STEP = 2;

export default function ResumePage() {
  const ref = useRef<HTMLDivElement>(null);
  const route = useRouter();

  const [selectedInputs, setSelectedInputs] = useState({
    job: 0,
    career: 0,
    questions: [
      {
        question: 0,
        questionTextArea: "",
      },
    ],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ref.current?.classList.add("move-to-left-and-show");
  }, []);

  const onClickPrevStep = () => {
    if (currentStep - 1 >= MIN_STEP) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onClickNextStep = () => {
    if (currentStep + 1 <= MAX_STEP) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onSubmit = async () => {
    const jobIndex = selectedInputs.job as keyof typeof jobsMapping;
    const careerIndex = selectedInputs.career as keyof typeof careersMapping;
    const categoryIndex = selectedInputs.questions[0]
      .question as keyof typeof questionMapping;
    const body = {
      job: jobsMapping[jobIndex],
      career: careersMapping[careerIndex],
      resumeInfo: {
        category: questionMapping[categoryIndex],
        content: selectedInputs.questions[0].questionTextArea,
      },
    };
    //  TODO 여러개 항목 요청 시 로직 재 검토 필요

    try {
      setIsLoading(true);
      const res = await customFetch({
        url: "/resumes/interview-questions",
        method: "POST",
        body,
      });
      localStorage.setItem("result", JSON.stringify(res.data.interviews));
      route.push("/result");
    } catch (err) {
      console.error(err);
      window.alert("네트워크 에러가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
          <h3>
            결과를 생성하고 있어요.
            <br />
            잠시만 기다려주세요.
          </h3>
        </div>
      )}
      <div ref={ref} className={styles.container}>
        <Container showTopWhite>
          <div className={styles.headerTitle}>
            <h5>CREATE</h5>
            <p>
              면접 예상 질문과 예시 답변 생성을 위해 필요한 내용을 작성해주세요.
            </p>
            <p>
              <strong>작성한 내용을 기반으로 AI가 결과를 생성</strong>합니다.
            </p>
          </div>

          <div className={styles.formContainer}>
            <FormSection
              section={currentStep}
              selectedInputs={selectedInputs}
              setSelectedInputs={setSelectedInputs}
            />
            {currentStep === MAX_STEP && (
              <button className={styles.resultBtn} onClick={onSubmit}>
                결과 생성
              </button>
            )}
          </div>

          <div className={styles.steps}>
            <input
              readOnly
              onClick={() => setCurrentStep(0)}
              checked={currentStep === 0}
              id="step1"
              type="radio"
              name="step"
              className={styles.step}
            />
            <label htmlFor="step1"></label>

            <input
              readOnly
              onClick={() => setCurrentStep(1)}
              checked={currentStep === 1}
              id="step2"
              type="radio"
              name="step"
              className={styles.step}
            />
            <label htmlFor="step2"></label>

            <input
              readOnly
              onClick={() => setCurrentStep(2)}
              checked={currentStep === 2}
              id="step3"
              type="radio"
              name="step"
              className={styles.step}
            />
            <label htmlFor="step3"></label>
          </div>

          {currentStep !== MIN_STEP && (
            <button
              className={`${styles.moveBtn} ${styles.arrow} ${styles.arrowLeft}`}
              onClick={onClickPrevStep}
            ></button>
          )}
          {currentStep !== MAX_STEP && (
            <button
              className={`${styles.moveBtn} ${styles.arrow} ${styles.arrowRight}`}
              onClick={onClickNextStep}
            ></button>
          )}
        </Container>
      </div>
    </>
  );
}
