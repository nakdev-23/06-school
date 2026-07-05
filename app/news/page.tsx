import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { NewsExplorer } from "@/components/news/news-explorer";

export const metadata: Metadata = {
  title: "ข่าวสารและกิจกรรม",
  description:
    "ข่าวประชาสัมพันธ์ กิจกรรม ความสำเร็จ และความเคลื่อนไหวล่าสุดของโรงเรียนวิริยาลัยวิทยา",
};

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="ข่าวสารและกิจกรรม"
        lead="ติดตามความเคลื่อนไหว ความสำเร็จของนักเรียน และกิจกรรมต่าง ๆ ของโรงเรียนวิริยาลัยวิทยา"
        crumbs={[{ label: "ข่าวสาร" }]}
      />
      <section className="container-edge py-16 md:py-20">
        <NewsExplorer />
      </section>
    </>
  );
}
