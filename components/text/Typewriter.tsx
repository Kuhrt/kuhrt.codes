'use client';

import { HTMLAttributes, useEffect, useRef, useState } from 'react';

/**
 * Typewriter component animates its text children as a typewriter effect.
 *
 * @param {string} props.children - The text to animate. Must be a string (text only).
 * @returns {JSX.Element} The animated typewriter text.
 */

export default function Typewriter(
  props: HTMLAttributes<HTMLParagraphElement>
) {
  const { children, ...restProps } = props;

  const [displayedText, setDisplayedText] = useState('');
  const currentIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!children || typeof children !== 'string')
      throw new Error('Children must be text only');

    setDisplayedText('');
    currentIndexRef.current = 0;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const typeNextChar = () => {
      if (currentIndexRef.current < children.length) {
        const nextChar = children[currentIndexRef.current];
        setDisplayedText((prev) => prev + nextChar);
        currentIndexRef.current++;

        const delay = 50 + Math.random() * 80;
        timeoutRef.current = setTimeout(typeNextChar, delay);
      }
    };

    typeNextChar();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [children]);

  return <p {...restProps}>{displayedText}</p>;
}
