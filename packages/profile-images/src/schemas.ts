import { z } from 'zod';

const PictureApiSchema = z.object({
  url_token: z.string(),
  width: z.number(),
  height: z.number(),
  id: z.string(),
});

export const ProfileResponseSchema = z.object({
  pictures: z.array(PictureApiSchema),
});
