import Link from 'next/link';

import Button from '@/components/common/Button';
import styles from './nodata.module.css';

const RESUME_URL = '/resume';

const NoDatas = () => {
  return (
    <div className={styles.noData}>
      <h2>No data</h2>
      <p>생성한 질문/답변이 존재하지 않습니다.</p>
      <br />
      <br />
      <Link href={RESUME_URL}>
        <Button size='full' label='생성하기' variant='dark' />
      </Link>
    </div>
  );
};

export default NoDatas;
