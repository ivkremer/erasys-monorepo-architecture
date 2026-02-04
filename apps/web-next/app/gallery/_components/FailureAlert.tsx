import type { PropsWithChildren } from 'react';

export const FailureAlert = ({ children }: PropsWithChildren) => (
  <div className="flex items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground h-48">
    <p>{children}</p>
  </div>
);
