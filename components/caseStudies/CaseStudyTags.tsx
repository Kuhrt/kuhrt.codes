interface Props {
  tags: string[];
}

export default function CaseStudyTags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 border border-border rounded text-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
