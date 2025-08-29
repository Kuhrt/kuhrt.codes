import { SMALL_SCREEN_THRESHOLD } from '@/constants/browser';

export const isBrowser = () => typeof window !== 'undefined';

export const isSmallScreen = () =>
  isBrowser() && window.innerWidth < SMALL_SCREEN_THRESHOLD;
