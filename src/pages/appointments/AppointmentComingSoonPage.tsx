import { Link } from "react-router-dom";
import { StateView } from "../../components/ui/StateView";

type AppointmentComingSoonPageProps = {
  title: string;
  description: string;
};

export function AppointmentComingSoonPage({
  title,
  description,
}: AppointmentComingSoonPageProps) {
  return (
    <div className="stack">
      <StateView title={title} description={description} />
      <Link className="button button--secondary fit-content" to="/appointments">
        Kembali ke appointment
      </Link>
    </div>
  );
}
