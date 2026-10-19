(() => {
  const strip = document.querySelector('.space-photo-strip');
  if (!strip) return;
  const toggle = document.querySelector('.space-strip-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, hover = false, focused = false, touching = false, visible = false;
  let frame, last = null, position = 0;
  [...strip.children].forEach(photo => {
    const copy = photo.cloneNode(true);
    copy.setAttribute('aria-hidden', 'true');
    copy.querySelector('img').alt = '';
    strip.append(copy);
  });
  function step(time) {
    if (last !== null && !paused && !hover && !focused && !touching && visible && !document.hidden) {
      position = strip.scrollLeft + Math.min(time - last, 50) * .035 + (position % 1);
      const loop = strip.scrollWidth / 2;
      if (position >= loop) position -= loop;
      strip.scrollLeft = Math.floor(position);
    }
    last = time;
    frame = requestAnimationFrame(step);
  }
  function label() { toggle.textContent = paused ? 'Reproduzir' : 'Pausar'; toggle.setAttribute('aria-label', paused ? 'Reproduzir passagem automática das fotos' : 'Pausar passagem automática das fotos'); }
  toggle.addEventListener('click', () => { paused = !paused; label(); });
  strip.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  strip.addEventListener('pointerleave', () => { hover = false; });
  strip.addEventListener('focusin', () => { focused = true; });
  strip.addEventListener('focusout', () => { focused = false; });
  strip.addEventListener('touchstart', () => { touching = true; }, { passive: true });
  strip.addEventListener('touchend', () => { touching = false; }, { passive: true });
  strip.addEventListener('touchcancel', () => { touching = false; }, { passive: true });
  reduced.addEventListener('change', e => { if (e.matches) { paused = true; label(); } });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(strip);
  label();
  frame = requestAnimationFrame(step);
  window.addEventListener('pagehide', () => cancelAnimationFrame(frame));
  window.addEventListener('pageshow', e => { if (e.persisted) { last = null; frame = requestAnimationFrame(step); } });
})();
