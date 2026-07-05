import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Quote,
  CalendarDays,
  ShieldCheck,
  Sparkles,
  Users,
  BookOpen,
  Languages,
  FlaskConical,
  Trophy,
  HeartHandshake,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { school, stats, whyChoose } from "@/lib/data/school";
import { programs } from "@/lib/data/programs";
import { sortedNews } from "@/lib/data/news";
import { sortedEvents } from "@/lib/data/events";
import { eventTypeLabels } from "@/lib/data/events";
import { formatThaiDate, dateParts } from "@/lib/utils";

const whyIcons = [BookOpen, Users, FlaskConical, Sparkles, Trophy, ShieldCheck];

const levelColor: Record<string, string> = {
  accent: "text-accent",
  primary: "text-primary",
  success: "text-success",
};

export default function HomePage() {
  const featured = sortedNews[0];
  const secondary = sortedNews.slice(1, 3);
  const now = new Date("2026-07-03");
  const upcoming = sortedEvents
    .filter((e) => new Date(e.date) >= now)
    .slice(0, 4);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="bg-paper">
        <div className="container-edge grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <Badge tone="primary" className="mb-6">
                <GraduationCap className="size-3.5" aria-hidden />
                เปิดรับสมัครนักเรียนใหม่ ปีการศึกษา 2569
              </Badge>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="text-balance text-[2.6rem] font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
                บ่มเพาะปัญญา
                <br />
                <span className="text-primary">เคียงคู่คุณธรรม</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                โรงเรียนวิริยาลัยวิทยา สถาบันการศึกษาตั้งแต่ระดับอนุบาลถึงมัธยม
                ที่เชื่อว่าเด็กทุกคนเติบโตได้ดีที่สุดเมื่อได้เรียนรู้อย่างมีความหมาย
                ในสภาพแวดล้อมที่อบอุ่นและท้าทายไปพร้อมกัน
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/admissions#apply" variant="accent" size="lg">
                  สมัครเข้าเรียน
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink href="/academics" variant="outline" size="lg">
                  ดูหลักสูตรของเรา
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
                {stats.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <dd className="display-num text-3xl font-bold text-ink">
                      {s.value}
                      <span className="ml-0.5 text-base font-medium text-muted">
                        {s.suffix}
                      </span>
                    </dd>
                    <dt className="mt-1 text-sm text-muted">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-lg">
              <Image
                src="https://picsum.photos/seed/wl-hero/1000/1250"
                alt="บรรยากาศการเรียนรู้ที่โรงเรียนวิริยาลัยวิทยา"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden max-w-[15rem] rounded-xl border border-border bg-surface/95 p-4 shadow-lg backdrop-blur sm:block">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-lg bg-accent-tint text-accent">
                  <Trophy className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="display-num text-2xl font-bold leading-none text-ink">
                    94%
                  </p>
                  <p className="mt-1 text-xs leading-tight text-muted">
                    ศิษย์เก่าเข้าศึกษาต่อมหาวิทยาลัยรัฐ
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- DIRECTOR WELCOME ---------- */}
      <section className="container-edge py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto w-full max-w-sm">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-md">
                <Image
                  src="https://picsum.photos/seed/wl-t1/800/1000"
                  alt={`${school.director} ผู้อำนวยการโรงเรียน`}
                  fill
                  sizes="(max-width: 1024px) 80vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -right-3 bottom-6 rounded-xl border border-border bg-surface px-4 py-3 shadow-md">
                <p className="font-serif text-base font-semibold text-ink">
                  {school.director}
                </p>
                <p className="text-sm text-muted">ผู้อำนวยการโรงเรียน</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div>
              <Quote className="size-9 text-accent" aria-hidden />
              <blockquote className="mt-5 font-serif text-2xl leading-[1.5] text-ink md:text-[1.7rem]">
                “การศึกษาที่แท้จริงไม่ใช่การเติมความรู้ให้เต็มถัง
                แต่คือการจุดไฟแห่งความอยากรู้ในใจเด็กทุกคน
                เราจึงตั้งใจดูแลนักเรียนของเราเหมือนลูกหลาน
                ให้เขาเติบโตเป็นคนเก่ง คนดี และมีความสุขอย่างแท้จริง”
              </blockquote>
              <p className="mt-6 text-base leading-relaxed text-muted">
                ตลอดเกือบ 50 ปีที่ผ่านมา
                เราภูมิใจที่ได้เป็นส่วนหนึ่งของการเติบโตของนักเรียนหลายรุ่น
                และพร้อมเดินเคียงข้างทุกครอบครัวในเส้นทางการเรียนรู้นี้
              </p>
              <ButtonLink href="/about" variant="ghost" className="mt-6 px-0 hover:bg-transparent hover:text-primary">
                อ่านสารจากผู้อำนวยการฉบับเต็ม
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- PROGRAMS ---------- */}
      <section className="border-y border-border bg-surface">
        <div className="container-edge py-20 md:py-28">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              title="สามช่วงวัย หนึ่งเส้นทางการเติบโต"
              lead="หลักสูตรต่อเนื่องที่ออกแบบให้เหมาะกับพัฒนาการของแต่ละวัย ตั้งแต่ก้าวแรกในห้องอนุบาลจนถึงประตูมหาวิทยาลัย"
            />
            <ButtonLink href="/academics" variant="outline" className="shrink-0">
              ดูหลักสูตรทั้งหมด
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link
                  href={`/academics/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-shadow duration-300 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1 text-sm font-semibold text-ink shadow-sm">
                      {p.grades}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className={`text-sm font-semibold ${levelColor[p.color]}`}>
                      {p.ageRange}
                    </p>
                    <h3 className="mt-1 font-serif text-2xl font-bold text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                      {p.tagline}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      ดูรายละเอียด
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WHY CHOOSE (bento) ---------- */}
      <section className="container-edge py-20 md:py-28">
        <SectionHeading
          title="ทำไมครอบครัวจึงไว้วางใจวิริยาลัย"
          lead="เราไม่ได้วัดความสำเร็จเพียงคะแนนสอบ แต่วัดจากการเติบโตอย่างสมดุลของนักเรียนทุกด้าน"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            const isFirst = i === 0;
            return (
              <Reveal
                key={item.title}
                delay={i * 60}
                className={isFirst ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}
              >
                <article
                  className={`flex h-full flex-col rounded-2xl border p-7 ${
                    isFirst
                      ? "border-primary/15 bg-primary text-primary-fg"
                      : "border-border bg-surface"
                  }`}
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-xl ${
                      isFirst
                        ? "bg-primary-fg/15 text-primary-fg"
                        : "bg-accent-tint text-accent"
                    }`}
                  >
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <h3
                    className={`mt-5 font-serif text-xl font-bold ${
                      isFirst ? "text-primary-fg" : "text-ink"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2.5 flex-1 text-[0.95rem] leading-relaxed ${
                      isFirst ? "text-primary-fg/85" : "text-muted"
                    }`}
                  >
                    {item.detail}
                  </p>
                  {isFirst && (
                    <ButtonLink
                      href="/about"
                      variant="accent"
                      size="sm"
                      className="mt-6 self-start"
                    >
                      รู้จักเราเพิ่มเติม
                    </ButtonLink>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ---------- NEWS + EVENTS ---------- */}
      <section className="border-t border-border bg-surface">
        <div className="container-edge py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <SectionHeading title="ข่าวสารและความเคลื่อนไหว" />
              <div className="mt-8 space-y-8">
                <Reveal>
                  <Link
                    href={`/news/${featured.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-border bg-bg transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={featured.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <Badge tone="accent">{featured.category}</Badge>
                        <time dateTime={featured.date}>
                          {formatThaiDate(featured.date)}
                        </time>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-ink transition-colors group-hover:text-primary">
                        {featured.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-muted">
                        {featured.excerpt}
                      </p>
                    </div>
                  </Link>
                </Reveal>

                <div className="grid gap-6 sm:grid-cols-2">
                  {secondary.map((n, i) => (
                    <Reveal key={n.slug} delay={i * 70}>
                      <Link
                        href={`/news/${n.slug}`}
                        className="group flex gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <div className="relative size-24 shrink-0 overflow-hidden rounded-xl border border-border">
                          <Image
                            src={n.image}
                            alt=""
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-muted">
                            {formatThaiDate(n.date)}
                          </p>
                          <h4 className="mt-1 line-clamp-3 font-serif text-base font-semibold leading-snug text-ink transition-colors group-hover:text-primary">
                            {n.title}
                          </h4>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
              <ButtonLink href="/news" variant="ghost" className="mt-8 px-0 hover:bg-transparent hover:text-primary">
                ดูข่าวทั้งหมด
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </div>

            {/* Upcoming events */}
            <div>
              <div className="flex items-center justify-between">
                <SectionHeading title="ปฏิทินใกล้นี้" as="h3" />
              </div>
              <ul className="mt-8 space-y-3">
                {upcoming.map((e, i) => {
                  const d = dateParts(e.date);
                  return (
                    <Reveal as="li" key={e.id} delay={i * 60}>
                      <div className="flex gap-4 rounded-xl border border-border bg-bg p-4">
                        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary text-primary-fg">
                          <span className="display-num text-xl font-bold leading-none">
                            {d.day}
                          </span>
                          <span className="text-[0.7rem] leading-none">
                            {d.monthShort}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <Badge tone="neutral" className="mb-1">
                            {eventTypeLabels[e.type]}
                          </Badge>
                          <p className="font-medium leading-snug text-ink">
                            {e.title}
                          </p>
                          <p className="mt-0.5 text-sm text-muted">
                            {e.location}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </ul>
              <ButtonLink
                href="/calendar"
                variant="outline"
                className="mt-6 w-full"
              >
                <CalendarDays className="size-4" aria-hidden />
                ดูปฏิทินการศึกษาทั้งปี
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- VALUES STRIP + CTA ---------- */}
      <section className="container-edge py-20 md:py-28">
        <div className="overflow-hidden rounded-3xl bg-primary">
          <div className="grid gap-10 p-10 md:grid-cols-2 md:items-center md:p-16">
            <div>
              <h2 className="text-balance font-serif text-3xl font-bold leading-tight text-primary-fg md:text-4xl">
                มาเป็นส่วนหนึ่งของครอบครัววิริยาลัย
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-primary-fg/85">
                นัดหมายเยี่ยมชมโรงเรียน พูดคุยกับคณะครู
                และสัมผัสบรรยากาศการเรียนรู้ด้วยตัวคุณเอง
                ก่อนตัดสินใจเลือกเส้นทางที่ดีที่สุดให้ลูกของคุณ
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/admissions#apply" variant="accent" size="lg">
                  เริ่มสมัครเรียน
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="bg-primary-fg text-primary hover:bg-primary-fg/90"
                >
                  ติดต่อสอบถาม
                </ButtonLink>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: HeartHandshake, t: "ดูแลใกล้ชิด", d: "ครูที่ปรึกษาประจำและรายงานพัฒนาการรายบุคคล" },
                { icon: Languages, t: "หลักสูตรสองภาษา", d: "เรียนวิทย์-คณิตกับครูเจ้าของภาษา" },
                { icon: FlaskConical, t: "ห้องปฏิบัติการครบครัน", d: "STEM หุ่นยนต์ และหอสมุดกว่า 40,000 เล่ม" },
                { icon: ShieldCheck, t: "มาตรฐานรับรอง", d: "ผ่านการประเมิน สมศ. ระดับดีมาก" },
              ].map((item) => (
                <li
                  key={item.t}
                  className="rounded-xl bg-primary-fg/10 p-5 text-primary-fg"
                >
                  <item.icon className="size-6 text-accent" aria-hidden />
                  <p className="mt-3 font-serif text-lg font-semibold">
                    {item.t}
                  </p>
                  <p className="mt-1 text-sm text-primary-fg/80">{item.d}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
