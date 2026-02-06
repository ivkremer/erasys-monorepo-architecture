import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import { ProfilePicturesClient } from './client';
import { ProfileResponseSchema } from './schemas';
import { ApiResponseError, ResponseErrorCode } from './errors';

const mockDataApiBaseUrl = 'https://www.hunqz.com/api/opengrid/profiles';
const mockPictureBaseUrl = 'https://www.hunqz.com/img/usr/original/0x0';

let client: ProfilePicturesClient;

beforeEach(() => {
  client = new ProfilePicturesClient({
    dataApiBaseUrl: mockDataApiBaseUrl,
    pictureBaseUrl: mockPictureBaseUrl,
  });
});

type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
const jsonHeaders = { 'Content-Type': 'application/json' } as const;

describe('ProfilePicturesClient', () => {
  it('should return correctly mapped pictures', async () => {
    const fakeResponse: ProfileResponse = {
      pictures: [
        { url_token: 'abc123', width: 100, height: 200, id: '1' },
        { url_token: 'def456', width: 800, height: 400, id: '2' },
      ],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve(new Response(JSON.stringify(fakeResponse), { status: 200, headers: jsonHeaders })),
    );

    const pictures = await client.fetchProfilePictures('some-profile');

    expect(pictures).toEqual([
      { url: `${mockPictureBaseUrl}/abc123.jpg`, width: 100, height: 200, id: '1' },
      { url: `${mockPictureBaseUrl}/def456.jpg`, width: 800, height: 400, id: '2' },
    ]);

    expect(global.fetch).toHaveBeenCalledWith(`${mockDataApiBaseUrl}/some-profile`);
  });

  it('should throw ApiResponseError with BAD_HTTP_CODE on non-ok response', async () => {
    global.fetch = vi.fn(() => Promise.resolve(new Response(null, { status: 500 })));

    const error = await client.fetchProfilePictures('fail-profile').catch((e) => e as ApiResponseError);

    expect(error).toBeInstanceOf(ApiResponseError);
    expect((error as ApiResponseError).code).toBe(ResponseErrorCode.BAD_HTTP_CODE);
    expect((error as ApiResponseError).message).toContain('(HTTP 500)');
  });

  it('should throw ApiResponseError with INVALID_JSON on non-JSON response', async () => {
    global.fetch = vi.fn(() => Promise.resolve(new Response('<not>a JSON</not>', { status: 200 })));

    const error = await client.fetchProfilePictures('not-json-profile').catch((e) => e as ApiResponseError);

    expect(error).toBeInstanceOf(ApiResponseError);
    expect((error as ApiResponseError).code).toBe(ResponseErrorCode.INVALID_JSON);
  });

  it('should throw ApiResponseError with NETWORK on fetch failure', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Connection refused')));

    const error = await client.fetchProfilePictures('network-profile').catch((e) => e as ApiResponseError);

    expect(error).toBeInstanceOf(ApiResponseError);
    expect((error as ApiResponseError).code).toBe(ResponseErrorCode.NETWORK);
    expect((error as ApiResponseError).sourceError).toBeInstanceOf(Error);
    expect(((error as ApiResponseError).sourceError as Error)?.message).toBe('Connection refused');
  });

  it('should throw ApiResponseError with INVALID_API_RESPONSE on invalid schema', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ pictures: [{ url_token: 'abc123', width: '100px', height: 200, id: '1' }] }), {
          status: 200,
          headers: jsonHeaders,
        }),
      ),
    );

    const error = await client.fetchProfilePictures('bad-profile').catch((e) => e as ApiResponseError);

    expect(error).toBeInstanceOf(ApiResponseError);
    expect((error as ApiResponseError).code).toBe(ResponseErrorCode.INVALID_API_RESPONSE);
    expect((error as ApiResponseError).sourceError).toBeInstanceOf(Error);
  });

  it('should process url_token-only case', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({
            pictures: [{ url_token: 'abc123', width: 100, height: 200, id: '1' }, { url_token: 'NON_PLUS' }],
          }),
          {
            status: 200,
            headers: jsonHeaders,
          },
        ),
      ),
    );

    const pictures = await client.fetchProfilePictures('cool-profile');

    expect(pictures).toEqual([
      { url: `${mockPictureBaseUrl}/abc123.jpg`, width: 100, height: 200, id: '1' },
      { url: `${mockPictureBaseUrl}/NON_PLUS.jpg`, width: undefined, height: undefined, id: undefined },
    ]);
  });
});
