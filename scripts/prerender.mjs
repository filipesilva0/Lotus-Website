// Turns the built site into one finished HTML file per page, so every page loads instantly and search
// engines and AI assistants can read it without running JavaScript. Also writes sitemap.xml,
// robots.txt and llms.txt. Runs after `vite build` and the server build (see "build" in package.json).
//
// SITE_URL is the address the site is served from, e.g. https://filipesilva0.github.io/Lotus-Website
// (the Pages workflow sets it). It is only used for absolute links in sitemap.xml, llms.txt and tags.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');
const site = (process.env.SITE_URL || 'https://filipesilva0.github.io/Lotus-Website').replace(/\/$/, '');
const base = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');

const { render, ROUTES, NOT_FOUND, PRICING_FAQ, RIVALS, CATALOG_SOURCE } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = readFileSync(join(dist, 'index.html'), 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const abs = (p) => `${site}${p}`;
const json = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;

function head(route) {
  const url = abs(route.path === '/404.html' ? '/' : route.path);
  const tags = [
    `<title>${esc(route.title)}</title>`,
    `<meta name="description" content="${esc(route.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(route.title)}" />`,
    `<meta property="og:description" content="${esc(route.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${abs('/assets/lotus-hero.png')}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ];
  if (route.path === '/404.html') tags.push('<meta name="robots" content="noindex" />');
  if (route.path === '/') tags.push(json({
    '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Lotus', applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Windows 10, Windows 11, macOS 11+, Linux', description: route.description, url: abs('/'),
    offers: [{ '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Lotus' }],
  }));
  if (route.path === '/pricing/') tags.push(json({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: PRICING_FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  }));
  return tags.join('\n    ');
}

function write(file, route) {
  const html = template.replace('<!--app-head-->', head(route)).replace('<!--app-html-->', render(route));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

for (const r of ROUTES) write(join(dist, r.path, 'index.html'), r);
write(join(dist, '404.html'), NOT_FOUND);

writeFileSync(join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>${abs(r.path)}</loc></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`);

// llms.txt (https://llmstxt.org): a plain summary for AI assistants, with the facts people ask about most.
const groups = ['Main', 'What runs on my PC', 'Comparisons'];
const llms = `# Lotus

> Lotus is a free desktop app for Windows (with macOS and Linux builds) that runs your own AI on your own PC: chat, voice calls you can interrupt, image generation, read-aloud, transcription, and agents that hand back real files. One app instead of four. Everything runs locally; it collects nothing and needs no account.

Key facts:

- Made by an independent developer. Early preview; source code is public at https://github.com/filipesilva0/Lotus
- Who it is for: beginners who want their own AI without a terminal or engine names; enthusiasts get every expert setting (engines, model files, LoRAs) for free.
- Engines: its own (llama.cpp for chat, stable-diffusion.cpp for images, sherpa-onnx for voice), downloaded automatically. It can also drive Ollama, ComfyUI and Voicebox.
- Hardware: suggests models from its catalog to fit the graphics card. Works on NVIDIA (CUDA), AMD and Intel (Vulkan), Apple silicon, and without a graphics card (slower).
- Price: Lotus is free forever. Lotus Pro (voice cloning, your own voices in calls, multi-voice Stories, and later background routines and phone access) is a one-time $59 licence, $39 for the first 500 buyers, with 12 months of updates, a 14-day trial and a 14-day refund. Pro is not on sale yet.
- Privacy: no telemetry, no analytics, no account. Nothing goes online unless the user turns on web search, research, downloads or update checks. Sync between PCs is optional and only to a server the user runs.
- Not yet available: MCP servers, a local API, and bring-your-own cloud keys (planned for Advanced mode, free).

${groups.map((g) => `## ${g}\n\n${ROUTES.filter((r) => r.group === g).map((r) => `- [${r.title.replace(/ · Lotus$/, '')}](${abs(r.path)}): ${r.description}`).join('\n')}`).join('\n\n')}

## Optional

- [Release notes](https://github.com/filipesilva0/Lotus/releases): what changed in each version
- [Report a problem](https://github.com/filipesilva0/Lotus/issues)

Model lists come from the app's own catalog (${CATALOG_SOURCE}). Comparisons cover ${RIVALS.map((r) => r.name).join(', ')} and were checked in November 2026.
`;
writeFileSync(join(dist, 'llms.txt'), llms);

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${ROUTES.length} pages + 404, sitemap.xml, robots.txt and llms.txt for ${site} (base ${base})`);
