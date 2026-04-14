import type { TextareaHTMLAttributes } from "react";
import { cx } from "../../utils/className";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, rows = 4, ...props }: TextareaProps) {
  return <textarea className={cx("field-control", className)} rows={rows} {...props} />;
}
