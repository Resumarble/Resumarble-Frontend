import ToggleBox from '@/components/common/ToggleBox';
import Badge from '@/components/common/Badge';

import styles from './toggleitem.module.css';
import { MouseEvent } from 'react';

type PredictionType = {
  question: string;
  answer: string;
  category: string;
  createdDate: string;
  interviewQuestionId: number;
  job: string;
};

type DeleteEventType = (
  e: React.MouseEvent<Element, MouseEvent>,
  qaId: number
) => void;

type ToggleItemProps = {
  deleteQnA: DeleteEventType;
  predictions: { interviewQuestions: PredictionType[] }[];
};

const ToggleItem = ({ predictions, deleteQnA }: ToggleItemProps) => {
  return predictions.map(({ interviewQuestions }, i) => (
    <ToggleInner
      key={predictions[i].interviewQuestions[0].interviewQuestionId}
      interviewQuestions={interviewQuestions}
      deleteQnA={deleteQnA}
    />
  ));
};

type ToggleInnerProps = {
  interviewQuestions: PredictionType[];
  deleteQnA: DeleteEventType;
};

const ToggleInner = ({ interviewQuestions, deleteQnA }: ToggleInnerProps) => {
  return interviewQuestions.map(
    ({ question, interviewQuestionId, answer, job, category }) => {
      return (
        <ToggleBox title={question} contents={answer} key={interviewQuestionId}>
          <div className={styles.badgeContainer}>
            <Badge text={job} />
            <Badge text={category} />
            <button
              className={styles.delete}
              onClick={(e) => {
                deleteQnA(
                  e as unknown as React.MouseEvent<
                    HTMLButtonElement,
                    MouseEvent
                  >,
                  interviewQuestionId
                );
              }}
            >
              삭제
            </button>
          </div>
        </ToggleBox>
      );
    }
  );
};

export default ToggleItem;
