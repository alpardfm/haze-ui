# RULE.md

## Project Rule: Haze UI

Dokumen ini adalah guardrail utama untuk semua pekerjaan AI agent pada project `haze-ui`.

AI agent wajib menjaga output frontend tetap konsisten dengan:
- business flow v1
- scope v1
- pondasi domain appointment
- kontrak backend API yang sudah ada
- boundary antara admin area dan public checker

---

## 1. Identity Project

`haze-ui` adalah frontend untuk project **Sistem Jadwal Admin + Reminder**.

Frontend ini memiliki 2 area utama:

### Admin Area
Digunakan untuk:
- login admin
- list appointment
- create appointment
- edit appointment
- lihat detail appointment
- cancel appointment

### Public Area
Digunakan untuk:
- mengecek jadwal admin yang sudah terisi pada tanggal tertentu

Frontend ini **bukan** aplikasi booking public pada v1.

---

## 2. Mandatory Thinking Rule Before Answering

Sebelum menghasilkan output apa pun, AI agent harus selalu:

1. cek apakah output konsisten dengan business flow dan scope v1
2. cek apakah ada miss logic, benturan domain, atau scope creep
3. jika ada benturan, jelaskan dulu sebelum lanjut
4. jangan mengambil keputusan arsitektur besar tanpa dasar dari konteks project
5. prioritaskan implementasi sederhana, realistis, dan cocok untuk v1
6. jaga hasil tetap siap dipakai untuk vibe coding dengan AI agent

---

## 3. Scope Guardrail

### Included in V1

- login page admin
- auth guard dasar
- dashboard / list appointment
- create appointment page
- edit appointment page
- detail appointment page
- cancel appointment action
- public checker page
- integrasi langsung ke backend API
- loading state, error state, dan empty state dasar
- komponen UI dasar yang mendukung flow inti

### Excluded from V1

- public booking form
- approval / reject booking UI
- client login
- WhatsApp flow / bot UI
- jam operasional admin
- availability absolut
- custom duration selector
- multi admin complex assignment
- analytics dashboard kompleks
- calendar engine kompleks

Jika output mulai masuk ke area excluded, AI agent harus menganggap itu sebagai **scope creep**.

---

## 4. API Boundary Rule

Frontend hanya boleh mengandalkan endpoint backend yang memang ada dalam scope v1:

- `POST /auth/login`
- `GET /appointments`
- `POST /appointments`
- `GET /appointments/:id`
- `PUT /appointments/:id`
- `PATCH /appointments/:id/cancel`
- `GET /public/schedules?date=YYYY-MM-DD`

AI agent tidak boleh:

- mengarang endpoint baru tanpa dasar
- mendesain flow frontend yang membutuhkan endpoint yang belum ada
- membuat UI yang hanya bisa jalan jika backend phase lanjut sudah tersedia

Contoh flow yang tidak boleh diasumsikan:

- booking appointment dari public page
- approve / reject booking
- generate slot available absolut
- reschedule flow kompleks
- analytics summary page yang bergantung endpoint baru

---

## 5. Core Domain Rule

### Appointment is the center

Frontend admin berpusat pada entity `appointment`.

Field penting yang harus dihormati:
- `client_name`
- `address`
- `notes`
- `meeting_date`
- `meeting_time`
- `duration_minutes`
- `start_at`
- `end_at`
- `status`
- `is_reminder_enabled`
- `reminder_start_at`
- `reminder_interval_hours`

### Fixed Duration

Untuk v1:
- durasi appointment fix 2 jam
- jangan buat input custom duration
- jangan buat dropdown 30 menit / 60 menit / 90 menit / 120 menit

Jika perlu, frontend boleh menampilkan durasi sebagai informasi tetap, tetapi bukan sebagai field bebas edit.

### Source of Truth

Untuk logic waktu:
- `start_at` dan `end_at` adalah source utama
- `meeting_date` dan `meeting_time` dipakai untuk kebutuhan form/UI

Frontend tidak boleh membuat logic alternatif yang menyalahi backend source of truth.

---

## 6. Status Rule

Status yang valid hanya:

- `scheduled`
- `on_going`
- `done`
- `cancelled`

Frontend tidak boleh menambah status baru seperti:
- `pending`
- `approved`
- `rejected`
- `expired`
- `rescheduled`

### Status Display Rule

Frontend hanya menampilkan status yang valid dari backend.

Frontend boleh memberi badge/warna berbeda untuk tiap status, tetapi tidak boleh mengubah makna status.

---

## 7. Public Checker Rule

Public checker hanya boleh:

- menerima input tanggal
- memanggil endpoint public schedules
- menampilkan rentang waktu yang sudah terisi pada tanggal tersebut

Public checker tidak boleh:

- menyatakan slot lain pasti available
- menghitung availability absolut
- menampilkan `client_name`
- menampilkan `address`
- menampilkan `notes`
- menampilkan data sensitif internal admin

Jika response kosong, frontend harus menampilkan:

`Belum ada jadwal tercatat pada tanggal ini`

---

## 8. Form Rule

### Login Form

Field minimal:
- email
- password

### Create/Edit Appointment Form

Field minimal:
- client_name
- address
- notes
- meeting_date
- meeting_time
- is_reminder_enabled
- reminder_start_at
- reminder_interval_hours

Frontend harus:
- memberi validasi dasar
- menampilkan error message yang jelas
- menjaga UX tetap sederhana
- mencegah double submit sebisa mungkin

Frontend tidak boleh:
- menambah field booking public
- menambah field approval
- menambah custom duration
- menambah flow yang belum didukung backend

---

## 9. Auth Rule

Frontend admin harus memiliki proteksi dasar.

Minimal behavior:
- jika belum login, redirect ke login
- jika login berhasil, simpan token/session sesuai pendekatan app
- request ke endpoint private harus membawa auth yang sesuai
- logout harus membersihkan auth state

AI agent boleh memilih implementasi auth yang sederhana dan realistis, tetapi tidak boleh membuat auth flow kompleks tanpa kebutuhan nyata v1.

---

## 10. UI Complexity Rule

Frontend v1 harus:
- clean
- ringan
- cepat dibangun
- mudah di-maintain
- mudah dibaca AI agent

AI agent tidak boleh:
- membuat design system besar yang belum perlu
- membuat abstraction berlapis yang tidak memberi nilai nyata
- memakai state management berat jika belum dibutuhkan
- membuat pattern enterprise kompleks untuk kebutuhan v1 yang sederhana

---

## 11. Component Rule

Komponen frontend harus dibangun dengan prinsip:

- reusable secukupnya
- jangan over-abstraction
- fokus ke kebutuhan page nyata
- mudah dibaca dan diubah

Komponen yang wajar untuk v1:
- form input dasar
- select / date input / time input
- status badge
- appointment list item / table row
- empty state
- loading state
- confirmation modal sederhana

---

## 12. Data Fetching Rule

Untuk fetching data:
- prioritaskan cara yang sederhana dan stabil
- bedakan request admin dan public
- handle loading, success, error, dan empty dengan jelas
- jangan membuat caching kompleks jika belum benar-benar perlu

AI agent boleh memakai:
- fetch wrapper sederhana
- API service per domain
- custom hook ringan

Tetapi jangan membuat lapisan fetch terlalu rumit untuk v1.

---

## 13. Error Handling Rule

Frontend harus menangani error minimal untuk:

- login gagal
- fetch list gagal
- fetch detail gagal
- create gagal
- update gagal
- cancel gagal
- public checker gagal

Error message harus:
- jelas
- tidak terlalu teknis untuk user
- tetap cukup informatif untuk debugging dasar

---

## 14. Conflict Handling Rule

Jika ada permintaan yang bentrok dengan pondasi v1, AI agent harus:

1. tunjukkan benturannya
2. jelaskan kenapa itu keluar dari scope atau merusak domain v1
3. berikan alternatif yang tetap sesuai v1

Contoh benturan:
- menambah booking online di public page
- menambah kalender absolute availability
- menambah custom meeting duration
- menambah approval flow booking
- menambah dashboard analytics besar

Jangan langsung menyetujui permintaan yang melanggar boundary v1.

---

## 15. Output Style Rule

Semua output untuk project ini harus:

- rapi
- langsung bisa dipakai kerja
- tidak bertele-tele
- modular
- cocok dipakai AI agent
- jelas boundary v1-nya

Jika diminta membuat code, struktur, atau dokumen:
- prioritaskan yang realistis
- prioritaskan yang cepat diimplementasikan
- prioritaskan yang konsisten dengan backend

---

## 16. Final Principle

Prinsip utama project ini:

> lebih baik frontend sederhana tapi konsisten daripada terlihat canggih tapi bentrok dengan backend

> lebih baik UI fokus ke flow inti daripada banyak halaman tapi setengah matang

> lebih baik boundary v1 dijaga ketat daripada scope melebar terlalu cepat