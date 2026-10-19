(() => {
  const gallery = document.querySelector('.space-gallery');
  if (!gallery) return;
  const slides = [...gallery.querySelectorAll('.space-slide')];
  const dots = [...gallery.querySelectorAll('[data-space-index]')];
  const carousel = gallery.querySelector('.space-carousel');
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === current)));
    gallery.querySelector('.space-counter').textContent = `${current + 1} / ${slides.length}`;
  }
  gallery.querySelector('[data-space-prev]').addEventListener('click', () => show(current - 1));
  gallery.querySelector('[data-space-next]').addEventListener('click', () => show(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => show(i)));
  carousel.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(current + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let start = null;
  carousel.addEventListener('touchstart', event => {
    start = { x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY };
  }, { passive: true });
  carousel.addEventListener('touchend', event => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    start = null;
  }, { passive: true });
  carousel.addEventListener('touchcancel', () => { start = null; });
  gallery.querySelector('.space-controls').hidden = false;
  show(0);
})();
