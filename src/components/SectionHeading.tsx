interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  light = false,
  as = "h2",
}: SectionHeadingProps) {
  const Tag = as;
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col ${alignment}`}>
      {eyebrow && (
        <span
          className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-gold-300" : "text-gold"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <Tag
        className={`font-serif text-3xl font-bold sm:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </Tag>
      <span
        className={`mt-4 h-1 w-16 rounded-full bg-gold ${
          align === "center" ? "" : ""
        }`}
      />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            light ? "text-navy-100/80" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
