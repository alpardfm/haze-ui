import type { InputHTMLAttributes } from "react";
import { cx } from "../../utils/className";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return <input className={cx("field-control", className)} {...props} />;
}
