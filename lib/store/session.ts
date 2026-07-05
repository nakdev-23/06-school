"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MockUser, UserRole } from "@/lib/types";

export const roleLabels: Record<UserRole, string> = {
  teacher: "ครู/เจ้าหน้าที่",
  student: "นักเรียน/ผู้ปกครอง",
};

export const mockUsers: MockUser[] = [
  {
    id: "teacher-1",
    displayName: "ครูณัฐวดี แก้ววิริยะ",
    email: "nattawadee@wiriyalai.ac.th",
    avatarSeed: "wl-user-teacher-1",
    role: "teacher",
  },
  {
    id: "student-1",
    displayName: "ปุณณภพ วัฒนากุล",
    email: "punnaphop@student.wiriyalai.ac.th",
    avatarSeed: "wl-user-student-1",
    role: "student",
  },
  {
    id: "student-2",
    displayName: "ผู้ปกครองของน้องมินตรา",
    email: "parent.mintra@example.com",
    avatarSeed: "wl-user-parent-1",
    role: "student",
  },
];

interface SessionState {
  currentUser: MockUser | null;
  hasHydrated: boolean;
  login: (userId: string) => void;
  logout: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export function avatarUrl(seed: string, size = 160): string {
  return `https://picsum.photos/seed/${seed}/${size}/${size}`;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      currentUser: null,
      hasHydrated: false,
      login: (userId) => {
        const user = mockUsers.find((item) => item.id === userId) ?? null;
        set({ currentUser: user });
      },
      logout: () => set({ currentUser: null }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "wiriyalai-school-session-v1",
      version: 1,
      partialize: (state) => ({ currentUser: state.currentUser }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      skipHydration: true,
    },
  ),
);

export function hydrateSessionStore() {
  if (!useSessionStore.persist.hasHydrated()) {
    void useSessionStore.persist.rehydrate();
  }
}
