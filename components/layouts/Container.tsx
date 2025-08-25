import { HTMLAttributes } from 'react';

import { cn } from '@/utils/styles';

export default function Container(props: HTMLAttributes<HTMLDivElement>) {
  const { className, children, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={cn('relative px-2 max-w-7xl mx-auto z-30', className)}
    >
      {children}
    </div>
  );
}
