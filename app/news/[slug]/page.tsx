import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { news, getNews, sortedNews } from "@/lib/data/news";
import { formatThaiDate } from "@/lib/utils";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) return { title: "ไม่พบข่าว" };
  return { title: item.title, description: item.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNews(slug);
  if (!item) notFound();

  const related = sortedNews.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        title={item.title}
        crumbs={[
          { label: "ข่าวสาร", href: "/news" },
          { label: item.category },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <Badge tone="accent">{item.category}</Badge>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" aria-hidden />
            {formatThaiDate(item.date)}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="size-4" aria-hidden />
            {item.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-4" aria-hidden />
            อ่าน {item.readMinutes} นาที
          </span>
        </div>
      </PageHeader>

      <article className="container-edge py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border shadow-md">
            <Image
              src={item.image}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <div className="mt-10 space-y-6 text-lg leading-[1.85] text-ink-soft">
            <p className="font-serif text-xl font-medium leading-relaxed text-ink">
              {item.excerpt}
            </p>
            {item.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <ButtonLink
              href="/news"
              variant="ghost"
              className="px-0 hover:bg-transparent hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden />
              กลับไปหน้าข่าวทั้งหมด
            </ButtonLink>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="border-t border-border bg-surface">
        <div className="container-edge py-16 md:py-20">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl font-bold text-ink">
              ข่าวอื่นที่น่าสนใจ
            </h2>
            <Link
              href="/news"
              className="hidden items-center gap-1.5 text-sm font-medium text-primary hover:underline sm:flex"
            >
              ดูทั้งหมด
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-shadow hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={n.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs text-muted">{formatThaiDate(n.date)}</p>
                  <h3 className="mt-1.5 font-serif text-base font-bold leading-snug text-ink transition-colors group-hover:text-primary">
                    {n.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
