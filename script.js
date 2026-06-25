// nav toggle
const toggle = document.querySelector('.nav-toggle');
const navMobile = document.querySelector('.nav-mobile');
toggle?.addEventListener('click', () => navMobile.classList.toggle('open'));

// close mobile nav on link click
navMobile?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navMobile.classList.remove('open'))
);

// fade-in on scroll
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll(
  '.info-card, .project-card, .process-step, .timeline-item, .cert-card, .fact-item'
).forEach(el => { el.classList.add('fade-in'); io.observe(el); });
