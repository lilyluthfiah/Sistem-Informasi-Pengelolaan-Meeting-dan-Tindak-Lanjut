# Sistem Informasi Pengelolaan Meeting dan Tindak Lanjut — Sprint 1

Fondasi MVP Sprint 1: Next.js App Router + React + MySQL + Prisma.

## Fitur Sprint 1
- Login/logout (JWT httpOnly cookie, bcryptjs, jose)
- Routing dasar Next.js App Router (+ middleware proteksi `/dashboard` dan `/meeting`)
- Database MySQL (Prisma, model User dan Meeting)
- Dashboard setelah login (dengan sidebar navigasi)
- Daftar Meeting (`/meeting`): data dari MySQL via Prisma, pencarian berdasarkan judul, empty state, link detail `/meeting/:id` (detail di Sprint berikutnya)
- Clean code, tanpa data dummy, tanpa fitur Tindak Lanjut/Reporting/Notifikasi

## Prasyarat
- Node.js >=18, npm, MySQL berjalan di localhost:3306 (XAMPP/Laragon/MySQL Community)

## Cara Menjalankan

### 1. Install dependency
```bash
npm install
```

### 2. Buat database MySQL
Buka phpMyAdmin / MySQL CLI dan buat database:
```sql
CREATE DATABASE meeting_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Isi .env
```bash
copy .env.example .env
```
Edit `.env`:
```
DATABASE_URL="mysql://root:@localhost:3306/meeting_db"
JWT_SECRET="ganti-minimal-32-karakter-random-xxxxxxx"
JWT_EXPIRES_IN="7d"
```
- Jika MySQL pakai password: `mysql://root:password@localhost:3306/meeting_db`
- Jika tanpa password (XAMPP default): `mysql://root:@localhost:3306/meeting_db`

### 4. Migration Prisma
```bash
npx prisma migrate dev --name init
npx prisma generate
```
Cek koneksi berhasil jika migration tanpa error. Folder `prisma/migrations` ikut di-commit.

### 5. Buat user untuk testing (tanpa data dummy)
Buat 1 akun manual via Prisma CLI atau script:
```bash
node -e "import('bcryptjs').then(async b=>{const h=await b.hash('password123',10);console.log(h)})"
```
Lalu insert via MySQL:
```sql
INSERT INTO User (name, email, password) VALUES ('Admin', 'admin@example.com', '<hash dari atas>');
```

### 6. Jalankan aplikasi
```bash
npm run dev
```
Buka http://localhost:3000

### 7. Tes login
- `GET /` redirect ke `/login` jika belum login
- Login di `/login` dengan email/password dari DB
- Berhasil -> redirect ke `/dashboard`
- `POST /api/auth/logout` via tombol Logout
- `GET /api/auth/me` cek session

### 8. Tes Daftar Meeting (T-14)
- Setelah login, klik menu **Meeting** di sidebar -> `GET /meeting`
- Tabel menampilkan judul, tanggal, waktu, lokasi, status dari database
- Kotak pencarian memfilter berdasarkan judul (query `?q=`)
- Jika belum ada data, tampil empty state "Belum ada meeting"
- Tombol **Detail** mengarah ke `/meeting/:id` (halaman detail dikerjakan di T-15)
- Belum login -> `GET /meeting` redirect ke `/login` (middleware)

## Git
Branch Sprint 1: `sprint-1-foundation` (jangan push ke main tanpa persetujuan)
