import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';

import {
  CURSOR_DATA_GLOW,
  CURSOR_DATA_HOVER,
  CURSOR_HOVER_DATA_ATTR
} from '@/constants/cursor';

import { removeCursorEffectClasses, setCursorEffectClass } from '../cursor';

describe('UTILS: cursor', () => {
  let mockCursorEl: HTMLElement;
  let mockHoverEl: Element;

  beforeEach(() => {
    // Create mock DOM elements for testing
    mockCursorEl = document.createElement('div');
    mockHoverEl = document.createElement('div');
  });

  afterEach(() => {
    // Clean up after each test
    mockCursorEl.className = '';
  });

  describe('setCursorEffectClass', () => {
    it('should add effect class when hover element has data-hover attribute', () => {
      const effectClass = 'custom-effect';
      mockHoverEl.setAttribute(CURSOR_HOVER_DATA_ATTR, effectClass);

      setCursorEffectClass(mockCursorEl, mockHoverEl);

      expect(mockCursorEl.classList.contains(effectClass)).toBe(true);
    });

    it('should not add any class when hover element has no data-hover attribute', () => {
      const initialClasses = mockCursorEl.className;

      setCursorEffectClass(mockCursorEl, mockHoverEl);

      expect(mockCursorEl.className).toBe(initialClasses);
    });

    it('should not add any class when data-hover attribute is empty string', () => {
      mockHoverEl.setAttribute(CURSOR_HOVER_DATA_ATTR, '');
      const initialClasses = mockCursorEl.className;

      setCursorEffectClass(mockCursorEl, mockHoverEl);

      expect(mockCursorEl.className).toBe(initialClasses);
    });

    it('should work with existing classes on cursor element', () => {
      mockCursorEl.classList.add('existing-class');
      mockHoverEl.setAttribute(CURSOR_HOVER_DATA_ATTR, 'new-effect');

      setCursorEffectClass(mockCursorEl, mockHoverEl);

      expect(mockCursorEl.classList.contains('existing-class')).toBe(true);
      expect(mockCursorEl.classList.contains('new-effect')).toBe(true);
    });
  });

  describe('removeCursorEffectClasses', () => {
    it('should remove hover and glow classes from cursor element', () => {
      // Add the classes that should be removed
      mockCursorEl.classList.add(CURSOR_DATA_HOVER);
      mockCursorEl.classList.add(CURSOR_DATA_GLOW);
      mockCursorEl.classList.add('other-class'); // This should remain

      removeCursorEffectClasses(mockCursorEl);

      expect(mockCursorEl.classList.contains(CURSOR_DATA_HOVER)).toBe(false);
      expect(mockCursorEl.classList.contains(CURSOR_DATA_GLOW)).toBe(false);
      expect(mockCursorEl.classList.contains('other-class')).toBe(true);
    });

    it('should work when cursor element has no effect classes', () => {
      const initialClasses = mockCursorEl.className;

      removeCursorEffectClasses(mockCursorEl);

      expect(mockCursorEl.className).toBe(initialClasses);
    });

    it('should work when cursor element has only one effect class', () => {
      mockCursorEl.classList.add(CURSOR_DATA_HOVER);

      removeCursorEffectClasses(mockCursorEl);

      expect(mockCursorEl.classList.contains(CURSOR_DATA_HOVER)).toBe(false);
    });

    it('should preserve other classes when removing effect classes', () => {
      mockCursorEl.classList.add('preserved-class');
      mockCursorEl.classList.add(CURSOR_DATA_HOVER);
      mockCursorEl.classList.add(CURSOR_DATA_GLOW);

      removeCursorEffectClasses(mockCursorEl);

      expect(mockCursorEl.classList.contains('preserved-class')).toBe(true);
      expect(mockCursorEl.classList.contains(CURSOR_DATA_HOVER)).toBe(false);
      expect(mockCursorEl.classList.contains(CURSOR_DATA_GLOW)).toBe(false);
    });
  });
});
