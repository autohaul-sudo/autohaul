/* ============================================================
   AUTO HAUL SALES & RENTALS — Main JavaScript
   js/main.js
   ============================================================ */

/* ── Custom Cursor ── */
(function initCursor() {
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  if (!cursor || !follower) return;

  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
    follower.style.left = mx + 'px';
    follower.style.top  = my + 'px';
  });

  document.querySelectorAll('a, button, .car-card, .pay-card, .why-card, .info-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width  = '20px';
      cursor.style.height = '20px';
      follower.style.width  = '52px';
      follower.style.height = '52px';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width  = '12px';
      cursor.style.height = '12px';
      follower.style.width  = '36px';
      follower.style.height = '36px';
    });
  });
})();


/* ── Scroll-Reveal ── */
(function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.car-card, .pay-card, .why-card, .info-card, .testi-card'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    obs.observe(el);
  });
})();


/* ── Fleet Filter Tabs ── */
(function initFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.car-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
})();


/* ── Toast Notification ── */
window.showToast = function(type = 'success', title = '', message = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.className = 'toast ' + type;
  toast.querySelector('.toast-title').textContent = title;
  toast.querySelector('.toast-msg').textContent   = message;

  // Reset progress bar by re-inserting it
  const old = toast.querySelector('.toast-progress');
  if (old) old.remove();
  const prog = document.createElement('div');
  prog.className = 'toast-progress';
  toast.appendChild(prog);

  toast.classList.add('show');

  // Auto hide after 5.5s
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => closeToast(), 5500);
};

window.closeToast = function() {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.remove('show');
};


/* ── Smooth active nav link ── */
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => obs.observe(s));
})();
