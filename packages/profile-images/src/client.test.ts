import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import { ProfileClient } from './client';
import { ProfileResponseSchema } from './schemas';
import { ApiResponseError, ResponseErrorCode } from './errors';

const mockDataApiBaseUrl = 'https://www.hunqz.com/api/opengrid/profiles';
const mockPictureBaseUrl = 'https://www.hunqz.com/img/usr/original/0x0';

let client: ProfileClient;

beforeEach(() => {
  client = new ProfileClient({
    dataApiBaseUrl: mockDataApiBaseUrl,
    pictureBaseUrl: mockPictureBaseUrl,
  });
});

type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
const jsonHeaders = { 'Content-Type': 'application/json' } as const;

describe('ProfileClient', () => {
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

    const pictures = await client.fetchProfileImages('some-profile');

    expect(pictures).toEqual([
      { url: `${mockPictureBaseUrl}/abc123.jpg`, width: 100, height: 200, id: '1' },
      { url: `${mockPictureBaseUrl}/def456.jpg`, width: 800, height: 400, id: '2' },
    ]);

    expect(global.fetch).toHaveBeenCalledWith(`${mockDataApiBaseUrl}/some-profile`);
  });

  it('should throw ApiResponseError with BAD_HTTP_CODE on non-ok response', async () => {
    global.fetch = vi.fn(() => Promise.resolve(new Response(null, { status: 500 })));

    try {
      await client.fetchProfileImages('fail-profile');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiResponseError);
      if (error instanceof ApiResponseError) {
        expect(error.code).toBe(ResponseErrorCode.BAD_HTTP_CODE);
        expect(error.message).toContain('fail-profile');
      }
    }
  });

  it('should throw ApiResponseError with INVALID_JSON on non-JSON response', async () => {
    global.fetch = vi.fn(() => Promise.resolve(new Response('<not>a JSON</not>', { status: 200 })));

    try {
      await client.fetchProfileImages('json-profile');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiResponseError);
      if (error instanceof ApiResponseError) {
        expect(error.code).toBe(ResponseErrorCode.INVALID_JSON);
      }
    }
  });

  it('should throw ApiResponseError with NETWORK on fetch failure', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Connection refused')));

    try {
      await client.fetchProfileImages('network-profile');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiResponseError);
      if (error instanceof ApiResponseError) {
        expect(error.code).toBe(ResponseErrorCode.NETWORK);
        expect(error.sourceError).toBeInstanceOf(Error);
        expect((error.sourceError as Error)?.message).toBe('Connection refused');
      }
    }
  });

  it('should throw ApiResponseError with INVALID_API_RESPONSE on invalid schema', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ url_token: 'abc123', width: '100px', height: 200, id: '1' }), {
          status: 200,
          headers: jsonHeaders,
        }),
      ),
    );

    try {
      await client.fetchProfileImages('bad-profile');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiResponseError);
      expect((error as ApiResponseError).code).toBe(ResponseErrorCode.INVALID_API_RESPONSE);
      expect((error as ApiResponseError).sourceError).toBeInstanceOf(Error);
    }
  });
});
