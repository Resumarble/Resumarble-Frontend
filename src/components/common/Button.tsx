import styles from "./button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  props?: any;
  isDark?: boolean;
}

export default function Button({
  children,
  className,
  props,
  isDark = false,
}: ButtonProps) {
  return (
    <>
      <button
        className={`${className} ${styles.button} ${isDark ? styles.dark : ""}`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
