import { useEffect, useState } from 'react';
import { type ProfilePicture } from '@repo/profile-images';
import { profileImagesClient } from '@/lib/clients/profileImages';

export const useProfileImages = (slug: string) => {
  const [images, setImages] = useState<ProfilePicture[]>([]);
  // Similar to the Next.js app, we can actually see exact error code and enhance functionality if needed e.g.,
  // display a "Refresh" button, describe errors differently at user convenience, etc.
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setIsLoading(true);
    setIsError(false);

    profileImagesClient
      .fetchProfileImages(slug)
      .then((data) => {
        if (!signal.aborted) {
          setImages(data);
        }
      })
      .catch((error) => {
        if (!signal.aborted) {
          setIsError(true);
          // eslint-disable-next-line no-console
          console.error('Failed to fetch profile images:', error);
        }
      })
      .finally(() => {
        if (!signal.aborted) {
          setIsLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [slug]);

  return { images, isError, isLoading };
};
