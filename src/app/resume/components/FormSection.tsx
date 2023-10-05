import { Dispatch, SetStateAction } from "react";
import styles from "./formSection.module.css";

type SelectedInputsType = {
  job: number;
  career: number;
  questions: {
    question: number;
    questionTextArea: string;
  }[];
};

export default function FormSection({
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
