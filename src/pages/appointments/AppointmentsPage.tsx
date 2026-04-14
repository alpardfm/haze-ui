import { Button } from "../../components/ui/Button";
import { StateView } from "../../components/ui/StateView";
import { StatusBadge } from "../../components/ui/StatusBadge";

export function AppointmentsPage() {
  return (
    <div className="stack">
      <div className="toolbar">
        <p>Daftar appointment akan terhubung ke API pada phase berikutnya.</p>
        <Button>Tambah appointment</Button>
      </div>
      <div className="status-row" aria-label="Contoh status appointment">
        <StatusBadge status="scheduled" />
        <StatusBadge status="on_going" />
        <StatusBadge status="done" />
        <StatusBadge status="cancelled" />
      </div>
      <StateView title="Belum ada data appointment" description="Data akan tampil setelah integrasi API dashboard." />
    </div>
  );
}
