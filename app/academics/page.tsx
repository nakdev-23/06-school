import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, Clock, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "หลักสูตร",
  description:
    "หลักสูตรต่อเนื่องตั้งแต่ระดับอนุบาล ประถมศึกษา ถึงมัธยมศึกษา ของโรงเรียนนักเดฟ",
};

const accentText: Record<string, string> = {
  accent: "text-accent",
  primary: "text-primary",
  success: "text-success",
};
const accentBg: Record<string, string> = {
  accent: "bg-accent-tint text-accent",
  primary: "bg-primary-tint text-primary",
  success: "bg-success-soft text-success",
};

export default function AcademicsPage() {
  return (
    <>
      <PageHeader
        title="หลักสูตรที่เติบโตไปกับผู้เรียน"
        lead="เราออกแบบการเรียนรู้ให้ต่อเนื่องและเชื่อมโยงกัน ตั้งแต่การเล่นอย่างมีความหมายในวัยอนุบาล จนถึงการค้นคว้าวิจัยในระดับมัธยม โดยมีแกนกลางเดียวกันคือการคิดเป็นและเป็นคนดี"
        crumbs={[{ label: "หลักสูตร" }]}
      />

      {/* Approach */}
      <section className="container-edge py-16 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              t: "เข้าใจ ไม่ใช่ท่องจำ",
              d: "การเรียนรู้แบบสืบเสาะและโครงงาน ให้ผู้เรียนตั้งคำถามและสร้างความเข้าใจด้วยตนเอง",
            },
            {
              t: "สองภาษาอย่างเป็นธรรมชาติ",
              d: "ภาษาอังกฤษบูรณาการในวิชาวิทยาศาสตร์-คณิตศาสตร์ ควบคู่รากฐานภาษาไทยที่แข็งแรง",
            },
            {
              t: "เก่ง ดี มีความสุข",
              d: "พัฒนาวิชาการควบคู่คุณธรรม ทักษะชีวิต และสุขภาวะทางอารมณ์อย่างสมดุล",
            },
          ].map((item, i) => (
            <Reveal key={item.t} delay={i * 70}>
              <div className="flex h-full gap-4">
                <span className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-tint text-accent">
                  <Check className="size-4.5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-serif text-lg font-bold text-ink">
                    {item.t}
                  </h2>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted">
                    {item.d}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Level feature rows */}
      <section className="border-t border-border">
        {programs.map((p, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={p.slug}
              className={i % 2 === 1 ? "bg-surface" : "bg-bg"}
            >
              <div className="container-edge py-16 md:py-24">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Reveal className={reversed ? "lg:order-2" : ""}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-md">
                      <Image
                        src={p.heroImage}
                        alt={`บรรยากาศการเรียนระดับ${p.name}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority={i === 0}
                        className="object-cover"
                      />
                      <span className="absolute left-5 top-5 rounded-full bg-surface/95 px-3.5 py-1.5 text-sm font-semibold text-ink shadow-sm">
                        {p.grades} · อายุ {p.ageRange}
                      </span>
                    </div>
                  </Reveal>

                  <Reveal delay={80} className={reversed ? "lg:order-1" : ""}>
                    <div>
                      <p
                        className={`font-serif text-sm font-semibold ${accentText[p.color]}`}
                      >
                        {p.fullName}
                      </p>
                      <h2 className="mt-2 font-serif text-3xl font-bold text-ink md:text-4xl">
                        ระดับ{p.name}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-muted">
                        {p.summary}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {p.highlights.map((h) => (
                          <li key={h.title} className="flex gap-3">
                            <span
                              className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md ${accentBg[p.color]}`}
                            >
                              <Check className="size-4" aria-hidden />
                            </span>
                            <span className="text-ink-soft">
                              <span className="font-semibold text-ink">
                                {h.title}
                              </span>{" "}
                              — {h.detail}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
                        <span className="flex items-center gap-1.5">
                          <Users className="size-4 text-accent" aria-hidden />
                          {p.classSize} คน/ห้อง
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="size-4 text-accent" aria-hidden />
                          ตารางเรียนเต็มวัน
                        </span>
                      </div>

                      <ButtonLink
                        href={`/academics/${p.slug}`}
                        className="mt-7"
                        variant={reversed ? "primary" : "accent"}
                      >
                        ดูรายละเอียดหลักสูตร{p.name}
                        <ArrowRight className="size-4" aria-hidden />
                      </ButtonLink>
                    </div>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA */}
      <section className="container-edge py-20 md:py-24">
        <div className="rounded-3xl border border-border bg-surface p-10 text-center md:p-16">
          <SectionHeading
            align="center"
            title="ยังไม่แน่ใจว่าระดับไหนเหมาะกับลูกของคุณ?"
            lead="ทีมแนะแนวของเรายินดีให้คำปรึกษา เพื่อช่วยวางแผนการเรียนรู้ที่เหมาะกับลูกของคุณมากที่สุด"
          />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/admissions" variant="accent" size="lg">
              ดูขั้นตอนการรับสมัคร
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="lg">
              ปรึกษาทีมแนะแนว
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
