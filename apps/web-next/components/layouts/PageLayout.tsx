import type { PropsWithChildren } from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { WEBSITE_NAME } from '@/constants';

type Props = {
  title?: string;
} & PropsWithChildren;

export const PageLayout = async ({ children, title }: Props) => (
  <>
    <Header />
    <main className="w-full max-w-7xl mx-auto px-4 mt-6 flex flex-col flex-grow-1">
      <h1>{title || WEBSITE_NAME}</h1>
      <div className="flex-grow-1 mt-2">{children}</div>
      <div className="my-4">
        <hr className="shadow-xs shadow-shadow mt-2" />
        <Footer />
      </div>
    </main>
  </>
);
