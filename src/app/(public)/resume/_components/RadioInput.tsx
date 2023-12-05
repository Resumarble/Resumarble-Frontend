import styles from "./radioInput.module.css";

interface RadioInputProps {
  value: string;
  name: string;
  id: string;
  htmlFor: string;
  label: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function RadioInput({
  htmlFor,
  id,
  name,
  value,
  label,
  checked,
  onChange,
}: RadioInputProps) {
  return (
    <>
      <input
        className={styles.radio}
        onChange={onChange}
        checked={checked}
        name={name}
        id={id}
        type="radio"
        value={value}
      />
      <label className={styles.label} htmlFor={htmlFor}>
        {label}
      </label>
    </>
  );
}
