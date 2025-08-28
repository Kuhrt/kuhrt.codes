import {
  CURSOR_DATA_GLOW,
  CURSOR_DATA_HOVER,
  CURSOR_HOVER_DATA_ATTR
} from '@/constants/cursor';

export const setCursorEffectClass = (
  cursorEl: HTMLElement,
  hoverEl: Element
) => {
  const effectClass = hoverEl.getAttribute(CURSOR_HOVER_DATA_ATTR);
  if (!effectClass) return;

  cursorEl.classList.add(effectClass);
};

export const removeCursorEffectClasses = (cursorEl: HTMLElement) => {
  cursorEl.classList.remove(CURSOR_DATA_HOVER);
  cursorEl.classList.remove(CURSOR_DATA_GLOW);
};
