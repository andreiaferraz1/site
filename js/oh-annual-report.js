(() => {
  const root = document.querySelector('.oh-report');
  if (!root || !('IntersectionObserver' in window)) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      const nodes = [...entry.target.querySelectorAll('[data-count]')];
      const start = performance.now();
      const animate = now => {
        const progress = Math.min((now - start) / 2000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        nodes.forEach(node => {
          node.textContent = Math.round(Number(node.dataset.count) * eased);
        });
        if (progress < 1 && !reducedMotion.matches) requestAnimationFrame(animate);
        else nodes.forEach(node => { node.textContent = node.dataset.count; });
      };
      requestAnimationFrame(animate);
    });
  }, { threshold: 0.3 });
  const stats = root.querySelector('.oh-stats');
  if (stats) countObserver.observe(stats);

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.05 });
  root.querySelectorAll('.oh-reveal').forEach(node => revealObserver.observe(node));
  root.classList.add('oh-motion');
})();

(() => {
  const toggle = document.querySelector('.oh-menu-toggle');
  const menu = document.getElementById('oh-site-menu');
  if (!toggle || !menu) return;
  const links = [...menu.querySelectorAll('a')];
  let previousOverflow = '';
  function setOpen(open) {
    if (open) previousOverflow = document.body.style.overflow;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : previousOverflow;
    if (open) links[0]?.focus();
    else toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  links.forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (menu.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); setOpen(false); }
    if (event.key === 'Tab') {
      const controls = [toggle, ...links];
      const index = controls.indexOf(document.activeElement);
      event.preventDefault();
      controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus();
    }
  });
})();
