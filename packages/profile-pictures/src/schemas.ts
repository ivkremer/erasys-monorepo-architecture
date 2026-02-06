import { z } from 'zod';

const PictureApiSchema = z.object({
  url_token: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  id: z.string().optional(),
});

export const ProfileResponseSchema = z.object({
  pictures: z.array(PictureApiSchema),
});
