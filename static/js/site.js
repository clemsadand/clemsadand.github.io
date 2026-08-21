const revealItems = document.querySelectorAll(
  '.hero-copy, .portrait-frame, .section, .archive-hero, .portfolio-controls, .case-study, .project'
);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -24px' }
  );

  revealItems.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}
