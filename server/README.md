# Heritage Philippines V2 — server

Express + Prisma (PostgreSQL).

## Setup

```bash
cp .env.example .env
npm install
npx prisma generate
# once you have a running Postgres:
npx prisma migrate dev --name init
npm run dev
```

## Endpoints (placeholders)

- `GET /api/health`
- `GET /api/auth`
- `GET /api/users`
- `GET /api/quotes`
- `GET /api/packages`
- `GET /api/bookings`
- `GET /api/admin`

## Layout

```
src/
  config/       env + prisma client
  middleware/   notFound, errorHandler
  modules/      one folder per domain (auth, users, quotes, packages, bookings, admin)
  utils/        hash (argon2), tokens (jwt access + refresh)
prisma/
  schema.prisma User, RefreshToken, Package, QuoteRequest, Booking
```
