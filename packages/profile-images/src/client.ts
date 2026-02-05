import { ProfileResponseSchema } from './schemas';

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

    let rawJson: unknown;

    try {
      rawJson = await res.json();
    } catch (error) {
      throw new Error(`Invalid JSON returned for '${profileSlug}'.`);
    }

    const data = ProfileResponseSchema.parse(rawJson);

    return data.pictures.map(({ url_token, width, height, id }) => ({
      url: `${this.pictureBaseUrl}/${url_token}.jpg`,
      id,
      width,
      height,
    }));
  }
}
