import styles from "./container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  style?: { [key: string]: string | number };
  showMarbleImg?: boolean;
  showTopWhite?: boolean;
  overflowYScroll?: boolean;
}

export default function Container({
  style,
  children,
  showMarbleImg = false,
  showTopWhite = false,
  overflowYScroll = false,
}: ContainerProps) {
  return (
    <section
      style={style}
      className={`${styles.container} ${showTopWhite ? styles.topWhite : ""} ${
        overflowYScroll ? styles.yScroll : ""
      }`}
    >
      {showMarbleImg && <div className="marble-bg"></div>}
      {children}
    </section>
  );
}
