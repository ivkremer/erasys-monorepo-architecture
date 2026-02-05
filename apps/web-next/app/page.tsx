import { PageLayout } from '@/components/layouts/PageLayout';

// Default meta tags are set in ./layout.tsx.

export default function Home() {
  return (
    // PageLayout has a default title which is the name of the website.
    <PageLayout>
      <p>Here are some comments regarding design choices, and more.</p>
      <h2>Pages</h2>
      <p>
        There are two pages in this app — this one (Home) and <code>/gallery</code> to better demonstrate the SEO
        functionality.
      </p>
      <p>
        For example, while both pages are statically generated, the <code>/gallery</code> page has one-hour validity
        period and hence, will be re-generated automatically if the remote data changes.
      </p>
      <h2>Configuration</h2>
      <p>
        As written in <code>README.md</code>, the profile slug (like <code>msescortplus</code>) and API URLs are
        defaulted as hardcoded constants but could be easily sourced from the local or production <code>.env</code>{' '}
        file. The same is implemented for the Vite app.
      </p>
      <h2>Performance</h2>
      <p>
        There are no arbitrary dependencies in both this and Vite applications. The system theme is used for the
        interface.
      </p>
      <p>
        Images loading is highly optimized. There is a threshold for amount of images which are going to be loaded in
        the <code>eager</code> mode. It helps to display at least some first images (defaulted to 4 currently) as fast
        as possible at poor bandwidth connections. With 64 Kbps (e.g., EDGE) throttling available it’s clearly visible.
      </p>
      <p>
        Chrome’s Lighthouse audit shows 100/100/100/100 scores for the <code>/gallery</code> page.
      </p>
    </PageLayout>
  );
}
