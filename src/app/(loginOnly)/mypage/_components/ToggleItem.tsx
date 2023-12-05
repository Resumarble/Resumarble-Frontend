import ToggleBox from '@/components/common/ToggleBox';
import Badge from '@/components/common/Badge';

import styles from './toggleitem.module.css';
import { MouseEvent } from 'react';

type PredictionType = {
  category: string;
  createdDate: string;
  job: string;
  predictionId: number;
  questionAndAnswer: {
    qaId: number;
    answer: string;
    question: string;
  }[];
};

type ToggleItemProps = {
  deleteQnA: (e: React.MouseEvent<Element, MouseEvent>, qaId: number) => void;
  predictions: PredictionType[];
};

const ToggleItem = ({ predictions, deleteQnA }: ToggleItemProps) => {
  if (!predictions) return <></>;
  return predictions.map(
    ({ category, createdDate, job, predictionId, questionAndAnswer }, idx) => {
      return (
        <div className={styles.content} key={`${predictionId} ${idx}`}>
          {questionAndAnswer?.map((qna, i) => {
            return (
              <>
                <ToggleBox
                  key={`${qna.question} ${i}`}
                  title={qna.question}
                  contents={qna.answer}
                >
                  <div className={styles.badgeContainer}>
                    <Badge text={job} />
                    <Badge text={category} />
                    <button
                      className={styles.delete}
                      onClick={(e) =>
                        deleteQnA(
                          e as unknown as React.MouseEvent<
                            HTMLButtonElement,
                            MouseEvent
                          >,
                          qna.qaId
                        )
                      }
                    >
                      삭제
                    </button>
                  </div>
                </ToggleBox>
              </>
            );
          })}
        </div>
      );
    }
  );
};

export default ToggleItem;
