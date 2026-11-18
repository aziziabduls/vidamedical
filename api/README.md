# Vida Medical Centre — Express.js API

Backend REST API untuk CMS Vida Medical Centre menggunakan Express.js, Prisma ORM, dan PostgreSQL.

## Persyaratan

- Node.js 20+
- PostgreSQL 14+

## Setup & Menjalankan

```bash
cd api
npm install
cp .env.example .env   # sesuaikan DATABASE_URL & JWT_SECRET
npx prisma generate
npx prisma db push
npm run prisma:seed
npm run dev            # berjalan di http://localhost:3350
```

## Akun Admin Default (Seed)

- **Email:** `admin@vidamedical.id`
- **Password:** `VidaAdmin2026!`

## Skrip Tersedia

- `npm run dev` — menjalankan server development dengan nodemon
- `npm start` — menjalankan server production
- `npm run prisma:push` — sinkronisasi schema Prisma ke PostgreSQL
- `npm run prisma:seed` — mengisi data awal admin, promo, artikel, dokter/poli, dan layanan
- `npm test` — verifikasi aturan layering Controller/Service

Lihat [dev_documentation.md](./dev_documentation.md) untuk detail lengkap endpoint dan arsitektur.
