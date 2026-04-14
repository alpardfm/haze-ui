import { useState, type FormEvent } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { useAuth } from "../../store/auth";

type LocationState = {
  from?: {
    pathname?: string;
  };
};

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const locationState = location.state as LocationState | null;
  const redirectTo = locationState?.from?.pathname ?? "/appointments";

  if (isAuthenticated) {
    return <Navigate to="/appointments" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(redirectTo, { replace: true });
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Login gagal diproses";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-shell" onSubmit={handleSubmit}>
      <p>Masuk untuk mengelola appointment.</p>
      <FormField label="Email" htmlFor="email">
        <Input
          autoComplete="email"
          disabled={isSubmitting}
          id="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@example.com"
          required
          type="email"
          value={email}
        />
      </FormField>
      <FormField label="Password" htmlFor="password">
        <Input
          autoComplete="current-password"
          disabled={isSubmitting}
          id="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          required
          type="password"
          value={password}
        />
      </FormField>
      {error ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
}
