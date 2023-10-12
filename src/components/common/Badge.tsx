import styles from "./badge.module.css";

interface Props {
  children?: React.ReactNode;
  text: string;
}

export default function Badge({ children, text }: Props) {
  return (
    <div className={styles.container}>
      <h5 className={styles.text}>{text}</h5>
    </div>
  );
}
