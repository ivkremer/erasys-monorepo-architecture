import { type PropsWithChildren } from 'react';

export const FailureAlert = ({ children }: PropsWithChildren) => (
  <div className="flex items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground h-48 transition-opacity duration-500 fade-in-delay">
    <p>{children}</p>
  </div>
);
