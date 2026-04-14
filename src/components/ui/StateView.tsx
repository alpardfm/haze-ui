type StateViewVariant = "loading" | "empty" | "error";

type StateViewProps = {
  title: string;
  description?: string;
  variant?: StateViewVariant;
};

export function StateView({ title, description, variant = "empty" }: StateViewProps) {
  return (
    <div
      className={`state-view state-view--${variant}`}
      role={variant === "error" ? "alert" : "status"}
    >
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
