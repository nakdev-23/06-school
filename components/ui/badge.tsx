import { cn } from "@/lib/utils";

type Tone = "neutral" | "primary" | "accent" | "success" | "danger";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-ink-soft border-border",
  primary: "bg-primary-tint text-primary border-primary-soft",
  accent: "bg-accent-tint text-accent border-accent-soft",
  success: "bg-success-soft text-success border-success/20",
  danger: "bg-danger-soft text-danger border-danger/20",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
