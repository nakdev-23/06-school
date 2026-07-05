# เว็บไซต์โรงเรียน

เว็บโรงเรียนที่น่าเชื่อถือ: หลักสูตรตามระดับชั้น, รับสมัคร (ฟอร์ม), ข่าว/กิจกรรม, ปฏิทิน, บุคลากร, แกลเลอรี, ติดต่อ

ส่วนหนึ่งของพอร์ตโฟลิโอ 10 เว็บ — ดูภาพรวมทั้งหมดที่ [`../README.md`](../README.md)

## Demo roles
— (เว็บสาธารณะ + ฟอร์มสมัครเรียน/ติดต่อ) — เป็น **mock login** (ไม่มีรหัสผ่านจริง) ข้อมูลเก็บใน localStorage และคงอยู่หลัง refresh

## Routes
- `/`
- `/about`
- `/academics`
- `/academics/[level]`
- `/admissions`
- `/calendar`
- `/contact`
- `/faculty`
- `/gallery`
- `/news`
- `/news/[slug]`

## Tech stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · **Zustand** (persist) · lucide-react · framer-motion

โค้ด/ข้อมูลเป็น mock ทั้งหมด ไม่มี backend — โฟลว์หลักทำงานครบผ่าน client store

## รันโปรเจกต์
```bash
npm install      # ครั้งแรกเท่านั้น
npm run dev      # http://localhost:3000
# หลายแอปพร้อมกัน: npm run dev -- -p 3005
npm run build    # production build
```

## โครงสร้าง
```
app/            routes (App Router)
components/      UI primitives + feature components
lib/store/       Zustand stores (persisted)
lib/data/        mock seed data (บริบทไทย)
lib/utils.ts     cn() + ตัวจัดรูปแบบ THB/วันที่
```

> ดีไซน์ยึด `_shared/design-systems/06-school.md` (สร้างด้วย skill ui-ux-pro-max) และกฎ craft ของ impeccable
