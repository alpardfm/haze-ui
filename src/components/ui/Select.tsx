import type { SelectHTMLAttributes } from "react";
import { cx } from "../../utils/className";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select className={cx("field-control", className)} {...props}>
      {children}
    </select>
  );
}
