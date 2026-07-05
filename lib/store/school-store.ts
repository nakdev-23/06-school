"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Application {
  id: string;
  studentName: string;
  studentNickname: string;
  birthDate: string;
  level: string;
  parentName: string;
  phone: string;
  email: string;
  message: string;
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  submittedAt: string;
}

interface SchoolState {
  applications: Application[];
  contactMessages: ContactMessage[];
  addApplication: (data: Omit<Application, "id" | "submittedAt">) => Application;
  addContactMessage: (
    data: Omit<ContactMessage, "id" | "submittedAt">,
  ) => ContactMessage;
}

function makeId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

export const useSchoolStore = create<SchoolState>()(
  persist(
    (set) => ({
      applications: [],
      contactMessages: [],
      addApplication: (data) => {
        const application: Application = {
          ...data,
          id: makeId("app"),
          submittedAt: new Date().toISOString(),
        };
        set((state) => ({
          applications: [application, ...state.applications],
        }));
        return application;
      },
      addContactMessage: (data) => {
        const message: ContactMessage = {
          ...data,
          id: makeId("msg"),
          submittedAt: new Date().toISOString(),
        };
        set((state) => ({
          contactMessages: [message, ...state.contactMessages],
        }));
        return message;
      },
    }),
    { name: "wiriyalai-school" },
  ),
);
