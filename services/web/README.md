# Website service

The Next.js application that powers [justloic.com](https://justloic.com). It is exported as a
static site and deployed to Netlify.

## Requirements

- Node.js 22 (see the repository [`.nvmrc`](../../.nvmrc))
- npm

## Development

From this directory:

```bash
npm ci
npm run dev
```

The development server runs at <http://localhost:3000>.

## Checks and build

```bash
npm run verify
```

This runs formatting, lint, type checking, tests, the production build, and the static export
check. To run individual checks, use `npm run lint`, `npm run typecheck`, `npm test`, or
`npm run build`.

The production export is written to `out/`. Run `npm run preview` after building to serve it
locally.

## Source layout

- `src/app/` — page routes and site metadata
- `src/components/` — shared interface components
- `src/data/` — timeline, artwork, logos, and site links
- `src/lib/` — reusable helpers
- `public/images/` — images included in the exported site
- `tests/` — unit and data-integrity tests

For content-editing guidance, see the repository [content guide](../../docs/content.md). For
deployment details, see the [deployment guide](../../docs/deployment.md).

## Deployment

Netlify builds this service from the repository root using the settings in [`netlify.toml`](../../netlify.toml).
Every push to `main` runs the full verification pipeline before the production site is published.
