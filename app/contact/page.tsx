import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ContactForm } from "@/components/contact/contact-form";
import { school } from "@/lib/data/school";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description:
    "ติดต่อสอบถามข้อมูล นัดหมายเยี่ยมชม หรือส่งข้อความถึงโรงเรียนวิริยาลัยวิทยา",
};

const contactCards = [
  {
    icon: Phone,
    label: "โทรศัพท์",
    value: school.phone,
    href: `tel:${school.phone}`,
    note: "จันทร์ – เสาร์ ในเวลาทำการ",
  },
  {
    icon: Mail,
    label: "อีเมล",
    value: school.email,
    href: `mailto:${school.email}`,
    note: "ตอบกลับภายใน 1–2 วันทำการ",
  },
  {
    icon: MessageCircle,
    label: "LINE Official",
    value: school.lineId,
    href: "#",
    note: "แชทสอบถามได้ตลอดเวลา",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="เรายินดีรับฟังทุกคำถาม"
        lead="ไม่ว่าจะเป็นเรื่องการรับสมัคร การเยี่ยมชม หรือข้อสงสัยอื่น ๆ ทีมงานของเราพร้อมดูแลและตอบทุกคำถามของคุณ"
        crumbs={[{ label: "ติดต่อเรา" }]}
      />

      {/* Contact channels */}
      <section className="container-edge py-16 md:py-20">
        <div className="grid gap-5 sm:grid-cols-3">
          {contactCards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-accent-tint text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                <c.icon className="size-6" aria-hidden />
              </span>
              <p className="mt-4 text-sm text-muted">{c.label}</p>
              <p className="mt-1 font-serif text-lg font-bold text-ink">
                {c.value}
              </p>
              <p className="mt-1 text-sm text-muted">{c.note}</p>
            </a>
          ))}
        </div>

        {/* Form + info */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="font-serif text-2xl font-bold text-ink">
              ส่งข้อความถึงเรา
            </h2>
            <p className="mt-2 text-muted">
              กรอกแบบฟอร์มด้านล่าง แล้วเราจะติดต่อกลับโดยเร็วที่สุด
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-serif text-lg font-bold text-ink">
                ข้อมูลติดต่อ
              </h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <span className="leading-relaxed text-ink-soft">
                    {school.address}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <span className="leading-relaxed text-ink-soft">
                    {school.officeHours}
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                  <span className="leading-relaxed text-ink-soft">
                    {school.phone} · โทรสาร {school.fax}
                  </span>
                </li>
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="overflow-hidden rounded-2xl border border-border bg-surface">
              <div
                className="relative flex aspect-[4/3] items-center justify-center bg-primary-tint"
                role="img"
                aria-label="แผนที่ตั้งโรงเรียนวิริยาลัยวิทยา"
              >
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(oklch(0.9 0.02 255 / 0.6) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0.02 255 / 0.6) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                  aria-hidden
                />
                <div className="relative flex flex-col items-center text-center">
                  <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-fg shadow-md">
                    <MapPin className="size-7" aria-hidden />
                  </span>
                  <p className="mt-3 font-serif text-base font-bold text-primary">
                    โรงเรียนวิริยาลัยวิทยา
                  </p>
                  <p className="text-sm text-ink-soft">เขตจตุจักร กรุงเทพฯ</p>
                </div>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-t border-border py-3.5 text-sm font-medium text-primary transition-colors hover:bg-surface-2"
              >
                <Navigation className="size-4" aria-hidden />
                เปิดใน Google Maps
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
