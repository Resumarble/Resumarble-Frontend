import ToggleBox from '@/components/common/ToggleBox';
import Badge from '@/components/common/Badge';

import styles from './toggleitem.module.css';

type PredictionType = {
  category: string;
  createdDate: string;
  job: string;
  predictionId: number;
  questionAndAnswer: {
    answer: string;
    question: string;
  }[];
};

type ToggleItemProps = {
  predictions: PredictionType[];
};

const ToggleItem = ({ predictions }: ToggleItemProps) => {
  if (!predictions) return <></>;

  const deleteQnA = () => {};

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
                      onClick={(e) => {
                        console.log(e);
                      }}
                      className={styles.delete}
                      // onClick={deleteQnA(predictions)}
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
