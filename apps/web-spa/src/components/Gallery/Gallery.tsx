import { FailureAlert } from './FailureAlert.tsx';
import { useProfileImages } from './hooks.ts';
import { EAGER_LOADING_THRESHOLD, PROFILE_SLUG } from './constants.ts';

export const Gallery = () => {
  const { images, isError, isLoading } = useProfileImages(PROFILE_SLUG);

  if (isLoading) {
    return <FailureAlert>Loading images…</FailureAlert>;
  }

  if (isError) {
    return <FailureAlert>Failed to load images ):</FailureAlert>;
  }

  if (images.length === 0) {
    return <FailureAlert>There are no images at the moment.</FailureAlert>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map(({ id, url }, index) => (
        <li key={id} className="relative aspect-square overflow-hidden rounded-lg bg-muted shadow-sm">
          <a href={url} target="_blank" rel="noreferrer" className="absolute inset-0">
            <img
              src={url}
              alt={`Profile image (${index + 1})`}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform"
              loading={index < EAGER_LOADING_THRESHOLD ? 'eager' : 'lazy'}
              decoding="async"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};
