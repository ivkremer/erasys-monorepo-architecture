import type { PropsWithChildren } from 'react';
import type { Metadata } from 'next';
import { WEBSITE_DESCRIPTION, WEBSITE_NAME, WEBSITE_TITLE_DIVISOR } from '@/constants';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: `%s ${WEBSITE_TITLE_DIVISOR} ${WEBSITE_NAME}`,
    default: WEBSITE_NAME,
  },
  icons: [
    {
      url: '/app_icons/180x180.png',
      sizes: '180x180',
      type: 'image/png',
      rel: 'apple-touch-icon',
    },
    {
      url: '/app_icons/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
      rel: 'icon',
    },
    {
      url: '/app_icons/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
      rel: 'icon',
    },
  ],
  description: WEBSITE_DESCRIPTION,
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
