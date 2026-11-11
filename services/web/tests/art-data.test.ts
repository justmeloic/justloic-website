import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { ART_SERIES } from "@/data/art";

// Guards against content-editing mistakes in src/data/art.ts.

const publicDir = resolve(__dirname, "../public");

describe("art data", () => {
  it("gives every series and piece a unique id", () => {
    const seriesIds = ART_SERIES.map((s) => s.id);
    const pieceIds = ART_SERIES.flatMap((s) => s.pieces.map((p) => p.id));
    expect(new Set(seriesIds).size).toBe(seriesIds.length);
    expect(new Set(pieceIds).size).toBe(pieceIds.length);
  });

  it.each(ART_SERIES.map((s) => [s.id, s] as const))("series %s has pieces on disk", (_id, s) => {
    expect(s.title.trim()).not.toBe("");
    expect(s.pieces.length).toBeGreaterThan(0);
    for (const piece of s.pieces) {
      expect(piece.src).toMatch(/^\/images\/art\//);
      expect(existsSync(join(publicDir, piece.src)), `${piece.src} is missing`).toBe(true);
    }
  });
});
