"use client";
import styles from "./input.module.css";

interface InputProps {
  htmlFor: string;
  labelChild: React.ReactNode | string;
  type: string;
  id: string;
  required: boolean;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  htmlFor,
  labelChild,
  type,
  id,
  placeholder,
  required,
  onChange,
}: InputProps) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={htmlFor}>
        {labelChild}
      </label>
      <input
        required={required}
        placeholder={placeholder}
        className={`${styles.input} ${required ? styles.required : ""}}`}
        onChange={onChange}
        type={type}
        id={id}
      />
    </div>
  );
}
