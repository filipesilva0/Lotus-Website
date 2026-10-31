# Lotus website

The landing page for [Lotus](https://github.com/filipesilva0/Lotus), a local AI studio for Windows.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in dist/
```

## Where things live

- `src/site.ts`: repository and releases links, version, petal colours and platform detection. Change a link here and every button follows.
- `src/components/Button.tsx`: the only button on the site. Primary, secondary and disabled all share one shape.
- `src/components/`: one file per section, in page order: `Navbar`, `Hero`, `Showcase`, `Pages`, `HowItWorks`, `Privacy`, `Download`, `Footer`, `LotusFooterBanner`.
- `public/assets/`: the petal mark, the hero artwork, the wordmark texture and the app screenshot.

When a release is published, the Windows download button already points to the Releases page. If macOS or Linux builds appear, set `available: true` for that platform in `Download.tsx`.
