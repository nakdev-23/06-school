export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  children: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export function isGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

export const nav: NavEntry[] = [
  {
    label: "โรงเรียนของเรา",
    children: [
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "คณะครูและบุคลากร", href: "/faculty" },
      { label: "ภาพกิจกรรม", href: "/gallery" },
    ],
  },
  { label: "หลักสูตร", href: "/academics" },
  { label: "รับสมัคร", href: "/admissions" },
  {
    label: "ข่าวและปฏิทิน",
    children: [
      { label: "ข่าวสารและกิจกรรม", href: "/news" },
      { label: "ปฏิทินการศึกษา", href: "/calendar" },
    ],
  },
  { label: "ติดต่อเรา", href: "/contact" },
];
