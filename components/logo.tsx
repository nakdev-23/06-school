import { cn } from "@/lib/utils";

/** A small academic crest — open book beneath a rising sun, framed. */
export function Crest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn("shrink-0", className)}
    >
      <path
        d="M24 3.5 41.5 9v13c0 10.6-7.3 18.4-17.5 22.5C13.8 40.4 6.5 32.6 6.5 22V9L24 3.5Z"
        className="fill-primary"
      />
      <path
        d="M24 3.5 41.5 9v13c0 10.6-7.3 18.4-17.5 22.5C13.8 40.4 6.5 32.6 6.5 22V9L24 3.5Z"
        className="stroke-primary-fg/25"
        strokeWidth="1"
      />
      {/* rays */}
      <g className="stroke-accent" strokeWidth="1.4" strokeLinecap="round">
        <path d="M24 12v-3.4" />
        <path d="M31 14.4l2.1-2.1" />
        <path d="M17 14.4l-2.1-2.1" />
      </g>
      {/* sun */}
      <circle cx="24" cy="18.6" r="3.3" className="fill-accent" />
      {/* open book */}
      <path
        d="M12 25.5c3.6-1.4 8-1.4 12 .6 4-2 8.4-2 12-.6v9.2c-3.6-1.4-8-1.4-12 .6-4-2-8.4-2-12-.6v-9.2Z"
        className="fill-primary-fg"
      />
      <path
        d="M24 26.1v9.8"
        className="stroke-primary"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Crest className="size-9" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-lg font-bold tracking-tight text-ink">
          นักเดฟ
        </span>
        <span className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-muted">
          Nakdev School
        </span>
      </span>
    </span>
  );
}
