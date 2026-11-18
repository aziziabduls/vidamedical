# Developer Documentation — Vida Medical Centre API

Express.js REST API for managing CMS content (`Promo`, `Article`, `Doctor`, `ServicePackage`) backed by PostgreSQL and Prisma ORM.

---

## Architecture

Layered flow enforced across all endpoints:

```text
Route (validation & auth middleware)
  ↓
Controller (HTTP params/query/body/cookies -> service -> HTTP JSON / next(error))
  ↓
Service (business rules, slug uniqueness, error throwing — zero req/res usage)
  ↓
Prisma Client (PostgreSQL persistence)
```

---

## Configuration & Environment

Required variables in `api/.env`:

- `PORT` (default `3350`)
- `DATABASE_URL` — PostgreSQL connection string (`postgresql://...`)
- `JWT_SECRET` — secret key for signing JWT tokens
- `JWT_EXPIRES_IN` — token lifetime (default `7d`)
- `CORS_ORIGINS` — comma-separated origins allowed with credentials (default `http://localhost:3550,http://localhost:3450`)
- `UPLOAD_DIR` — directory for uploaded banner/article images (default `uploads`)

---

## Authentication Flow

- Admin credentials are stored in `AdminUser` (`bcryptjs` hashed password).
- `POST /api/auth/login` verifies credentials in `auth.service.js`, issues a JWT, and sets an `httpOnly` cookie (`vida_cms_token`, `sameSite: lax`) while also returning `{ token, user }`.
- `requireAuth` (`src/middlewares/auth.middleware.js`) reads `vida_cms_token` cookie or `Authorization: Bearer <token>` header.
- All `POST`, `PATCH`, and `DELETE` endpoints (plus `GET /api/auth/me` and `POST /api/uploads`) require authentication.

---

## API Endpoints

### Health
- `GET /api/health` -> `{ success: true, status: "ok" }`

### Auth
- `POST /api/auth/login` — body `{ email, password }` -> `{ success: true, data: { token, user } }`
- `POST /api/auth/logout` — clears auth cookie
- `GET /api/auth/me` *(auth)* -> `{ success: true, data: user }`

### Uploads
- `POST /api/uploads` *(auth)* — `multipart/form-data` field `image` (JPEG/PNG/WebP/AVIF, max 5 MB) -> `{ success: true, data: { filename, originalName, mimeType, size, url } }`
- Uploaded files are served statically at `GET /uploads/:filename`.

### Promos (`/api/promos`)
- `GET /api/promos?active=true` -> list ordered by `sortOrder asc, createdAt desc`
- `POST /api/promos` *(auth)* — `{ title, imageUrl, imageAlt?, linkUrl?, sortOrder?, isActive? }`
- `PATCH /api/promos/:id` *(auth)* — partial update
- `DELETE /api/promos/:id` *(auth)*

### Article Categories (`/api/article-categories`)
- `GET /api/article-categories` -> list categories ordered by `sortOrder asc, name asc`
- `POST /api/article-categories` *(auth)* — `{ name, slug?, sortOrder? }`
- `DELETE /api/article-categories/:id` *(auth)*

### Articles (`/api/articles`)
- `GET /api/articles?published=true&category=...` -> list Healthpedia articles
- `GET /api/articles/:slugOrId` -> single article by `slug` or `id`
- `POST /api/articles` *(auth)* — `{ title, slug?, category, snippet, author, authorCredential?, readTime?, dateLabel?, imageUrl?, content: string[], sections?: Array<{ heading, body: string[] }>, keyTakeaways: string[], clinicalNote?, bookingCategory?, bookingOption?, isPublished? }`
- `PATCH /api/articles/:id` *(auth)* — partial update with slug uniqueness check in `article.service.js`
- `DELETE /api/articles/:id` *(auth)*

### Doctors & Poli (`/api/doctors`)
- `GET /api/doctors?active=true&poliCode=...` -> list doctors/poli ordered by `sortOrder asc`
- `POST /api/doctors` *(auth)* — `{ name, poliCode, poliName, specialistTag, schedule, location, description, focusAreas: string[], isActive?, sortOrder? }`
- `PATCH /api/doctors/:id` *(auth)* — partial update
- `DELETE /api/doctors/:id` *(auth)*

### Services (`/api/services`)
- `GET /api/services?active=true&category=vidaboost|vidahealth|vidafit|homecare|lab|vaksinasi|coe`
- `POST /api/services` *(auth)* — `{ category, slug?, name, subtitle?, tagline?, priceLabel?, durationMinutes?, badge?, description, features: string[], isActive?, sortOrder? }`
- `PATCH /api/services/:id` *(auth)* — partial update with slug uniqueness check in `service-package.service.js`
- `DELETE /api/services/:id` *(auth)*

---

## Service Responsibilities

- `auth.service.js`: email normalization, password verification via `bcryptjs`, JWT signing, profile lookup.
- `promo.service.js`: promo listing, existence checks, create/update/delete.
- `article.service.js`: slug normalization, duplicate slug enforcement (`409`), article CRUD.
- `doctor.service.js`: doctor/poli listing, existence checks, CRUD.
- `service-package.service.js`: service category package CRUD and slug uniqueness enforcement.
- `upload.service.js`: uploaded file metadata formatting and validation guard.
