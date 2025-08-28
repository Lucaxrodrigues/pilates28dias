'use client';

import { N8NTracker } from '@/components/n8n-tracker';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <N8NTracker />
    </>
  );
}
