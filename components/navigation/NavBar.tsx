import Link from 'next/link';

import { CURSOR_DATA_HOVER } from '@/constants/cursor';

// TODO: Maybe add navigation menu
// TODO: Definitely add animated transition to the first link that changes based on the section
export default function NavBar() {
  return (
    <div className="flex items-center gap-4 w-full px-4 py-2">
      <Link
        href="/"
        className="text-foreground font-display text-xl font-black uppercase"
        data-hover={CURSOR_DATA_HOVER}
      >
        Kuhrt Cowan
      </Link>
    </div>
  );
}
