# Lotus website

The website for [Lotus](https://github.com/filipesilva0/Lotus): "Your own AI. One app instead of four."

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # finished site in dist/, one HTML file per page
npm run preview        # serve dist/ at http://localhost:4173
npm run sync-catalog   # copy the app's model catalog (needs bun and the app repo at ../Lotus)
```

## Pages

| Path | File |
| --- | --- |
| `/` | `src/pages/Home.tsx`, leading with the voice call you can interrupt |
| `/pricing/` | `src/pages/Pricing.tsx` |
| `/download/` | `src/pages/DownloadPage.tsx`, including the SmartScreen "More info → Run anyway" steps |
| `/docs/` | `src/pages/Docs.tsx` |
| `/privacy/` | `src/pages/PrivacyPage.tsx` |
| `/gpu/` and `/gpu/<card>/` | `src/pages/Gpu.tsx`, one page per card in `GPUS` (`src/lib/catalog.ts`) |
| `/compare/` and `/compare/<app>/` | `src/pages/Compare.tsx`, one page per entry in `RIVALS` |
| `/llms.txt`, `/sitemap.xml`, `/robots.txt` | written by `scripts/prerender.mjs` from `src/routes.tsx` |

Every page is listed in `src/routes.tsx` with its title and description. The build renders each one to static HTML (`scripts/prerender.mjs`), so pages load instantly and search engines and AI assistants can read them without running JavaScript.

## Turning things on at launch

All in `src/site.ts`:

- `BUY_URL`: the Polar checkout link. While it is `null`, the Pricing page shows a disabled "Coming soon" button.
- `STORE_URL`: the Microsoft Store listing. While it is `null`, the Download page shows "Coming soon to the Store".
- `PRO`: prices, trial length, devices and refund days, used on every page.

## The model lists

The "What runs on my PC" pages read `src/data/catalog.json`, a copy of the app's model catalog (`src/models/library.ts` in the app repo) made by `npm run sync-catalog`. Run it after the catalog changes in the app, then commit the JSON. The fit rules in `src/lib/catalog.ts` are the same as the app's Models page. To add a graphics card, add it to `GPUS`.

## Publishing

`.github/workflows/pages.yml` builds the site on every pull request and publishes `main` to GitHub Pages. The site is built for `/Lotus-Website/`; for a custom domain, set the repository variables `SITE_BASE_PATH` to `/` and `SITE_URL` to the domain.

## Other things here

- `public/assets/`: the petal mark, hero artwork, wordmark texture and `tour/*.webp` screenshots (made by `handover/screenshots/shoot-site.mjs` in the app repo).
- `launch/launch-kit.md`: the video script, launch posts and YouTuber pitch template.
- Fonts are bundled (`@fontsource`), so the site makes no requests to font services.
