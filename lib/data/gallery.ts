import type { GalleryImage, GalleryCategory } from "@/lib/types";

export const galleryCategories: GalleryCategory[] = [
  "ห้องเรียน",
  "กิจกรรม",
  "กีฬา",
  "อาคารสถานที่",
  "ศิลปะดนตรี",
];

// Mixed aspect ratios feed a masonry-style layout.
export const gallery: GalleryImage[] = [
  { id: "g1", src: "https://picsum.photos/seed/wl-g1/800/1000", caption: "คาบเรียนวิทยาศาสตร์สองภาษา ระดับประถม", category: "ห้องเรียน", width: 800, height: 1000 },
  { id: "g2", src: "https://picsum.photos/seed/wl-g2/1000/700", caption: "ห้องสมุดวิริยะ มุมค้นคว้ายามบ่าย", category: "อาคารสถานที่", width: 1000, height: 700 },
  { id: "g3", src: "https://picsum.photos/seed/wl-g3/800/800", caption: "กิจกรรมศิลปะสร้างสรรค์ ระดับอนุบาล", category: "ศิลปะดนตรี", width: 800, height: 800 },
  { id: "g4", src: "https://picsum.photos/seed/wl-g4/900/1200", caption: "การแข่งขันว่ายน้ำในงานกีฬาสี", category: "กีฬา", width: 900, height: 1200 },
  { id: "g5", src: "https://picsum.photos/seed/wl-g5/1200/800", caption: "นิทรรศการโครงงานวิทยาศาสตร์ประจำปี", category: "กิจกรรม", width: 1200, height: 800 },
  { id: "g6", src: "https://picsum.photos/seed/wl-g6/800/1100", caption: "วงดนตรีไทยซ้อมก่อนการแสดงประจำปี", category: "ศิลปะดนตรี", width: 800, height: 1100 },
  { id: "g7", src: "https://picsum.photos/seed/wl-g7/1000/750", caption: "อาคารเรียนและลานกิจกรรมกลางแจ้ง", category: "อาคารสถานที่", width: 1000, height: 750 },
  { id: "g8", src: "https://picsum.photos/seed/wl-g8/800/900", caption: "ขบวนพาเหรดคณะสีในงานวิริยะเกมส์", category: "กีฬา", width: 800, height: 900 },
  { id: "g9", src: "https://picsum.photos/seed/wl-g9/1100/800", caption: "ห้องปฏิบัติการหุ่นยนต์และโคดดิ้ง", category: "ห้องเรียน", width: 1100, height: 800 },
  { id: "g10", src: "https://picsum.photos/seed/wl-g10/800/1000", caption: "พิธีไหว้ครูประจำปีการศึกษา", category: "กิจกรรม", width: 800, height: 1000 },
  { id: "g11", src: "https://picsum.photos/seed/wl-g11/1000/800", caption: "การทดลองเคมีในศูนย์วิทยาศาสตร์", category: "ห้องเรียน", width: 1000, height: 800 },
  { id: "g12", src: "https://picsum.photos/seed/wl-g12/900/1200", caption: "การแสดงนาฏศิลป์ไทยในงานวันสำคัญ", category: "ศิลปะดนตรี", width: 900, height: 1200 },
  { id: "g13", src: "https://picsum.photos/seed/wl-g13/1200/800", caption: "สนามฟุตบอลมาตรฐานของโรงเรียน", category: "อาคารสถานที่", width: 1200, height: 800 },
  { id: "g14", src: "https://picsum.photos/seed/wl-g14/800/950", caption: "ค่ายภาษาอังกฤษกับครูเจ้าของภาษา", category: "กิจกรรม", width: 800, height: 950 },
  { id: "g15", src: "https://picsum.photos/seed/wl-g15/1000/700", caption: "การเรียนรู้ตามมุมสนใจ ระดับอนุบาล", category: "ห้องเรียน", width: 1000, height: 700 },
  { id: "g16", src: "https://picsum.photos/seed/wl-g16/850/1050", caption: "การแข่งขันกรีฑาประเภทลู่", category: "กีฬา", width: 850, height: 1050 },
];
