// The app's model catalog (src/data/catalog.json, copied from the app by scripts/sync-catalog.ts) and the
// same fit rules the app uses on its Models page (Lotus repo, src/models/library.ts: fitOf, machineClass).
import data from '../data/catalog.json';

export type Kind = 'chat' | 'image' | 'voice' | 'dictation';
export type Tier = 'quick' | 'balanced' | 'best';
export type MachineClass = keyof typeof data.classLabel;
export interface Model {
  id: string; kind: Kind; title: string; maker: string; licence: string; blurb: string; tags: string[];
  vramGb: number; diskGb: number; tools?: boolean; vision?: boolean; clones?: boolean; builtin: boolean;
}

export const CATALOG_SOURCE = data.source;
export const CATALOG_DATE = data.generated;
export const MODELS = data.models as Model[];
export const CLASS_LABEL = data.classLabel as Record<MachineClass, string>;
export const byId = (id: string) => MODELS.find((m) => m.id === id);

export const TIER_LABEL: Record<Tier, string> = { quick: 'Quick', balanced: 'Balanced', best: 'Best' };

/** Same thresholds as the app's machineClass(). */
export function machineClass(vramGb: number, unified: boolean): MachineClass {
  if (unified) return vramGb <= 12 ? 'apple-8' : vramGb <= 28 ? 'apple-16' : vramGb <= 56 ? 'apple-32' : 'apple-64';
  if (vramGb < 3.5) return 'cpu';
  if (vramGb < 7) return 'gpu-6';
  if (vramGb < 11.5) return 'gpu-8';
  if (vramGb < 20) return 'gpu-16';
  if (vramGb < 40) return 'gpu-24';
  return 'gpu-48';
}

export type Fit = 'fits' | 'tight' | 'too-big' | 'slow';
/** Same thresholds as the app's fitOf(). Without a graphics card, assume 16 GB of system memory. */
export function fitOf(m: Model, vramGb: number, unified: boolean): Fit {
  if (m.vramGb <= 0.5) return 'fits';
  if (vramGb <= 0) return m.vramGb > 16 * 0.6 ? 'too-big' : m.vramGb <= 2 ? 'fits' : 'slow';
  const usable = unified ? vramGb * 0.75 : vramGb;
  if (m.vramGb <= usable * 0.9) return 'fits';
  if (m.vramGb <= usable * 1.25) return 'tight';
  return 'too-big';
}
export const FIT_LABEL: Record<Fit, string> = { fits: 'Runs well', tight: 'Tight fit, runs slower', 'too-big': 'Too big', slow: 'Runs, but slowly' };
export const FIT_COLOR: Record<Fit, string> = { fits: '#30d158', tight: '#FF9F0A', 'too-big': '#6e6e73', slow: '#FF9F0A' };

/** The three models Lotus suggests for this kind of computer, as the app's setup guide does. */
export function picks(kind: 'chat' | 'image', cls: MachineClass): { tier: Tier; model: Model }[] {
  const table = (kind === 'chat' ? data.chatPicks : data.imagePicks) as Record<MachineClass, Record<Tier, string>>;
  return (['quick', 'balanced', 'best'] as Tier[]).flatMap((tier) => {
    const model = byId(table[cls][tier]);
    return model ? [{ tier, model }] : [];
  });
}

// ── Common graphics cards ─────────────────────────────────────────────────

export type Vendor = 'nvidia' | 'amd' | 'intel' | 'apple' | 'none';
export interface Gpu { slug: string; name: string; vendor: Vendor; vramGb: number; unified?: boolean; note?: string }

const nv = (name: string, vramGb: number): Gpu => ({ slug: name.toLowerCase().replace(/geforce /, '').replace(/[^a-z0-9]+/g, '-').replace(/-$/, ''), name, vendor: 'nvidia', vramGb });

/** The cards most people ask about. Memory sizes are the makers' standard specs. */
export const GPUS: Gpu[] = [
  { slug: 'no-graphics-card', name: 'No graphics card', vendor: 'none', vramGb: 0, note: 'A laptop or desktop that uses the processor\'s built-in graphics. Lotus runs models on the processor, with 16 GB of memory assumed here.' },
  nv('GeForce GTX 1660', 6), nv('GeForce RTX 2060', 6), nv('GeForce RTX 3050', 8), nv('GeForce RTX 3060', 12), nv('GeForce RTX 3060 Ti', 8),
  nv('GeForce RTX 3070', 8), nv('GeForce RTX 3080', 10), nv('GeForce RTX 3090', 24),
  nv('GeForce RTX 4060', 8), { ...nv('GeForce RTX 4060 Ti 8 GB', 8), slug: 'rtx-4060-ti-8gb' }, { ...nv('GeForce RTX 4060 Ti 16 GB', 16), slug: 'rtx-4060-ti-16gb' },
  nv('GeForce RTX 4070', 12), nv('GeForce RTX 4070 Super', 12), nv('GeForce RTX 4070 Ti Super', 16), nv('GeForce RTX 4080', 16), nv('GeForce RTX 4090', 24),
  nv('GeForce RTX 5060', 8), { ...nv('GeForce RTX 5060 Ti 16 GB', 16), slug: 'rtx-5060-ti-16gb' }, nv('GeForce RTX 5070', 12), nv('GeForce RTX 5070 Ti', 16),
  nv('GeForce RTX 5080', 16), nv('GeForce RTX 5090', 32),
  { slug: 'rx-7600', name: 'Radeon RX 7600', vendor: 'amd', vramGb: 8 },
  { slug: 'rx-7800-xt', name: 'Radeon RX 7800 XT', vendor: 'amd', vramGb: 16 },
  { slug: 'rx-9070-xt', name: 'Radeon RX 9070 XT', vendor: 'amd', vramGb: 16 },
  { slug: 'rx-7900-xtx', name: 'Radeon RX 7900 XTX', vendor: 'amd', vramGb: 24 },
  { slug: 'arc-b580', name: 'Intel Arc B580', vendor: 'intel', vramGb: 12 },
  { slug: 'mac-16gb', name: 'Mac with Apple silicon, 16 GB', vendor: 'apple', vramGb: 16, unified: true },
  { slug: 'mac-32gb', name: 'Mac with Apple silicon, 32 GB', vendor: 'apple', vramGb: 32, unified: true },
  { slug: 'mac-64gb', name: 'Mac with Apple silicon, 64 GB', vendor: 'apple', vramGb: 64, unified: true },
];

export const VENDOR_NOTE: Record<Vendor, string> = {
  nvidia: 'On Windows and Linux, Lotus downloads the NVIDIA (CUDA) build of its engines for this card, the fastest option.',
  amd: 'Lotus runs this card through Vulkan, which works with AMD\'s normal drivers. Expect it to be somewhat slower than an NVIDIA card with the same memory.',
  intel: 'Lotus runs this card through Vulkan, which works with Intel\'s normal drivers. Expect it to be somewhat slower than an NVIDIA card with the same memory.',
  apple: 'On a Mac the memory is shared between the system and the graphics, so Lotus keeps about a quarter of it for macOS and uses the rest.',
  none: 'Without a graphics card everything runs on the processor. Chat with small models and voice work well; images are slow.',
};

export const gpuTitle = (g: Gpu) => (g.vendor === 'none' || g.vendor === 'apple' ? g.name : `${g.name} (${g.vramGb} GB)`);
