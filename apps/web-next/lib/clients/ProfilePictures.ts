import { ProfilePicturesClient } from '@repo/profile-pictures';

export const profilePicturesClient = new ProfilePicturesClient({
  dataApiBaseUrl: process.env.PROFILE_DATA_API_URL ?? 'https://www.hunqz.com/api/opengrid/profiles',
  pictureBaseUrl: process.env.PROFILE_PICTURE_API_URL ?? 'https://www.hunqz.com/img/usr/original/0x0',
});
