import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CalendarView } from "@/components/calendar/calendar-view";

export const metadata: Metadata = {
  title: "ปฏิทินการศึกษา",
  description:
    "ปฏิทินการศึกษาและกิจกรรมสำคัญประจำปีการศึกษา 2569 ของโรงเรียนนักเดฟ",
};

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        title="ปฏิทินการศึกษา ปีการศึกษา 2569"
        lead="กำหนดการเปิด-ปิดภาคเรียน วันสอบ กิจกรรม และวันสำคัญตลอดปีการศึกษา วางแผนล่วงหน้าไปพร้อมกับเรา"
        crumbs={[{ label: "ปฏิทินการศึกษา" }]}
      />
      <section className="container-edge py-16 md:py-20">
        <CalendarView />
      </section>
    </>
  );
}
