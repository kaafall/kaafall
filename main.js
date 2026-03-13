/* ============================================================
   Travlla - Travel Booking Website | main.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────
     1. NAVBAR — Scroll shadow + Mobile toggle
  ────────────────────────────────────────── */
  const navbar     = document.querySelector('.navbar');
  const navToggle  = document.querySelector('.nav-toggle');
  const navMenu    = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const bars = navToggle.querySelectorAll('span');
    navMenu.classList.contains('open')
      ? (bars[0].style.transform = 'rotate(45deg) translate(5px,5px)',
         bars[1].style.opacity   = '0',
         bars[2].style.transform = 'rotate(-45deg) translate(5px,-5px)')
      : (bars[0].style.transform = '',
         bars[1].style.opacity   = '',
         bars[2].style.transform = '');
  });

  /* Close menu on nav link click */
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      // Reset hamburger icon
      const bars = navToggle?.querySelectorAll('span');
      if (bars) { bars[0].style.transform = ''; bars[1].style.opacity = ''; bars[2].style.transform = ''; }
    });
  });

  /* Close menu on outside click */
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navbar.contains(e.target)) {
      navMenu.classList.remove('open');
      const bars = navToggle?.querySelectorAll('span');
      if (bars) { bars[0].style.transform = ''; bars[1].style.opacity = ''; bars[2].style.transform = ''; }
    }
  });

  /* Active link on scroll */
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(sec => {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');
      const link   = document.querySelector(`.nav-menu a[href="#${id}"]`);
      if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  });

  /* ──────────────────────────────────────────
     2. SCROLL-TO-TOP BUTTON
  ────────────────────────────────────────── */
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    scrollTopBtn?.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ──────────────────────────────────────────
     3. SIMPLE AOS (Animate on Scroll)
  ────────────────────────────────────────── */
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  aosElements.forEach(el => aosObserver.observe(el));

  /* ──────────────────────────────────────────
     4. COUNTER ANIMATION (Stats Bar)
  ────────────────────────────────────────── */
  function animateCounter(el) {
    const target  = parseFloat(el.getAttribute('data-target'));
    const suffix  = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step     = target / (duration / 16);
    let current    = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
    }, 16);
  }

  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ──────────────────────────────────────────
     5. SLIDER DOTS
  ────────────────────────────────────────── */
  document.querySelectorAll('.slider-dots').forEach(dotsWrap => {
    const dots = dotsWrap.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
  });

  /* ──────────────────────────────────────────
     6. TAB BUTTONS (Trending section)
  ────────────────────────────────────────── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ──────────────────────────────────────────
     7. NEWSLETTER FORM
  ────────────────────────────────────────── */
  const newsletterForm = document.querySelector('.newsletter-form');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (!input.value.trim()) return;
    const btn = newsletterForm.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      input.value = '';
    }, 3000);
  });

  /* ──────────────────────────────────────────
     8. CONTACT FORM
  ────────────────────────────────────────── */
  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type="submit"]');
    btn.textContent = 'Message Sent! ✓';
    btn.style.background = '#27ae60';
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });

  /* ──────────────────────────────────────────
     9. GALLERY — Lightbox on click
  ────────────────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.querySelector('img').src;
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:9999;
        display:flex;align-items:center;justify-content:center;cursor:zoom-out;
      `;
      const img = document.createElement('img');
      img.src = src;
      img.style.cssText = 'max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 0 60px rgba(0,0,0,0.5);';
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => overlay.remove());
    });
  });

  /* ──────────────────────────────────────────
     10. SMOOTH SCROLL for anchor links
  ────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ──────────────────────────────────────────
     11. TOUCH SWIPE — Slider dots
  ────────────────────────────────────────── */
  document.querySelectorAll('.slider-dots').forEach(dotsWrap => {
    let startX = 0;
    dotsWrap.closest('section')?.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    dotsWrap.closest('section')?.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 40) return;
      const dots = dotsWrap.querySelectorAll('.dot');
      let active = [...dots].findIndex(d => d.classList.contains('active'));
      dots[active].classList.remove('active');
      active = diff > 0
        ? Math.min(active + 1, dots.length - 1)
        : Math.max(active - 1, 0);
      dots[active].classList.add('active');
    }, { passive: true });
  });

  /* ──────────────────────────────────────────
     12. RESIZE — Close mobile menu on resize
  ────────────────────────────────────────── */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      const bars = navToggle?.querySelectorAll('span');
      if (bars) { bars[0].style.transform = ''; bars[1].style.opacity = ''; bars[2].style.transform = ''; }
    }
  });

});
