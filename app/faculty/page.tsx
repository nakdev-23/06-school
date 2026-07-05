import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { FacultyDirectory } from "@/components/faculty/faculty-directory";
import { faculty } from "@/lib/data/faculty";

export const metadata: Metadata = {
  title: "คณะครูและบุคลากร",
  description:
    "รู้จักคณะครูและบุคลากรผู้ทุ่มเทของโรงเรียนวิริยาลัยวิทยา ในแต่ละกลุ่มสาระการเรียนรู้",
};

export default function FacultyPage() {
  const totalYears = faculty.reduce((sum, f) => sum + f.years, 0);
  return (
    <>
      <PageHeader
        title="ครูผู้อยู่เบื้องหลังทุกการเติบโต"
        lead="ทีมครูของเราไม่ได้เป็นเพียงผู้สอน แต่เป็นผู้เดินเคียงข้างนักเรียนในทุกช่วงของการเรียนรู้ ด้วยความรู้ ความเข้าใจ และความรัก"
        crumbs={[{ label: "คณะครูและบุคลากร" }]}
      >
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="text-sm text-muted">ครูและบุคลากร</dt>
            <dd className="display-num text-2xl font-bold text-ink">
              142 คน
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">ประสบการณ์รวมของทีมหลัก</dt>
            <dd className="display-num text-2xl font-bold text-ink">
              {totalYears}+ ปี
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">อัตราส่วนครูต่อนักเรียน</dt>
            <dd className="display-num text-2xl font-bold text-ink">1 : 13</dd>
          </div>
        </dl>
      </PageHeader>

      <section className="container-edge py-16 md:py-20">
        <FacultyDirectory />
      </section>
    </>
  );
}
