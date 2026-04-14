import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { FormField } from "../../components/ui/FormField";
import { Input } from "../../components/ui/Input";
import { StateView } from "../../components/ui/StateView";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { getPublicSchedules } from "../../services/publicSchedule";
import type { PublicScheduleItem } from "../../types/publicSchedule";
import { formatDate, formatTimeRange } from "../../utils/dateTime";

export function PublicSchedulePage() {
  const [date, setDate] = useState("");
  const [resultDate, setResultDate] = useState("");
  const [items, setItems] = useState<PublicScheduleItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!date) {
      setError("Tanggal wajib dipilih");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await getPublicSchedules(date);
      setResultDate(response.data?.date ?? date);
      setItems(response.data?.items ?? []);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Gagal memuat jadwal";
      setError(message);
      setItems([]);
      setResultDate(date);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="stack">
      <form className="form-shell" onSubmit={handleSubmit}>
        <p>Pilih tanggal untuk melihat rentang waktu yang sudah tercatat.</p>
        <FormField label="Tanggal" htmlFor="schedule-date">
          <Input
            disabled={isLoading}
            id="schedule-date"
            name="date"
            onChange={(event) => setDate(event.target.value)}
            required
            type="date"
            value={date}
          />
        </FormField>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "Mengecek..." : "Cek jadwal"}
        </Button>
      </form>

      <p className="helper-copy">
        Halaman ini hanya menampilkan jadwal yang sudah terisi.
      </p>

      {isLoading ? (
        <StateView title="Memuat jadwal..." variant="loading" />
      ) : error ? (
        <StateView title="Gagal memuat jadwal" description={error} variant="error" />
      ) : !hasSearched ? (
        <StateView title="Pilih tanggal untuk mulai mengecek jadwal" />
      ) : items.length === 0 ? (
        <StateView title="Belum ada jadwal tercatat pada tanggal ini" />
      ) : (
        <PublicScheduleList date={resultDate} items={items} />
      )}
    </div>
  );
}

type PublicScheduleListProps = {
  date: string;
  items: PublicScheduleItem[];
};

function PublicScheduleList({ date, items }: PublicScheduleListProps) {
  return (
    <section className="schedule-list" aria-label="Jadwal terisi">
      <div className="schedule-list__header">
        <div>
          <p className="eyebrow">Tanggal</p>
          <h3>{formatDate(date)}</h3>
        </div>
        <StatusBadge status="occupied" />
      </div>

      <ul>
        {items.map((item) => (
          <li key={`${item.start}-${item.end}`}>
            <span>{formatTimeRange(item.start, item.end)}</span>
            <StatusBadge status={item.status} />
          </li>
        ))}
      </ul>
    </section>
  );
}
