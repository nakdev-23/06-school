"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  BookOpenCheck,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  Megaphone,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { sortedEvents, eventTypeLabels } from "@/lib/data/events";
import { sortedNews } from "@/lib/data/news";
import {
  avatarUrl,
  hydrateSessionStore,
  roleLabels,
  useSessionStore,
} from "@/lib/store/session";
import { formatThaiDate, formatThaiDateShort } from "@/lib/utils";

const teacherActions = [
  { title: "โพสต์ประกาศ", detail: "ร่างประกาศถึงนักเรียนและผู้ปกครอง", icon: Megaphone },
  { title: "รายชื่อนักเรียน", detail: "ตรวจสอบข้อมูลชั้นเรียนและผู้ติดต่อ", icon: Users },
  { title: "ตารางสอนวันนี้", detail: "ดูคาบเรียน ห้องเรียน และหมายเหตุ", icon: CalendarDays },
];

const studentActions = [
  { title: "ตารางเรียนส่วนตัว", detail: "ดูคาบเรียนและห้องเรียนของวันนี้", icon: CalendarDays },
  { title: "การบ้านที่ต้องส่ง", detail: "ติดตามงานค้างและกำหนดส่ง", icon: ClipboardList },
  { title: "ข่าวสำหรับครอบครัว", detail: "ประกาศสำคัญจากโรงเรียน", icon: Bell },
];

const eventTones = {
  academic: "primary",
  holiday: "neutral",
  activity: "success",
  exam: "danger",
  meeting: "accent",
} as const;

export default function PortalPage() {
  const router = useRouter();
  const currentUser = useSessionStore((state) => state.currentUser);
  const hasHydrated = useSessionStore((state) => state.hasHydrated);

  useEffect(() => {
    hydrateSessionStore();
  }, []);

  useEffect(() => {
    if (hasHydrated && !currentUser) {
      router.replace("/login");
    }
  }, [currentUser, hasHydrated, router]);

  if (!hasHydrated) {
    return (
      <section className="container-edge py-16 md:py-20">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <p className="text-muted">กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
        </div>
      </section>
    );
  }

  if (!currentUser) {
    return (
      <section className="container-edge py-16 md:py-20">
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <p className="text-muted">กำลังนำไปยังหน้าเข้าสู่ระบบ...</p>
        </div>
      </section>
    );
  }

  const isTeacher = currentUser.role === "teacher";
  const actions = isTeacher ? teacherActions : studentActions;
  const upcomingEvents = sortedEvents
    .filter((event) => new Date(event.date).getTime() >= new Date().setHours(0, 0, 0, 0))
    .slice(0, 4);
  const latestNews = sortedNews.slice(0, 3);

  return (
    <section className="bg-paper">
      <div className="container-edge py-12 md:py-16">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-lg md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={avatarUrl(currentUser.avatarSeed)}
                alt=""
                width={88}
                height={88}
                className="size-20 rounded-full border border-border object-cover shadow-sm"
              />
              <div>
                <Badge tone={isTeacher ? "accent" : "primary"}>
                  {roleLabels[currentUser.role]}
                </Badge>
                <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
                  สวัสดี {currentUser.displayName}
                </h1>
                <p className="mt-2 text-ink-soft">
                  พอร์ทัลส่วนตัวสำหรับติดตามข่าวสาร กำหนดการ และงานประจำวัน
                </p>
              </div>
            </div>
            <ButtonLink href="/news" variant="outline">
              ข่าวทั้งหมด
            </ButtonLink>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.title}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary-tint text-primary">
                <action.icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-serif text-xl font-semibold">{action.title}</h2>
              <p className="mt-2 text-sm text-ink-soft">{action.detail}</p>
              <p className="mt-4 text-xs font-medium text-muted">ข้อมูลตัวอย่าง</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold">ประกาศล่าสุด</h2>
                <p className="text-sm text-muted">ข่าวและประกาศที่เกี่ยวข้องกับโรงเรียน</p>
              </div>
              <Megaphone className="size-5 text-accent" aria-hidden />
            </div>
            {latestNews.length > 0 ? (
              <div className="grid gap-4">
                {latestNews.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="group grid min-h-28 gap-4 rounded-xl border border-border p-3 transition hover:border-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:grid-cols-[8rem_1fr]"
                  >
                    <Image
                      src={item.image}
                      alt=""
                      width={160}
                      height={104}
                      className="h-28 w-full rounded-lg object-cover sm:h-full"
                    />
                    <span>
                      <span className="flex flex-wrap items-center gap-2">
                        <Badge tone="neutral">{item.category}</Badge>
                        <span className="text-xs text-muted">
                          {formatThaiDate(item.date)}
                        </span>
                      </span>
                      <span className="mt-2 block font-semibold text-ink group-hover:text-primary">
                        {item.title}
                      </span>
                      <span className="mt-1 line-clamp-2 text-sm text-ink-soft">
                        {item.excerpt}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-surface-2 p-4 text-sm text-muted">
                ยังไม่มีประกาศในขณะนี้
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-surface p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl font-semibold">กิจกรรมถัดไป</h2>
                <p className="text-sm text-muted">กำหนดการที่กำลังจะมาถึง</p>
              </div>
              <BookOpenCheck className="size-5 text-primary" aria-hidden />
            </div>
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="grid grid-cols-[4.25rem_1fr] gap-3 rounded-xl border border-border bg-surface p-3"
                  >
                    <div className="rounded-lg bg-primary-tint px-2 py-3 text-center text-primary">
                      <p className="display-num text-3xl leading-none">
                        {new Date(event.date).getDate()}
                      </p>
                      <p className="mt-1 text-xs font-medium">
                        {formatThaiDateShort(event.date).split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                    <div>
                      <Badge tone={eventTones[event.type]}>
                        {eventTypeLabels[event.type]}
                      </Badge>
                      <h3 className="mt-2 font-semibold text-ink">{event.title}</h3>
                      <p className="mt-1 text-sm text-muted">{event.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-xl bg-surface-2 p-4 text-sm text-muted">
                ยังไม่มีกิจกรรมที่กำลังจะมาถึง
              </p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
