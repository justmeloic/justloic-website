import { describe, expect, it } from "vitest";
import { CAREER, ORGS, TYPES } from "@/data/career";
import { ORG_LOGOS } from "@/data/logos";
import { GITHUB_URL, LINKEDIN_URL } from "@/data/site";
import { toYear } from "@/lib/timeline";

// Guards against content-editing mistakes in src/data — these show up as a broken timeline
// rather than a build error, so they're worth catching here.

const DATE = /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?)?$/;

describe.each(CAREER.map((c) => [c.id, c] as const))("career item %s", (_id, item) => {
  it("has a kebab-case id and a title", () => {
    expect(item.id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(item.title.trim()).not.toBe("");
  });

  it("references a known type and org", () => {
    expect(TYPES).toHaveProperty(item.type);
    expect(ORGS).toHaveProperty(item.org);
  });

  it("is either a point in time (date) or a span (start/end), not both", () => {
    const isSpan = item.start !== undefined || item.end !== undefined;
    expect(Boolean(item.date) && isSpan).toBe(false);
    expect(Boolean(item.date) || isSpan).toBe(true);
  });

  it("uses YYYY, YYYY-MM or YYYY-MM-DD dates", () => {
    for (const d of [item.date, item.start, item.end]) {
      if (d) expect(d).toMatch(DATE);
    }
  });

  it("does not end before it starts", () => {
    if (item.start && item.end)
      expect(toYear(item.end)!).toBeGreaterThanOrEqual(toYear(item.start)!);
  });

  it("only links to https URLs", () => {
    if (item.link) expect(new URL(item.link).protocol).toBe("https:");
  });

  it("has no blank bullets or skills", () => {
    for (const s of [...(item.bullets ?? []), ...(item.skills ?? [])])
      expect(s.trim()).not.toBe("");
  });
});

describe("career data", () => {
  it("has unique ids", () => {
    const ids = CAREER.map((it) => it.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has a logo for every org", () => {
    for (const org of Object.keys(ORGS)) {
      expect(ORG_LOGOS).toHaveProperty(org);
      expect(ORG_LOGOS[org as keyof typeof ORG_LOGOS].svg).toMatch(/^<svg[\s>]/);
    }
  });
});

describe("site links", () => {
  it.each([GITHUB_URL, LINKEDIN_URL])("%s is an https URL", (url) => {
    expect(new URL(url).protocol).toBe("https:");
  });
});
