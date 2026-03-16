/* ════════════════════════════════════════
   KAAFALL TRAVELS — PACKAGES PAGE JS
   ════════════════════════════════════════ */

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (scrolled / total) * 100 : 0;
  progressBar.style.width = pct + '%';
});

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same grid
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      siblings.forEach((el, idx) => {
        setTimeout(() => {
          el.classList.add('visible');
        }, idx * 100);
      });
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));
