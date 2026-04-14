# TODO.md

## Haze UI Frontend Roadmap

Dokumen ini membagi pengerjaan frontend `haze-ui` ke dalam phase yang realistis, sederhana, dan tetap konsisten dengan scope v1 backend.

Prinsip utama:
- utamakan flow inti dulu
- jangan lompat ke fitur phase lanjut
- jangan buat UI yang belum didukung backend
- prioritaskan implementasi yang cepat jadi, bersih, dan mudah dilanjutkan

---

## Phase 0 — Frontend Foundation Setup

### Goal

Membuat pondasi project frontend yang siap dikembangkan.

### Tasks

- [x] tentukan stack final frontend: React + Vite + TypeScript
- [x] setup project structure
- [x] setup routing dasar
- [x] setup global layout
- [x] setup environment variable untuk API base URL
- [x] setup API client / fetch wrapper sederhana
- [x] setup folder structure per domain
- [x] setup utility dasar
- [x] setup styling / UI foundation
- [x] setup state management ringan jika memang perlu: belum diperlukan untuk Phase 0
- [x] setup error boundary dasar jika dibutuhkan: belum diperlukan untuk Phase 0

### Output

- project frontend bisa dijalankan local
- struktur project rapi
- API base URL siap dipakai
- fondasi UI siap dilanjutkan

---

## Phase 1 — Shared UI & App Shell

### Goal

Menyiapkan komponen dasar yang dipakai lintas halaman.

### Tasks

- [x] buat layout dasar admin area
- [x] buat layout dasar public area
- [x] buat komponen input dasar
- [x] buat komponen button dasar
- [x] buat komponen textarea dasar
- [x] buat komponen select / date input / time input
- [x] buat komponen loading state
- [x] buat komponen empty state
- [x] buat komponen error state
- [x] buat komponen status badge
- [x] buat helper format tanggal dan jam

### Output

- komponen dasar siap dipakai ulang
- tampilan awal frontend sudah konsisten

---

## Phase 2 — Auth Login Flow

### Goal

Admin bisa login ke sistem dan masuk ke area private.

### Tasks

- [x] buat login page
- [x] buat form email dan password
- [x] integrasikan ke `POST /auth/login`
- [x] handle loading state saat submit
- [x] handle error state saat login gagal
- [x] simpan token / session hasil login
- [x] buat auth guard dasar
- [x] redirect ke dashboard setelah login sukses
- [x] buat logout flow dasar
- [x] buat proteksi route admin

### Output

- admin bisa login
- halaman admin terlindungi

---

## Phase 3 — Appointment List / Dashboard

### Goal

Admin bisa melihat daftar appointment.

### Tasks

- [x] buat halaman dashboard / appointments list
- [x] integrasikan ke `GET /appointments`
- [x] tampilkan list appointment
- [x] tampilkan status badge
- [x] tambahkan filter tanggal
- [x] tambahkan filter status
- [x] tambahkan loading state
- [x] tambahkan empty state
- [x] tambahkan error state
- [x] tambahkan tombol ke create page
- [x] tambahkan aksi ke detail / edit / cancel

### Output

- admin bisa melihat daftar jadwal
- dashboard dasar siap dipakai operasional

---

## Phase 4 — Create Appointment Page

### Goal

Admin bisa membuat appointment baru dari UI.

### Tasks

- [x] buat halaman create appointment
- [x] buat form field:
  - [x] client_name
  - [x] address
  - [x] notes
  - [x] meeting_date
  - [x] meeting_time
  - [x] is_reminder_enabled
  - [x] reminder_start_at
  - [x] reminder_interval_hours
- [x] buat validasi field dasar
- [x] handle loading submit state
- [x] integrasikan ke `POST /appointments`
- [x] tampilkan error response jika create gagal
- [x] redirect / refresh list setelah create sukses
- [x] tambahkan UX untuk reminder enabled / disabled

### Output

- admin bisa membuat appointment baru dari frontend

---

## Phase 5 — Appointment Detail Page

### Goal

Admin bisa melihat detail appointment.

### Tasks

- [x] buat halaman detail appointment
- [x] integrasikan ke `GET /appointments/:id`
- [x] tampilkan data utama appointment
- [x] tampilkan start_at dan end_at
- [x] tampilkan status
- [x] tampilkan reminder config
- [x] tampilkan loading state
- [x] tampilkan error state
- [x] sediakan shortcut ke edit
- [x] sediakan shortcut ke cancel jika diperlukan

### Output

- admin bisa melihat detail appointment dengan jelas

---

## Phase 6 — Edit Appointment Page

### Goal

Admin bisa mengubah appointment yang sudah ada.

### Tasks

- [x] buat halaman edit appointment
- [x] load data existing appointment
- [x] prefill form edit
- [x] integrasikan ke `PUT /appointments/:id`
- [x] handle loading submit state
- [x] handle error response
- [x] redirect kembali ke detail / list setelah sukses
- [x] jaga field tetap sesuai boundary v1
- [x] jangan buat custom duration field

### Output

- admin bisa mengedit appointment dengan aman

---

## Phase 7 — Cancel Appointment Flow

### Goal

Admin bisa membatalkan appointment dari UI.

### Tasks

- [x] buat tombol cancel appointment
- [x] buat confirmation dialog sederhana
- [x] integrasikan ke `PATCH /appointments/:id/cancel`
- [x] handle loading state saat cancel
- [x] handle success state
- [x] handle error state
- [x] update list/detail setelah cancel sukses
- [x] pastikan status `cancelled` tampil jelas di UI

### Output

- admin bisa cancel appointment dari frontend

---

## Phase 8 — Public Schedule Checker

### Goal

Public/client bisa mengecek jadwal terisi berdasarkan tanggal.

### Tasks

- [x] buat halaman public checker
- [x] buat input tanggal
- [x] integrasikan ke `GET /public/schedules?date=YYYY-MM-DD`
- [x] tampilkan daftar rentang waktu terisi
- [x] tampilkan status `occupied`
- [x] tambahkan loading state
- [x] tambahkan empty state:
  - [x] `Belum ada jadwal tercatat pada tanggal ini`
- [x] tambahkan error state
- [x] pastikan tidak ada data sensitif yang tampil

### Output

- public checker berjalan sesuai scope v1

---

## Phase 9 — UX Polishing

### Goal

Merapikan pengalaman penggunaan agar frontend lebih nyaman dipakai.

### Tasks

- [ ] rapikan spacing dan hierarchy UI
- [ ] rapikan feedback loading / error / empty
- [ ] tambahkan disabled state pada submit button
- [ ] rapikan badge status
- [ ] tambahkan toast / feedback success sederhana jika perlu
- [ ] pastikan redirect flow tidak membingungkan
- [ ] rapikan mobile responsiveness dasar
- [ ] cek konsistensi copywriting UI

### Output

- frontend lebih enak dipakai
- flow terasa lebih matang

---

## Phase 10 — Hardening & Cleanup

### Goal

Menyiapkan frontend agar lebih stabil dan enak dilanjutkan.

### Tasks

- [ ] rapikan struktur folder final
- [ ] rapikan service layer API
- [ ] rapikan type/interface
- [ ] hapus komponen/logic yang tidak dipakai
- [ ] review naming consistency
- [ ] cek ulang auth flow
- [ ] cek ulang public checker flow
- [ ] sinkronkan README, RULE, dan TODO
- [ ] tambahkan catatan setup local
- [ ] tambahkan contoh `.env.example`

### Output

- frontend v1 lebih stabil
- project siap dilanjutkan ke phase berikutnya jika diperlukan

---

## Suggested Build Order

Urutan implementasi yang disarankan:

1. phase 0
2. phase 1
3. phase 2
4. phase 3
5. phase 4
6. phase 5
7. phase 6
8. phase 7
9. phase 8
10. phase 9
11. phase 10

---

## Acceptance Checklist V1

Frontend v1 dianggap cukup ketika:

- [ ] admin bisa login
- [ ] admin bisa melihat list appointment
- [ ] admin bisa membuat appointment
- [ ] admin bisa melihat detail appointment
- [ ] admin bisa mengedit appointment
- [ ] admin bisa cancel appointment
- [ ] public checker per tanggal berjalan
- [ ] loading / error / empty state dasar sudah ada
- [ ] auth guard dasar berjalan
- [ ] UI tetap konsisten dengan backend scope v1

---

## Important Reminder

Jangan menambah task berikut ke TODO v1 kecuali ada keputusan project baru:

- booking online public
- approval / reject flow
- client account
- slot availability absolut
- custom duration selector
- WhatsApp integration
- analytics dashboard besar
- multi admin complex scheduling

---

## Final Principle

Untuk `haze-ui`, urutan prioritasnya adalah:

1. flow inti jalan
2. integrasi backend stabil
3. UI cukup rapi dan jelas
4. baru polish secukupnya

Lebih baik frontend sederhana tapi benar-benar jadi, daripada besar tapi keluar dari scope v1.
