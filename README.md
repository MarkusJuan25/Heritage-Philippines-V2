# Heritage Philippines V2

Two-package workspace: `client/` (React + Vite) and `server/` (Express + Prisma/PostgreSQL).

This is the initial foundation only — no UI migration from V1 yet, no full auth implementation yet.

## Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, TanStack Query, Zustand, Axios, React Router.
**Backend:** Node.js, Express, PostgreSQL, Prisma, Argon2, JSON Web Tokens (access + refresh).

## Quick start

```bash
# in client/
cp .env.example .env.local
npm install
npm run dev

# in server/
cp .env.example .env
npm install
npx prisma generate
npm run dev
```

See each package's README for details.
