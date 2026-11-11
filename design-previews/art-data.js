// Shared data for the art page explorations.
// Mirrors services/web/src/data/art.ts (same pieces, same order).
// Optional fields: blurb on a series; title, year, medium on a piece. The previews show them when present.
(() => {
  const ART = {
    artist: 'Loïc Muhirwa',
    aspect: 3 / 4, // every scan is 3:4 portrait
    series: [
      { id: 'portraits', title: 'Portraits' },
      { id: 'figures', title: 'Figures' },
      { id: 'experimental', title: 'Experimental Pieces', blurb: 'experimenting with different styles and mediums' },
    ],
    pieces: [
      { id: 'faces-2', series: 'portraits', src: 'images/art/faces/2-low-res.jpg' },
      { id: 'faces-1', series: 'portraits', src: 'images/art/faces/1-low-res.jpg' },
      { id: 'faces-4', series: 'portraits', src: 'images/art/faces/4-low-res.jpg' },
      { id: 'faces-3', series: 'portraits', src: 'images/art/faces/3-low-res.jpg' },
      { id: 'faces-6', series: 'portraits', src: 'images/art/faces/6-low-res.jpg' },
      { id: 'faces-7', series: 'portraits', src: 'images/art/faces/7-low-res.jpg' },
      { id: 'faces-8', series: 'portraits', src: 'images/art/faces/8-low-res.jpg' },
      { id: 'faces-5', series: 'portraits', src: 'images/art/faces/5-low-res.jpg' },

      { id: 'forms-1', series: 'figures', src: 'images/art/forms/1-low-res.jpg' },
      { id: 'forms-4', series: 'figures', src: 'images/art/forms/4-low-res.jpg' },
      { id: 'forms-3', series: 'figures', src: 'images/art/forms/3-low-res.jpg' },
      { id: 'forms-2', series: 'figures', src: 'images/art/forms/2-low-res.jpg' },

      { id: 'exp-1', series: 'experimental', src: 'images/art/experimental/1-low-res.jpg' },
      { id: 'exp-2', series: 'experimental', src: 'images/art/experimental/2-low-res.jpg' },
      { id: 'exp-3', series: 'experimental', src: 'images/art/experimental/3-low-res.jpg' },
      { id: 'exp-4', series: 'experimental', src: 'images/art/experimental/4-low-res.jpg' },
    ],
  };

  // Derived fields: i = position overall, n = position within its series, s = the series object.
  const byId = Object.fromEntries(ART.series.map((s) => [s.id, s]));
  ART.series.forEach((s) => { s.pieces = []; });
  ART.pieces.forEach((p, i) => {
    p.i = i;
    p.s = byId[p.series];
    p.s.pieces.push(p);
    p.n = p.s.pieces.length;
  });
  ART.series.forEach((s) => { s.first = s.pieces[0].i; s.count = s.pieces.length; });

  const esc = (v) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');

  window.ART = ART;
  window.ArtUtil = {
    esc,
    pad,
    // The pieces are untitled on the site, so they are numbered within their series until titles exist.
    name: (p) => p.title || `${p.s.title} · No. ${p.n}`,
    meta: (p) => [`By ${ART.artist}`, p.year, p.medium].filter(Boolean).join(' · '),
    alt: (p) => p.title || `${p.s.title}, drawing ${p.n} of ${p.s.count}, by ${ART.artist}`,
  };
})();
