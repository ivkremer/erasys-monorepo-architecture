import Link from 'next/link';

export const Header = () => (
  <header className="sticky top-0 z-50 shadow-md shadow-shadow bg-sidebar py-4">
    <div className="w-full h-full max-w-7xl mx-auto px-4 flex items-center gap-4">
      <div className="w-8 h-full max-sm:flex-1">
        <Link href="/" className="uppercase no-underline">
          Home
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        {/* If there were more menu items, this container could be limited or hidden on mobile. */}
        <Link href="/gallery" className="no-underline">
          Gallery
        </Link>
      </div>
      {/* Mobile navigation (e.g., drawer) can be below alternatively to the current implementation. */}
    </div>
  </header>
);
