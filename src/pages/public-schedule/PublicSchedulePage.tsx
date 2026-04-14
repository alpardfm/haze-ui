import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { StateView } from "../../components/ui/StateView";
import { StatusBadge } from "../../components/ui/StatusBadge";

export function PublicSchedulePage() {
  return (
    <div className="stack">
      <form className="form-shell" onSubmit={(event) => event.preventDefault()}>
        <p>Pilih tanggal untuk melihat rentang waktu yang sudah tercatat.</p>
        <FormField label="Tanggal" htmlFor="schedule-date">
          <Input id="schedule-date" name="date" type="date" />
        </FormField>
        <Button type="submit">Cek jadwal</Button>
      </form>
      <div className="status-row" aria-label="Status public schedule">
        <StatusBadge status="occupied" />
      </div>
      <StateView title="Belum ada jadwal tercatat pada tanggal ini" />
    </div>
  );
}
