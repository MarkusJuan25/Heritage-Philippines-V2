# Heritage Philippines V2 — client

React + Vite, Tailwind, TanStack Query, Zustand, React Router, Axios, Framer Motion.

## Setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

## Layout

```
src/
  app/          App shell + global providers
  components/   shared UI primitives
  features/     auth / quotes / packages / member / admin (feature-scoped code lives here)
  layouts/      PublicLayout, MemberLayout, AdminLayout
  pages/        route components
  routes/       AppRoutes
  services/     apiClient (axios), queryClient (TanStack Query)
  store/        zustand stores (authStore)
  styles/       tailwind entry
  utils/        small helpers (cn)
```

## Routes

`/`, `/packages`, `/gallery`, `/stories`, `/about`,
`/member`, `/member/journey`, `/member/bookings`, `/member/documents`,
`/admin`.
