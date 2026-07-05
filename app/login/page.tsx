"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { GraduationCap, LogIn, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  avatarUrl,
  hydrateSessionStore,
  mockUsers,
  roleLabels,
  useSessionStore,
} from "@/lib/store/session";

const descriptions = {
  teacher: "เข้าดูประกาศ ห้องเรียน และกำหนดการสำหรับครู",
  student: "เข้าดูตารางเรียน การบ้าน ข่าวสาร และกิจกรรมของนักเรียน",
};

export default function LoginPage() {
  const router = useRouter();
  const currentUser = useSessionStore((state) => state.currentUser);
  const hasHydrated = useSessionStore((state) => state.hasHydrated);
  const login = useSessionStore((state) => state.login);

  useEffect(() => {
    hydrateSessionStore();
  }, []);

  useEffect(() => {
    if (hasHydrated && currentUser) {
      router.replace("/portal");
    }
  }, [currentUser, hasHydrated, router]);

  function handleLogin(userId: string) {
    login(userId);
    router.push("/portal");
  }

  return (
    <section className="bg-paper">
      <div className="container-edge grid min-h-[calc(100vh-8rem)] items-center gap-10 py-14 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <div>
          <Badge tone="primary" className="mb-5">
            ระบบทดลอง
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            เข้าสู่ระบบพอร์ทัลโรงเรียน
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            เลือกบัญชีตัวอย่างเพื่อเข้าสู่ระบบเดโม ไม่มีการใช้รหัสผ่านจริง
            และข้อมูลทั้งหมดจัดเก็บเฉพาะในเบราว์เซอร์ของคุณ
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-accent-soft bg-accent-tint p-4 text-sm text-ink-soft">
            <GraduationCap className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <p>
              ระบบนี้ทำขึ้นเพื่อแสดงตัวอย่างประสบการณ์ใช้งานของครู
              นักเรียน และผู้ปกครองเท่านั้น
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-4 shadow-lg sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-tint text-primary">
              <User className="size-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-serif text-2xl font-semibold">เลือกผู้ใช้</h2>
              <p className="text-sm text-muted">คลิกบัญชีที่ต้องการทดลองใช้งาน</p>
            </div>
          </div>

          <div className="grid gap-3">
            {mockUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => handleLogin(user.id)}
                aria-label={`เข้าสู่ระบบในชื่อ ${user.displayName}`}
                className="group flex min-h-28 cursor-pointer items-center gap-4 rounded-xl border border-border bg-surface p-4 text-left transition hover:border-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Image
                  src={avatarUrl(user.avatarSeed)}
                  alt=""
                  width={72}
                  height={72}
                  className="size-16 rounded-full border border-border object-cover shadow-sm"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-ink">{user.displayName}</span>
                    <Badge tone={user.role === "teacher" ? "accent" : "primary"}>
                      {roleLabels[user.role]}
                    </Badge>
                  </span>
                  <span className="mt-1 block text-sm text-muted">{user.email}</span>
                  <span className="mt-2 block text-sm text-ink-soft">
                    {descriptions[user.role]}
                  </span>
                </span>
                <LogIn
                  className="size-5 shrink-0 text-muted transition group-hover:text-primary"
                  aria-hidden
                />
              </button>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            className="mt-5 w-full"
            onClick={() => router.push("/")}
          >
            กลับหน้าเว็บไซต์
          </Button>
        </div>
      </div>
    </section>
  );
}
