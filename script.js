// nav toggle
const toggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');
toggle?.addEventListener('click', () => navMobile.classList.toggle('open'));
navMobile?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navMobile.classList.remove('open'))
);

// photo fallback — show initials if image fails to load
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('error', () => {
    const fallback = img.nextElementSibling;
    if (fallback?.classList.contains('photo-fallback') ||
        fallback?.classList.contains('about-photo-fallback')) {
      img.style.display = 'none';
      fallback.style.display = 'flex';
    }
  });
});

// reveal on scroll
const revealIO = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealIO.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

// fan out info cards when section scrolls into view
const fanIO = new IntersectionObserver(
  ([e]) => { if (e.isIntersecting) { e.target.classList.add('fanned'); fanIO.unobserve(e.target); } },
  { threshold: 0.4 }
);
const cardsFan = document.querySelector('.cards-fan');
if (cardsFan) fanIO.observe(cardsFan);

// skill bars
const skillIO = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.width + '%';
      skillIO.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);
document.querySelectorAll('.skill-fill').forEach(el => skillIO.observe(el));

// animate stat numbers (count up)
const statIO = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.val);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();
    const isFloat = target % 1 !== 0;
    const animate = now => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = isFloat ? (target * eased).toFixed(1) : Math.round(target * eased);
      el.textContent = val + suffix;
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    statIO.unobserve(el);
  }),
  { threshold: 0.5 }
);
document.querySelectorAll('.stat-num[data-val]').forEach(el => statIO.observe(el));
