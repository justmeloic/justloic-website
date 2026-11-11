import { describe, expect, it } from "vitest";
import type { CareerItem } from "@/data/career";
import {
  anchor,
  countItems,
  filterItems,
  formatDate,
  formatRange,
  groupByYear,
  toYear,
} from "@/lib/timeline";

const item = (overrides: Partial<CareerItem>): CareerItem => ({
  id: "x",
  type: "role",
  org: "google",
  title: "Title",
  ...overrides,
});

describe("toYear", () => {
  it("converts dates to fractional years", () => {
    expect(toYear("2021")).toBe(2021);
    expect(toYear("2021-07")).toBe(2021.5);
    expect(toYear("2021-01-02")).toBeCloseTo(2021 + 1 / 365);
  });

  it("returns null for missing dates", () => {
    expect(toYear(null)).toBeNull();
    expect(toYear(undefined)).toBeNull();
  });
});

describe("formatDate", () => {
  it("formats year-month and year-only dates", () => {
    expect(formatDate("2021-07")).toBe("Jul 2021");
    expect(formatDate("2022-11-09")).toBe("Nov 2022");
    expect(formatDate("2019")).toBe("2019");
  });

  it("treats a missing date as Present", () => {
    expect(formatDate(null)).toBe("Present");
  });
});

describe("formatRange", () => {
  it("formats point-in-time items", () => {
    expect(formatRange(item({ date: "2020-12" }))).toBe("Dec 2020");
  });

  it("formats spans, open ends and unknown starts", () => {
    expect(formatRange(item({ start: "2019-07", end: "2021-05" }))).toBe("Jul 2019 – May 2021");
    expect(formatRange(item({ start: "2024-04", end: null }))).toBe("Apr 2024 – Present");
    expect(formatRange(item({ start: null, end: "2017-06" }))).toBe("Pre – Jun 2017");
  });
});

describe("anchor", () => {
  it("prefers date, then start", () => {
    expect(anchor(item({ date: "2020-01", start: "2019-01" }))).toBe("2020-01");
    expect(anchor(item({ start: "2019-01" }))).toBe("2019-01");
    expect(anchor(item({}))).toBeNull();
  });
});

const sample: CareerItem[] = [
  item({ id: "a", type: "role", org: "google", start: "2024-04" }),
  item({ id: "b", type: "award", org: "goc", date: "2021-12" }),
  item({ id: "c", type: "role", org: "goc", start: "2021-05" }),
  item({ id: "d", type: "education", org: "uottawa", start: null }),
];

describe("countItems", () => {
  it("counts by type and org", () => {
    expect(countItems(sample)).toEqual({
      all: 4,
      role: 2,
      award: 1,
      education: 1,
      google: 1,
      goc: 2,
      uottawa: 1,
    });
  });
});

describe("filterItems", () => {
  it("returns everything for all/all", () => {
    expect(filterItems(sample, "all", "all")).toHaveLength(4);
  });

  it("filters by type, org, or both", () => {
    expect(filterItems(sample, "role", "all").map((i) => i.id)).toEqual(["a", "c"]);
    expect(filterItems(sample, "all", "goc").map((i) => i.id)).toEqual(["b", "c"]);
    expect(filterItems(sample, "role", "goc").map((i) => i.id)).toEqual(["c"]);
    expect(filterItems(sample, "award", "google")).toEqual([]);
  });
});

describe("groupByYear", () => {
  it("groups newest first and puts undated items last under Earlier", () => {
    const groups = groupByYear(sample);
    expect(groups.map(([year]) => year)).toEqual(["2024", "2021", "Earlier"]);
    expect(groups[1][1].map((i) => i.id)).toEqual(["b", "c"]);
  });

  it("does not mutate its input", () => {
    const copy = [...sample];
    groupByYear(sample);
    expect(sample).toEqual(copy);
  });
});
