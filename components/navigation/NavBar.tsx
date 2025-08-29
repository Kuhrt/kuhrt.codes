'use client';

import { CURSOR_DATA_HOVER } from '@/constants/cursor';
import useScrollStore from '@/stores/scrollStore';

import AnimatedTitle from '../text/AnimatedTitle';

// TODO: Maybe add navigation menu
export default function NavBar() {
  const { currentSection } = useScrollStore();

  const onNameClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-background lg:bg-transparent transition-colors flex items-center gap-4 w-full px-4 py-2">
      <button
        type="button"
        className="text-foreground font-display text-xl font-black uppercase flex items-center"
        data-hover={CURSOR_DATA_HOVER}
        onClick={onNameClick}
      >
        Kuhrt Cowan
        <span
          className={`transition-all duration-500 mx-2 ${!!currentSection?.title ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}`}
        >
          &middot;
        </span>
        <AnimatedTitle title={currentSection?.title ?? ''} />
      </button>
    </div>
  );
}
