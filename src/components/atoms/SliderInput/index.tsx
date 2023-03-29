import { Input, SystemStyleObject } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface SliderInputProps {
  min: number;
  max: number;
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  step?: number;
  sx?: SystemStyleObject;
}

export const SliderInput = ({
  min,
  max,
  value,
  onChange,
  className,
  step,
  sx,
}: SliderInputProps) => {
  return (
    <Input
      type="range"
      sx={{
        ...sx,
        transition: "background 450ms ease-in",
        "-webkit-appearance": "none",
        "::-webkit-slider-thumb": {
          background: "#FFA6E3",
          height: "16px",
          width: "16px",
          borderRadius: "50%",
          "-webkit-appearance": "none",
        },
      }}
      className={className}
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      step={step}
    />
  );
};
