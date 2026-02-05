// This sitemap.ts demonstrates how sitemap.xml can be generated dynamically.

import fs from 'fs';
import path from 'path';
import { type MetadataRoute } from 'next';
import { getWebsiteUrl } from '@/lib/next-utils/getWebsiteUrl';

const PRIORITY_1 = 1;
const PRIORITY_2 = 0.75;

export const dynamic = 'force-static';
export const revalidate = 3600;

const APP_DIR = path.join(process.cwd(), 'app');

// Adjust as needed to ignore folders that should not produce pages:
const IGNORED_DIRECTORIES = new Set(['[...rest]', 'admin']);

// Dynamic segment like [id]:
const DYNAMIC_SEGMENT_REGEX = /\[(.*?)]/g;

const MANUAL_URLS: string[] = [
  // e.g., '/some/specific/static-page',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hrefs = getPages(APP_DIR)
    // Filter out any paths containing dynamic segments
    .filter((href) => !DYNAMIC_SEGMENT_REGEX.test(href));

  const allPages = [...hrefs, ...MANUAL_URLS];
  return allPages.map((href) => getEntry(href));
}

function getPages(dir: string, basePath = ''): string[] {
  let paths: string[] = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRECTORIES.has(entry.name)) {
        continue;
      }

      // Next.js route groups (e.g., (marketing)) should not appear in URLs
      const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')');
      const nextBase = isRouteGroup ? basePath : basePath ? path.join(basePath, entry.name) : entry.name;

      paths = paths.concat(getPages(fullPath, nextBase));
      continue;
    }

    if (entry.name === 'page.tsx') {
      const cleaned = basePath ? `/${basePath}` : '/';
      if (!paths.includes(cleaned)) {
        paths.push(cleaned);
      }
    }
  }

  return paths;
}

function getEntry(href: string): MetadataRoute.Sitemap[number] {
  const base = getWebsiteUrl();
  const url = `${base}${href}`;
  const priority = href === '/' ? PRIORITY_1 : PRIORITY_2;
  // Fixed date for demonstration purposes.
  const lastModified = '2026-02-05T17:30:10.500Z';

  return {
    url,
    priority,
    lastModified,
  };
}
