export const getWebsiteUrl = () => {
  if (typeof window !== 'undefined') {
    const { hostname, port, protocol } = window.location;

    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  }

  if (process.env.NEXT_PUBLIC_WEBSITE_URL) {
    return process.env.NEXT_PUBLIC_WEBSITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return 'http://localhost:3000';
};
