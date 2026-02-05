# Vite App

This is a simple Vite (React + TypeScript) app with Tailwind CSS which uses
the [profile-images](../../packages/profile-images) package.

[See on prod](https://erasys-monorepo-architecture-web-sp.vercel.app/) (Hosted on Vercel).

## Getting Started

```shell
npm i
npm run dev
open http://localhost:5173/ # see the link in the output
```

It’s possible to source the profile slug from your `.env`:

```shell
VITE_PROFILE_SLUG="profile-slug-value"
```

See [`.env.example`](.env.example).

## Other Scripts

1. `npm run dev` — starts the dev server.
2. `npm run build` — builds the production app.
3. `npm run preview` — production build preview.
4. `npm run lint` — runs ESLint and checks for TypeScript integrity.
5. `npm run lint:fix` — same as `npm run lint` but fixes linting errors when possible.
6. `npm run prettier` — runs Prettier silently.
7. `npm run prettier:verbose` — runs Prettier with verbose output.
