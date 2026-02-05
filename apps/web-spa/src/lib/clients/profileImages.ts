import { ProfileClient } from '@repo/profile-images';

export const profileImagesClient = new ProfileClient({
  dataApiBaseUrl: '/api/profiles',
  pictureBaseUrl: 'https://www.hunqz.com/img/usr/original/0x0',
});
