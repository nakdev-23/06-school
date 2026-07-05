"use client";

import { useState } from "react";
import { CheckCircle2, Send, UserPlus } from "lucide-react";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { useSchoolStore } from "@/lib/store/school-store";
import { levelOptions } from "@/lib/data/admissions";
import { formatThaiDate } from "@/lib/utils";

interface FormState {
  studentName: string;
  studentNickname: string;
  birthDate: string;
  level: string;
  parentName: string;
  phone: string;
  email: string;
  message: string;
}

const empty: FormState = {
  studentName: "",
  studentNickname: "",
  birthDate: "",
  level: "",
  parentName: "",
  phone: "",
  email: "",
  message: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

function validate(values: FormState): Errors {
  const e: Errors = {};
  if (!values.studentName.trim())
    e.studentName = "กรุณากรอกชื่อ-นามสกุลของนักเรียน";
  else if (values.studentName.trim().length < 3)
    e.studentName = "ชื่อ-นามสกุลสั้นเกินไป กรุณาตรวจสอบอีกครั้ง";
  if (!values.birthDate) e.birthDate = "กรุณาเลือกวันเกิดของนักเรียน";
  else if (new Date(values.birthDate) > new Date())
    e.birthDate = "วันเกิดต้องไม่เป็นวันในอนาคต";
  if (!values.level) e.level = "กรุณาเลือกระดับชั้นที่ต้องการสมัคร";
  if (!values.parentName.trim())
    e.parentName = "กรุณากรอกชื่อผู้ปกครอง";
  if (!values.phone.trim()) e.phone = "กรุณากรอกเบอร์โทรศัพท์ติดต่อ";
  else if (!/^0\d{1,2}[-\s]?\d{3}[-\s]?\d{3,4}$/.test(values.phone.trim()))
    e.phone = "เบอร์โทรศัพท์ไม่ถูกต้อง เช่น 081-234-5678";
  if (!values.email.trim()) e.email = "กรุณากรอกอีเมล";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    e.email = "รูปแบบอีเมลไม่ถูกต้อง";
  return e;
}

export function ApplicationForm() {
  const addApplication = useSchoolStore((s) => s.addApplication);
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>(
    {},
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<null | {
    studentName: string;
    ref: string;
  }>(null);

  function update(field: keyof FormState, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) {
      setErrors(validate({ ...values, [field]: value }));
    }
  }

  function handleBlur(field: keyof FormState) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({
      studentName: true,
      birthDate: true,
      level: true,
      parentName: true,
      phone: true,
      email: true,
    });
    if (Object.keys(found).length > 0) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      (first as HTMLElement)?.focus?.();
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    const app = addApplication(values);
    setSubmitting(false);
    setSubmitted({
      studentName: values.studentName,
      ref: app.id.slice(-6).toUpperCase(),
    });
    setValues(empty);
    setTouched({});
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-success/25 bg-success-soft/50 p-8 text-center md:p-12">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-success text-primary-fg">
          <CheckCircle2 className="size-9" aria-hidden />
        </span>
        <h3 className="mt-6 font-serif text-2xl font-bold text-ink">
          ได้รับใบสมัครเรียบร้อยแล้ว
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          ขอบคุณที่สนใจโรงเรียนนักเดฟ เราได้รับใบสมัครของน้อง
          <span className="font-semibold text-ink"> {submitted.studentName} </span>
          แล้ว ฝ่ายรับสมัครจะติดต่อกลับภายใน 5 วันทำการ
        </p>
        <p className="mt-4 inline-block rounded-lg border border-border bg-surface px-4 py-2 text-sm text-muted">
          หมายเลขอ้างอิง:{" "}
          <span className="tnum font-semibold text-ink">
            WL-{submitted.ref}
          </span>
        </p>
        <p className="mt-2 text-sm text-muted">
          ยื่นเมื่อ {formatThaiDate(new Date().toISOString())}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => setSubmitted(null)}>
            <UserPlus className="size-4" aria-hidden />
            สมัครนักเรียนอีกคน
          </Button>
          <ButtonLink href="/" variant="ghost">
            กลับสู่หน้าแรก
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-surface p-6 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="ชื่อ-นามสกุล นักเรียน"
          htmlFor="studentName"
          required
          error={touched.studentName ? errors.studentName : undefined}
          className="sm:col-span-2"
        >
          <Input
            id="studentName"
            value={values.studentName}
            onChange={(e) => update("studentName", e.target.value)}
            onBlur={() => handleBlur("studentName")}
            invalid={touched.studentName && !!errors.studentName}
            placeholder="เช่น เด็กหญิงพิมพ์มาดา ใจดี"
            autoComplete="name"
          />
        </Field>

        <Field label="ชื่อเล่น" htmlFor="studentNickname" hint="ไม่บังคับ">
          <Input
            id="studentNickname"
            value={values.studentNickname}
            onChange={(e) => update("studentNickname", e.target.value)}
            placeholder="เช่น น้องพิมพ์"
          />
        </Field>

        <Field
          label="วันเกิดนักเรียน"
          htmlFor="birthDate"
          required
          error={touched.birthDate ? errors.birthDate : undefined}
        >
          <Input
            id="birthDate"
            type="date"
            value={values.birthDate}
            onChange={(e) => update("birthDate", e.target.value)}
            onBlur={() => handleBlur("birthDate")}
            invalid={touched.birthDate && !!errors.birthDate}
          />
        </Field>

        <Field
          label="ระดับชั้นที่ต้องการสมัคร"
          htmlFor="level"
          required
          error={touched.level ? errors.level : undefined}
          className="sm:col-span-2"
        >
          <Select
            id="level"
            value={values.level}
            onChange={(e) => update("level", e.target.value)}
            onBlur={() => handleBlur("level")}
            invalid={touched.level && !!errors.level}
          >
            <option value="" disabled>
              เลือกระดับชั้น
            </option>
            {levelOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="ชื่อ-นามสกุล ผู้ปกครอง"
          htmlFor="parentName"
          required
          error={touched.parentName ? errors.parentName : undefined}
          className="sm:col-span-2"
        >
          <Input
            id="parentName"
            value={values.parentName}
            onChange={(e) => update("parentName", e.target.value)}
            onBlur={() => handleBlur("parentName")}
            invalid={touched.parentName && !!errors.parentName}
            placeholder="ชื่อ-นามสกุล ผู้ปกครอง"
          />
        </Field>

        <Field
          label="เบอร์โทรศัพท์"
          htmlFor="phone"
          required
          error={touched.phone ? errors.phone : undefined}
        >
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            invalid={touched.phone && !!errors.phone}
            placeholder="081-234-5678"
            autoComplete="tel"
          />
        </Field>

        <Field
          label="อีเมล"
          htmlFor="email"
          required
          error={touched.email ? errors.email : undefined}
        >
          <Input
            id="email"
            type="email"
            inputMode="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            invalid={touched.email && !!errors.email}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </Field>

        <Field
          label="ข้อความถึงฝ่ายรับสมัคร"
          htmlFor="message"
          hint="ไม่บังคับ — บอกเราเพิ่มเติมเกี่ยวกับลูกของคุณ หรือสิ่งที่อยากให้เราทราบ"
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder="เช่น สนใจหลักสูตรสองภาษา หรือสอบถามเรื่องทุนการศึกษา"
          />
        </Field>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted">
        ข้อมูลของท่านจะถูกเก็บไว้เพื่อการติดต่อเรื่องการรับสมัครเท่านั้น
        การกดส่งใบสมัครถือว่าท่านยินยอมให้โรงเรียนติดต่อกลับ
      </p>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        loading={submitting}
        className="mt-6 w-full sm:w-auto"
      >
        {!submitting && <Send className="size-4" aria-hidden />}
        {submitting ? "กำลังส่งใบสมัคร…" : "ส่งใบสมัคร"}
      </Button>
    </form>
  );
}
