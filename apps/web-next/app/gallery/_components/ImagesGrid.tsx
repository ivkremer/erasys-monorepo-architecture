import Image from 'next/image';
import type { ProfilePicture } from '@repo/profile-pictures';
import { FailureAlert } from './FailureAlert';
import { EAGER_LOADING_THRESHOLD } from './constants';

type Props = {
  pictures: ProfilePicture[];
  error: boolean;
};

export const ImagesGrid = ({ pictures, error }: Props) => {
  if (error) {
    return <FailureAlert>Failed to load images ):</FailureAlert>;
  }

  if (pictures.length === 0) {
    return <FailureAlert>There are no images at the moment.</FailureAlert>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pictures
        .filter(({ id }) => id)
        .map(({ id, url }, index) => (
          <li key={id} className="relative aspect-square overflow-hidden rounded-lg bg-muted shadow-sm">
            <a href={url} target="_blank" rel="noreferrer" className="absolute inset-0">
              <Image
                src={url}
                alt={`Profile image (${index + 1})`}
                fill
                className="object-cover object-center hover:scale-105 transition-transform"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading={index < EAGER_LOADING_THRESHOLD ? 'eager' : 'lazy'}
                preload={index < EAGER_LOADING_THRESHOLD}
                decoding="async"
              />
            </a>
          </li>
        ))}
    </ul>
  );
};
