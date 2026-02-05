import { z } from 'zod';

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

export type ProfileClientConfig = {
  dataApiBaseUrl: string;
  pictureBaseUrl: string;
};

export class ProfileClient {
  private readonly dataApiBaseUrl: string;
  private readonly pictureBaseUrl: string;

  constructor(config: ProfileClientConfig) {
    this.dataApiBaseUrl = config.dataApiBaseUrl;
    this.pictureBaseUrl = config.pictureBaseUrl;
  }

  /**
   * Returns a promise with profile pictures (array).
   *
   * @param {string} profileSlug
   * @throws {Error} in case of failed request or invalid API response.
   * @return Promise<ProfilePicture[]>
   */
  async fetchProfileImages(profileSlug: string): Promise<ProfilePicture[]> {
    const res = await fetch(`${this.dataApiBaseUrl}/${profileSlug}`);

    if (!res.ok) {
      throw new Error(`Failed to fetch profile data for '${profileSlug}'.`);
    }

    const data = ProfileResponseSchema.parse(await res.json());

    return data.pictures.map(({ url_token, width, height, id }) => ({
      url: `${this.pictureBaseUrl}/${url_token}.jpg`,
      id,
      width,
      height,
    }));
  }
}
