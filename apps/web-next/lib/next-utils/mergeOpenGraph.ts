import { type Metadata } from 'next';
import { WEBSITE_DESCRIPTION, WEBSITE_NAME } from '@/constants';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: WEBSITE_DESCRIPTION,
  // I decided not to add a default image here due to the context of the task.
  // But in real life, it could be the case. For that we can use `getWebsiteUrl.ts`.
  siteName: WEBSITE_NAME,
  title: WEBSITE_NAME,
  locale: 'en',
};

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => ({
  ...defaultOpenGraph,
  ...og,
});
