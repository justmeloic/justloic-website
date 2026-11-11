// Shared chrome for the art previews: Tailwind theme, the preview bar with the light/dark switch,
// and the zoom viewer that every direction opens a piece into.
(() => {
  const A = window.ART, U = window.ArtUtil, N = A.pieces.length;

  if (window.tailwind) {
    tailwind.config = {
      darkMode: 'class',
      theme: { extend: {
        fontFamily: { serif: ['Newsreader', 'serif'], sans: ['"Plus Jakarta Sans"', 'sans-serif'], mono: ['"JetBrains Mono"', 'monospace'] },
        colors: { ink: { 900: '#1A1816' }, bronze: { DEFAULT: '#B4884D' } },
      } },
    };
  }

  // ── Preview bar ────────────────────────────────────────────────
  const VARIANTS = [
    { k: 'a', file: 'art-a-coverflow.html', label: 'Cover Flow · flip through the drawings like records' },
    { k: 'b', file: 'art-b-spotlight.html', label: 'After Hours · a gallery wall lit by your cursor' },
    { k: 'c', file: 'art-c-desk.html', label: 'Studio Desk · loose prints you can push around' },
    { k: 'd', file: 'art-d-sketchbook.html', label: 'Sketchbook · turn the pages' },
    { k: 'e', file: 'art-e-living-grid.html', label: 'Living Grid · the current page, uncropped and tactile' },
  ];

  const setTheme = (dark) => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('jl-theme', dark ? 'dark' : 'light');
    document.dispatchEvent(new CustomEvent('jl-theme', { detail: { dark } }));
  };
  U.isDark = () => document.documentElement.classList.contains('dark');
  U.toggleTheme = () => setTheme(!U.isDark());
  U.variants = VARIANTS;

  // Call from an inline script at the top of <body>; the bar is inserted where the script sits.
  U.bar = (k) => {
    const v = VARIANTS.find((x) => x.k === k);
    document.currentScript.insertAdjacentHTML('beforebegin', `
      <div class="fixed top-0 inset-x-0 z-50 bg-[#1A1816]/95 text-stone-300 text-xs py-2 px-4 backdrop-blur flex justify-between items-center border-b border-stone-800">
        <div class="flex items-center gap-2 min-w-0">
          <span class="font-mono bg-red-950/80 text-rose-300 px-2 py-0.5 rounded border border-rose-800/60 font-semibold whitespace-nowrap">ART ${k.toUpperCase()}</span>
          <span class="font-medium text-stone-200 hidden md:inline truncate">${U.esc(v.label)}</span>
        </div>
        <div class="flex items-center gap-3 sm:gap-4">
          ${VARIANTS.map((x) => `<a href="${x.file}" title="${U.esc(x.label)}" class="${x.k === k ? 'text-white underline' : 'hover:text-white'}">${x.k.toUpperCase()}</a>`).join('')}
          <a href="art-index.html" class="hover:text-white">Art</a>
          <button id="themeBtn" class="bg-stone-800 hover:bg-stone-700 px-2.5 py-1 rounded text-stone-200 font-mono" aria-label="Toggle light and dark">🌓</button>
        </div>
      </div>`);
    document.getElementById('themeBtn').onclick = U.toggleTheme;
  };

  // ── Zoom viewer ────────────────────────────────────────────────
  // ArtViewer.open(i, { origin: (i) => element the piece should grow out of / shrink back into,
  //                     onChange: (i) => called when the visitor steps to another piece })
  const css = `
    .av { position: fixed; inset: 0; z-index: 2000; background: rgba(12,11,10,0); transition: background-color .35s ease; touch-action: none; overscroll-behavior: contain; }
    .av.on { background: rgba(12,11,10,.94); }
    .av[hidden] { display: none; }
    .av-img { position: absolute; transform-origin: 0 0; border-radius: 4px; background: #e7e5e4; box-shadow: 0 30px 80px -20px rgba(0,0,0,.8); user-select: none; -webkit-user-drag: none; will-change: transform, opacity; }
    .av-img.anim { transition: transform .42s cubic-bezier(.2,.8,.2,1), opacity .2s ease; }
    .av-ui { opacity: 0; transition: opacity .25s ease; }
    .av.on .av-ui { opacity: 1; transition-delay: .12s; }
    .av-btn { position: absolute; width: 44px; height: 44px; display: grid; place-items: center; border-radius: 9999px; border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.06); color: #e7e5e4; font: 16px/1 'JetBrains Mono', monospace; cursor: pointer; }
    .av-btn:hover { background: rgba(255,255,255,.16); color: #fff; }
    .av-btn:focus-visible { outline: 2px solid #fb7185; outline-offset: 2px; }
    .av-close { top: 16px; right: 20px; }
    .av-prev { left: 20px; top: 50%; margin-top: -22px; }
    .av-next { right: 20px; top: 50%; margin-top: -22px; }
    .av-cap { position: absolute; left: 72px; right: 72px; bottom: 20px; text-align: center; pointer-events: none; }
    .av-name { font: 400 18px/1.3 'Newsreader', serif; color: #e7e5e4; }
    .av-meta { font: 11px/1.5 'JetBrains Mono', monospace; color: #a8a29e; margin-top: 2px; }
    @media (max-width: 640px) { .av-prev, .av-next { top: auto; bottom: 16px; margin: 0; } .av-prev { left: 12px; } .av-next { right: 12px; } }
    @media (prefers-reduced-motion: reduce) { .av, .av-img.anim, .av-ui { transition: none; } }
  `;

  let root, img, nameEl, metaEl, btns, idx = 0, opts = {}, isOpen = false, lastFocus = null, tm = 0;

  const fit = () => {
    const vw = innerWidth, vh = innerHeight, padX = vw < 640 ? 12 : 84, top = 64, bottom = 84;
    const h = Math.min(vh - top - bottom, (vw - 2 * padX) / A.aspect, 900), w = h * A.aspect;
    return { left: (vw - w) / 2, top: top + (vh - top - bottom - h) / 2, width: w, height: h };
  };
  const place = () => {
    const f = fit();
    Object.assign(img.style, { left: f.left + 'px', top: f.top + 'px', width: f.width + 'px', height: f.height + 'px' });
    return f;
  };
  // Where piece i currently sits on the page, if it is on screen.
  const rectOf = (i) => {
    const el = opts.origin && opts.origin(i);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.width < 2 || r.bottom < 0 || r.top > innerHeight || r.right < 0 || r.left > innerWidth ? null : r;
  };
  const toRect = (r) => {
    const f = fit();
    return `translate(${r.left - f.left}px, ${r.top - f.top}px) scale(${r.width / f.width}, ${r.height / f.height})`;
  };
  const REST = 'translate(2%, 2%) scale(.96)';

  const show = () => {
    const p = A.pieces[idx];
    img.src = p.src;
    img.alt = U.alt(p);
    nameEl.textContent = U.name(p);
    metaEl.textContent = `${U.meta(p)} · ${U.pad(idx + 1)} / ${U.pad(N)}`;
    [idx + 1, idx - 1].forEach((j) => { new Image().src = A.pieces[(j + N) % N].src; });
  };

  const build = () => {
    if (root) return;
    document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
    document.body.insertAdjacentHTML('beforeend', `
      <div class="av" role="dialog" aria-modal="true" aria-label="Artwork viewer" hidden>
        <img class="av-img" alt="" draggable="false">
        <div class="av-cap av-ui" aria-live="polite"><p class="av-name"></p><p class="av-meta"></p></div>
        <button class="av-btn av-ui av-close" aria-label="Close viewer">✕</button>
        <button class="av-btn av-ui av-prev" aria-label="Previous piece">←</button>
        <button class="av-btn av-ui av-next" aria-label="Next piece">→</button>
      </div>`);
    root = document.body.lastElementChild;
    img = root.querySelector('.av-img');
    nameEl = root.querySelector('.av-name');
    metaEl = root.querySelector('.av-meta');
    btns = [...root.querySelectorAll('.av-btn')];
    btns[0].onclick = close;
    btns[1].onclick = () => go(-1);
    btns[2].onclick = () => go(1);

    let sx = 0, sy = 0;
    root.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; });
    root.addEventListener('pointerup', (e) => {
      if (!isOpen || e.target.closest('.av-btn')) return;
      const dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1);
      else if (dy > 70 && dy > Math.abs(dx)) close();
      else if (Math.abs(dx) < 6 && Math.abs(dy) < 6 && e.target === root) close();
    });
    root.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });

    // Capture phase, so a page's own arrow-key handling stays quiet while the viewer is open.
    window.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      const k = e.key;
      if (k === 'Escape') close();
      else if (k === 'ArrowRight') go(1);
      else if (k === 'ArrowLeft') go(-1);
      else if (k === 'Tab') {
        const at = btns.indexOf(document.activeElement);
        btns[(at + (e.shiftKey ? -1 : 1) + btns.length) % btns.length].focus();
      } else if (k === ' ' && e.target.closest?.('.av-btn')) return; // Space still presses the focused button
      else if (![' ', 'PageDown', 'PageUp', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(k)) return; // the rest would scroll the page behind
      e.preventDefault();
      e.stopPropagation();
    }, true);
    addEventListener('resize', () => { if (isOpen) place(); });
  };

  const open = (i, o = {}) => {
    build();
    clearTimeout(tm);
    opts = o;
    idx = i;
    lastFocus = document.activeElement;
    root.hidden = false;
    show();
    place();
    const from = rectOf(i);
    img.classList.remove('anim');
    img.style.transform = from ? toRect(from) : REST;
    img.style.opacity = from ? 1 : 0;
    void img.offsetWidth;
    img.classList.add('anim');
    img.style.transform = '';
    img.style.opacity = 1;
    root.classList.add('on');
    isOpen = true;
    btns[0].focus({ preventScroll: true });
  };

  function close() {
    if (!isOpen) return;
    isOpen = false;
    clearTimeout(tm);
    const to = rectOf(idx);
    root.classList.remove('on');
    img.classList.add('anim');
    img.style.transform = to ? toRect(to) : REST;
    img.style.opacity = to ? 1 : 0;
    tm = setTimeout(() => { root.hidden = true; }, 430);
    if (lastFocus && lastFocus.isConnected) lastFocus.focus({ preventScroll: true });
    opts.onClose?.(idx);
  }

  function go(d) {
    if (!isOpen) return;
    idx = (idx + d + N) % N;
    opts.onChange?.(idx);
    img.classList.add('anim');
    img.style.opacity = 0;
    img.style.transform = `translateX(${-d * 28}px)`;
    clearTimeout(tm);
    tm = setTimeout(() => {
      show();
      img.classList.remove('anim');
      img.style.transform = `translateX(${d * 28}px)`;
      void img.offsetWidth;
      img.classList.add('anim');
      img.style.transform = '';
      img.style.opacity = 1;
    }, 160);
  }

  window.ArtViewer = { open, close, isOpen: () => isOpen };
})();
