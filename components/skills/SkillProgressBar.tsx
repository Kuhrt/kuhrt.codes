import { cn } from '@/utils/styles';

interface Props {
  className?: string;
  level: number;
  max?: number;
}

export default function SkillProgressBar({
  className,
  level,
  max = 10
}: Props) {
  return (
    <div
      className={cn(
        'relative w-full h-2 bg-background rounded-full',
        className
      )}
    >
      <p className="text-[8px] text-background font-mono font-bold absolute top-1/2 left-1/2 -translate-1/2">
        {Math.floor((level / max) * 100)}%
      </p>
      <div
        className="h-full bg-linear-to-r from-primary to-secondary rounded-full transition-all duration-1000"
        style={{ width: `${(level / max) * 100}%` }}
      />
    </div>
  );
}
