"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { sortedNews, newsCategories } from "@/lib/data/news";
import { formatThaiDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { NewsCategory } from "@/lib/types";

type Filter = "ทั้งหมด" | NewsCategory;
const filters: Filter[] = ["ทั้งหมด", ...newsCategories];

const toneFor: Record<NewsCategory, "primary" | "accent" | "success" | "neutral"> = {
  ประกาศ: "primary",
  กิจกรรม: "accent",
  วิชาการ: "neutral",
  ความสำเร็จ: "success",
};

export function NewsExplorer() {
  const [active, setActive] = useState<Filter>("ทั้งหมด");

  const items = useMemo(
    () =>
      active === "ทั้งหมด"
        ? sortedNews
        : sortedNews.filter((n) => n.category === active),
    [active],
  );

  const [lead, ...rest] = items;

  return (
    <div>
      {/* Filter tabs */}
      <div
        role="tablist"
        aria-label="กรองข่าวตามหมวดหมู่"
        className="flex flex-wrap gap-2"
      >
        {filters.map((f) => {
          const selected = active === f;
          return (
            <button
              key={f}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(f)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                selected
                  ? "border-primary bg-primary text-primary-fg"
                  : "border-border bg-surface text-ink-soft hover:border-primary hover:text-primary",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      {items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface py-20 text-center">
          <Newspaper className="size-10 text-muted" aria-hidden />
          <p className="mt-4 font-serif text-lg font-semibold text-ink">
            ยังไม่มีข่าวในหมวดนี้
          </p>
          <p className="mt-1 text-sm text-muted">
            ลองเลือกหมวดหมู่อื่น หรือกลับมาดูใหม่อีกครั้ง
          </p>
        </div>
      ) : (
        <>
          {/* Featured */}
          <Link
            href={`/news/${lead.slug}`}
            className="group mt-10 grid gap-6 overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-64">
              <Image
                src={lead.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Badge tone={toneFor[lead.category]}>{lead.category}</Badge>
                <time dateTime={lead.date}>{formatThaiDate(lead.date)}</time>
              </div>
              <h2 className="mt-3 font-serif text-2xl font-bold leading-snug text-ink transition-colors group-hover:text-primary md:text-3xl">
                {lead.title}
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{lead.excerpt}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                อ่านต่อ
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </div>
          </Link>

          {/* Grid */}
          {rest.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((n) => (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={n.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3">
                      <Badge tone={toneFor[n.category]}>{n.category}</Badge>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-3 text-xs text-muted">
                      <time dateTime={n.date}>{formatThaiDate(n.date)}</time>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" aria-hidden />
                        {n.readMinutes} นาที
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary">
                      {n.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
                      {n.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
