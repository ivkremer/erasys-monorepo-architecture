# Next.js App

This is a simple Next.js app with Tailwind CSS which uses the [profile-images](../../packages/profile-images) package.

[See on prod](https://erasys-monorepo-architecture-web-ne-omega.vercel.app/).

## Getting Started

### TL;DR

```shell
npm i
npm run dev
open http://localhost:3000 # see the link in the output
```

### Details

While `profile-images` has its default values for the API URLs, you can specify your own with the local
[`.env`](./env):

```shell
PROFILE_DATA_API_URL='https://www.hunqz.com/api/opengrid/profiles'
PROFILE_PICTURE_API_URL='https://www.hunqz.com/img/usr/original/0x0'
```

The profile slug can also be sourced from `.env`. See the [`.env.example`](./env.example).

## Scripts

1. `npm run dev` — starts the Next.js dev server.
2. `npm run build` — builds the Next.js app.
3. `npm run start` — runs the production build.
4. `npm run lint` — runs ESLint and checks for TypeScript integrity.
5. `npm run lint:fix` — same as `npm run lint` but fixes linting errors when possible.
6. `npm run prettier` — runs Prettier silently.
7. `npm run prettier:verbose` — runs Prettier with verbose output.
