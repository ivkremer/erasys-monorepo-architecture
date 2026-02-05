export const Header = () => (
  <header className="sticky top-0 z-50 shadow-md shadow-shadow bg-sidebar py-4">
    <div className="w-full h-full max-w-7xl mx-auto px-4 flex items-center gap-4">
      <div className="w-8 h-full max-sm:flex-1">
        <a href="/" className="uppercase">
          Home
        </a>
      </div>
      {/* In contrast to the Next.js app, I revomed everything from here to keep it simple. */}
    </div>
  </header>
);
