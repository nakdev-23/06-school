import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Crumb {
  label: string;
  href?: string;
}

export function PageHeader({
  title,
  lead,
  crumbs,
  align = "left",
  children,
}: {
  title: string;
  lead?: string;
  crumbs?: Crumb[];
  align?: "left" | "center";
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-paper border-b border-border">
      <div
        className={cn(
          "container-edge py-14 md:py-20",
          align === "center" && "text-center",
        )}
      >
        {crumbs && (
          <nav aria-label="เส้นทางนำทาง" className="mb-5">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-1.5 text-sm text-muted",
                align === "center" && "justify-center",
              )}
            >
              <li>
                <Link href="/" className="hover:text-primary">
                  หน้าแรก
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 text-border-strong" aria-hidden />
                  {c.href ? (
                    <Link href={c.href} className="hover:text-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-ink-soft" aria-current="page">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1
          className={cn(
            "max-w-3xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl",
            align === "center" && "mx-auto",
          )}
        >
          {title}
        </h1>
        {lead && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg leading-relaxed text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {lead}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
