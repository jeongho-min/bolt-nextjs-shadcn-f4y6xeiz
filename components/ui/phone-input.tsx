import { Input, InputProps } from "./input";
import { useState, useEffect } from "react";

interface PhoneInputProps extends Omit<InputProps, "onChange" | "value"> {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange, ...props }: PhoneInputProps) {
  const [displayValue, setDisplayValue] = useState(value);

  const formatPhoneNumber = (input: string) => {
    const numbers = input.replace(/[^\d]/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 7) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedValue = formatPhoneNumber(input);
    setDisplayValue(formattedValue);
    onChange(formattedValue);
  };

  useEffect(() => {
    if (value !== displayValue) {
      setDisplayValue(formatPhoneNumber(value));
    }
  }, [value]);

  return <Input type="tel" value={displayValue} onChange={handleChange} maxLength={13} {...props} />;
}
