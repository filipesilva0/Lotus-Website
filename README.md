# Lotus website

The landing page for [Lotus](https://github.com/filipesilva0/Lotus), a local AI studio for Windows, macOS and Linux.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in dist/
```

## Where things live

- `src/site.ts`: repository, releases and download links, version lookup, petal colours and platform detection. Change a link here and every button follows.
- `src/components/Button.tsx`: the only button on the site. Primary, secondary and disabled all share one shape.
- `src/components/`: one file per section, in page order: `Navbar`, `Hero`, `Tour` (a tab per page with its screenshot), `WhatsNew` (keep in step with the app's newest release notes), `Features`, `HowItWorks`, `Privacy`, `Download`, `Footer`, `LotusFooterBanner`.
- `public/assets/`: the petal mark, the hero artwork, the wordmark texture and and `tour/*.webp`: real screenshots of each page, made by `handover/screenshots/shoot-site.mjs` in the app repo (dark, 2x; convert the PNGs to WebP).

The download buttons link straight to `releases/latest/download/<file>` (names in `FILES`, `src/site.ts`). The app repo's release workflow publishes every build under those exact names, so each new release is picked up with no change here. The version shown is read from the GitHub API at page load.
