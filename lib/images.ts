/**
 * Central image helpers — deterministic, relevant, real photos without an API key.
 *
 * - Places / scenes  → curated Unsplash photos matched to school topics.
 * - People portraits → pravatar, a real deterministic face per seed.
 *
 * Every URL is stable: the same seed always resolves to the same photo, so
 * server and client renders match and layouts never shift.
 */

const SUBJECT_PHOTOS = {
  building: [
    "eZjpArlRqZ4",
    "MZxqc6n9qCw",
    "6m_mmERBI8A",
  ],
  classroom: [
    "zFSo6bnZJTw",
    "CXa6E3krENE",
    "UJAGYva8f6s",
  ],
  students: [
    "nFeAz2t0TeE",
    "JSdDBJQlFNg",
    "vJ3CFY8iI9c",
  ],
  library: [
    "klbApl9mxr0",
    "EP8lBWLFLkg",
    "vGbC6mOeUCw",
  ],
  science: [
    "SjzZV4JOge8",
    "yEgqA9WydWU",
    "5mVaw1KKwHo",
  ],
  sports: [
    "heg73qmI7wQ",
    "O4zhy0zLAQc",
    "XHT01BY-cGo",
  ],
  arts: [
    "FxzoAr9QBKw",
    "H-O7gUaKMow",
    "xPk7gVqqaJw",
  ],
  graduation: [
    "NXnX56qv2c0",
    "rC4FVECt4sE",
    "sFzZbmizqOE",
  ],
  news: [
    "zFSo6bnZJTw",
    "JSdDBJQlFNg",
    "CXa6E3krENE",
  ],
} as const;

const SEED_PHOTOS: Record<string, string> = {
  "wl-hero": "zFSo6bnZJTw",
  "wl-about": "eZjpArlRqZ4",
  "wl-kinder": "uaPaEM7MiQQ",
  "wl-primary": "CXa6E3krENE",
  "wl-secondary": "NXnX56qv2c0",
  "wl-news1": "nFeAz2t0TeE",
  "wl-news2": "SjzZV4JOge8",
  "wl-news3": "vJ3CFY8iI9c",
  "wl-news4": "zFSo6bnZJTw",
  "wl-news5": "5mVaw1KKwHo",
  "wl-news6": "xPk7gVqqaJw",
  "wl-news7": "afz2oM3ycPw",
  "wl-news8": "klbApl9mxr0",
  "wl-news9": "O4zhy0zLAQc",
  "wl-g1": "CXa6E3krENE",
  "wl-g2": "EP8lBWLFLkg",
  "wl-g3": "FxzoAr9QBKw",
  "wl-g4": "B3K_JzS9ADo",
  "wl-g5": "yEgqA9WydWU",
  "wl-g6": "Wr0idylDNRU",
  "wl-g7": "MZxqc6n9qCw",
  "wl-g8": "heg73qmI7wQ",
  "wl-g9": "5mVaw1KKwHo",
  "wl-g10": "nFeAz2t0TeE",
  "wl-g11": "SjzZV4JOge8",
  "wl-g12": "hes6nUC1MVc",
  "wl-g13": "B3K_JzS9ADo",
  "wl-g14": "zFSo6bnZJTw",
  "wl-g15": "UJAGYva8f6s",
  "wl-g16": "XHT01BY-cGo",
};

export type PhotoSubject = keyof typeof SUBJECT_PHOTOS;

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
  const subjectKey = subject ?? subjectFromSeed(seed);
  const subjectPhotos = SUBJECT_PHOTOS[subjectKey];
  const photoId = SEED_PHOTOS[seed] ?? subjectPhotos[hashSeed(seed) % subjectPhotos.length];
  return `https://unsplash.com/photos/${photoId}/download?force=true&w=${width}`;
}

/** A real, deterministic face for a person seed (faculty, staff, users). */
export function portrait(seed: string, size = 400): string {
  return `https://i.pravatar.cc/${size}?u=${encodeURIComponent(seed)}`;
}
