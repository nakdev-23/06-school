import type { Metadata } from "next";
import { EB_Garamond, Noto_Serif_Thai, Sarabun } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoSerifThai = Noto_Serif_Thai({
  variable: "--font-noto-serif-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wiriyalai.ac.th"),
  title: {
    default: "โรงเรียนวิริยาลัยวิทยา — สถาบันการศึกษาเพื่อปัญญาและคุณธรรม",
    template: "%s · โรงเรียนวิริยาลัยวิทยา",
  },
  description:
    "โรงเรียนวิริยาลัยวิทยา สถาบันการศึกษาเอกชนตั้งแต่ระดับอนุบาลถึงมัธยมศึกษา มุ่งพัฒนาผู้เรียนอย่างสมดุลทั้งวิชาการ คุณธรรม และทักษะแห่งศตวรรษที่ 21",
  keywords: [
    "โรงเรียน",
    "การศึกษา",
    "อนุบาล",
    "ประถมศึกษา",
    "มัธยมศึกษา",
    "สมัครเรียน",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${ebGaramond.variable} ${notoSerifThai.variable} ${sarabun.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <a
          href="#main"
          className="sr-only rounded-md bg-primary px-4 py-2 text-primary-fg focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]"
        >
          ข้ามไปยังเนื้อหาหลัก
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
