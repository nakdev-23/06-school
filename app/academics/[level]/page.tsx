import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { programs, getProgram, levelSlugs } from "@/lib/data/programs";

export function generateStaticParams() {
  return levelSlugs.map((level) => ({ level }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const program = getProgram(level);
  if (!program) return { title: "ไม่พบหลักสูตร" };
  return {
    title: `หลักสูตรระดับ${program.name}`,
    description: program.summary,
  };
}

const accentText: Record<string, string> = {
  accent: "text-accent",
  primary: "text-primary",
  success: "text-success",
};

export default async function LevelPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const program = getProgram(level);
  if (!program) notFound();

  const index = programs.findIndex((p) => p.slug === program.slug);
  const prev = index > 0 ? programs[index - 1] : null;
  const next = index < programs.length - 1 ? programs[index + 1] : null;

  return (
    <>
      <PageHeader
        title={`ระดับ${program.name}`}
        lead={program.tagline}
        crumbs={[
          { label: "หลักสูตร", href: "/academics" },
          { label: `ระดับ${program.name}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <Badge tone="primary">{program.fullName}</Badge>
          <Badge tone="accent">อายุ {program.ageRange}</Badge>
          <Badge tone="neutral">{program.grades}</Badge>
        </div>
      </PageHeader>

      {/* Intro + image + stats */}
      <section className="container-edge py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src={program.heroImage}
                alt={`บรรยากาศการเรียนระดับ${program.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <SectionHeading title="แนวคิดการจัดการเรียนรู้" />
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                {program.philosophy}
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4">
                {program.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-surface p-4 text-center"
                  >
                    <dd
                      className={`display-num text-2xl font-bold ${accentText[program.color]}`}
                    >
                      {s.value}
                    </dd>
                    <dt className="mt-1 text-xs leading-tight text-muted">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Subjects */}
      <section className="border-y border-border bg-surface">
        <div className="container-edge py-16 md:py-24">
          <SectionHeading
            title="กลุ่มสาระและรายวิชา"
            lead="โครงสร้างหลักสูตรที่สมดุลระหว่างวิชาการ ทักษะ และการพัฒนาตนเอง"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {program.subjects.map((group, i) => (
              <Reveal key={group.group} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-bg p-6">
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {group.group}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg bg-surface-2 px-3 py-1.5 text-sm text-ink-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Daily rhythm + outcomes */}
      <section className="container-edge py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5">
                <Clock className="size-5 text-accent" aria-hidden />
                <h2 className="font-serif text-2xl font-bold text-ink">
                  ตารางชีวิตประจำวัน
                </h2>
              </div>
              <ol className="mt-6 space-y-0">
                {program.dailyRhythm.map((slot, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-border py-3.5 last:border-0"
                  >
                    <span className="tnum font-semibold text-primary">
                      {slot.time}
                    </span>
                    <span className="text-ink-soft">{slot.activity}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl bg-primary p-8 text-primary-fg md:p-10">
              <div className="flex items-center gap-2.5">
                <Sparkles className="size-5 text-accent" aria-hidden />
                <h2 className="font-serif text-2xl font-bold text-primary-fg">
                  เมื่อจบระดับนี้ ผู้เรียนจะ
                </h2>
              </div>
              <ul className="mt-6 space-y-4">
                {program.outcomes.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-fg/15">
                      <Check className="size-4 text-accent" aria-hidden />
                    </span>
                    <span className="leading-relaxed text-primary-fg/90">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Prev / next + CTA */}
      <section className="border-t border-border bg-surface">
        <div className="container-edge py-14">
          <div className="grid gap-4 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/academics/${prev.slug}`}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-bg p-5 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <ArrowLeft className="size-5 text-muted transition-transform group-hover:-translate-x-1" aria-hidden />
                <span>
                  <span className="block text-xs text-muted">ระดับก่อนหน้า</span>
                  <span className="font-serif text-lg font-semibold text-ink">
                    ระดับ{prev.name}
                  </span>
                </span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/academics/${next.slug}`}
                className="group flex items-center justify-end gap-3 rounded-2xl border border-border bg-bg p-5 text-right transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <span>
                  <span className="block text-xs text-muted">ระดับถัดไป</span>
                  <span className="font-serif text-lg font-semibold text-ink">
                    ระดับ{next.name}
                  </span>
                </span>
                <ArrowRight className="size-5 text-muted transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl bg-primary p-8 text-center md:flex-row md:text-left">
            <p className="font-serif text-xl font-semibold text-primary-fg">
              สนใจให้ลูกเข้าเรียนระดับ{program.name}?
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/admissions#apply" variant="accent">
                สมัครเรียน
              </ButtonLink>
              <ButtonLink
                href="/contact"
                className="bg-primary-fg text-primary hover:bg-primary-fg/90"
              >
                นัดเยี่ยมชม
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
