import styles from './spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spin}>
        {Array(15)
          .fill(0)
          .map((_, index) => {
            return (
              <div key={index}>
                <div></div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
