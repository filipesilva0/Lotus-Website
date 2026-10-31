// One place for links and facts that appear in more than one section.
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
export const VERSION = '0.1.0';

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
