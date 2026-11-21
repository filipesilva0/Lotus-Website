// Copies the app's model catalog into src/data/catalog.json, which the "What runs on my PC" pages read.
// Run it after the app's catalog changes:  bun scripts/sync-catalog.ts [path to the Lotus app repo]
// (default ../Lotus). It reads src/models/library.ts there, the same file the app's Models page uses.
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const app = resolve(process.argv[2] ?? '../Lotus');
const lib = await import(resolve(app, 'src/models/library.ts'));

const slim = (e: any) => ({
  id: e.id, kind: e.kind, title: e.title, maker: e.maker, licence: e.licence, blurb: e.blurb,
  tags: e.tags ?? [], vramGb: e.vramGb, diskGb: e.diskGb,
  ...(e.tools ? { tools: true } : {}), ...(e.vision ? { vision: true } : {}),
  ...(e.voice?.clones || e.tags?.includes('Cloning') ? { clones: true } : {}),
  // Lotus's own engines can run it (not only Ollama/ComfyUI/Voicebox).
  builtin: !!e.builtin,
});

let commit = 'unknown';
try { commit = execSync('git rev-parse --short HEAD', { cwd: app }).toString().trim(); } catch { /* not a git checkout */ }

const out = {
  source: `filipesilva0/Lotus@${commit} src/models/library.ts`,
  generated: new Date().toISOString().slice(0, 10),
  classLabel: lib.CLASS_LABEL,
  chatPicks: lib.CHAT_CLASS_PICKS,
  imagePicks: lib.IMAGE_CLASS_PICKS,
  models: lib.LIBRARY.map(slim),
};
writeFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../src/data/catalog.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`Wrote ${out.models.length} models from ${out.source}`);
