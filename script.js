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
    if (fallback?.classList.contains('photo-fb') ||
        fallback?.classList.contains('about-photo-fb')) {
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

// scroll-driven card spread
const deck = document.querySelector('.cards-deck');
const c1 = deck?.querySelector('.icard-1');
const c2 = deck?.querySelector('.icard-2');
const c3 = deck?.querySelector('.icard-3');

function applyCardSpread(p) {
  if (!deck) return;
  // ease: accelerate in, decelerate out
  const e = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2;
  const spread = 340; // px each card moves from center
  c1.style.transform = `translateX(calc(-50% + ${-spread * e}px)) rotate(${-4*(1-e)}deg) translateY(${8*(1-e)}px)`;
  c2.style.transform = `translateX(-50%) rotate(${2*(1-e)}deg) translateY(${4*(1-e)}px)`;
  c3.style.transform = `translateX(calc(-50% + ${spread * e}px)) rotate(0deg)`;
  // bring side cards forward once spread > half
  c1.style.zIndex = e > 0.5 ? 3 : 1;
  c3.style.zIndex = e > 0.5 ? 3 : 1;
}

function onScroll() {
  if (!deck) return;
  const rect = deck.getBoundingClientRect();
  const vh = window.innerHeight;
  // 0 when deck bottom enters viewport, 1 when deck top is at 40% vh
  const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.7)));
  applyCardSpread(p);
}

applyCardSpread(0); // initial stacked state
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// cycling hero photos
const slides = document.querySelectorAll('.hero-photo-slide');
if (slides.length > 1) {
  let current = 0;
  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 2500);
}

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

// stagger cap-tag pills into view
const capsIO = new IntersectionObserver(
  ([e]) => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('.cap-tag').forEach((tag, i) => {
      setTimeout(() => tag.classList.add('visible'), i * 60);
    });
    capsIO.unobserve(e.target);
  },
  { threshold: 0.2 }
);
const capsRow = document.querySelector('.caps-row');
if (capsRow) capsIO.observe(capsRow);
