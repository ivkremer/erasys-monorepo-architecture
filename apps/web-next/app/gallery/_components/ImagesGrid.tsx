import Image from 'next/image';

type Props = {
  images: string[];
};

export const ImagesGrid = ({ images }: Props) => {
  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground h-48">
        <p>No images to display ):</p>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((imageUrl) => (
        <li key={imageUrl} className="relative aspect-square overflow-hidden rounded-lg bg-muted shadow-sm">
          <a href={imageUrl} target="_blank" rel="noreferrer">
            <Image
              src={imageUrl}
              alt="Profile image"
              fill
              className="object-cover object-center hover:scale-105 transition-transform"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />
          </a>
        </li>
      ))}
    </ul>
  );
};
