/**
 * Angel Construction Services Ltd
 * Interactive Scripts: Project Filter, Dynamic Case Study Modal, Lightbox & Cost Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSwitcher();
  initProjects();
  initCalculator();
  initMobileMenu();
  initContactForm();
  initNavbarScroll();
});

/* ==========================================================================
   1. HERO SHOWCASE SWITCHER
   ========================================================================== */
function initHeroSwitcher() {
  const heroMainImg = document.getElementById('heroMainImg');
  const heroOverlayTag = document.getElementById('heroOverlayTag');
  const heroOverlayTitle = document.getElementById('heroOverlayTitle');
  const thumbBtns = document.querySelectorAll('.hero-thumb-btn');

  if (!thumbBtns.length || !heroMainImg) return;

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const imgSrc = btn.dataset.src;
      const tag = btn.dataset.tag;
      const title = btn.dataset.title;

      if (imgSrc) heroMainImg.src = imgSrc;
      if (tag) heroOverlayTag.textContent = tag;
      if (title) heroOverlayTitle.textContent = title;
    });
  });
}

/* ==========================================================================
   2. PROJECTS SHOWCASE (DIVIDED PROJECT-WISE)
   ========================================================================== */
let activeProjectList = [];
let currentOpenProject = null;
let currentLightboxIndex = 0;
let currentProjectImages = [];

function initProjects() {
  const grid = document.getElementById('projectsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!window.ANGEL_PROJECTS || !grid) return;
  activeProjectList = window.ANGEL_PROJECTS;

  renderProjects('all');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      renderProjects(cat);
    });
  });

  initModalEvents();
  initLightboxEvents();
}

function renderProjects(category) {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';

  const filtered = category === 'all' 
    ? activeProjectList 
    : activeProjectList.filter(p => p.category === category);

  filtered.forEach(proj => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.dataset.id = proj.id;

    const cover = proj.coverImage || (proj.images[0] ? proj.images[0].path : '');
    const photoCount = proj.images ? proj.images.length : 0;

    const specHtml = (proj.stats || []).slice(0, 2).map(s => `
      <div class="spec-cell">
        <span>${escapeHtml(s.label)}</span>
        <strong>${escapeHtml(s.value)}</strong>
      </div>
    `).join('');

    card.innerHTML = `
      <div class="project-card-image">
        <img src="${cover}" alt="${escapeHtml(proj.title)}" loading="lazy">
        <span class="project-badge-cat">${escapeHtml(proj.categoryName)}</span>
        <span class="project-badge-photos">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          ${photoCount} Photos
        </span>
      </div>
      <div class="project-card-body">
        <div class="project-location-tag">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${escapeHtml(proj.location)}
        </div>
        <h3 class="project-card-title">${escapeHtml(proj.title)}</h3>
        <p class="project-card-desc">${escapeHtml(proj.subtitle)}</p>
        <div class="project-card-specs">
          ${specHtml}
        </div>
        <div class="project-card-footer">
          <button class="btn-view-project" onclick="openProjectModal('${proj.id}')">
            View Case Study & Gallery
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          <span class="project-year-pill">${escapeHtml(proj.duration || 'Completed')}</span>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ==========================================================================
   3. PROJECT CASE STUDY MODAL
   ========================================================================== */
function initModalEvents() {
  const backdrop = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (!backdrop) return;

  closeBtn.addEventListener('click', closeProjectModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.getElementById('lightboxBackdrop').classList.contains('active')) {
        closeLightbox();
      } else if (backdrop.classList.contains('active')) {
        closeProjectModal();
      }
    }
  });
}

function openProjectModal(projectId) {
  const proj = (window.ANGEL_PROJECTS || []).find(p => p.id === projectId);
  if (!proj) return;
  currentOpenProject = proj;
  currentProjectImages = proj.images || [];

  const backdrop = document.getElementById('projectModal');
  const modalBox = backdrop.querySelector('.project-modal-box');

  // Fill Header Elements
  document.getElementById('modalCat').textContent = proj.categoryName;
  document.getElementById('modalLoc').textContent = proj.location;
  document.getElementById('modalTitle').textContent = proj.title;
  document.getElementById('modalSubtitle').textContent = proj.subtitle;
  document.getElementById('modalOverview').textContent = proj.overview;

  // Stats Grid
  const statsBox = document.getElementById('modalStats');
  statsBox.innerHTML = (proj.stats || []).map(s => `
    <div class="modal-stat-box">
      <span>${escapeHtml(s.label)}</span>
      <strong>${escapeHtml(s.value)}</strong>
    </div>
  `).join('');

  // Scope List
  const scopeList = document.getElementById('modalScope');
  scopeList.innerHTML = (proj.scope || []).map(item => `
    <li>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${escapeHtml(item)}</span>
    </li>
  `).join('');

  // Testimonial
  const quoteBox = document.getElementById('modalQuoteCard');
  if (proj.testimonial) {
    quoteBox.style.display = 'block';
    quoteBox.innerHTML = `
      <p>"${escapeHtml(proj.testimonial.quote)}"</p>
      <div class="modal-quote-author">
        <div class="author-avatar">${escapeHtml(proj.testimonial.client.charAt(0))}</div>
        <div class="author-info">
          <strong>${escapeHtml(proj.testimonial.client)}</strong>
          <span>${escapeHtml(proj.testimonial.location)}</span>
        </div>
      </div>
    `;
  } else {
    quoteBox.style.display = 'none';
  }

  // Gallery Thumbnails & Main Image
  const featImg = document.getElementById('modalFeaturedImg');
  const captionEl = document.getElementById('modalImgCaption');
  const thumbStrip = document.getElementById('modalThumbStrip');
  thumbStrip.innerHTML = '';

  if (proj.images && proj.images.length > 0) {
    featImg.src = proj.images[0].path;
    captionEl.textContent = proj.images[0].caption;

    proj.images.forEach((img, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `modal-thumb-item ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${img.path}" alt="${escapeHtml(img.caption)}" loading="lazy">`;
      thumb.addEventListener('click', () => {
        document.querySelectorAll('.modal-thumb-item').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        featImg.src = img.path;
        captionEl.textContent = img.caption;
      });
      thumbStrip.appendChild(thumb);
    });

    // Clicking the featured image opens full-screen lightbox
    featImg.onclick = () => {
      const activeThumb = thumbStrip.querySelector('.modal-thumb-item.active');
      const idx = Array.from(thumbStrip.children).indexOf(activeThumb);
      openLightbox(idx >= 0 ? idx : 0);
    };
  }

  // Pre-fill CTA button
  const ctaBtn = document.getElementById('modalInquireBtn');
  if (ctaBtn) {
    ctaBtn.onclick = () => {
      closeProjectModal();
      const projInput = document.getElementById('formProjectDesc');
      if (projInput) {
        projInput.value = `Hello Angel Construction, I am interested in a project similar to "${proj.title}" located in ${proj.location}.`;
      }
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }

  backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const backdrop = document.getElementById('projectModal');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Make accessible to inline onclick
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;

/* ==========================================================================
   4. FULLSCREEN LIGHTBOX
   ========================================================================== */
function initLightboxEvents() {
  const lb = document.getElementById('lightboxBackdrop');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lb) return;

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => changeLightboxImage(-1));
  nextBtn.addEventListener('click', () => changeLightboxImage(1));

  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') changeLightboxImage(-1);
    if (e.key === 'ArrowRight') changeLightboxImage(1);
  });
}

function openLightbox(index) {
  if (!currentProjectImages.length) return;
  currentLightboxIndex = index;
  updateLightboxContent();

  const lb = document.getElementById('lightboxBackdrop');
  lb.classList.add('active');
}

function closeLightbox() {
  const lb = document.getElementById('lightboxBackdrop');
  if (lb) lb.classList.remove('active');
}

function changeLightboxImage(direction) {
  if (!currentProjectImages.length) return;
  currentLightboxIndex = (currentLightboxIndex + direction + currentProjectImages.length) % currentProjectImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const imgEl = document.getElementById('lightboxImg');
  const captionEl = document.getElementById('lightboxCaption');
  const current = currentProjectImages[currentLightboxIndex];

  if (current) {
    imgEl.src = current.path;
    captionEl.textContent = `${current.caption} (${currentLightboxIndex + 1} of ${currentProjectImages.length})`;
  }
}

/* ==========================================================================
   5. INTERACTIVE COST ESTIMATOR / CALCULATOR
   ========================================================================== */
function initCalculator() {
  const typeBtns = document.querySelectorAll('[data-calc-type]');
  const sizeBtns = document.querySelectorAll('[data-calc-size]');
  const finishBtns = document.querySelectorAll('[data-calc-finish]');
  const priceDisplay = document.getElementById('calcPriceDisplay');
  const timelineDisplay = document.getElementById('calcTimelineDisplay');
  const calcCta = document.getElementById('calcCtaBtn');

  let selectedType = 'extension';
  let selectedSize = 'medium';
  let selectedFinish = 'premium';

  // Base matrix for Greater London / Kent residential construction
  const baseRates = {
    extension: {
      small: { min: 42000, max: 58000, weeks: '10 - 12 Weeks' },
      medium: { min: 65000, max: 88000, weeks: '12 - 16 Weeks' },
      large: { min: 95000, max: 140000, weeks: '16 - 20 Weeks' }
    },
    loft: {
      small: { min: 38000, max: 48000, weeks: '6 - 8 Weeks' },
      medium: { min: 52000, max: 68000, weeks: '8 - 10 Weeks' },
      large: { min: 72000, max: 98000, weeks: '10 - 14 Weeks' }
    },
    newbuild: {
      small: { min: 180000, max: 240000, weeks: '18 - 22 Weeks' },
      medium: { min: 260000, max: 350000, weeks: '22 - 28 Weeks' },
      large: { min: 380000, max: 550000, weeks: '28 - 36 Weeks' }
    },
    renovation: {
      small: { min: 30000, max: 45000, weeks: '6 - 8 Weeks' },
      medium: { min: 55000, max: 85000, weeks: '10 - 14 Weeks' },
      large: { min: 90000, max: 150000, weeks: '14 - 20 Weeks' }
    },
    bathroom: {
      small: { min: 9500, max: 14000, weeks: '2 - 3 Weeks' },
      medium: { min: 14000, max: 22000, weeks: '3 - 4 Weeks' },
      large: { min: 22000, max: 35000, weeks: '4 - 6 Weeks' }
    }
  };

  const finishMultipliers = {
    standard: 0.9,
    premium: 1.0,
    luxury: 1.25
  };

  function updateCalc() {
    const rate = baseRates[selectedType]?.[selectedSize] || baseRates.extension.medium;
    const mult = finishMultipliers[selectedFinish] || 1.0;

    const minPrice = Math.round(rate.min * mult / 500) * 500;
    const maxPrice = Math.round(rate.max * mult / 500) * 500;

    priceDisplay.textContent = `£${minPrice.toLocaleString()} - £${maxPrice.toLocaleString()}`;
    timelineDisplay.textContent = `Estimated Build Duration: ${rate.weeks} • Includes Project Management & Structural Sign-Off`;
  }

  typeBtns.forEach(b => {
    b.addEventListener('click', () => {
      typeBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      selectedType = b.dataset.calcType;
      updateCalc();
    });
  });

  sizeBtns.forEach(b => {
    b.addEventListener('click', () => {
      sizeBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      selectedSize = b.dataset.calcSize;
      updateCalc();
    });
  });

  finishBtns.forEach(b => {
    b.addEventListener('click', () => {
      finishBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      selectedFinish = b.dataset.calcFinish;
      updateCalc();
    });
  });

  if (calcCta) {
    calcCta.addEventListener('click', () => {
      const formType = document.getElementById('formProjectType');
      const formDesc = document.getElementById('formProjectDesc');
      if (formType) formType.value = selectedType;
      if (formDesc) {
        formDesc.value = `Calculator Estimate: ${priceDisplay.textContent} (${selectedType.toUpperCase()}, ${selectedSize} scale, ${selectedFinish} spec). Please get in touch for a site survey.`;
      }
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  updateCalc();
}

/* ==========================================================================
   6. CONTACT FORM & SIMULATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultationForm');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-form-submit');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = `Sending Your Details...`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `Inquiry Sent Successfully!`;
      btn.style.background = '#2ec4b6';

      if (alertBox) {
        alertBox.style.display = 'block';
        alertBox.innerHTML = `
          <strong>Thank you!</strong> Your project inquiry has been received. Our senior project surveyor will contact you within 24 hours to arrange your free site survey.
          <br><br>
          For urgent requests, please contact our director directly at <a href="tel:+447931931035" style="color:var(--accent-gold);font-weight:700;">+44 7931 931035</a>.
        `;
      }
      form.reset();
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
      }, 5000);
    }, 1200);
  });
}

/* ==========================================================================
   7. NAVBAR SCROLL & MOBILE MENU
   ========================================================================== */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mainNav = document.querySelector('.main-nav');

  if (!toggleBtn || !mainNav) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = mainNav.classList.toggle('mobile-active');
    toggleBtn.classList.toggle('is-active', isActive);
    toggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close mobile menu when clicking nav links or drawer action buttons
  mainNav.querySelectorAll('.nav-link, .drawer-btn-quote, .drawer-btn-call, .drawer-btn-wa').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('mobile-active');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside of navbar
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('mobile-active') && !mainNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      mainNav.classList.remove('mobile-active');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('mobile-active')) {
      mainNav.classList.remove('mobile-active');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}
