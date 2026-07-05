"use client";

import { useMemo, useState } from "react";
import { MapPin, CalendarX2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sortedEvents, eventTypeLabels } from "@/lib/data/events";
import { dateParts, thaiMonthName, formatThaiDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { EventType, CalendarEvent } from "@/lib/types";

const types: (EventType | "all")[] = [
  "all",
  "academic",
  "activity",
  "exam",
  "holiday",
  "meeting",
];

const typeTone: Record<EventType, "primary" | "accent" | "success" | "danger" | "neutral"> = {
  academic: "primary",
  activity: "accent",
  exam: "danger",
  holiday: "success",
  meeting: "neutral",
};

const typeDot: Record<EventType, string> = {
  academic: "bg-primary",
  activity: "bg-accent",
  exam: "bg-danger",
  holiday: "bg-success",
  meeting: "bg-muted",
};

function monthKey(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${d.getMonth()}`;
}

export function CalendarView() {
  const [active, setActive] = useState<EventType | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? sortedEvents
        : sortedEvents.filter((e) => e.type === active),
    [active],
  );

  const grouped = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    filtered.forEach((e) => {
      const key = monthKey(e.date);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(e);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div>
      {/* Legend + filter */}
      <div className="flex flex-wrap gap-2">
        {types.map((t) => {
          const selected = active === t;
          const label = t === "all" ? "ทั้งหมด" : eventTypeLabels[t];
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              aria-pressed={selected}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                selected
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-surface text-ink-soft hover:border-primary hover:text-primary",
              )}
            >
              {t !== "all" && (
                <span
                  className={cn(
                    "size-2 rounded-full",
                    selected ? "bg-primary-fg" : typeDot[t],
                  )}
                  aria-hidden
                />
              )}
              {label}
            </button>
          );
        })}
      </div>

      {grouped.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
          <CalendarX2 className="size-10 text-muted" aria-hidden />
          <p className="mt-4 font-serif text-lg font-semibold text-ink">
            ไม่มีกิจกรรมในหมวดนี้
          </p>
          <p className="mt-1 text-sm text-muted">ลองเลือกประเภทกิจกรรมอื่น</p>
        </div>
      ) : (
        <div className="mt-12 space-y-12">
          {grouped.map(([key, list]) => {
            const [year, month] = key.split("-").map(Number);
            return (
              <section key={key}>
                <div className="mb-5 flex items-baseline gap-3">
                  <h2 className="font-serif text-2xl font-bold text-ink">
                    {thaiMonthName(month)}
                  </h2>
                  <span className="text-muted">พ.ศ. {year + 543}</span>
                </div>
                <ul className="space-y-3">
                  {list.map((e) => {
                    const d = dateParts(e.date);
                    return (
                      <li
                        key={e.id}
                        className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center"
                      >
                        <div className="flex shrink-0 items-center gap-4">
                          <div className="flex size-16 flex-col items-center justify-center rounded-xl bg-bg text-center">
                            <span className="text-xs text-muted">
                              {d.weekday}
                            </span>
                            <span className="display-num text-2xl font-bold leading-none text-ink">
                              {d.day}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "h-12 w-1 rounded-full",
                              typeDot[e.type],
                            )}
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone={typeTone[e.type]}>
                              {eventTypeLabels[e.type]}
                            </Badge>
                            {e.endDate && (
                              <span className="text-xs text-muted">
                                ถึง {formatThaiDate(e.endDate)}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-1.5 font-serif text-lg font-bold text-ink">
                            {e.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted">
                            {e.detail}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5 text-sm text-muted sm:w-40">
                          <MapPin className="size-4 text-accent" aria-hidden />
                          {e.location}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
