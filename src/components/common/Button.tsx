import styles from "./button.module.css";

interface ButtonProps {
  type?: string;
  children: React.ReactNode;
  className?: string;
  props?: any;
  isDark?: boolean;
  onClick?: (e: React.FormEvent | React.MouseEvent) => void;
}

export default function Button({
  children,
  className,
  props,
  onClick,
  type = "button",
  isDark = false,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        className={`${className ? className : ""} ${styles.button} ${
          isDark ? styles.dark : ""
        }`}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
