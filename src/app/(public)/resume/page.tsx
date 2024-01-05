import Link from 'next/link';
import styles from './page.module.css';

import { TbRobot, TbArticle } from 'react-icons/tb';

export default function ResumePage() {
  return (
    <div>
      <div className={styles.section}>
        <div className={styles.contentTitle}>
          <h2>SELECT SERVICE</h2>
          <p>이용할 서비스를 선택해주세요.</p>
        </div>
        <div role='button' className={styles.contentBox}>
          <Link href={'/resume/feedback'}>
            <div className={styles.contents}>
              <TbArticle size={48} />
              <h3>자기소개서 피드백</h3>
              <p>자기소개 문항과 항목을 작성해보세요.</p>
              <p>AI가 자기소개서 피드백을 해드려요.</p>
            </div>
          </Link>

          <Link href={'/resume/interview'}>
            <div role='button' className={styles.contents}>
              <TbRobot size={48} />
              <h3>면접 예상 질문/답변 생성</h3>
              <p>직업군, 연차를 선택하고 예상 질문 카테고리를 선택해보세요.</p>
              <p>
                AI가 예상 면접 질문 3개를 생성하고, 질문에 대한 답변도 만들어
                드려요.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h3>{children}</h3>;
};

const Description = ({ children }: { children: React.ReactNode }) => {
  return <p>{children}</p>;
};

Card.Title = Title;
Card.Description = Description;
