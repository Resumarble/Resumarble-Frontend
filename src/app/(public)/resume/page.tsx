import Link from 'next/link';
import styles from './page.module.css';

import { TbRobot, TbArticle } from 'react-icons/tb';
import Container from '@/components/common/Container';
import Text from '@/components/common/Text';

export default function ResumePage() {
  return (
    <Container>
      <div className={styles.section}>
        <div className={styles.contentTitle}>
          <Text as='h2'>SELECT SERVICE</Text>
          <Text as='p'>이용할 서비스를 선택해주세요.</Text>
        </div>
        <div role='button' className={styles.contentBox}>
          <Link href={'/resume/feedback'}>
            <div className={styles.contents}>
              <TbArticle size={48} />
              <Text as='h3'>자기소개서 피드백</Text>
              <Text as='p'>자기소개 문항과 항목을 작성해보세요.</Text>
              <Text as='p'>AI가 자기소개서 피드백을 해드려요.</Text>
            </div>
          </Link>

          <Link href={'/resume/interview'}>
            <div role='button' className={styles.contents}>
              <TbRobot size={48} />
              <Text as='h3'>면접 예상 질문/답변 생성</Text>
              <Text as='p'>
                직업군, 연차를 선택하고 예상 질문 카테고리를 선택해보세요.
              </Text>
              <Text as='p'>
                AI가 예상 면접 질문 3개를 생성하고, 질문에 대한 답변도 만들어
                드려요.
              </Text>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
}
