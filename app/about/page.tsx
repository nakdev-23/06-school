import type { Metadata } from "next";
import Image from "next/image";
import {
  Target,
  Compass,
  BookOpen,
  Building2,
  Award,
  Quote,
} from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import {
  school,
  values,
  facilities,
  accreditations,
  timeline,
} from "@/lib/data/school";
import { photo, portrait } from "@/lib/images";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "ประวัติ วิสัยทัศน์ พันธกิจ สิ่งอำนวยความสะดวก และการรับรองมาตรฐานของโรงเรียนนักเดฟ",
};

const missions = [
  "จัดการเรียนรู้ที่เน้นผู้เรียนเป็นสำคัญ พัฒนาการคิดวิเคราะห์และความคิดสร้างสรรค์",
  "ปลูกฝังคุณธรรม จริยธรรม และความรับผิดชอบต่อตนเองและสังคม",
  "เสริมสร้างทักษะภาษาและเทคโนโลยีเพื่อการเรียนรู้ตลอดชีวิต",
  "ดูแลนักเรียนอย่างใกล้ชิดและเข้าใจความแตกต่างของแต่ละบุคคล",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="โรงเรียนที่เติบโตไปพร้อมกับนักเรียนทุกรุ่น"
        lead={`ตั้งแต่ปี พ.ศ. ${school.founded} เรายึดมั่นในความเชื่อเดียว — ว่าการศึกษาที่ดีคือการดูแลทั้งความรู้และหัวใจของเด็กไปพร้อมกัน`}
        crumbs={[{ label: "เกี่ยวกับเรา" }]}
      />

      {/* Story */}
      <section className="container-edge py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src={photo("wl-about", 1000, 800, "building")}
                alt="อาคารเรียนของโรงเรียนนักเดฟ"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <SectionHeading title="เรื่องราวของเรา" />
              <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink-soft">
                <p>
                  โรงเรียนนักเดฟก่อตั้งขึ้นในปี พ.ศ. {school.founded}{" "}
                  โดยอาจารย์วิริยะ เกียรติวิริยะ ครูผู้มีความฝันอยากสร้างโรงเรียน
                  ที่เด็ก ๆ ได้เรียนรู้อย่างมีความสุขและเติบโตเป็นคนดี
                  เริ่มต้นจากอาคารไม้หลังเล็กกับนักเรียนเพียงไม่กี่สิบคน
                </p>
                <p>
                  ตลอดเกือบห้าทศวรรษ โรงเรียนเติบโตขึ้นทั้งขนาดและคุณภาพ
                  ขยายจากระดับอนุบาลสู่มัธยมศึกษาครบวงจร บนพื้นที่กว่า 12 ไร่
                  แต่สิ่งหนึ่งที่ไม่เคยเปลี่ยนคือความตั้งใจดูแลนักเรียน
                  อย่างใกล้ชิดเหมือนคนในครอบครัว
                </p>
                <p>
                  วันนี้เราภูมิใจในศิษย์เก่ากว่าหมื่นคนที่เติบโตไปเป็นพลเมืองที่ดี
                  ในหลากหลายอาชีพ และยังคงมุ่งมั่นพัฒนาการศึกษาให้ทันโลก
                  โดยไม่ลืมรากฐานของความเป็นมนุษย์
                </p>
              </div>
              <blockquote className="mt-8 rounded-2xl border border-border bg-surface p-6">
                <p className="font-serif text-xl italic text-primary">
                  “{school.mottoThai}”
                </p>
                <footer className="mt-2 text-sm text-muted">
                  ปรัชญาประจำโรงเรียน — {school.motto}
                </footer>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border bg-surface">
        <div className="container-edge py-20 md:py-28">
          <SectionHeading
            title="เส้นทางการเติบโต"
            lead="เหตุการณ์สำคัญที่หล่อหลอมโรงเรียนนักเดฟให้เป็นอย่างทุกวันนี้"
          />
          <ol className="mt-12 space-y-8 md:space-y-0">
            {timeline.map((item, i) => (
              <Reveal
                as="li"
                key={item.year}
                delay={i * 60}
                className="relative grid gap-4 md:grid-cols-[9rem_1fr] md:gap-8"
              >
                <div className="flex items-baseline gap-3 md:flex-col md:items-start md:gap-1">
                  <span className="display-num text-3xl font-bold text-accent">
                    {item.year}
                  </span>
                  <span className="text-sm text-muted">พ.ศ.</span>
                </div>
                <div className="border-l-0 md:border-l md:border-border md:pb-10 md:pl-8">
                  <div className="md:-ml-[2.35rem] md:mb-2 md:flex md:items-center md:gap-4">
                    <span className="hidden size-3 shrink-0 rounded-full bg-accent ring-4 ring-accent-tint md:block" />
                    <h3 className="font-serif text-xl font-bold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-xl leading-relaxed text-muted md:mt-0">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision + Mission */}
      <section className="container-edge py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-2xl bg-primary p-8 text-primary-fg md:p-10">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary-fg/15">
                <Compass className="size-6" aria-hidden />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold">วิสัยทัศน์</h2>
              <p className="mt-4 text-lg leading-relaxed text-primary-fg/90">
                “เป็นโรงเรียนที่บ่มเพาะผู้เรียนให้เป็นผู้ใฝ่รู้ คิดเป็น
                มีคุณธรรม และพร้อมสร้างสรรค์สิ่งดีงามให้แก่สังคม
                ท่ามกลางโลกที่เปลี่ยนแปลงอย่างรวดเร็ว”
              </p>
            </article>
          </Reveal>
          <Reveal delay={80}>
            <article className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 md:p-10">
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent-tint text-accent">
                <Target className="size-6" aria-hidden />
              </span>
              <h2 className="mt-5 font-serif text-2xl font-bold text-ink">
                พันธกิจ
              </h2>
              <ul className="mt-4 space-y-3">
                {missions.map((m, i) => (
                  <li key={i} className="flex gap-3 text-ink-soft">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary-tint text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{m}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>

        {/* Values */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-border bg-surface p-7">
                <p className="font-serif text-4xl font-bold text-accent">
                  {v.title}
                </p>
                <p className="mt-1 text-sm font-medium uppercase tracking-wide text-muted">
                  {v.thai}
                </p>
                <p className="mt-4 leading-relaxed text-muted">{v.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Director message */}
      <section className="border-y border-border bg-surface">
        <div className="container-edge grid gap-12 py-20 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-md">
              <Image
                src={portrait("wl-t1", 800)}
                alt={school.director}
                fill
                sizes="(max-width: 1024px) 80vw, 30vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <Badge tone="primary" className="mb-5">
                สารจากผู้อำนวยการ
              </Badge>
              <Quote className="size-8 text-accent" aria-hidden />
              <div className="mt-4 space-y-4 font-serif text-xl leading-[1.6] text-ink">
                <p>
                  เรียนผู้ปกครองและนักเรียนที่รักทุกคน
                  ในฐานะผู้อำนวยการ ดิฉันเชื่อเสมอว่าโรงเรียนที่ดี
                  ไม่ได้วัดกันที่ความสวยงามของอาคาร
                  แต่วัดกันที่แววตาของเด็ก ๆ ที่มีความสุขในการเรียนรู้
                </p>
                <p>
                  เราตั้งใจสร้างพื้นที่ที่เด็กกล้าตั้งคำถาม กล้าทำผิดพลาด
                  และกล้าลุกขึ้นใหม่ เพราะนั่นคือหัวใจของการเติบโต
                  ครูของเราทุกคนไม่ได้เป็นเพียงผู้สอน แต่เป็นผู้เดินเคียงข้าง
                </p>
              </div>
              <p className="mt-6 font-serif text-lg font-semibold text-ink">
                {school.director}
              </p>
              <p className="text-muted">ผู้อำนวยการโรงเรียนนักเดฟ</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Facilities */}
      <section className="container-edge py-20 md:py-28">
        <div className="flex items-center gap-3">
          <Building2 className="size-6 text-accent" aria-hidden />
          <SectionHeading
            title="สิ่งอำนวยความสะดวก"
            lead="พื้นที่การเรียนรู้กว่า 12 ไร่ ที่ออกแบบเพื่อสนับสนุนทั้งวิชาการ ทักษะ และสุขภาพ"
          />
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f, i) => (
            <Reveal key={f.name} delay={i * 60}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={photo(`wl-fac${i}`, 700, 440, "building")}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-lg font-bold text-ink">
                    {f.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Accreditation */}
      <section className="border-t border-border bg-surface">
        <div className="container-edge py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <SectionHeading
              title="มาตรฐานที่ได้รับการรับรอง"
              lead="คุณภาพการศึกษาของเราได้รับการยอมรับจากหน่วยงานระดับประเทศ"
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {accreditations.map((a, i) => (
                <Reveal key={a.title} delay={i * 70}>
                  <div className="h-full rounded-2xl border border-border bg-bg p-6 text-center">
                    <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-accent-tint text-accent">
                      <Award className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-4 font-serif text-base font-bold text-ink">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {a.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl bg-primary p-8 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex items-center gap-4">
              <BookOpen className="size-8 shrink-0 text-accent" aria-hidden />
              <p className="font-serif text-xl font-semibold text-primary-fg">
                อยากสัมผัสบรรยากาศจริง? มาเยี่ยมชมโรงเรียนของเรา
              </p>
            </div>
            <ButtonLink href="/contact" variant="accent" className="shrink-0">
              นัดหมายเยี่ยมชม
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
