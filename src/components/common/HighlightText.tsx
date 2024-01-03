import React from 'react';
import styles from './highlight.module.css';

type Props = {
  children: React.ReactNode;
};

export default function HighlightText({ children }: Props) {
  return <strong className={styles.strong}>{children}</strong>;
}
