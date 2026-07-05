import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Crest } from "@/components/logo";
import { school } from "@/lib/data/school";

const footerNav = [
  {
    heading: "โรงเรียนของเรา",
    links: [
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "คณะครูและบุคลากร", href: "/faculty" },
      { label: "ภาพกิจกรรม", href: "/gallery" },
    ],
  },
  {
    heading: "การศึกษา",
    links: [
      { label: "หลักสูตรทั้งหมด", href: "/academics" },
      { label: "ระดับอนุบาล", href: "/academics/kindergarten" },
      { label: "ระดับประถมศึกษา", href: "/academics/primary" },
      { label: "ระดับมัธยมศึกษา", href: "/academics/secondary" },
    ],
  },
  {
    heading: "สมัครและข่าวสาร",
    links: [
      { label: "ขั้นตอนการสมัคร", href: "/admissions" },
      { label: "ค่าเล่าเรียน", href: "/admissions#tuition" },
      { label: "ข่าวสารและกิจกรรม", href: "/news" },
      { label: "ปฏิทินการศึกษา", href: "/calendar" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-edge grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Crest className="size-10" />
            <div className="leading-tight">
              <p className="font-serif text-lg font-bold text-ink">
                {school.name}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                {school.nameEn}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            สถาบันการศึกษาเอกชนตั้งแต่ระดับอนุบาลถึงมัธยมศึกษา
            มุ่งบ่มเพาะปัญญาเคียงคู่คุณธรรม ก่อตั้งเมื่อ พ.ศ. {school.founded}
          </p>
          <p className="mt-4 font-serif text-base italic text-primary">
            “{school.mottoThai}”
          </p>
        </div>

        {footerNav.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="font-serif text-base font-semibold text-ink">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-edge grid gap-4 py-6 text-sm text-muted md:grid-cols-2 lg:grid-cols-4">
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>{school.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone className="size-4 shrink-0 text-accent" aria-hidden />
            <a href={`tel:${school.phone}`} className="hover:text-ink">
              {school.phone}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="size-4 shrink-0 text-accent" aria-hidden />
            <a href={`mailto:${school.email}`} className="hover:text-ink">
              {school.email}
            </a>
          </p>
          <p className="flex items-start gap-2">
            <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>{school.officeHours}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-edge flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear() + 543} {school.name} · สงวนลิขสิทธิ์
          </p>
          <p>ออกแบบเพื่อการเรียนรู้ที่ดีกว่าของทุกคน</p>
        </div>
      </div>
    </footer>
  );
}
