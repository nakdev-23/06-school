import { cn } from "@/lib/utils";

/**
 * Section heading. No decorative eyebrow — hierarchy comes from type scale.
 * An optional short `label` renders inline with the title only where a genuine
 * section label helps (never on every section).
 */
export function SectionHeading({
  title,
  lead,
  align = "left",
  as = "h2",
  className,
}: {
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
}) {
  const Tag = as;
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Tag className="text-3xl font-bold tracking-tight text-ink md:text-[2.1rem]">
        {title}
      </Tag>
      {lead && (
        <p className="mt-3 text-lg leading-relaxed text-muted">{lead}</p>
      )}
    </div>
  );
}
