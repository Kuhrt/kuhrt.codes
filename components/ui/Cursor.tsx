'use client';

import { useEffect, useRef } from 'react';

import { CURSOR_HOVER_DATA_ATTR } from '@/constants/cursor';
import {
  removeCursorEffectClasses,
  setCursorEffectClass
} from '@/utils/cursor';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      const { clientX, clientY } = e;
      cursorRef.current.style.left = `${clientX}px`;
      cursorRef.current.style.top = `${clientY}px`;
    };
    const handleMouseLeave = () =>
      removeCursorEffectClasses(cursorRef.current!);

    // CUSTOM CURSOR
    document.addEventListener('mousemove', handleMouseMove);

    // ELEMENT HOVER EFFECTS
    // Ensure we have the handlers for cleanup
    const mouseEnterElHandlers = new Map<Element, () => void>();
    const cursorHoverElements = document.querySelectorAll(
      `[${CURSOR_HOVER_DATA_ATTR}]`
    );
    cursorHoverElements.forEach((element) => {
      const mouseEnterHandler = () =>
        setCursorEffectClass(cursorRef.current!, element);
      mouseEnterElHandlers.set(element, mouseEnterHandler);

      element.addEventListener('mouseenter', mouseEnterHandler);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);

      mouseEnterElHandlers.forEach((handler, element) => {
        element.removeEventListener('mouseenter', handler);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className="cursor will-change-transform"
      id="cursor"
      ref={cursorRef}
    ></div>
  );
}
