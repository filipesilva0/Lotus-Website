// One place for links and facts that appear in more than one section.

/** A link inside this site. The site may live under a sub-path (GitHub Pages: /Lotus-Website/). */
export const href = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
/** A file in public/ (images, llms.txt). */
export const asset = (path: string) => href(path);

/** The Microsoft Store listing. null until Lotus is published there: the button shows "Coming soon". */
export const STORE_URL: string | null = null;

/** Pro. The buy button stays disabled ("Coming soon") while BUY_URL is null. */
export const PRO = { price: 59, founderPrice: 39, founderSeats: 500, renewal: 29, trialDays: 14, devices: 3, refundDays: 14 } as const;
export const BUY_URL: string | null = null;

export const ISSUES = 'https://github.com/filipesilva0/Lotus/issues';
export const REPO = 'https://github.com/filipesilva0/Lotus';
export const RELEASES = `${REPO}/releases`;
// The release workflow in the app repo publishes every build under these fixed names, so a
// "latest/download" link always serves the newest release without touching this site.
export const LATEST = `${RELEASES}/latest/download`;
export const FILES = {
  windowsMsi: `${LATEST}/Lotus-windows-x64.msi`,
  windowsPortable: `${LATEST}/Lotus-windows-x64-portable.zip`,
  macDmg: `${LATEST}/Lotus-macos-universal.dmg`,
  linuxAppImage: `${LATEST}/Lotus-linux-x86_64.AppImage`,
  linuxDeb: `${LATEST}/Lotus-linux-amd64.deb`,
  linuxRpm: `${LATEST}/Lotus-linux-x86_64.rpm`,
} as const;

/** Shown until the newest release's version has been read from GitHub. */
export const VERSION = '0.16.5';

/** Version of the newest published release (e.g. "0.2.0"), or null if it can't be read. */
export async function latestVersion(): Promise<string | null> {
  try {
    const r = await fetch('https://api.github.com/repos/filipesilva0/Lotus/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!r.ok) return null;
    const tag = (await r.json())?.tag_name;
    return typeof tag === 'string' ? tag.replace(/^v/, '') : null;
  } catch {
    return null;
  }
}

// The five petals of the logo, left to right. Each page in the app uses its petal's colour.
export const PETAL = {
  blue: '#0A84FF',
  red: '#EE5267',
  orange: '#FF9F0A',
  yellow: '#F5CF3A',
  green: '#30D158',
} as const;

export type Platform = 'windows' | 'macos' | 'linux';

export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'windows';
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const s = `${nav.userAgentData?.platform ?? ''} ${nav.userAgent}`.toLowerCase();
  if (s.includes('win')) return 'windows';
  if (s.includes('mac') && !/iphone|ipad/.test(s)) return 'macos';
  if (s.includes('linux') && !s.includes('android')) return 'linux';
  return 'windows';
}
