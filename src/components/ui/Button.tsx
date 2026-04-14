import type { ButtonHTMLAttributes } from "react";
import { cx } from "../../utils/className";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx("button", `button--${variant}`, className)}
      type={type}
      {...props}
    />
  );
}
