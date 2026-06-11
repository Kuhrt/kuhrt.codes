interface Props {
  constraints: string[];
}

export default function ConstraintList({ constraints }: Props) {
  if (constraints.length === 0) return null;

  return (
    <ul className="mt-3 space-y-1">
      {constraints.map((constraint) => (
        <li key={constraint} className="text-xs text-muted flex items-start gap-2">
          <span className="text-primary mt-0.5 shrink-0">&bull;</span>
          {constraint}
        </li>
      ))}
    </ul>
  );
}
