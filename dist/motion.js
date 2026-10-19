(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;

  const sections = document.querySelectorAll('.elementor-10 > .e-con.e-parent, .mobile-hero, .local-consultorio');
  const cards = document.querySelectorAll('.service-card, .patient-review, .e-con[data-settings*="background_background"]:has(> .elementor-widget-icon)');
  cards.forEach((card, index) => {
    card.classList.add('motion-card');
    card.style.setProperty('--card-delay', `${(index % 3) * 90}ms`);
  });
  const targets = [...sections, ...cards];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });

  targets.forEach(element => {
    // Already-visible content stays readable immediately, including fixed CTAs.
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0 && rect.width > 0) return;
    if (element.classList.contains('e-parent')) {
      // Animate the contents so a fixed CTA inside a section keeps its position.
      element = element.querySelector(':scope > .e-con-inner') || element;
    }
    element.classList.add('motion-reveal');
    observer.observe(element);
  });

  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.motion-reveal').forEach(element => element.classList.add('motion-visible'));
  });
})();
