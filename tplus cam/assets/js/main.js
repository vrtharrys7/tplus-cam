/**
 * Toyota Plus Cambodia — Main JavaScript
 */

/* ===== MOBILE MENU ===== */
function openMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function closeMobileMenuOutside(event) {
  if (event.target === document.getElementById('mobileMenu')) {
    closeMobileMenu();
  }
}

/* ===== TOAST NOTIFICATION ===== */
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `show ${type}`;
  setTimeout(() => { toast.className = ''; }, 3500);
}

/* ===== FAVOURITES ===== */
function getFavourites() {
  try { return JSON.parse(localStorage.getItem('tp_favourites') || '[]'); }
  catch { return []; }
}

function saveFavourites(favs) {
  localStorage.setItem('tp_favourites', JSON.stringify(favs));
}

function toggleFav(carId) {
  const favs = getFavourites();
  const idx  = favs.indexOf(carId);
  if (idx === -1) {
    favs.push(carId);
    showToast('Added to favourites!', 'success');
  } else {
    favs.splice(idx, 1);
    showToast('Removed from favourites', '');
  }
  saveFavourites(favs);

  // Update button state on page
  const btn = document.getElementById('favBtn');
  if (btn) btn.classList.toggle('active', favs.includes(carId));

  // Re-render if on inventory
  document.querySelectorAll(`[data-fav-id="${carId}"]`).forEach(el => {
    el.classList.toggle('active', favs.includes(carId));
  });
}

function isFavourite(carId) {
  return getFavourites().includes(carId);
}

/* ===== BUILD CAR CARD HTML ===== */
function gradeCardClass(g) {
  const map = { 'S':'grade-s','A':'grade-a','B':'grade-b','C':'grade-c','D':'grade-d','E':'grade-e','R':'grade-r' };
  return map[String(g).toUpperCase()] || 'grade-na';
}

function buildCarCard(car) {
  const fav   = isFavourite(car.id);
  const grade = car.grades && car.grades.grade ? car.grades.grade : null;

  return `
    <div class="car-card">
      <div class="car-card-img">
        <a href="car-detail.html?id=${car.id}">
          <img
            src="${car.image}"
            alt="${car.year} Toyota ${car.model}"
            onerror="this.src='https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=600&q=80'"
            loading="lazy"
          />
        </a>
        ${grade ? `<span class="car-badge card-grade-badge ${gradeCardClass(grade)}">Grade ${grade}</span>` : ''}
        <button class="car-fav ${fav ? 'active' : ''}"
                data-fav-id="${car.id}"
                onclick="toggleFav(${car.id})"
                title="Save to Favourites">
          <i class="fas fa-heart"></i>
        </button>
      </div>

      <div class="car-card-body">
        <a href="car-detail.html?id=${car.id}">
          <div class="car-name">Toyota ${car.model}</div>
          <div class="car-sub">${car.year} · ${car.trim || ''}</div>
        </a>

        <div class="car-specs">
          <span class="car-spec">
            <i class="fas fa-tachometer-alt"></i>
            ${(car.km || 0).toLocaleString()} km
          </span>
          <span class="car-spec">
            <i class="fas fa-cog"></i>
            ${car.transmission || '—'}
          </span>
          <span class="car-spec">
            <i class="fas fa-gas-pump"></i>
            ${car.fuel || '—'}
          </span>
          <span class="car-spec">
            <i class="fas fa-map-marker-alt"></i>
            ${car.origin || 'Imported'}
          </span>
        </div>

        <div class="car-price-row">
          <div>
            <div class="car-price">$${(car.price || 0).toLocaleString()}</div>
            <small style="color:var(--grey);font-size:12px;">≈ ${((car.price || 0) * 4100).toLocaleString()} KHR</small>
          </div>
          <a href="car-detail.html?id=${car.id}" class="btn btn-primary btn-sm">
            Details <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

/* ===== RENDER FEATURED CARS (Homepage) ===== */
function renderFeaturedCars(containerId, count = 6) {
  const container = document.getElementById(containerId);
  if (!container || !window.carsData) return;

  // Sort by latest year first (newest vehicles at top)
  const featured = [...carsData]
    .sort((a, b) => b.year - a.year)
    .slice(0, count);

  container.innerHTML = featured.map(car => buildCarCard(car)).join('');
}

/* ===== LANGUAGE TOGGLE (Stub — extend with i18n) ===== */
function toggleLang(btn) {
  const isKh = document.documentElement.lang === 'km';
  document.documentElement.lang = isKh ? 'en' : 'km';
  btn.innerHTML = isKh
    ? '<i class="fas fa-globe"></i> EN / ខ្មែរ'
    : '<i class="fas fa-globe"></i> ខ្មែរ / EN';
  showToast(isKh ? 'Switched to English' : 'ប្ដូរទៅភាសាខ្មែរ', 'success');
}

/* ===== STICKY HEADER SHADOW ===== */
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    header.style.boxShadow = window.scrollY > 10
      ? '0 2px 20px rgba(0,0,0,0.12)'
      : '0 2px 12px rgba(0,0,0,0.09)';
  }
});

/* ===== SCROLL REVEAL ===== */
function revealOnScroll() {
  const els = document.querySelectorAll('.why-card, .car-card, .testimonial-card, .feature-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });
}

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();

  // Close mobile menu on nav link click
  document.querySelectorAll('.mobile-nav-links a').forEach(a => {
    a.addEventListener('click', closeMobileMenu);
  });
});
