# Editing content

All content lives in `services/web/src`. After any edit, `make dev` to preview and `make test` to
validate — the tests check the career data for common mistakes.

## Career timeline (home page)

File: [`src/data/career.ts`](../services/web/src/data/career.ts) — the `CAREER` array.

Each entry is either a **span** (`start` / `end`) or a **point in time** (`date`), never both:

```ts
{
  id: "google-fde",            // unique, kebab-case
  short: "FDE, Generative AI", // optional short title
  type: "role",                // role | education | project | publication | award
  org: "google",               // google | bell | goc | uottawa | uwindsor
  title: "Forward Deployed Engineer, Generative AI",
  start: "2024-04",            // YYYY, YYYY-MM or YYYY-MM-DD
  end: null,                   // null = "Present"; start: null = "Pre"
  location: "…",               // optional
  summary: "…",                // optional
  bullets: ["…"],              // optional
  skills: ["…"],               // optional
  link: "https://…",           // optional, must be https
  approx: true,                // optional, shows "≈" for unconfirmed dates
}
```

Point-in-time items (publications, awards) use `date` and optionally `venue` instead of
`location`. Order in the array doesn't matter — the timeline sorts newest first and groups by year.

### Adding a new organization

1. Add the key to `OrgKey` and an entry to `ORGS` (name + colour) in `career.ts`.
2. Add a logo to `ORG_LOGOS` in [`src/data/logos.ts`](../services/web/src/data/logos.ts) (inline SVG).
3. Add the key to `ORG_ORDER` in
   [`src/components/Timeline.tsx`](../services/web/src/components/Timeline.tsx) to show its filter button.

The data tests fail if an org is missing a logo.

## Other pages

| Page        | File                                                                                   |
| ----------- | -------------------------------------------------------------------------------------- |
| Art         | [`src/data/art.ts`](../services/web/src/data/art.ts) (series and pieces)               |
| Philosophy  | [`src/components/Philosophy.tsx`](../services/web/src/components/Philosophy.tsx)       |
| Contact     | [`src/components/Contact.tsx`](../services/web/src/components/Contact.tsx) (Formspree) |
| Resume      | [`src/app/resume/page.tsx`](../services/web/src/app/resume/page.tsx)                   |
| Nav links   | [`src/components/Navbar.tsx`](../services/web/src/components/Navbar.tsx)               |
| Social URLs | [`src/data/site.ts`](../services/web/src/data/site.ts)                                 |
| SEO / title | [`src/app/layout.tsx`](../services/web/src/app/layout.tsx) (`metadata`)                |

## Images

Put images in `services/web/public/images/…` and reference them with an absolute path, e.g.
`/images/art/faces/1-low-res.jpg`. Keep files small (resize/compress before committing); the
commit hook rejects files over 1 MB. The post-build export check fails if a referenced image is
missing.

### Tab icon

The browser tab icon lives in `services/web/src/app/` and Next.js adds the tags for it to every
page automatically:

- `icon.svg` — the drawing itself, used by current browsers.
- `favicon.ico` — the same mark at 48, 32 and 16 px, for browsers that don't use the SVG.
- `apple-icon.png` — 180 px with square corners, for the iOS home screen.

If you change the drawing, re-export the other two from `icon.svg` so all three match.

## Adding a page

Create `src/app/<name>/page.tsx` and add it to `LINKS` in `Navbar.tsx`. The export check picks up
new routes automatically.
