"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { faculty, departments } from "@/lib/data/faculty";
import { cn } from "@/lib/utils";

export function FacultyDirectory() {
  const [active, setActive] = useState<string>("all");

  const visibleDepartments = useMemo(
    () =>
      active === "all"
        ? departments
        : departments.filter((d) => d.slug === active),
    [active],
  );

  return (
    <div>
      {/* Department filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
          className={cn(
            "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            active === "all"
              ? "border-primary bg-primary text-primary-fg"
              : "border-border bg-surface text-ink-soft hover:border-primary hover:text-primary",
          )}
        >
          ทั้งหมด
        </button>
        {departments.map((d) => (
          <button
            key={d.slug}
            onClick={() => setActive(d.slug)}
            aria-pressed={active === d.slug}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              active === d.slug
                ? "border-primary bg-primary text-primary-fg"
                : "border-border bg-surface text-ink-soft hover:border-primary hover:text-primary",
            )}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="mt-12 space-y-16">
        {visibleDepartments.map((dept) => {
          const members = faculty.filter((f) => f.department === dept.slug);
          if (members.length === 0) return null;
          return (
            <section key={dept.slug}>
              <div className="max-w-2xl">
                <h2 className="font-serif text-2xl font-bold text-ink">
                  {dept.name}
                </h2>
                <p className="mt-2 leading-relaxed text-muted">
                  {dept.description}
                </p>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((m) => (
                  <article
                    key={m.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={m.image}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 pt-10">
                        <p className="font-serif text-lg font-bold text-white">
                          {m.name}
                        </p>
                        <p className="text-sm text-white/85">{m.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="flex items-start gap-2 text-xs text-muted">
                        <GraduationCap
                          className="mt-0.5 size-4 shrink-0 text-accent"
                          aria-hidden
                        />
                        {m.degree}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                        {m.bio}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {m.subjects.map((s) => (
                          <span
                            key={s}
                            className="rounded-md bg-surface-2 px-2 py-1 text-xs text-ink-soft"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 border-t border-border pt-3 text-xs text-muted">
                        ประสบการณ์การสอน{" "}
                        <span className="font-semibold text-ink">
                          {m.years} ปี
                        </span>
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
