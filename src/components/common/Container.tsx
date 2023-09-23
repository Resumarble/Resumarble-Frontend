import styles from "./container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  showMarbleImg: boolean;
}

export default function Container({
  children,
  showMarbleImg = false,
}: ContainerProps) {
  return (
    <section className={`${styles.container}`}>
      {showMarbleImg && <div className="marble-bg"></div>}
      {children}
    </section>
  );
}
