// nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

// animate skill bars when about section enters view
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animate'));
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.3 }
);
const aboutSection = document.querySelector('.about');
if (aboutSection) observer.observe(aboutSection);

// subtle fade-in on scroll for cards
const fadeObserver = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = e.target.style.transform.replace('translateY(20px)', 'translateY(0)');
      fadeObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.1 }
);

document.querySelectorAll(
  '.stat-card, .project-card, .process-step, .service-card, .cert-card, .timeline-item'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = (el.style.transform || '') + ' translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  fadeObserver.observe(el);
});
