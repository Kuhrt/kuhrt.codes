import { describe, expect, it } from '@jest/globals';

import { cn } from '../styles';

describe('UTILS: styles', () => {
  describe('cn function', () => {
    it('should merge multiple class strings', () => {
      const result = cn('class1', 'class2', 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle empty strings and undefined values', () => {
      const result = cn('class1', '', undefined, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle null values', () => {
      const result = cn('class1', null, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle boolean values', () => {
      const result = cn('class1', true && 'class2', false && 'class3');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isDisabled = false;
      const result = cn(
        'base-class',
        isActive && 'active',
        isDisabled && 'disabled'
      );
      expect(result).toBe('base-class active');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle nested arrays', () => {
      const result = cn(['class1', ['class2', 'class3']], 'class4');
      expect(result).toBe('class1 class2 class3 class4');
    });

    it('should handle objects with boolean values', () => {
      const result = cn({
        'base-class': true,
        active: true,
        disabled: false,
        hidden: false
      });
      expect(result).toBe('base-class active');
    });

    it('should handle mixed input types', () => {
      const isActive = true;
      const classes = ['class1', 'class2'];
      const conditionalClass = isActive ? 'active' : 'inactive';

      const result = cn(
        'base',
        classes,
        conditionalClass,
        isActive && 'enabled',
        false && 'disabled'
      );

      expect(result).toBe('base class1 class2 active enabled');
    });

    it('should handle Tailwind CSS classes that need merging', () => {
      // Test that tailwind-merge functionality works
      const result = cn('px-4 py-2', 'px-6');
      // The result should have px-6 (overriding px-4) and py-2
      expect(result).toContain('px-6');
      expect(result).toContain('py-2');
      expect(result).not.toContain('px-4');
    });

    it('should return empty string for no inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle single input', () => {
      const result = cn('single-class');
      expect(result).toBe('single-class');
    });

    it('should handle whitespace-only strings', () => {
      const result = cn('  class1  ', '  class2  ');
      expect(result).toBe('class1 class2');
    });
  });
});
