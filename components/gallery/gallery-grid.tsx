"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { gallery, galleryCategories } from "@/lib/data/gallery";
import { cn } from "@/lib/utils";
import type { GalleryCategory } from "@/lib/types";

type Filter = "ทั้งหมด" | GalleryCategory;
const filters: Filter[] = ["ทั้งหมด", ...galleryCategories];

export function GalleryGrid() {
  const [active, setActive] = useState<Filter>("ทั้งหมด");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(
    () =>
      active === "ทั้งหมด"
        ? gallery
        : gallery.filter((g) => g.category === active),
    [active],
  );

  const close = useCallback(() => setLightbox(null), []);
  const go = useCallback(
    (dir: 1 | -1) => {
      setLightbox((cur) => {
        if (cur === null) return cur;
        return (cur + dir + items.length) % items.length;
      });
    },
    [items.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, go]);

  const current = lightbox !== null ? items[lightbox] : null;

  return (
    <div>
      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const selected = active === f;
          return (
            <button
              key={f}
              onClick={() => {
                setActive(f);
                setLightbox(null);
              }}
              aria-pressed={selected}
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
          <ImageOff className="size-10 text-muted" aria-hidden />
          <p className="mt-4 font-serif text-lg font-semibold text-ink">
            ยังไม่มีภาพในหมวดนี้
          </p>
        </div>
      ) : (
        <div className="mt-10 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {items.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setLightbox(i)}
              className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface-2 break-inside-avoid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label={`เปิดภาพ: ${img.caption}`}
            >
              <Image
                src={img.src}
                alt={img.caption}
                width={img.width}
                height={img.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={i < 3}
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  {img.caption}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-[50] flex flex-col bg-ink/90 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={close}
              aria-label="ปิดภาพ"
              className="flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => go(-1)}
              aria-label="ภาพก่อนหน้า"
              className="absolute left-2 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:left-6"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>

            <figure className="flex max-h-full max-w-4xl flex-col items-center">
              <div className="relative">
                <Image
                  src={current.src}
                  alt={current.caption}
                  width={current.width}
                  height={current.height}
                  sizes="90vw"
                  className="max-h-[72vh] w-auto rounded-xl object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-4 text-center text-white/90">
                {current.caption}
                <span className="mt-1 block text-sm text-white/60">
                  {(lightbox ?? 0) + 1} / {items.length} · {current.category}
                </span>
              </figcaption>
            </figure>

            <button
              onClick={() => go(1)}
              aria-label="ภาพถัดไป"
              className="absolute right-2 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:right-6"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
