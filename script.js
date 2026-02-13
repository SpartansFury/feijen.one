/* script.js — feijen.one */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ========== SCROLL REVEAL ========== */
  (function initScrollReveal() {
    var els = document.querySelectorAll('.reveal-up, .reveal-text');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    els.forEach(function (el) { observer.observe(el); });
  })();

  /* ========== ACTIVE NAV TRACKING ========== */
  (function initNavTracking() {
    var sections = document.querySelectorAll('.section, .hero');
    var links = document.querySelectorAll('.nav a');
    if (!sections.length || !links.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (link) {
            link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.3, rootMargin: '-64px 0px 0px 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  })();

  /* ========== HEADER SCROLL STATE ========== */
  (function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          header.classList.toggle('is-scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();

  /* ========== MOBILE NAV ========== */
  (function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    function closeMenu() {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
    }

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  })();

  /* ========== CURSOR GLOW ========== */
  (function initCursorGlow() {
    if (reduceMotion) return;

    // Skip touch / non-hover devices
    var hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasHover) return;

    var glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    var mouseX = 0, mouseY = 0;
    var currentX = 0, currentY = 0;
    var rafId = null;
    var lastMoveTime = 0;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function animate() {
      currentX = lerp(currentX, mouseX, 0.12);
      currentY = lerp(currentY, mouseY, 0.12);
      glow.style.transform = 'translate(' + (currentX - 200) + 'px,' + (currentY - 200) + 'px)';

      // Stop the loop after mouse is idle for ~100ms and position has converged
      var distance = Math.abs(mouseX - currentX) + Math.abs(mouseY - currentY);
      if (Date.now() - lastMoveTime > 100 && distance < 1) {
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(animate);
    }

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      lastMoveTime = Date.now();
      glow.style.opacity = '1';

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    }, { passive: true });

    // Fade out after idle
    var hideTimer;
    document.addEventListener('mousemove', function () {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        glow.style.opacity = '0';
      }, 2500);
    }, { passive: true });
  })();

})();
