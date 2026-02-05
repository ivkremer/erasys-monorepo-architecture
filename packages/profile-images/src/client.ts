import { z } from 'zod';
import { ProfileResponseSchema } from './schemas';
import { ApiResponseError, ResponseErrorCode } from './errors';

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
   * Returns a promise resolved with profile pictures (array).
   *
   * @param {string} profileSlug
   * @throws {ApiResponseError} in case of failed request or invalid API response.
   * @return Promise<ProfilePicture[]>
   * @see ApiResponseError
   */
  async fetchProfileImages(profileSlug: string): Promise<ProfilePicture[]> {
    let res: Response;

    try {
      res = await fetch(`h${this.dataApiBaseUrl}/${profileSlug}`);
    } catch (error) {
      throw new ApiResponseError(
        ResponseErrorCode.NETWORK,
        `Network error while fetching profile '${profileSlug}'.`,
        error,
      );
    }

    if (!res.ok) {
      throw new ApiResponseError(
        ResponseErrorCode.BAD_HTTP_CODE,
        `Failed to fetch profile data for '${profileSlug}' (HTTP ${res.status}).`,
      );
    }

    let rawJson: unknown;

    try {
      rawJson = await res.json();
    } catch (error) {
      throw new ApiResponseError(ResponseErrorCode.INVALID_JSON, `Invalid JSON returned for '${profileSlug}'.`, error);
    }

    let data: z.infer<typeof ProfileResponseSchema>;

    try {
      data = ProfileResponseSchema.parse(rawJson);
    } catch (error) {
      throw new ApiResponseError(
        ResponseErrorCode.INVALID_API_RESPONSE,
        `Invalid API response for '${profileSlug}'.`,
        error,
      );
    }

    return data.pictures.map(({ url_token, width, height, id }) => ({
      url: `${this.pictureBaseUrl}/${url_token}.jpg`,
      id,
      width,
      height,
    }));
  }
}
