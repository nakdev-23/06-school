import { Compass } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-edge flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-primary-tint text-primary">
        <Compass className="size-8" aria-hidden />
      </span>
      <p className="display-num mt-8 text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-serif text-3xl font-bold text-ink">
        ไม่พบหน้าที่คุณกำลังค้นหา
      </h1>
      <p className="mt-3 max-w-md leading-relaxed text-muted">
        หน้านี้อาจถูกย้ายหรือไม่มีอยู่แล้ว ลองกลับไปหน้าแรก
        หรือสำรวจหน้าอื่น ๆ ของโรงเรียนนักเดฟ
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="primary" size="lg">
          กลับสู่หน้าแรก
        </ButtonLink>
        <ButtonLink href="/admissions#apply" variant="outline" size="lg">
          สมัครเรียน
        </ButtonLink>
      </div>
    </section>
  );
}
