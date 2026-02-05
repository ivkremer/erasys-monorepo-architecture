# Profile Images Module

A client which fetches profile data from the specific API and provides the array of profile pictures.

## Usage

```typescript
import { ProfileClient, type ProfilePicture } from '@repo/profile-images';

export const client = new ProfileClient({
  dataApiBaseUrl: '/your/api/opengrid/profiles',
  pictureBaseUrl: 'https://yourimageshost/img/usr/original/0x0',
});

let images: ProfilePicture[] = [];

try {
  images = await client.fetchProfileImages('profile-slug');
} catch (error) {
  // handle error
}
```

## Specs

```shell
# vitest installation is needed:
npm i
npm run test
```

## Other Scripts

1. `npm run dev` — starts the dev server.
2. `npm run build` — builds the production app.
3. `npm run preview` — runs the production build.
4. `npm run lint` — runs ESLint and checks for TypeScript integrity.
5. `npm run lint:fix` — same as `npm run lint` but fixes linting errors when possible.
6. `npm run prettier` — runs Prettier silently.
7. `npm run prettier:verbose` — runs Prettier with verbose output.

## [Comment for the reviewer]

Note that thanks to the `exports` section in `package.json` and overall architecture of this package, one cannot
import just anything from the secondary files e.g.,

```typescript
import { ProfileResponseSchema } from '@repo/profile-images/src/schemas';
```

This helps to avoid possible namespace pollution and encapsulate variables which are not meant to be used directly.
