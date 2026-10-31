// One place for links and facts that appear in more than one section.
export const REPO = 'https://github.com/filipesilva0/Lotus';
export const RELEASES = `${REPO}/releases`;
export const VERSION = '0.1.0';

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
