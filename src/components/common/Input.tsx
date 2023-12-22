'use client';
import styles from './input.module.css';

interface InputProps {
  label: string;
  type: string;
  id: string;
  required: boolean;
  placeholder?: string;
  labelColor?: 'white' | 'black';
  textColor?: 'white' | 'black';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// TODO required
export default function Input({
  label,
  type,
  id,
  placeholder,
  onChange,
  required = true,
  labelColor = 'white',
  textColor = 'black',
}: InputProps) {
  return (
    <div className={styles.container}>
      <label
        className={`${styles.label}`}
        htmlFor={id}
        style={{ color: labelColor }}
      >
        {label}
      </label>
      <input
        style={{
          color: `${textColor === 'white' && '#fff'}`,
        }}
        aria-required={required}
        required={required}
        placeholder={placeholder}
        className={`${styles.input}`}
        onChange={onChange}
        type={type}
        id={id}
      />
    </div>
  );
}
