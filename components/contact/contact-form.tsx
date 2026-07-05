"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useSchoolStore } from "@/lib/store/school-store";

interface FormState {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
}

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
};

const topics = [
  "สอบถามการรับสมัคร",
  "นัดหมายเยี่ยมชมโรงเรียน",
  "สอบถามค่าเล่าเรียนและทุน",
  "เรื่องรถรับส่ง",
  "อื่น ๆ",
];

type Errors = Partial<Record<keyof FormState, string>>;

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "กรุณากรอกชื่อของท่าน";
  if (!v.email.trim()) e.email = "กรุณากรอกอีเมล";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "รูปแบบอีเมลไม่ถูกต้อง";
  if (v.phone.trim() && !/^0\d{1,2}[-\s]?\d{3}[-\s]?\d{3,4}$/.test(v.phone.trim()))
    e.phone = "เบอร์โทรศัพท์ไม่ถูกต้อง เช่น 081-234-5678";
  if (!v.topic) e.topic = "กรุณาเลือกเรื่องที่ต้องการติดต่อ";
  if (!v.message.trim()) e.message = "กรุณากรอกข้อความ";
  else if (v.message.trim().length < 10)
    e.message = "กรุณากรอกรายละเอียดอย่างน้อย 10 ตัวอักษร";
  return e;
}

export function ContactForm() {
  const addContactMessage = useSchoolStore((s) => s.addContactMessage);
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function update(field: keyof FormState, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) setErrors(validate({ ...values, [field]: value }));
  }

  function blur(field: keyof FormState) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, topic: true, message: true });
    if (Object.keys(found).length) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      (first as HTMLElement)?.focus?.();
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    addContactMessage(values);
    setSubmitting(false);
    setDone(true);
    setValues(empty);
    setTouched({});
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-success/25 bg-success-soft/50 p-8 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-success text-primary-fg">
          <CheckCircle2 className="size-8" aria-hidden />
        </span>
        <h3 className="mt-5 font-serif text-xl font-bold text-ink">
          ส่งข้อความเรียบร้อยแล้ว
        </h3>
        <p className="mx-auto mt-2 max-w-sm leading-relaxed text-ink-soft">
          ขอบคุณที่ติดต่อเรา ทีมงานจะตอบกลับทางอีเมลหรือโทรศัพท์
          ภายใน 1–2 วันทำการ
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setDone(false)}>
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="ชื่อ-นามสกุล"
          htmlFor="c-name"
          required
          error={touched.name ? errors.name : undefined}
        >
          <Input
            id="c-name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={() => blur("name")}
            invalid={touched.name && !!errors.name}
            placeholder="ชื่อของท่าน"
            autoComplete="name"
          />
        </Field>

        <Field
          label="เบอร์โทรศัพท์"
          htmlFor="c-phone"
          hint="ไม่บังคับ"
          error={touched.phone ? errors.phone : undefined}
        >
          <Input
            id="c-phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => blur("phone")}
            invalid={touched.phone && !!errors.phone}
            placeholder="081-234-5678"
            autoComplete="tel"
          />
        </Field>

        <Field
          label="อีเมล"
          htmlFor="c-email"
          required
          error={touched.email ? errors.email : undefined}
        >
          <Input
            id="c-email"
            type="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => blur("email")}
            invalid={touched.email && !!errors.email}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </Field>

        <Field
          label="เรื่องที่ต้องการติดต่อ"
          htmlFor="c-topic"
          required
          error={touched.topic ? errors.topic : undefined}
        >
          <Select
            id="c-topic"
            value={values.topic}
            onChange={(e) => update("topic", e.target.value)}
            onBlur={() => blur("topic")}
            invalid={touched.topic && !!errors.topic}
          >
            <option value="" disabled>
              เลือกเรื่อง
            </option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="ข้อความ"
          htmlFor="c-message"
          required
          error={touched.message ? errors.message : undefined}
          className="sm:col-span-2"
        >
          <Textarea
            id="c-message"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            onBlur={() => blur("message")}
            invalid={touched.message && !!errors.message}
            placeholder="รายละเอียดที่ต้องการสอบถาม"
          />
        </Field>
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        loading={submitting}
        className="mt-6 w-full sm:w-auto"
      >
        {!submitting && <Send className="size-4" aria-hidden />}
        {submitting ? "กำลังส่ง…" : "ส่งข้อความ"}
      </Button>
    </form>
  );
}
