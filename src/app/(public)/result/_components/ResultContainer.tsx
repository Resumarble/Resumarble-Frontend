'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './resultContainer.module.css';
import ToggleBox from '@/components/common/ToggleBox';
import SaveButton from './SaveButton';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { Result } from '../../resume/_components/Form';

export default function ResultContainer() {
  const [results, setResults] = useState<Result[]>();
  const [hasResult, setHasResult] = useState(false);

  const [resultsForDownload, setResultForDownload] = useState<string>('');

  useEffect(() => {
    const result = localStorage.getItem('result');
    setHasResult(!!result?.length);

    setResults(JSON.parse(result!) || []);

    if (result) {
      const parseResult = JSON.parse(result);
      const resultList = parseResult.map(
        (res: { question: string; bestAnswer: string }, idx: number) =>
          `0${idx + 1} Q. : ${res.question}\n0${idx + 1} A. ${
            res.bestAnswer
          } \n\n`
      );

      const resultTxt = resultList.join('');

      setResultForDownload(resultTxt);
    }
  }, []);

  return (
    <>
      {!hasResult ? (
        <div style={{ textAlign: 'center' }}>
          <h3>ERROR!</h3>
          <h4>올바르지 않은 요청입니다.</h4>
          <Link href={'/resume'}>다시 작성하기</Link>
        </div>
      ) : (
        <Container
          showTopWhite
          style={{ padding: '10px', overflowY: 'scroll' }}
        >
          <>
            <div className={styles.options}>
              <SaveButton txt={resultsForDownload} />
            </div>
            <div className={styles.headerTitle}>
              <h5>RESULT</h5>
              <p>작성된 내용을 기반으로 생성된 질문과 예시 답변입니다.</p>
              <p>
                <strong>
                  로그인 유저의 경우, 마이페이지에서 결과를 언제든지 다시 확인할
                  수 있습니다.
                </strong>
              </p>
            </div>

            <div className={styles.contentsContainer}>
              <div className={styles.contents}>
                {results?.map((result, idx) => {
                  return (
                    <div key={`${result} ${idx}`}>
                      <ToggleBox
                        title={result.question}
                        contents={result.bestAnswer}
                      />
                    </div>
                  );
                })}
              </div>

              <div className={`${styles.btns}`}>
                <Link href={'/resume'}>
                  <Button variant='dark' label='다시 생성하기' />
                </Link>
                <Link href={'/'}>
                  <Button variant='dark' label='홈으로' />
                </Link>
              </div>
            </div>
          </>
        </Container>
      )}
    </>
  );
}
