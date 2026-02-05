import { type MetadataRoute } from 'next';
import { getWebsiteUrl } from '@/lib/next-utils/getWebsiteUrl';

export const dynamic = 'force-static';
export const revalidate = 3600;

// Example of how robots.txt can be generated dynamically based on the environment.
export default function RobotsTxt(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/api/*', '*/admin/'],
    },
    sitemap: `${getWebsiteUrl()}/sitemap.xml`,
  };
}
