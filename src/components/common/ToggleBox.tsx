'use client';

import { useState } from 'react';
import styles from './toggleBox.module.css';

type Props = {
  title: string;
  contents: string;
  children?: React.ReactNode;
};

export default function ToggleBox({
  title,
  contents,
  children,
}: Props): JSX.Element {
  const [isShow, setIsShow] = useState(false);
  const [arrowDirection, setArrowDirection] = useState('down');

  const handleTitleClick = () => {
    setIsShow((prev) => !prev);
    setArrowDirection((prev) => {
      return prev === 'down' ? 'up' : 'down';
    });
  };

  return (
    <div className={styles.container}>
      <div
        role='button'
        onClick={handleTitleClick}
        className={styles.toggleBox}
      >
        {children}
        <h2>{title}</h2>
        <i
          aria-hidden='true'
          className={`${styles.arrow} ${styles[arrowDirection]}`}
          role='img'
        ></i>
      </div>

      {isShow && (
        <p className={`${styles.contents} ${isShow && styles.show}`}>
          {contents}
        </p>
      )}
    </div>
  );
}
