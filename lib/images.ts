/**
 * Central image helpers — deterministic, relevant, real photos without an API key.
 *
 * - Places / scenes  → LoremFlickr, routed to subject-specific keywords.
 * - People portraits → pravatar, a real deterministic face per seed.
 *
 * Every URL is stable: the same seed always resolves to the same photo, so
 * server and client renders match and layouts never shift.
 */

const SUBJECT_TAGS = {
  building: "school,building,campus,architecture",
  classroom: "classroom,students,learning",
  students: "students,school,activity",
  library: "library,books",
  science: "science,laboratory",
  sports: "sports,school",
  arts: "music,art,school",
  graduation: "graduation,students",
  news: "school,students,classroom",
} as const;

export type PhotoSubject = keyof typeof SUBJECT_TAGS;

/** FNV-1a → a small, stable, non-negative integer for a `?lock=` value. */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % 100000;
}

/** Best-effort subject guess from a seed prefix when none is passed. */
function subjectFromSeed(seed: string): PhotoSubject {
  if (seed.includes("about") || seed.includes("fac") || seed.includes("building"))
    return "building";
  if (
    seed.includes("hero") ||
    seed.includes("kinder") ||
    seed.includes("primary") ||
    seed.includes("secondary")
  )
    return "classroom";
  return "news";
}

/** A relevant, deterministic real photo for a place/scene seed. */
export function photo(
  seed: string,
  width: number,
  height: number,
  subject?: PhotoSubject,
): string {
  const tags = SUBJECT_TAGS[subject ?? subjectFromSeed(seed)];
  return `https://loremflickr.com/${width}/${height}/${tags}?lock=${hashSeed(seed)}`;
}

/** A real, deterministic face for a person seed (faculty, staff, users). */
export function portrait(seed: string, size = 400): string {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}
