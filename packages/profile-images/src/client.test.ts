import { describe, it, expect, vi, beforeEach } from 'vitest';
import { z } from 'zod';
import { ProfileClient } from './client';
import { ProfileResponseSchema } from './schemas';

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
      {
        url: 'https://www.hunqz.com/img/usr/original/0x0/abc123.jpg',
        width: 100,
        height: 200,
        id: '1',
      },
      {
        url: 'https://www.hunqz.com/img/usr/original/0x0/def456.jpg',
        width: 800,
        height: 400,
        id: '2',
      },
    ]);

    expect(global.fetch).toHaveBeenCalledWith(`${mockDataApiBaseUrl}/some-profile`);
  });

  it('should throw on non-ok response', async () => {
    global.fetch = vi.fn(() => Promise.resolve(new Response(null, { status: 500 })));

    await expect(client.fetchProfileImages('fail-profile')).rejects.toThrow(
      'Failed to fetch profile data for \'fail-profile\'.',
    );
  });

  it('should throw on non-JSON response', async () => {
    global.fetch = vi.fn(() => Promise.resolve(new Response('<not>a JSON</not>', { status: 200 })));

    await expect(client.fetchProfileImages('fail-profile')).rejects.toThrow(
      'Invalid JSON returned for \'fail-profile\'.',
    );
  });

  it('should throw on invalid API response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        // Pay attention to `width` — it should be a number, such an API response should cause an error:
        new Response(JSON.stringify({ url_token: 'abc123', width: '100px', height: 200, id: '1' }), {
          status: 200,
          headers: jsonHeaders,
        }),
      ),
    );

    await expect(client.fetchProfileImages('bad-profile')).rejects.toThrow();
  });
});
