import React from "react";
import { InputProps } from "@/types/input";

const Inputs = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    Id,
    className,
    Name,
    inputType,
    value,
    required,
    min,
    max,
    maxLength,
    placeholder,
    onKeyDown,
    onChange,
    onPaste,
  } = props;

  return (
    <input
      id={Id}
      className={className}
      name={Name}
      value={value}
      min={min}
      max={max}
      ref={ref}
      maxLength={maxLength}
      required={required}
      onKeyDown={onKeyDown}
      onChange={onChange}
      onPaste={onPaste}
      type={inputType}
      placeholder={placeholder}
    />
  );
});

Inputs.displayName = "Input";

export default Inputs;
