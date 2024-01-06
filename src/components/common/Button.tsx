import styles from './button.module.css';

interface ButtonProps {
  label: string;
  size?: 'xs' | 'sm' | 'md' | 'full' | 'auto';
  variant?: 'default' | 'dark';
  type?: 'button' | 'submit';
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.FormEvent | React.MouseEvent) => void;
}

export default function Button({
  label,
  children,
  className,
  onClick,
  size = 'auto',
  variant = 'default',
  type = 'button',
}: ButtonProps) {
  const classNames = `${className ? className : ''} ${styles.button} ${
    variant === 'dark' ? styles.dark : ''
  } ${styles[size]}`;

  return (
    <>
      <button
        aria-label={label}
        onClick={onClick}
        type={type}
        className={classNames}
      >
        {label}
        {children}
      </button>
    </>
  );
}
