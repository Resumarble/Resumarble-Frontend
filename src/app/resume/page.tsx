"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./resume.module.css";
import Container from "@/components/common/Container";
import customFetch from "@/utils/customFetch";
import Spinner from "@/components/common/Spinner";
import { useRouter } from "next/navigation";

type SelectedInputsType = {
  job: number;
  career: number;
  questions: {
    question: number;
    questionTextArea: string;
  }[];
};

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

export function FormSection({
  section,
  selectedInputs,
  setSelectedInputs,
}: {
  section: number;
  selectedInputs: SelectedInputsType;
  setSelectedInputs: Dispatch<SetStateAction<SelectedInputsType>>;
}) {
  // TODO 섹션 변경 시 현재 선택한 옵션이 저장되어있지 않음
  // 디폴트 설정해놓고 파라미터로 받아서 체크 설정해줘야할듯

  const onChangeRadio =
    (key: "job" | "career" | "question") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (key === "question") {
        const id = parseInt(e.target.id);
        return setSelectedInputs((prev) => ({
          ...prev,
          questions: [
            {
              question: id,
              questionTextArea: prev.questions[0].questionTextArea,
            },
          ],
        }));
      }
      setSelectedInputs((prev) => ({
        ...prev,
        [key]: parseInt(e.target.id),
      }));
    };

  const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedInputs((prev) => ({
      ...prev,
      questions: [
        {
          question: prev.questions[0].question,
          questionTextArea: e.target.value,
        },
      ],
    }));
  };

  switch (section) {
    case 0: {
      return (
        <div key={0}>
          <h5 className={styles.title}>
            1. <strong className={styles.titleHighlight}>직업</strong>을
            선택하세요.
          </h5>
          <div className={styles.radioInputBox}>
            <input
              onChange={onChangeRadio("job")}
              checked={selectedInputs.job === 0}
              className={styles.radio}
              name="job"
              id="0"
              type="radio"
              value="Backend Engineer"
            />
            <label className={styles.label} htmlFor="0">
              백엔드 개발자
            </label>

            <input
              onChange={onChangeRadio("job")}
              checked={selectedInputs.job === 1}
              className={styles.radio}
              name="job"
              id="1"
              type="radio"
              value="Frontend Engineer"
            />
            <label className={styles.label} htmlFor="1">
              프론트 개발자
            </label>

            <input
              onChange={onChangeRadio("job")}
              checked={selectedInputs.job === 2}
              className={styles.radio}
              name="job"
              id="2"
              type="radio"
              value="Fullstack Engineer"
            />
            <label className={styles.label} htmlFor="2">
              풀스택 개발자
            </label>

            <input
              onChange={onChangeRadio("job")}
              checked={selectedInputs.job === 3}
              className={styles.radio}
              name="job"
              id="3"
              type="radio"
              value="Data Engineer"
            />
            <label className={styles.label} htmlFor="3">
              데이터 엔지니어
            </label>
          </div>
          {/* <Form options={options} /> */}
        </div>
      );
    }
    case 1:
      return (
        <div key={1}>
          <h5 className={styles.title}>
            2. <strong className={styles.titleHighlight}>경력</strong>을
            선택하세요.
          </h5>
          <div className={styles.radioInputBox}>
            <input
              onChange={onChangeRadio("career")}
              checked={selectedInputs.career === 0}
              className={styles.radio}
              name="career"
              id="0"
              type="radio"
              value="Newcomer"
            />
            <label className={styles.label} htmlFor="0">
              신입
            </label>

            <input
              onChange={onChangeRadio("career")}
              checked={selectedInputs.career === 1}
              className={styles.radio}
              name="career"
              id="1"
              type="radio"
              value="1~3 years (Junior)"
            />
            <label className={styles.label} htmlFor="1">
              1~3년 차 (주니어)
            </label>

            <input
              onChange={onChangeRadio("career")}
              checked={selectedInputs.career === 2}
              className={styles.radio}
              name="career"
              id="2"
              type="radio"
              value="4~7 years (middle)"
            />
            <label className={styles.label} htmlFor="2">
              4~7년 차 (미들)
            </label>

            <input
              onChange={onChangeRadio("career")}
              checked={selectedInputs.career === 3}
              className={styles.radio}
              name="career"
              id="3"
              type="radio"
              value="7 years and up (senior)"
            />
            <label className={styles.label} htmlFor="3">
              7년 차 이상 (시니어)
            </label>
          </div>
        </div>
      );
    case 2:
      return (
        <div key={2} style={{ width: "100%" }}>
          <h5 className={styles.title} style={{ textAlign: "left" }}>
            3.예상 질문으로 받고 싶은
            <strong className={styles.titleHighlight}>
              항목과 내용을 입력
            </strong>
            해주세요.
          </h5>
          <p className={styles.subTitle}>
            여러 개의 항목을 작성하고 싶을 경우, 우측의 숫자 버튼을 눌러
            추가해보세요.
          </p>
          <div className={styles.questionBtns}>
            <input
              readOnly
              checked={true}
              id="qs1"
              name="question-section"
              type="radio"
            />
            <label htmlFor="qs1">1</label>

            <input
              onClick={() => {
                window.alert("준비중입니다.");
              }}
              readOnly
              checked={false}
              id="qs2"
              name="question-section"
              type="radio"
            />
            <label htmlFor="qs2">2</label>

            <input
              readOnly
              onClick={() => {
                window.alert("준비중입니다.");
              }}
              checked={false}
              id="qs3"
              name="question-section"
              type="radio"
            />
            <label htmlFor="qs3">3</label>
          </div>
          <div className={styles.inputsContainer}>
            <div className={styles.radioInputBox}>
              <input
                onChange={onChangeRadio("question")}
                //  TODO 여러개 입력 가능하게 할 경우 questions[i] 로 변경
                checked={selectedInputs.questions[0].question === 0}
                className={styles.radio}
                name="question"
                id="0"
                type="radio"
                value="introduction"
              />
              <label className={styles.label} htmlFor="0">
                자기소개
              </label>

              <input
                onChange={onChangeRadio("question")}
                checked={selectedInputs.questions[0].question === 1}
                className={styles.radio}
                name="question"
                id="1"
                type="radio"
                value="technology stack"
              />
              <label className={styles.label} htmlFor="1">
                기술 스택
              </label>

              <input
                onChange={onChangeRadio("question")}
                checked={selectedInputs.questions[0].question === 2}
                className={styles.radio}
                name="question"
                id="2"
                type="radio"
                value="career history"
              />
              <label className={styles.label} htmlFor="2">
                경력 사항
              </label>

              <input
                onChange={onChangeRadio("question")}
                checked={selectedInputs.questions[0].question === 3}
                className={styles.radio}
                name="question"
                id="3"
                type="radio"
                value="project experience"
              />
              <label className={styles.label} htmlFor="3">
                프로젝트 경험
              </label>
            </div>
            <div className={styles.textareaBox}>
              <textarea
                value={selectedInputs.questions[0].questionTextArea}
                onChange={onChangeText}
                className={styles.textarea}
                placeholder="선택한 항목과 관련된 내용을 입력해주세요."
              />
            </div>
          </div>
        </div>
      );
    default:
      <></>;
  }
}

//  리팩토링 할 때 사용 (컴포넌트 분리 시)

interface RadioInputProps {
  value: string;
  name: string;
  id: string;
  htmlFor: string;
  label: string;
}

export function RadioInput({
  htmlFor,
  id,
  name,
  value,
  label,
}: RadioInputProps) {
  return (
    <>
      <input name={name} id={id} type="radio" value={value} />
      <label htmlFor={htmlFor}>{label}</label>
    </>
  );
}
