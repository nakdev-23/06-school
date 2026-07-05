import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const THAI_MONTHS = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const THAI_MONTHS_SHORT = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

/** Full Thai date: 12 มิถุนายน 2569 */
export function formatThaiDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate()} ${THAI_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`;
}

/** Short Thai date: 12 มิ.ย. 69 */
export function formatThaiDateShort(iso: string): string {
  const d = new Date(iso);
  const yy = String((d.getFullYear() + 543) % 100).padStart(2, "0");
  return `${d.getDate()} ${THAI_MONTHS_SHORT[d.getMonth()]} ${yy}`;
}

export function thaiMonthName(monthIndex: number): string {
  return THAI_MONTHS[monthIndex];
}

/** { day: 12, month: "มิ.ย.", weekday: "พฤหัสบดี" } for calendar chips */
export function dateParts(iso: string) {
  const d = new Date(iso);
  const weekdays = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];
  return {
    day: d.getDate(),
    monthShort: THAI_MONTHS_SHORT[d.getMonth()],
    month: d.getMonth(),
    year: d.getFullYear(),
    weekday: weekdays[d.getDay()],
  };
}

const thb = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

export function formatTHB(amount: number): string {
  return thb.format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("th-TH").format(n);
}
