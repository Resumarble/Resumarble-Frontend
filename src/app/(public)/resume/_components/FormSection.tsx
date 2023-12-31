'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import styles from './formSection.module.css';
import { RadioInput } from './RadioInput';
import { careersMapping, jobsMapping } from '../constants/mapping';
import { SectionForm } from './SectionForm';

export type QuestionType = {
  question: number;
  questionTextArea: string;
};

export type SelectedInputsType = {
  job: number;
  career: number;
  questions: QuestionType[];
};

export const jobs = [
  '백엔드 개발자',
  '프론트 개발자',
  '풀스택 개발자',
  '데이터 엔지니어',
];

export const careers = [
  '신입',
  '1~3년 차 (주니어)',
  '4~7년 차 (미들)',
  '7년 차 이상 (시니어)',
];

type OnChangeRadioType = {
  key: 'job' | 'career' | 'question';
  sectionNumber?: number;
};

export default function FormSection({
  step,
  selectedInputs,
  setSelectedInputs,
}: {
  step: number;
  selectedInputs: SelectedInputsType;
  setSelectedInputs: Dispatch<SetStateAction<SelectedInputsType>>;
}) {
  const [partSectionNumber, setPartSectionNumber] = useState(0);

  const checkQuestion = (key: string) => {
    return key === 'question';
  };

  const onChangeRadio =
    ({ key, sectionNumber }: OnChangeRadioType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checkQuestion(key)) {
        const id = e.target.id;

        if (!sectionNumber) return;

        return setSelectedInputs((prev) => {
          const newQuestions = prev.questions;
          newQuestions[sectionNumber].question = Number(id);

          return { ...prev, questions: newQuestions };
        });
      }

      setSelectedInputs((prev) => ({
        ...prev,
        [key]: parseInt(e.target.id),
      }));
    };

  switch (step) {
    case 0: {
      return (
        <div key={`step ${step}`}>
          <h5 className={styles.title}>
            1. <strong className={styles.titleHighlight}>직업</strong>을
            선택하세요.
          </h5>
          <div className={styles.radioInputBox}>
            {jobs.map((job, i) => (
              <RadioInput
                key={`${job} ${i}`}
                onChange={onChangeRadio({ key: 'job' })}
                checked={selectedInputs.job === i}
                name='job'
                id={i.toString()}
                value={jobsMapping[i as keyof typeof jobsMapping]}
                label={job}
                htmlFor={i.toString()}
              />
            ))}
          </div>
        </div>
      );
    }
    case 1:
      return (
        <div key={`step ${step}`}>
          <h5 className={styles.title}>
            2. <strong className={styles.titleHighlight}>경력</strong>을
            선택하세요.
          </h5>
          <div className={styles.radioInputBox}>
            {careers.map((career, i) => (
              <RadioInput
                key={`${career} ${i}`}
                onChange={onChangeRadio({ key: 'career' })}
                checked={selectedInputs.career === i}
                name='career'
                id={i.toString()}
                value={careersMapping[i as keyof typeof careersMapping]}
                label={career}
                htmlFor={i.toString()}
              />
            ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div key={`step ${step}`} style={{ width: '100%' }}>
          <h5 className={styles.title} style={{ textAlign: 'left' }}>
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
            {Array(3)
              .fill(0)
              .map((numberBtn, i) => (
                <div key={`${numberBtn} ${i}`}>
                  <input
                    readOnly
                    checked={partSectionNumber === i}
                    id={`qs${i}`}
                    name='question-section'
                    type='radio'
                    onChange={() => {
                      setPartSectionNumber(i);
                    }}
                  />
                  <label htmlFor={`qs${i}`}>{i + 1}</label>
                </div>
              ))}
          </div>

          <div className={styles.inputsContainer}>
            {
              <SectionForm
                selectedInputs={selectedInputs}
                setSelectedInputs={setSelectedInputs}
                onChangeRadio={onChangeRadio}
                partSectionNumber={partSectionNumber}
              />
            }
          </div>
        </div>
      );
    default:
      <></>;
  }
}
