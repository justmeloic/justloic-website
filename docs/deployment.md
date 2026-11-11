# Deployment

justloic.com is hosted on Netlify (project `tranquil-banoffee-0e36c4`, team `personal-website`)
with continuous deployment from the `main` branch of
[justmeloic/justloic-website](https://github.com/justmeloic/justloic-website).

## How it works

All build settings live in [`netlify.toml`](../netlify.toml), which overrides the Netlify UI:

| Setting           | Value                                    |
| ----------------- | ---------------------------------------- |
| Base directory    | `services/web`                           |
| Build command     | `npm run verify`                         |
| Publish directory | `services/web/out`                       |
| Node              | 22                                       |

`npm run verify` runs format check, lint, type check, tests, `next build` (static export via
`output: "export"` in `next.config.mjs`) and the export link check. If any step fails, the deploy
fails and the currently published version stays live.

- **Push to `main`** → production deploy.
- **Pull request** → deploy preview at a unique URL, linked from the PR.

## Rolling back

Netlify keeps every deploy. In the Netlify UI: **Deploys** → pick a previous deploy →
**Publish deploy**. Or revert the commit and push:

```bash
git revert <sha> && git push
```

## Headers

`netlify.toml` sets security headers on every response (Content-Security-Policy, HSTS,
X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) and long-lived immutable caching for
`/_next/static/*` (content-hashed files).

The CSP only allows same-origin resources plus `https://formspree.io` for the contact form. If you
add a third-party script, font, image host or API, add its origin to the matching directive
(`script-src`, `font-src`, `img-src`, `connect-src`) or the browser will block it — check the
console on the deploy preview.

## Manual deploy (fallback)

If Git deploys are ever unavailable:

```bash
make build
netlify deploy --prod --dir services/web/out   # or drag services/web/out into Netlify Drop
```

## Local production preview

```bash
make preview   # builds and serves services/web/out on http://localhost:3000
```

Note: the local preview doesn't apply the `netlify.toml` headers. Use a deploy preview to test CSP
changes.
