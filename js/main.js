/* ============================================================
   Roadcat Rescue — main.js
   Mobile nav toggle · Smooth scroll · Form thank-you messages
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Mobile Nav Toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close nav when clicking outside
    document.addEventListener('click', function (e) {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Highlight Active Nav Link ---------- */
  (function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();

  /* ---------- Smooth Scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#donate') return; // placeholder hrefs
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Form Submissions → Thank You Messages ---------- */
  document.querySelectorAll('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const msgEl = form.querySelector('.form-submit-msg');
      const submitBtn = form.querySelector('[type="submit"]');

      // Disable button briefly
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';
      }

      // Simulate async (would hit real endpoint later)
      setTimeout(function () {
        form.reset();

        if (msgEl) {
          msgEl.style.display = 'block';
          msgEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtn.dataset.originalText || 'Submit';
        }
      }, 700);
    });

    // Save original button text
    const btn = form.querySelector('[type="submit"]');
    if (btn) btn.dataset.originalText = btn.textContent;
  });

  /* ---------- Subtle scroll-reveal for cards ---------- */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll(
      '.card, .step, .mission-card, .impact-number, .callout-box, .founder-note'
    );

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      observer.observe(el);
    });
  }
})();
