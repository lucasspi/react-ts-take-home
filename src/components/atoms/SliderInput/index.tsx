import { ChangeEvent } from "react";

interface SliderInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  step?: number;
}

export const SliderInput = ({
  min,
  max,
  value,
  onChange,
  className,
  step,
}: SliderInputProps) => {
  return (
    <input
      type="range"
      className={className}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      step={step}
    />
  );
};
