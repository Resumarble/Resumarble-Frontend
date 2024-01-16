import { useState } from 'react';

export function useFormInput(
  initValue = ''
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState(initValue);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(target.value);
  };

  return [value, onChange];
}
