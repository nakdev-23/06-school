export type LevelSlug = "kindergarten" | "primary" | "secondary";

export interface ProgramLevel {
  slug: LevelSlug;
  name: string; // อนุบาล
  fullName: string; // ระดับปฐมวัย (อนุบาล 1–3)
  grades: string; // อ.1 – อ.3
  ageRange: string; // 3 – 6 ปี
  tagline: string;
  summary: string;
  heroImage: string;
  color: "primary" | "accent" | "success";
  philosophy: string;
  highlights: { title: string; detail: string }[];
  subjects: { group: string; items: string[] }[];
  outcomes: string[];
  dailyRhythm: { time: string; activity: string }[];
  classSize: number;
  stats: { label: string; value: string }[];
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  department: DepartmentSlug;
  degree: string;
  subjects: string[];
  bio: string;
  years: number;
  image: string;
}

export type DepartmentSlug =
  | "leadership"
  | "early-years"
  | "thai-social"
  | "math-science"
  | "language"
  | "arts-pe";

export interface Department {
  slug: DepartmentSlug;
  name: string;
  description: string;
}

export type NewsCategory = "ประกาศ" | "กิจกรรม" | "วิชาการ" | "ความสำเร็จ";

export interface NewsItem {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string; // ISO
  excerpt: string;
  body: string[]; // paragraphs
  image: string;
  author: string;
  readMinutes: number;
}

export type EventType = "academic" | "holiday" | "activity" | "exam" | "meeting";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO start
  endDate?: string;
  type: EventType;
  location: string;
  detail: string;
}

export interface TuitionRow {
  level: string;
  slug: LevelSlug;
  tuition: number; // ค่าเล่าเรียน / ปี
  registration: number; // ค่าแรกเข้า
  activities: number; // ค่ากิจกรรม / ปี
  total: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
  category: GalleryCategory;
  width: number;
  height: number;
}

export type GalleryCategory =
  | "ห้องเรียน"
  | "กิจกรรม"
  | "กีฬา"
  | "อาคารสถานที่"
  | "ศิลปะดนตรี";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AdmissionStep {
  title: string;
  detail: string;
  period: string;
}

export type UserRole = "teacher" | "student";

export interface MockUser {
  id: string;
  displayName: string;
  email: string;
  avatarSeed: string;
  role: UserRole;
}
