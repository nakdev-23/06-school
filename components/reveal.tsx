"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-in reveal that NEVER gates content visibility.
 * Content renders fully visible in SSR / with no JS / with reduced-motion.
 * Only after mount does JS (via direct DOM style, not React state) hide the
 * element and reveal it on scroll — so headless renders always ship real
 * content and there are no cascading re-renders.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition =
      "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)";
    el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            io.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref as React.Ref<HTMLElement>} className={cn(className)}>
      {children}
    </Comp>
  );
}
