import type { ReactNode } from "react";

type StateViewVariant = "loading" | "empty" | "error";

type StateViewProps = {
  title: string;
  description?: string;
  variant?: StateViewVariant;
  action?: ReactNode;
};

export function StateView({
  title,
  description,
  variant = "empty",
  action,
}: StateViewProps) {
  return (
    <div
      className={`state-view state-view--${variant}`}
      role={variant === "error" ? "alert" : "status"}
    >
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action ? <div className="state-view__action">{action}</div> : null}
    </div>
  );
}
