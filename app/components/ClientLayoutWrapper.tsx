'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

const StagewiseToolbarWrapper = dynamic(
  () => import('./StagewiseToolbar'),
  { ssr: false }
);

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <>
      <StagewiseToolbarWrapper />
      {children}
    </>
  );
} 