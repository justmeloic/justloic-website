// Post-build smoke check for the static export in out/:
//   1. every route under src/app has an exported HTML page
//   2. every internal href/src/srcset in the exported HTML resolves to a real file
// Run after `npm run build`. Exits non-zero on any problem so CI/Netlify fail the deploy.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const out = join(root, "out");
const app = join(root, "src", "app");

if (!existsSync(out)) {
  console.error("out/ not found — run `npm run build` first.");
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const errors = [];

// 1. Routes → pages ("app/page.tsx" -> "/", "app/art/page.tsx" -> "/art")
const routes = walk(app)
  .filter((f) => /[\\/]page\.(tsx|ts|jsx|js|mdx)$/.test(f))
  .map((f) => "/" + relative(app, f).split(sep).slice(0, -1).join("/"))
  // Route groups "(name)" don't appear in URLs
  .map((r) => r.replace(/\/\([^/]+\)/g, "") || "/");

const resolves = (urlPath) => {
  const p = join(out, decodeURIComponent(urlPath));
  if (existsSync(p) && statSync(p).isFile()) return true;
  if (existsSync(`${p.replace(/\/$/, "")}.html`)) return true;
  return existsSync(join(p, "index.html"));
};

for (const route of [...routes, "/404"]) {
  if (!resolves(route)) errors.push(`missing page for route ${route}`);
}

// 2. Internal links and assets
const ATTR = /\s(?:href|src|srcset|imagesrcset)="([^"]+)"/g;
const htmlFiles = walk(out).filter((f) => f.endsWith(".html"));
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const [, value] of html.matchAll(ATTR)) {
    // srcset: "url 1x, url 2x"
    const urls = value.split(",").map((part) => part.trim().split(/\s+/)[0]);
    for (const url of urls) {
      if (!url.startsWith("/") || url.startsWith("//")) continue;
      const path = url.split(/[?#]/)[0];
      checked++;
      if (!resolves(path)) errors.push(`${relative(out, file)}: broken link ${url}`);
    }
  }
}

if (errors.length) {
  console.error(`✖ Export check failed (${errors.length} problem(s)):`);
  for (const e of [...new Set(errors)]) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(
  `✔ Export OK: ${routes.length} routes, ${htmlFiles.length} HTML files, ${checked} internal links checked`
);
