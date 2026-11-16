# justloic.com

Personal website of Loïc Muhirwa — a career timeline, art gallery, philosophy notes, resume and
contact page. Built with [Next.js](https://nextjs.org) (App Router) and Tailwind CSS, exported as a
fully static site and hosted on [Netlify](https://www.netlify.com).

[![CI](https://github.com/justmeloic/justloic-website/actions/workflows/ci.yml/badge.svg)](https://github.com/justmeloic/justloic-website/actions/workflows/ci.yml)

[![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)](https://vitest.dev)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)](https://www.netlify.com)

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
