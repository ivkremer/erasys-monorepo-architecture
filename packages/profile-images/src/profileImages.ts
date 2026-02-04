import { z } from 'zod';
import { dataApiBaseUrl, pictureBaseUrl } from './constants';

const PictureApiSchema = z.object({
  url_token: z.string(),
  width: z.number(),
  height: z.number(),
  id: z.string(),
});

const ProfileResponseSchema = z.object({
  pictures: z.array(PictureApiSchema),
});

export type ProfilePicture = {
  url: string;
  width: number;
  height: number;
  id: string;
};

/**
 * Returns a promise with profile pictures (array).
 *
 * @param {string} profileSlug
 * @throws {Error} in case of failed request or invalid API response.
 * @return Promise<ProfilePicture[]>
 */
export const fetchProfileImages = async (profileSlug: string): Promise<ProfilePicture[]> => {
  const res = await fetch(`${dataApiBaseUrl}/${profileSlug}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch profile data for '${profileSlug}'.`);
  }

  const data = ProfileResponseSchema.parse(await res.json());

  return data.pictures.map(({ url_token, width, height, id }) => ({
    url: `${pictureBaseUrl}/${url_token}.jpg`,
    id,
    width,
    height,
  }));
};
