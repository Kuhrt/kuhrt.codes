'use client';

import { useEffect, useState } from 'react';

import { DESKTOP_SCREEN_THRESHOLD } from '@/constants/browser';

const DESKTOP_QUERY = `(min-width: ${DESKTOP_SCREEN_THRESHOLD}px)`;

/**
 * Reactive media-query check for the lg breakpoint.
 * Returns null on the server and first client render, before the viewport is known.
 */
export function useIsDesktop(): boolean | null {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const update = () => setIsDesktop(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  return isDesktop;
}
