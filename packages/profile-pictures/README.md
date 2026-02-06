# Profile Images Module

A client which fetches profile data from the specific API and provides the array of profile pictures.

## Usage

```typescript
import { ProfilePicturesClient, type ProfilePicture } from '@repo/profile-pictures';

export const client = new ProfilePicturesClient({
  dataApiBaseUrl: '/your/api/opengrid/profiles',
  pictureBaseUrl: 'https://yourimageshost/img/usr/original/0x0',
});

let images: ProfilePicture[] = [];

try {
  images = await client.fetchProfilePictures('profile-slug');
} catch (error) {
  // handle error
}
```

## Specs

```shell
# vitest installation is needed:
npm i
```

```shell
npm run test
```

Debug specs (watch mode):

```shell
npm run test:dev
```

## Additional Notes

Note that thanks to the `exports` section in `package.json` and overall architecture of this package, one cannot
import just anything from the secondary files e.g.,

```typescript
import { ProfileResponseSchema } from '@repo/profile-pictures/src/schemas';
```

This helps to avoid possible namespace pollution and encapsulate variables which are not meant to be used directly.
