'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './interview.module.css';
import Container from '@/components/common/Container';
import customFetch from '@/utils/customFetch';
import Spinner from '@/components/common/Spinner';
import { useRouter } from 'next/navigation';
import FormSection from '../_components/FormSection';
import {
  careersMapping,
  jobsMapping,
  questionMapping,
} from '../constants/mapping';
import Button from '@/components/common/Button';

const MIN_STEP = 0;
const MAX_STEP = 2;

export default function InterviewPage() {
  const ref = useRef<HTMLDivElement>(null);
  const route = useRouter();

  const [job, setJob] = useState(0);
  const [career, setCareer] = useState(0);
  const [questions, setQuestions] = useState([
    {
      question: 0,
      inputText: '',
    },
    {
      question: 0,
      inputText: '',
    },
    {
      question: 0,
      inputText: '',
    },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ref.current?.classList.add('move-to-left-and-show');
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

  const filteredEmptyQuestions = questions?.filter(
    (question) => !!question.inputText
  );

  const infoList = filteredEmptyQuestions?.map(({ question, inputText }) => {
    return {
      category: questionMapping[question as keyof typeof questionMapping],
      content: inputText,
    };
  });

  const validateInputs = () => {
    return filteredEmptyQuestions.length > 0;
  };

  const fetchQuestion = async (body: {
    job: string;
    career: string;
    resumeInfoList: {
      category: string;
      content: string;
    }[];
  }) => {
    return await customFetch({
      path: '/interview-questions',
      method: 'POST',
      body,
    });
  };

  const onSubmit = async () => {
    if (!validateInputs()) {
      return window.alert('내용을 입력해주세요.');
    }

    try {
      setIsLoading(true);

      const body = {
        job: String(job),
        career: String(career),
        resumeInfoList: infoList,
      };
      const res = await fetchQuestion(body);

      localStorage.setItem('result', JSON.stringify(res.data));

      route.push('/result');
    } catch (err) {
      console.error(err);
      window.alert('네트워크 에러가 발생했어요. 잠시 후 다시 시도해주세요.');
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
            생성 중입니다.
            <br />
            페이지를 이동하지 마세요.
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
              currentJobIndex={job}
              currentCareerIndex={career}
              step={currentStep}
              setJob={setJob}
              setCareer={setCareer}
              questions={questions}
              setQuestions={setQuestions}
            />
            {currentStep === MAX_STEP && (
              <Button
                variant='dark'
                label='결과 생성'
                size='sm'
                className={styles.resultBtn}
                onClick={onSubmit}
              ></Button>
            )}
          </div>

          <div className={styles.steps}>
            <Step
              checked={currentStep === 0}
              id='step1'
              onClick={() => setCurrentStep(0)}
            />
            <Step
              checked={currentStep === 1}
              id='step2'
              onClick={() => setCurrentStep(1)}
            />
            <Step
              checked={currentStep === 2}
              id='step3'
              onClick={() => setCurrentStep(2)}
            />
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

const Step = ({
  onClick,
  checked,
  id,
}: {
  onClick: () => void;
  checked: boolean;
  id: string;
}) => {
  return (
    <>
      <input
        readOnly
        onClick={onClick}
        checked={checked}
        id={id}
        type='radio'
        name='step'
        className={styles.step}
      />
      <label htmlFor={id}></label>
    </>
  );
};
