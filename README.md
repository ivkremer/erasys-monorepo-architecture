# Erasys Monorepo Architecture

This is a [`turbo`](https://turborepo.dev)-powered monorepo.

## Prerequisites

Please make sure you have Node.js version `>=20.19` installed as the Next.js app requires Node.js version `>=20.9` to
run smoothly and Vite app requires Node.js version `>=20.19`.

## Getting Started

```shell
npm i
```

Run the [Next.js](./apps/web-next) app:

```shell
npm run dev:next
```

Run the [Vite](./apps/web-spa) app:

```shell
npm run dev:spa
```

See the shared [`profile-images`](./packages/profile-images) package.

Run its specs:

```shell
npm run test
```

## Shared Module

The shared module is completely agnostic towards any frameworks/environments. But it provides a very reliable way to
work with the specified API.

## Available Scripts

1. `npm run build` — builds all apps and packages.
2. `npm run test` — runs all existing tests.
3. `npm run lint` — runs ESLint and checks for TypeScript integrity.
4. `npm run lint:fix` — same as `npm run lint` but fixes linting errors when possible.
5. `npm run prettier` — runs Prettier silently.
6. `npm run prettier:verbose` — runs Prettier with verbose output.

## Comments

[ESLint](https://eslint.org) and [Prettier](https://prettier.io) are used for linting and formatting within this repo to
keep the code consistent.

[Husky](https://typicode.github.io/husky) is also used to run the required checks at commit and push time.

Additional `Node.js` [scripts](./scripts) are used for convenience — when a developer wants to jump into a specific app
right away and start working from there without running `npm i` from the root.
