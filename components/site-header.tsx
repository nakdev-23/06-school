"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogIn, LogOut, Menu, Phone, User, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { nav, isGroup, type NavEntry } from "@/lib/data/nav";
import { school } from "@/lib/data/school";
import {
  avatarUrl,
  hydrateSessionStore,
  useSessionStore,
} from "@/lib/store/session";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function groupActive(pathname: string, entry: NavEntry): boolean {
  if (isGroup(entry)) {
    return entry.children.some((c) => isActive(pathname, c.href));
  }
  return isActive(pathname, entry.href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const currentUser = useSessionStore((state) => state.currentUser);
  const hasHydrated = useSessionStore((state) => state.hasHydrated);
  const logout = useSessionStore((state) => state.logout);

  useEffect(() => {
    hydrateSessionStore();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    setAccountOpen(false);
    setDrawerOpen(false);
  }, [pathname]);

  function handleLogout() {
    logout();
    setAccountOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-[30] border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-bg/90 backdrop-blur-md shadow-sm"
          : "border-transparent bg-bg",
      )}
    >
      <div className="container-edge flex h-18 items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="rounded-lg py-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          aria-label={`${school.name} — หน้าแรก`}
        >
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="เมนูหลัก"
          className="hidden items-center gap-1 lg:flex"
        >
          {nav.map((entry) =>
            isGroup(entry) ? (
              <div key={entry.label} className="group relative">
                <button
                  type="button"
                  className={cn(
                    "flex h-10 cursor-pointer items-center gap-1 rounded-lg px-3.5 text-[0.95rem] font-medium transition-colors hover:bg-surface-2",
                    groupActive(pathname, entry)
                      ? "text-primary"
                      : "text-ink-soft",
                  )}
                  aria-haspopup="true"
                >
                  {entry.label}
                  <ChevronDown
                    className="size-4 transition-transform group-hover:rotate-180"
                    aria-hidden
                  />
                </button>
                <div className="invisible absolute left-0 top-full min-w-56 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <div className="overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg">
                    {entry.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-[0.92rem] transition-colors hover:bg-surface-2",
                          isActive(pathname, child.href)
                            ? "font-medium text-primary"
                            : "text-ink-soft",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                aria-current={
                  isActive(pathname, entry.href) ? "page" : undefined
                }
                className={cn(
                  "relative flex h-10 items-center rounded-lg px-3.5 text-[0.95rem] font-medium transition-colors hover:bg-surface-2",
                  isActive(pathname, entry.href)
                    ? "text-primary"
                    : "text-ink-soft",
                )}
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          {hasHydrated && currentUser ? (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={accountOpen}
                aria-label={`เมนูผู้ใช้ ${currentUser.displayName}`}
                className="flex h-11 min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-border bg-surface px-2.5 text-sm font-medium text-ink transition hover:border-primary hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Image
                  src={avatarUrl(currentUser.avatarSeed, 80)}
                  alt=""
                  width={32}
                  height={32}
                  className="size-8 rounded-full object-cover"
                />
                <span className="hidden max-w-32 truncate xl:block">
                  {currentUser.displayName}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 shrink-0 transition-transform",
                    accountOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[20] mt-2 w-60 overflow-hidden rounded-xl border border-border bg-surface p-1.5 shadow-lg"
                >
                  <Link
                    href="/portal"
                    role="menuitem"
                    className="flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-soft transition hover:bg-surface-2 hover:text-ink"
                  >
                    <User className="size-4" aria-hidden />
                    พอร์ทัลของฉัน
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-danger transition hover:bg-danger-soft"
                  >
                    <LogOut className="size-4" aria-hidden />
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ButtonLink
              href="/login"
              size="sm"
              variant="outline"
              className="hidden sm:inline-flex"
            >
              <LogIn className="size-4" aria-hidden />
              เข้าสู่ระบบ
            </ButtonLink>
          )}
          <ButtonLink
            href="/admissions#apply"
            size="sm"
            variant="accent"
            className="hidden sm:inline-flex"
          >
            สมัครเรียน
          </ButtonLink>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="เปิดเมนู"
            aria-expanded={drawerOpen}
            className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2 lg:hidden"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-[45] bg-ink/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="เมนูนำทาง"
            className="fixed inset-y-0 right-0 z-[46] flex w-[86%] max-w-sm flex-col bg-surface shadow-xl"
          >
            <div className="flex h-18 items-center justify-between border-b border-border px-5">
              <Logo />
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="ปิดเมนู"
                className="flex size-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-surface-2"
              >
                <X className="size-6" aria-hidden />
              </button>
            </div>
            <nav
              aria-label="เมนูหลัก"
              className="flex-1 overflow-y-auto px-4 py-5"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) {
                  setDrawerOpen(false);
                }
              }}
            >
              <Link
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-surface-2",
                  pathname === "/" ? "text-primary" : "text-ink",
                )}
              >
                หน้าแรก
              </Link>
              {nav.map((entry) =>
                isGroup(entry) ? (
                  <div key={entry.label} className="mt-3">
                    <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-muted">
                      {entry.label}
                    </p>
                    {entry.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        aria-current={
                          isActive(pathname, child.href) ? "page" : undefined
                        }
                        className={cn(
                          "block rounded-lg px-3 py-2.5 text-[0.95rem] transition-colors hover:bg-surface-2",
                          isActive(pathname, child.href)
                            ? "font-medium text-primary"
                            : "text-ink-soft",
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    aria-current={
                      isActive(pathname, entry.href) ? "page" : undefined
                    }
                    className={cn(
                      "mt-1 block rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-surface-2",
                      isActive(pathname, entry.href)
                        ? "text-primary"
                        : "text-ink",
                    )}
                  >
                    {entry.label}
                  </Link>
                ),
              )}
            </nav>
            <div
              className="border-t border-border p-4"
              onClick={() => setDrawerOpen(false)}
            >
              {hasHydrated && currentUser ? (
                <div className="mb-3 rounded-xl border border-border bg-surface-2 p-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={avatarUrl(currentUser.avatarSeed, 96)}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {currentUser.displayName}
                      </p>
                      <Link
                        href="/portal"
                        className="mt-1 inline-flex min-h-8 items-center text-sm font-medium text-primary hover:text-primary-hover"
                      >
                        ไปที่พอร์ทัล
                      </Link>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-danger/20 bg-danger-soft px-3 py-2 text-sm font-medium text-danger transition hover:border-danger/40"
                  >
                    <LogOut className="size-4" aria-hidden />
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <ButtonLink
                  href="/login"
                  variant="outline"
                  className="mb-3 w-full"
                >
                  <LogIn className="size-4" aria-hidden />
                  เข้าสู่ระบบ
                </ButtonLink>
              )}
              <ButtonLink
                href="/admissions#apply"
                variant="accent"
                className="w-full"
              >
                สมัครเรียน
              </ButtonLink>
              <a
                href={`tel:${school.phone}`}
                className="mt-3 flex items-center justify-center gap-2 text-sm text-muted hover:text-ink"
              >
                <Phone className="size-4" aria-hidden />
                {school.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
