export const ARTIST = "Loïc Muhirwa";

/** Every scan is a 3:4 portrait; the pixel size only reserves the right box before the file loads. */
export const ART_ASPECT = 3 / 4;
export const ART_SIZE = { width: 564, height: 752 };

export interface ArtPiece {
  id: string;
  src: string;
  /** Optional; untitled pieces are numbered within their series. */
  title?: string;
}

export interface ArtSeries {
  id: string;
  title: string;
  blurb?: string;
  /** In-page anchor for the series heading. */
  anchor?: string;
  pieces: ArtPiece[];
}

export const ART_SERIES: ArtSeries[] = [
  {
    id: "portraits",
    title: "Portraits",
    anchor: "drawing",
    pieces: [
      { id: "faces-2", src: "/images/art/faces/2-low-res.jpg" },
      { id: "faces-1", src: "/images/art/faces/1-low-res.jpg" },
      { id: "faces-4", src: "/images/art/faces/4-low-res.jpg" },
      { id: "faces-3", src: "/images/art/faces/3-low-res.jpg" },
      { id: "faces-6", src: "/images/art/faces/6-low-res.jpg" },
      { id: "faces-7", src: "/images/art/faces/7-low-res.jpg" },
      { id: "faces-8", src: "/images/art/faces/8-low-res.jpg" },
      { id: "faces-5", src: "/images/art/faces/5-low-res.jpg" },
    ],
  },
  {
    id: "figures",
    title: "Figures",
    pieces: [
      { id: "forms-1", src: "/images/art/forms/1-low-res.jpg" },
      { id: "forms-4", src: "/images/art/forms/4-low-res.jpg" },
      { id: "forms-3", src: "/images/art/forms/3-low-res.jpg" },
      { id: "forms-2", src: "/images/art/forms/2-low-res.jpg" },
    ],
  },
  {
    id: "experimental",
    title: "Experimental Pieces",
    blurb: "experimenting with different styles and mediums",
    anchor: "exp",
    pieces: [
      { id: "exp-1", src: "/images/art/experimental/1-low-res.jpg" },
      { id: "exp-2", src: "/images/art/experimental/2-low-res.jpg" },
      { id: "exp-3", src: "/images/art/experimental/3-low-res.jpg" },
      { id: "exp-4", src: "/images/art/experimental/4-low-res.jpg" },
    ],
  },
];

export const pad = (n: number) => String(n).padStart(2, "0");

/** "03 / 08" for the piece at index `i`. */
export const pieceCount = (series: ArtSeries, i: number) =>
  `${pad(i + 1)} / ${pad(series.pieces.length)}`;

export const pieceName = (series: ArtSeries, i: number) =>
  series.pieces[i].title || `${series.title} · No. ${i + 1}`;

export const pieceAlt = (series: ArtSeries, i: number) =>
  series.pieces[i].title ||
  `${series.title}, piece ${i + 1} of ${series.pieces.length}, by ${ARTIST}`;
