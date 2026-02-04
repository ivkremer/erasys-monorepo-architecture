import { PageLayout } from '@/components/layouts/PageLayout';

// Default meta tags are set in ./layout.tsx.

export default function Home() {
  return (
    // PageLayout has a default title which is the name of the website.
    <PageLayout>
      <p>Solution details go here.</p>
    </PageLayout>
  );
}
