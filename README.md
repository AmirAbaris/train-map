# train-map

Frontend app that visualizes train stations in Germany on a Leaflet map. The app fetches data from the provided API, displays stations on the map, and allows filtering by city. Focus is on frontend logic, clean React code, and basic interaction.

**Stack:** Next.js, React, TanStack Query, Leaflet (react-leaflet), Vitest.

## Prerequisites

- Node.js 18+
- pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `pnpm dev`     | Start development server       |
| `pnpm build`   | Production build               |
| `pnpm start`   | Run production build           |
| `pnpm test`    | Run tests (watch mode)         |
| `pnpm test:run`| Run tests once (e.g. CI)       |
| `pnpm lint`    | Run ESLint                     |

## Project structure

- `app/` – Next.js app router (layout, page, providers)
- `features/` – map (Leaflet UI, station map, skeleton, error) and station (API, hooks, list, popup)
- `components/ui/` – shared UI primitives
- `lib/` – utilities (e.g. `cn`)

## Deploy

[Vercel](https://vercel.com) or any Node host. See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
