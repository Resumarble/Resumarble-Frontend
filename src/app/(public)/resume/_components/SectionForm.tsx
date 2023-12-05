import { Dispatch, SetStateAction } from "react";
import { SelectedInputsType } from "./FormSection";
import styles from "./sectionForm.module.css";
import { RadioInput } from "./RadioInput";

interface SectionFormProps {
  partSectionNumber: number;
  selectedInputs: SelectedInputsType;
  setSelectedInputs: Dispatch<SetStateAction<SelectedInputsType>>;
  onChangeRadio: ({
    key,
    sectionNumber,
  }: {
    key: "job" | "career" | "question";
    sectionNumber?: number;
  }) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const labels = ["자기소개", "기술스택", "경력사항", "프로젝트 경험"];

export function SectionForm({
  partSectionNumber,
  selectedInputs,
  setSelectedInputs,
  onChangeRadio,
}: SectionFormProps) {
  const onChangeText =
    (partSectionNumber: number) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setSelectedInputs((prev) => {
        const sectionText = e.target.value;
        const questionsText = [...prev.questions];
        questionsText[partSectionNumber].questionTextArea = sectionText;

        return {
          ...prev,
          questions: questionsText,
        };
      });
    };

  return (
    <>
      <div className={styles.radioInputBox}>
        {labels.map((question, i) => {
          return (
            <RadioInput
              key={`${question} ${i}`}
              onChange={onChangeRadio({
                key: "question",
                sectionNumber: partSectionNumber,
              })}
              checked={
                selectedInputs.questions[partSectionNumber]?.question === i
              }
              name="question"
              id={i.toString()}
              value="introduction"
              label={labels[i]}
              htmlFor={i.toString()}
            />
          );
        })}
      </div>
      <div className={styles.textareaBox}>
        <textarea
          value={selectedInputs.questions[partSectionNumber]?.questionTextArea}
          onChange={onChangeText(partSectionNumber)}
          className={styles.textarea}
          placeholder="선택한 항목과 관련된 내용을 입력해주세요."
        />
      </div>
    </>
  );
}
