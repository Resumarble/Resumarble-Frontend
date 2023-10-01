import styles from "./container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  showMarbleImg?: boolean;
  showTopWhite?: boolean;
  overflowYScroll?: boolean;
}

export default function Container({
  children,
  showMarbleImg = false,
  showTopWhite = false,
  overflowYScroll = false,
}: ContainerProps) {
  return (
    <section
      className={`${styles.container} ${showTopWhite ? styles.topWhite : ""} ${
        overflowYScroll ? styles.yScroll : ""
      }`}
    >
      {showMarbleImg && <div className="marble-bg"></div>}
      {children}
    </section>
  );
}
