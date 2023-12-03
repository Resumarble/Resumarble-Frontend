import Link from 'next/link';

import Button from '@/components/common/Button';
import styles from './nodata.module.css';

const RESUME_URL = '/resume';

const NoDatas = () => {
  return (
    <div className={styles.noData}>
      <h2>No data</h2>
      <p>생성한 질문을 누적해서 볼 수 있는 페이지입니다.</p>
      <br />
      <br />
      <Link href={RESUME_URL}>
        <Button isDark>생성하기</Button>
      </Link>
    </div>
  );
};

export default NoDatas;
