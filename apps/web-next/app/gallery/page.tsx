import { fetchProfileImages, getPictureUrl } from '@repo/profile-images';
import { PageLayout } from '@/components/layouts/PageLayout';
import { ImagesGrid } from './_components/ImagesGrid';
import { PROFILE_SLUG } from './constants';

export const dynamic = 'force-static';
export const revalidate = 3600;

const PAGE_TITLE = 'Gallery';

export const metadata = {
  title: PAGE_TITLE,
  description: `${PROFILE_SLUG}’s profile pictures.`,
};

export default async function Home() {
  let images: string[] = [];

  try {
    const response = await fetchProfileImages(PROFILE_SLUG);
    images = response.pictures.map(({ url_token }) => getPictureUrl(url_token));
  } catch (_) {
    // notFound(); can be called here alternatively to the current implementation.
  }

  return (
    <PageLayout title={PAGE_TITLE}>
      <ImagesGrid images={images} />
    </PageLayout>
  );
}
