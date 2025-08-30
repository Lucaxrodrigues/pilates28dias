'use client';

import { N8NTracker } from '@/components/n8n-tracker';
import { Suspense } from 'react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Suspense fallback={null}>
        <N8NTracker />
      </Suspense>
    </>
  );
}
