import { Dispatch, SetStateAction } from 'react';
import { RadioInput } from './RadioInput';
import styles from './sectionForm.module.css';
import { OnChangeRadioType, QuestionType } from './FormSection';

interface SectionFormProps {
  partSectionNumber: number;
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
  onChangeRadio: ({
    key,
    sectionNumber,
    setState,
  }: OnChangeRadioType) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const labels = ['자기소개', '기술스택', '경력사항', '프로젝트 경험'];

export function SectionForm({
  partSectionNumber,
  questions,
  setQuestions,
  onChangeRadio,
}: SectionFormProps) {
  const onChangeText =
    (partSectionNumber: number) =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setQuestions((prev) => {
        const sectionText = e.target.value;
        const questionsText = [...prev];
        questionsText[partSectionNumber].inputText = sectionText;

        return questionsText;
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
                key: 'question',
                sectionNumber: partSectionNumber,
                setState: setQuestions,
              })}
              checked={questions[partSectionNumber]?.question === i}
              name='question'
              id={i.toString()}
              value='introduction'
              label={labels[i]}
              htmlFor={i.toString()}
            />
          );
        })}
      </div>
      <div className={styles.textareaBox}>
        <textarea
          value={questions[partSectionNumber]?.inputText}
          onChange={onChangeText(partSectionNumber)}
          className={styles.textarea}
          placeholder='선택한 항목과 관련된 내용을 입력해주세요.'
        />
      </div>
    </>
  );
}
