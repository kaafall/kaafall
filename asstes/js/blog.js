/* ════════════════════════════════════════
   KAAFALL TRAVELS — BLOG PAGE JS
   ════════════════════════════════════════ */

// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (window.scrollY / total * 100) + '%';
});

// ── REVEAL ON SCROLL ──
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ── CATEGORY FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');
const allCards   = document.querySelectorAll('.post-card, .featured');
const noResults  = document.getElementById('noResults');

let activeCategory = 'all';
let searchQuery    = '';

function applyFilters() {
  let visibleCount = 0;

  allCards.forEach(card => {
    const cat     = card.dataset.cat || '';
    const title   = card.querySelector('.post-title, .featured-title')?.textContent.toLowerCase() || '';
    const excerpt = card.querySelector('.post-excerpt, .featured-desc')?.textContent.toLowerCase() || '';

    const matchesCat    = activeCategory === 'all' || cat === activeCategory;
    const matchesSearch = searchQuery === '' || title.includes(searchQuery) || excerpt.includes(searchQuery);

    if (matchesCat && matchesSearch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    applyFilters();
  });
});

// ── SEARCH ──
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  searchQuery = searchInput.value.trim().toLowerCase();
  applyFilters();
});

// ── NEWSLETTER BUTTON ──
const newsletterBtn = document.querySelector('.newsletter-form button');
const newsletterInput = document.querySelector('.newsletter-form input');

if (newsletterBtn && newsletterInput) {
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterInput.value.trim();
    if (email && email.includes('@')) {
      newsletterBtn.textContent = '✅ Subscribed!';
      newsletterBtn.style.background = '#fff';
      newsletterInput.value = '';
      setTimeout(() => {
        newsletterBtn.textContent = 'Subscribe →';
      }, 3000);
    } else {
      newsletterInput.style.outline = '2px solid #ff6b6b';
      setTimeout(() => {
        newsletterInput.style.outline = 'none';
      }, 1500);
    }
  });
}
