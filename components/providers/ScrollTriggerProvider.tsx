'use client';

import { ReactNode, useMemo } from 'react';

import { useScrollTrigger } from '@/hooks/scroll/useScrollTrigger';

interface ScrollTriggerProviderProps {
  children: ReactNode;
}

export default function ScrollTriggerProvider({
  children
}: ScrollTriggerProviderProps) {
  const sections = useMemo(
    () => [
      { id: 'intro', title: '' },
      { id: 'philosophy', title: 'Philosophy' },
      { id: 'skills', title: 'Skills' },
      { id: 'footer', title: 'Contact' }
    ],
    []
  );

  useScrollTrigger({
    sections,
    onSectionChange: () => {
      // Optional: Add any additional logic when sections change
    }
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
