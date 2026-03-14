/* =========================================
   DevBhoomi Travels | main.js
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ── SPLASH LOADER — 2 seconds ── */
  const splash = document.getElementById('splash');
  setTimeout(() => splash && splash.classList.add('gone'), 2200);

  /* ── NAVBAR STICKY ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('stuck', window.scrollY > 10);
  }, { passive: true });

  /* ── HAMBURGER MOBILE ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger && hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    const [s1, s2, s3] = hamburger.querySelectorAll('span');
    s1.style.transform = open ? 'rotate(45deg) translate(5px,5px)'  : '';
    s2.style.opacity   = open ? '0' : '';
    s3.style.transform = open ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });

  /* mobile mega toggle */
  document.querySelectorAll('.has-mega > a').forEach(a => {
    a.addEventListener('click', e => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        a.closest('.has-mega').classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', e => {
    if (navLinks && !navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger && hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && navLinks) navLinks.classList.remove('open');
  });

  /* ── HERO SLIDESHOW ── */
  const slides = document.querySelectorAll('.hslide');
  const sdots  = document.querySelectorAll('.sdot');
  let cur = 0;

  function goSlide(n) {
    slides[cur].classList.remove('active');
    sdots[cur] && sdots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    sdots[cur] && sdots[cur].classList.add('active');
  }
  setInterval(() => goSlide(cur + 1), 5000);
  sdots.forEach((d, i) => d.addEventListener('click', () => goSlide(i)));

  /* ── TABS (Region tabs) ── */
  function setupTabs(container) {
    if (!container) return;
    const tabs  = container.querySelectorAll('.rtab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const group = tab.dataset.group;
        if (!group) return;
        document.querySelectorAll('.dest-cards-wrap, .pkg-grid').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(group);
        if (target) target.classList.add('active');
      });
    });
  }

  setupTabs(document.getElementById('intTabs'));
  setupTabs(document.getElementById('indiaTabs'));
  setupTabs(document.getElementById('pkgTabs'));
  setupTabs(document.getElementById('packages'));
  setupTabs(document.getElementById('honeymoon'));

  /* also honeymoon tabs which don't have a wrapper id */
  document.querySelectorAll('.region-tabs').forEach(rt => setupTabs(rt.closest('.section-block') || rt.parentElement));

  /* ── HERO SEARCH TABS ── */
  document.querySelectorAll('.hst').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hst').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.hs-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tab = document.getElementById('tab-' + btn.dataset.tab);
      if (tab) tab.classList.add('active');
    });
  });

  /* ── SCROLL REVEAL ── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('vis'); revObs.unobserve(e.target); }
    });
  }, { threshold: .1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => revObs.observe(el));

  /* ── SCROLL TOP ── */
  const stBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    stBtn && stBtn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
  stBtn && stBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ── CONTACT FORM ── */
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('.cf-submit');
    btn.innerHTML = '<i class="fas fa-check"></i> Enquiry Sent! We\'ll contact you soon.';
    btn.style.background = '#0e7a44';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Enquiry';
      btn.style.background = '';
      e.target.reset();
    }, 4000);
  });

  /* ── BUTTON RIPPLE ── */
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = '@keyframes rpl{from{transform:scale(0);opacity:1}to{transform:scale(2.5);opacity:0}}';
  document.head.appendChild(rippleStyle);

  document.querySelectorAll('.hs-btn, .pkg-cta, .cf-submit').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = this.getBoundingClientRect();
      const d = Math.max(r.width, r.height);
      const s = document.createElement('span');
      s.style.cssText = `position:absolute;width:${d}px;height:${d}px;background:rgba(255,255,255,.3);border-radius:50%;left:${e.clientX - r.left - d/2}px;top:${e.clientY - r.top - d/2}px;pointer-events:none;animation:rpl .6s ease-out forwards`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(s);
      setTimeout(() => s.remove(), 700);
    });
  });

  /* ── ACTIVE NAV LINK on scroll ── */
  document.querySelectorAll('section[id]').forEach(sec => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (link) link.classList.add('active');
      }
    }, { threshold: .4 });
    obs.observe(sec);
  });

});
