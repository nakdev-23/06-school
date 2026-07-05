import type { Metadata } from "next";
import { FileText, Info, HelpCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Accordion } from "@/components/ui/accordion";
import { ApplicationForm } from "@/components/admissions/application-form";
import {
  admissionSteps,
  requirements,
  tuitionRows,
  tuitionNotes,
  faqs,
} from "@/lib/data/admissions";
import { formatTHB } from "@/lib/utils";

export const metadata: Metadata = {
  title: "รับสมัครนักเรียน",
  description:
    "ขั้นตอนการรับสมัคร เอกสารที่ต้องใช้ ค่าเล่าเรียน แบบฟอร์มสมัครออนไลน์ และคำถามที่พบบ่อยของโรงเรียนวิริยาลัยวิทยา",
};

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        title="ยินดีต้อนรับสู่ครอบครัววิริยาลัย"
        lead="เราออกแบบขั้นตอนการรับสมัครให้เรียบง่ายและโปร่งใส เพื่อให้ทุกครอบครัวเริ่มต้นเส้นทางการเรียนรู้กับเราได้อย่างมั่นใจ"
        crumbs={[{ label: "รับสมัคร" }]}
      />

      {/* Steps */}
      <section className="container-edge py-20 md:py-24">
        <SectionHeading
          title="ขั้นตอนการสมัคร 4 ขั้นตอน"
          lead="ตั้งแต่ยื่นใบสมัครจนถึงวันมอบตัว เราดูแลทุกขั้นตอนอย่างใกล้ชิด"
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {admissionSteps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary font-serif text-xl font-bold text-primary-fg">
                    {i + 1}
                  </span>
                  <span className="rounded-full bg-accent-tint px-2.5 py-1 text-xs font-medium text-accent">
                    {step.period}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {step.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Requirements + Tuition */}
      <section id="tuition" className="scroll-mt-24 border-y border-border bg-surface">
        <div className="container-edge grid gap-12 py-20 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Requirements */}
          <Reveal>
            <div>
              <div className="flex items-center gap-2.5">
                <FileText className="size-5 text-accent" aria-hidden />
                <h2 className="font-serif text-2xl font-bold text-ink">
                  เอกสารที่ต้องเตรียม
                </h2>
              </div>
              <ul className="mt-6 space-y-3">
                {requirements.map((req, i) => (
                  <li
                    key={i}
                    className="flex gap-3 rounded-xl border border-border bg-bg px-4 py-3"
                  >
                    <span className="tnum mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-primary-tint text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span className="text-[0.95rem] leading-relaxed text-ink-soft">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Tuition table */}
          <Reveal delay={80}>
            <div>
              <h2 className="font-serif text-2xl font-bold text-ink">
                ค่าธรรมเนียมการศึกษา
              </h2>
              <p className="mt-2 text-sm text-muted">
                อัตราต่อปีการศึกษา 2569 · หน่วยเป็นบาท
              </p>
              <div className="mt-5 overflow-x-auto rounded-2xl border border-border">
                <table className="w-full min-w-[36rem] border-collapse text-sm">
                  <thead>
                    <tr className="bg-primary text-primary-fg">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left font-semibold"
                      >
                        ระดับชั้น
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-right font-semibold"
                      >
                        ค่าเล่าเรียน
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-right font-semibold"
                      >
                        ค่าแรกเข้า
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-right font-semibold"
                      >
                        ค่ากิจกรรม
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-right font-semibold"
                      >
                        รวมปีแรก
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-surface">
                    {tuitionRows.map((row) => (
                      <tr key={row.slug} className="hover:bg-surface-2">
                        <th
                          scope="row"
                          className="px-4 py-4 text-left font-medium text-ink"
                        >
                          {row.level}
                        </th>
                        <td className="tnum px-4 py-4 text-right text-ink-soft">
                          {formatTHB(row.tuition)}
                        </td>
                        <td className="tnum px-4 py-4 text-right text-ink-soft">
                          {formatTHB(row.registration)}
                        </td>
                        <td className="tnum px-4 py-4 text-right text-ink-soft">
                          {formatTHB(row.activities)}
                        </td>
                        <td className="tnum px-4 py-4 text-right font-bold text-primary">
                          {formatTHB(row.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ul className="mt-5 space-y-2">
                {tuitionNotes.map((note, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-24">
        <div className="container-edge py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              title="กรอกใบสมัครออนไลน์"
              lead="ใช้เวลาเพียงไม่กี่นาที ฝ่ายรับสมัครจะติดต่อกลับเพื่อนัดหมายขั้นตอนถัดไปภายใน 5 วันทำการ"
            />
            <div className="mt-10">
              <ApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-surface">
        <div className="container-edge py-20 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-center gap-2.5">
              <HelpCircle className="size-6 text-accent" aria-hidden />
              <SectionHeading align="center" title="คำถามที่พบบ่อย" />
            </div>
            <div className="mt-10">
              <Accordion items={faqs} />
            </div>
            <p className="mt-8 text-center text-muted">
              ยังมีคำถามอื่น?{" "}
              <a
                href="/contact"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                ติดต่อฝ่ายรับสมัครได้ที่นี่
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
