import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { GalleryGrid } from "@/components/gallery/gallery-grid";

export const metadata: Metadata = {
  title: "ภาพกิจกรรม",
  description:
    "ประมวลภาพบรรยากาศการเรียนรู้ กิจกรรม กีฬา และชีวิตในรั้วโรงเรียนนักเดฟ",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        title="ชีวิตในรั้วนักเดฟ"
        lead="ประมวลภาพบรรยากาศการเรียนรู้ กิจกรรม และช่วงเวลาน่าจดจำของนักเรียนของเรา คลิกที่ภาพเพื่อดูขนาดเต็ม"
        crumbs={[{ label: "ภาพกิจกรรม" }]}
      />
      <section className="container-edge py-16 md:py-20">
        <GalleryGrid />
      </section>
    </>
  );
}
