# Haze UI

Frontend web untuk project **Sistem Jadwal Admin + Reminder**.

`haze-ui` adalah antarmuka frontend untuk:
- admin login
- admin mengelola appointment
- public/client mengecek jadwal yang sudah terisi pada tanggal tertentu

Frontend ini dibangun mengikuti pondasi v1 project dan harus tetap konsisten dengan business flow backend.

## Backend Reference

Backend API sudah tersedia di:

- Base URL: `https://alpardfm.my.id/api/haze/`
- Swagger UI: `https://alpardfm.my.id/api/haze/swagger`
- OpenAPI YAML: `https://alpardfm.my.id/api/haze/openapi.yaml`

## 1. Project Goal

Tujuan utama `haze-ui`:

- menyediakan halaman login untuk admin
- menyediakan UI untuk create, edit, cancel, list, dan detail appointment
- menyediakan public checker berdasarkan tanggal
- menjaga flow frontend tetap sederhana, realistis, dan sesuai scope v1
- mempermudah integrasi dengan backend yang sudah terdeploy

## 2. Scope V1

### Included

- admin login
- dashboard / list appointment
- create appointment
- edit appointment
- detail appointment
- cancel appointment
- public checker berdasarkan tanggal
- loading / error / empty state dasar
- auth guard dasar untuk halaman admin
- integrasi langsung ke backend API

### Excluded

- booking online oleh client
- approval booking
- client login
- WhatsApp integration
- jam operasional admin
- availability absolut
- custom duration meeting
- analytics dashboard kompleks
- multi admin complex assignment

## 3. Core Business Flow

### Admin Flow

1. admin login
2. admin melihat list appointment
3. admin membuat appointment baru
4. admin melihat detail appointment
5. admin mengedit appointment
6. admin membatalkan appointment

### Public Flow

1. user membuka halaman public checker
2. user memilih tanggal
3. frontend memanggil endpoint public schedules
4. frontend menampilkan daftar waktu yang sudah terisi
5. jika kosong, frontend menampilkan:
   `Belum ada jadwal tercatat pada tanggal ini`

## 4. Main Pages

## Admin Area

### 1. Login Page

Field:
- email
- password

Action:
- submit login
- simpan token / session
- redirect ke dashboard jika sukses

### 2. Dashboard / Jadwal Page

Fungsi:
- menampilkan daftar appointment
- filter berdasarkan tanggal
- filter berdasarkan status
- tombol tambah appointment
- aksi ke detail / edit / cancel

### 3. Create Appointment Page

Field:
- client_name
- address
- notes
- meeting_date
- meeting_time
- is_reminder_enabled
- reminder_start_at
- reminder_interval_hours

### 4. Edit Appointment Page

Fungsi:
- menampilkan data appointment yang sudah ada
- mengubah field yang diizinkan
- submit update ke backend

### 5. Detail Appointment Page

Menampilkan:
- data appointment
- waktu mulai dan selesai
- status
- konfigurasi reminder
- info pembuatan / perubahan secukupnya

## Public Area

### 6. Schedule Checker Page

Input:
- tanggal

Output:
- daftar rentang waktu yang sudah terisi pada tanggal tersebut

Contoh tampilan:
- 09:30 - 11:30 → Terisi
- 13:00 - 15:00 → Terisi

Jika kosong:
- `Belum ada jadwal tercatat pada tanggal ini`

## 5. API Integration

Frontend mengikuti kontrak endpoint backend berikut:

### Auth
- `POST /auth/login`

### Appointments
- `GET /appointments`
- `POST /appointments`
- `GET /appointments/:id`
- `PUT /appointments/:id`
- `PATCH /appointments/:id/cancel`

### Public
- `GET /public/schedules?date=YYYY-MM-DD`

## 6. Important UI Rules

Frontend wajib menjaga aturan berikut:

- durasi appointment dianggap fix 2 jam
- jangan buat input custom duration
- jangan buat flow booking online
- jangan buat approval flow
- public checker hanya menampilkan waktu yang sudah terisi
- public checker tidak boleh menyatakan availability absolut
- public checker tidak boleh menampilkan data sensitif seperti nama client, alamat, atau notes
- status yang dipakai hanya:
  - `scheduled`
  - `on_going`
  - `done`
  - `cancelled`

## 7. Frontend Structure

```bash
src/
├── app/
├── components/
│   ├── appointment/
│   ├── auth/
│   ├── layout/
│   └── ui/
├── constants/
├── pages/
│   ├── login/
│   ├── appointments/
│   └── public-schedule/
├── services/
│   ├── api.ts
│   ├── auth.ts
│   ├── appointments.ts
│   └── publicSchedule.ts
├── store/
├── types/
├── utils/
└── styles/
```

Struktur final mengikuti flow v1 dan tetap menjaga boundary antara admin area dan public checker.

## 8. Tech Direction

Stack frontend v1:
- React
- Vite
- TypeScript
- React Router
- localStorage session sederhana
- form validation sederhana
- API service wrapper berbasis `fetch`

Prinsip:
- clean
- realistis
- cepat dibangun
- mudah dibaca
- cocok untuk vibe coding dengan AI agent

## 9. Environment

Contoh environment variable:

```env
VITE_API_BASE_URL=https://alpardfm.my.id/api/haze
```

File contoh tersedia di `.env.example`.

## 10. Local Development

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Validasi project:

```bash
npm run typecheck
npm run build
npm audit
```

## 11. Deployment

Target deploy v1:
- URL UI: `https://alpardfm.my.id/haze/`
- API: `https://alpardfm.my.id/api/haze`
- VPS path: `/var/www/alpardfm.my.id/haze`

Manual deploy dari local:

```bash
bash scripts/deploy-vps.sh
```

CI/CD tersedia di `.github/workflows/deploy.yml`.

GitHub secret yang diperlukan:

```text
VPS_SSH_KEY
```

Isi `VPS_SSH_KEY` dengan private key deploy yang punya akses SSH ke `alpardfm@103.87.67.209`.

Nginx VPS memakai snippet di `deploy/nginx-haze.conf`.

## 12. UX Notes

Minimal state yang harus diperhatikan:

- loading state saat request berjalan
- error state saat request gagal
- empty state saat data kosong
- disabled submit state saat form diproses
- confirmation dasar saat cancel appointment

## 13. Non Goals

Hal-hal berikut memang tidak dibangun di v1 frontend:

- public booking form
- booking approval / reject flow
- client account / client login
- calendar availability absolut
- slot generator kompleks
- analytics dashboard besar
- multi admin scheduler

## 14. Development Principle

Saat mengembangkan `haze-ui`:

- jaga konsistensi dengan scope v1 backend
- jangan menambah flow yang belum didukung backend
- prioritaskan halaman inti yang benar-benar dipakai
- utamakan implementasi yang sederhana, bersih, dan stabil
- jaga agar hasil tetap mudah dibaca dan mudah dilanjutkan AI agent

## 15. Summary

`haze-ui` adalah frontend untuk sistem jadwal admin + reminder yang fokus pada dua hal utama:

1. admin mengelola appointment
2. public melihat jadwal yang sudah terisi

Frontend ini sengaja dijaga tetap sederhana agar:
- cepat dibangun
- konsisten dengan backend
- tidak keluar dari scope v1
- siap dikembangkan ke phase berikutnya jika pondasinya sudah stabil
