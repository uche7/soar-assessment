/** Input Props */
export type InputProps = {
  Id?: string;
  className?: string;
  Name: string;
  inputType: string;
  value?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onPaste?: React.ClipboardEventHandler<HTMLInputElement>;
};
