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

## [Comment for the reviewer]

Note, that thanks to the `exports` section in `package.json` and overall architecture of this package, one cannot
import just anything from the rest of the files (if any) e.g.,

```javascript
import { someExport } from '@repo/profile-images/src/some-file';
```

This helps to avoid possible namespace pollution and encapsulate variables which are not meant to be used directly.
