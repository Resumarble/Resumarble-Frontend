'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import styles from './formSection.module.css';
import { RadioInput } from './RadioInput';
import { careersMapping, jobsMapping } from '../constants/mapping';
import { SectionForm } from './SectionForm';

export type QuestionType = {
  question: number;
  inputText: string;
};

export const jobNames = [
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

export type OnChangeRadioType = {
  key: 'job' | 'career' | 'question';
  sectionNumber?: number;
  setState: Dispatch<SetStateAction<any>>;
};

export default function FormSection({
  step,
  setJob,
  setCareer,
  currentJobIndex,
  currentCareerIndex,
  questions,
  setQuestions,
}: {
  step: number;
  currentJobIndex: number;
  currentCareerIndex: number;
  setJob: Dispatch<SetStateAction<keyof typeof jobsMapping>>;
  setCareer: Dispatch<SetStateAction<keyof typeof careersMapping>>;
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}) {
  const [partSectionNumber, setPartSectionNumber] = useState(0);

  const checkQuestion = (key: string) => {
    return key === 'question';
  };

  const onChangeRadio =
    ({ setState }: OnChangeRadioType) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(() => parseInt(e.target.id));
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
            {jobNames.map((jobName, i) => (
              <RadioInput
                key={`${jobName} ${i}`}
                onChange={onChangeRadio({ key: 'job', setState: setJob })}
                checked={currentJobIndex === i}
                name='jobName'
                id={i.toString()}
                value={jobsMapping[i as keyof typeof jobsMapping]}
                label={jobName}
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
                onChange={onChangeRadio({ key: 'career', setState: setCareer })}
                checked={currentCareerIndex === i}
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
                questions={questions}
                setQuestions={setQuestions}
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
