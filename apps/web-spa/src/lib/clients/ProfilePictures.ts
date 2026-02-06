import { ProfilePicturesClient } from '@repo/profile-pictures';

export const profilePicturesClient = new ProfilePicturesClient({
  dataApiBaseUrl: '/api/profiles',
  pictureBaseUrl: 'https://www.hunqz.com/img/usr/original/0x0',
});
