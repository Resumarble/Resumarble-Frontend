'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './form.module.css';

import type { SelectKey } from '../types/selectKey';
import { Job } from '@/service/getJobs';
import { Career } from '@/service/getCareer';
import { Question } from '@/service/getQuestion';
import { PostResume, postResume } from '@/service/postResume';
import Spinner from '@/components/common/Spinner';
import customFetch from '@/utils/customFetch';

type FormProps = {
  options: [jobs: Job[], careers: Career[], questions: Question[]];
};

export type Result = {
  question: string;
  bestAnswer: string;
};

export const Form = ({ options }: FormProps) => {
  const router = useRouter();

  const [jobs, careers, questions] = [...options];

  const [inputForm, setInputForm] = useState({
    job: null,
    career: null,
    question: null,
    contents: '',
  });
  const [isDoneForm, setIsDoneForm] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const handleSelectJob = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetIndex = e.target.options[e.target.selectedIndex];
    if (!targetIndex.dataset.job || !targetIndex.dataset.type) return;

    const selectedJob = targetIndex.dataset.job;
    const selectedType = targetIndex.dataset.type as SelectKey;

    setInputForm((prev) => ({ ...prev, [selectedType]: selectedJob }));
  };

  const handleSelectCareer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetIndex = e.target.options[e.target.selectedIndex];
    if (!targetIndex.dataset.career || !targetIndex.dataset.type) return;

    const selectedCareer = targetIndex.dataset.career;
    const selectedType = targetIndex.dataset.type as SelectKey;

    setInputForm((prev) => ({ ...prev, [selectedType]: selectedCareer }));
  };

  const handleSelectQuestion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const targetIndex = e.target.options[e.target.selectedIndex];
    if (!targetIndex.dataset.question || !targetIndex.dataset.type) return;

    const selectedQuestion = targetIndex.dataset.question;
    const selectedType = targetIndex.dataset.type as SelectKey;

    setInputForm((prev) => ({ ...prev, [selectedType]: selectedQuestion }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const postResum: PostResume = {
      job: inputForm.job!,
      career: inputForm.career!,
      resumeInfo: {
        category: inputForm.question!,
        content: inputForm.contents,
      },
    };
    try {
      setShowLoading(true);

      const res = await customFetch({
        path: '/resumes/interview-questions',
        method: 'POST',
        body: postResum,
      });

      localStorage.setItem('result', JSON.stringify(res.data.interviews));
      router.push('/result');
    } catch (error) {
      console.error('Fetch Error:', error);
      window.alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
      router.push('/resume');
    } finally {
      setShowLoading(false);
    }
  };

  useEffect(() => {
    const isDone = Object.entries(inputForm)
      .map(([_, value]) => {
        return !!value;
      })
      .every((value) => value);

    setIsDoneForm(isDone);
  }, [inputForm.job, inputForm.career, inputForm.question, inputForm.contents]);

  useEffect(() => {
    if (!isDoneForm) return;
  }, [isDoneForm]);

  return (
    <>
      {showLoading && (
        // TODO 임시 로딩 (컴포넌트로 변경하기)
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
      <div className={styles.box}>
        <h2 className={styles.title}>면접 질문 생성기</h2>
        <p>작성한 내용을 기반으로 AI가 면접 예상 질문 목록을 생성해요.</p>
        <hr />
        <div className={styles.formContainer}>
          <form method='POST'>
            <div className={styles.jobContainer}>
              <label htmlFor='select-job'>
                <b>직업을 선택하세요.</b>
              </label>
              <select
                onChange={handleSelectJob}
                defaultValue='default'
                required
                id='select-job'
              >
                <option data-job={'null'} value='default' disabled>
                  --- 선택 ---
                </option>
                {jobs.map((job, idx) => {
                  return (
                    <option
                      data-type='job'
                      data-job={`${job.jobTitleEn}`}
                      key={`${job} ${idx}`}
                    >
                      {job.jobTitleKr}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles.careerContainer}>
              <label htmlFor='select-career'>
                <b>경력을 선택하세요.</b>
              </label>
              <select
                onChange={handleSelectCareer}
                defaultValue='default'
                required
                id='select-career'
              >
                <option data-job={'null'} value='default' disabled>
                  --- 선택 ---
                </option>
                {careers.map((career) => {
                  return (
                    <option
                      data-type='career'
                      data-career={`${career.titleEn}`}
                      key={`${career} ${career.id}`}
                    >
                      {career.titleKr}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles.questionContainer}>
              <label htmlFor='select-question'>
                <b>예상 질문으로 받고 싶은 항목을 선택하세요.</b>
              </label>
              <select
                onChange={handleSelectQuestion}
                defaultValue='default'
                required
                id='select-question'
              >
                <option data-job={'null'} value='default' disabled>
                  --- 선택 ---
                </option>
                {questions.map((question) => {
                  return (
                    <option
                      data-type='question'
                      data-question={`${question.titleEn}`}
                      key={`${question} ${question.id}`}
                    >
                      {question.titleKr}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className={styles.textBoxContainer}>
              <label htmlFor='contents'>
                <b>선택한 항목에 대한 내용을 작성해주세요.</b>
              </label>
              <textarea
                onChange={(e) => {
                  setInputForm((prev) => ({
                    ...prev,
                    contents: e.target.value,
                  }));
                }}
                required
                placeholder={`내용을 입력해주세요. \n(예상 질문 목록으로 선택한 내용과 유관한 내용 기입)`}
              />
            </div>
            <button
              type='submit'
              onClick={handleSubmit}
              disabled={!isDoneForm}
              className={styles.btn}
            >
              제출
            </button>
          </form>
        </div>
        {/* // TODO 추후 서비스 확장 시 질문 여러개 어떻게 레이아웃 구성할 지 고민해보기 */}
      </div>
    </>
  );
};
