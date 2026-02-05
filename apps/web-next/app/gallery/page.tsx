import { cache } from 'react';
import { type Metadata } from 'next';
import { fetchProfileImages, type ProfilePicture } from '@repo/profile-images';
import { mergeOpenGraph } from '@/lib/next-utils/mergeOpenGraph';
import { PageLayout } from '@/components/layouts/PageLayout';
import { ImagesGrid } from './_components/ImagesGrid';
import { PROFILE_SLUG } from './constants';

const getProfileImages = cache(async (slug: string): Promise<ProfilePicture[]> => fetchProfileImages(slug));

export const dynamic = 'force-static';
export const revalidate = 3600;

const PAGE_TITLE = 'Gallery';

export async function generateMetadata(): Promise<Metadata> {
  let images: ProfilePicture[] = [];

  try {
    images = await getProfileImages(PROFILE_SLUG);
  } catch {
    // In this case we can just skip any changes.
    // But otherwise, we could alter the metadata here.
  }

  const metaCore = {
    title: PAGE_TITLE,
    description: `${PROFILE_SLUG}’s profile pictures.`,
  };

  const firstImage = images[0];

  return {
    ...metaCore,
    openGraph: mergeOpenGraph({
      ...metaCore,
      images: firstImage
        ? [
            {
              url: firstImage.url,
              width: firstImage.width,
              height: firstImage.height,
            },
          ]
        : undefined,
    }),
  };
}

export default async function Home() {
  let images: ProfilePicture[] = [];
  let isError = false;

  try {
    images = await getProfileImages(PROFILE_SLUG);
  } catch {
    isError = true;
    // notFound(); can be called here alternatively to the current implementation.
  }

  return (
    <PageLayout title={PAGE_TITLE}>
      <ImagesGrid images={images} error={isError} />
    </PageLayout>
  );
}
