import { useEffect, useState } from 'react';
import { ApiResponseError, type ProfilePicture } from '@repo/profile-pictures';
import { profilePicturesClient } from '@/lib/clients/ProfilePictures.ts';

export const useProfilePictures = (slug: string) => {
  const [pictures, setPictures] = useState<ProfilePicture[]>([]);
  // Similar to the Next.js app, we can actually see exact error code and enhance functionality if needed e.g.,
  // display a "Refresh" button, describe errors differently at user convenience, etc.
  const [error, setError] = useState<ApiResponseError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    setIsLoading(true);
    setError(null);

    profilePicturesClient
      .fetchProfilePictures(slug)
      .then((data) => {
        if (!signal.aborted) {
          setPictures(data);
        }
      })
      .catch((error) => {
        if (!signal.aborted) {
          setError(error);
          // eslint-disable-next-line no-console
          console.error('Failed to fetch profile pictures:', error);
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

  return { pictures, error, isLoading };
};
