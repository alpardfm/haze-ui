import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";

export function LoginPage() {
  return (
    <form className="form-shell" onSubmit={(event) => event.preventDefault()}>
      <p>Masuk untuk mengelola appointment.</p>
      <FormField label="Email" htmlFor="email">
        <Input id="email" name="email" placeholder="admin@example.com" type="email" />
      </FormField>
      <FormField label="Password" htmlFor="password">
        <Input id="password" name="password" placeholder="Password" type="password" />
      </FormField>
      <Button type="submit">Login</Button>
    </form>
  );
}
