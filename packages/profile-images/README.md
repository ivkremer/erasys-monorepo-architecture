# Profile Images Module

Fetches profile data from the public API and provides the array of profile pictures.

## Prerequisites

This package relies on the following environment variables:

```shell
PROFILE_DATA_API_URL='https://hunqz.com/api/opengrid/profiles'
PROFILE_PICTURE_API_URL='https://hunqz.com/img/usr/original/0x0'
```

When not provided, the module falls back to the default values.

## Usage

```typescript
import { fetchProfileImages, type ProfilePicture } from '@repo/profile-images';

let images: ProfilePicture[] = [];

try {
  images = await fetchProfileImages(PROFILE_SLUG);
} catch (error) {
  // handle error
}
```

## [Comment for the reviewer]

Note, that thanks to the `exports` section in `package.json` and overall architecture of this package, one cannot import
the constants directly from the module:

```javascript
import { dataApiBaseUrl } from '@repo/profile-images/src/constants';
```

This helps to avoid possible namespace pollution and encapsulate variables which are not meant to be used directly.
