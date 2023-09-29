import styles from "./container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  showMarbleImg?: boolean;
  showTopWhite?: boolean;
}

export default function Container({
  children,
  showMarbleImg = false,
  showTopWhite = false,
}: ContainerProps) {
  return (
    <section
      className={`${styles.container} ${showTopWhite ? styles.topWhite : ""}`}
    >
      {showMarbleImg && <div className="marble-bg"></div>}
      {children}
    </section>
  );
}
