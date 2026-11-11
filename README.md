# justloic.com

Personal website of Loïc Muhirwa — a career timeline, art gallery, philosophy notes, resume and
contact page. Built with [Next.js](https://nextjs.org) (App Router) and Tailwind CSS, exported as a
fully static site and hosted on [Netlify](https://www.netlify.com).

[![CI](https://github.com/justmeloic/justloic-website/actions/workflows/ci.yml/badge.svg)](https://github.com/justmeloic/justloic-website/actions/workflows/ci.yml)

## Quick start

Requirements: Node 22 (see [`.nvmrc`](.nvmrc)) and [pre-commit](https://pre-commit.com)
(`brew install pre-commit`).

```bash
make setup   # install dependencies and git hooks (once per clone)
make dev     # http://localhost:3000
```

## Workflow

There is one branch, `main`. To ship a change:

```bash
git add -A
git commit -m "feat(web): add talks section"   # hooks format, lint and type-check
git push                                       # hooks run tests; Netlify deploys
```

- **Commit messages** follow [Conventional Commits](https://www.conventionalcommits.org)
  (`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`).
  The `commit-msg` hook rejects anything else.
- **Every push to `main` deploys** to justloic.com. Netlify runs the full `verify` pipeline first,
  so a commit that fails any check is not published and the previous version stays live.
- **Pull requests are optional** — use them for larger changes to get a Netlify deploy preview URL.
- Run `make verify` before pushing if you want to see exactly what Netlify and CI will run.

## Commands

| Command          | What it does                                                       |
| ---------------- | ------------------------------------------------------------------ |
| `make dev`       | Dev server with hot reload                                         |
| `make build`     | Static export to `services/web/out/`                               |
| `make preview`   | Build, then serve the exported site locally (production-like)      |
| `make lint`      | ESLint (zero warnings allowed)                                     |
| `make format`    | Format everything with Prettier                                    |
| `make typecheck` | TypeScript, no emit                                                |
| `make test`      | Unit tests (Vitest)                                                |
| `make verify`    | Format check → lint → types → tests → build → export link check    |
| `make clean`     | Remove build output                                                |

All targets wrap `npm` scripts in `services/web/package.json`; you can run those directly too.

## Project structure

```
.
├── netlify.toml               # build, publish dir, security & cache headers
├── .pre-commit-config.yaml    # git hooks
├── .github/                   # CI workflow, Dependabot
├── docs/                      # content and deployment guides
├── design-previews/           # standalone HTML design explorations (not deployed)
└── services/web/              # the website
    ├── src/app/               # routes: /, /art, /philosophy, /contact, /resume
    ├── src/components/        # UI components
    ├── src/data/              # career timeline, org logos, site links
    ├── src/lib/               # pure helpers (timeline dates, filtering, grouping)
    ├── public/images/         # static images
    ├── scripts/check-export.mjs  # post-build check for missing pages and broken links
    └── tests/                 # Vitest tests
```

## Quality checks

| Check        | Tool                         | Runs on                          |
| ------------ | ---------------------------- | -------------------------------- |
| Formatting   | Prettier (+ Tailwind sorter) | commit hook, CI, Netlify         |
| Lint         | ESLint (`next/core-web-vitals`) | commit hook, CI, Netlify      |
| Types        | TypeScript strict            | commit hook, CI, Netlify         |
| Unit tests   | Vitest + Testing Library     | push hook, CI, Netlify           |
| Export check | `scripts/check-export.mjs`   | CI, Netlify                      |
| Commit msg   | conventional-pre-commit      | commit hook                      |

The tests cover the timeline helpers, the timeline filters, and the integrity of the career data
(valid dates, unique ids, known orgs, https links), so content edits are checked too.

## Docs

- [Editing content](docs/content.md) — timeline entries, art, links, images
- [Deployment](docs/deployment.md) — how Netlify is set up, rollbacks, headers
