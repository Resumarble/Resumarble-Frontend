import styles from './badge.module.css';

interface Props {
  text: string;
  textColor?: 'white' | 'black';
  backgroundColor?: string;
}

export default function Badge({
  text,
  textColor = 'white',
  backgroundColor = '#5f946c50',
}: Props) {
  const style = { backgroundColor, color: `var(--${textColor})` };

  return (
    <div className={styles.container} style={style}>
      <p className={styles.text}>{text}</p>
    </div>
  );
}
