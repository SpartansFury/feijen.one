// script.js
// Simple reveal-on-scroll with prefers-reduced-motion support

(function () {
  const observed = document.querySelectorAll(".reveal, .card");
  if (!observed.length) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    observed.forEach((el) => el.classList.add("is-visible", "active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible", "active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  observed.forEach((el) => observer.observe(el));
})();

// Metallic / kintsugi scroll response for the hero portrait
(function () {
  const frame = document.querySelector("[data-animate-kintsugi]");
  if (!frame) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    frame.style.setProperty("--scroll-progress", "0.35");
    return;
  }

  const updateProgress = () => {
    const rect = frame.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const progress = (viewportHeight * 0.75 - rect.top) / (viewportHeight + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));
    frame.style.setProperty("--scroll-progress", clamped.toFixed(3));
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
})();

// Crack overlays respond to scroll depth and section visibility
(function () {
  const sections = Array.from(document.querySelectorAll("section.section"));
  if (!sections.length) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const assignBaseIntensity = () => {
    sections.forEach((section, index) => {
      const base = (index + 1) / sections.length;
      section.style.setProperty("--crack-intensity", base.toFixed(3));
    });
  };

  if (reduceMotion) {
    assignBaseIntensity();
    document.body.style.setProperty("--crack-depth", "0.22");
    return;
  }

  const updateDepth = () => {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const ratio = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    document.body.style.setProperty("--crack-depth", ratio.toFixed(3));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = sections.indexOf(entry.target);
        if (index === -1) return;
        const base = (index + 1) / sections.length;
        const boost = Math.min(0.45, entry.intersectionRatio * 0.7);
        const value = Math.min(1, base + boost);
        entry.target.style.setProperty("--crack-intensity", value.toFixed(3));
      });
    },
    {
      threshold: [0, 0.15, 0.4, 0.65, 0.9, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));

  assignBaseIntensity();
  updateDepth();
  window.addEventListener("scroll", updateDepth, { passive: true });
  window.addEventListener("resize", updateDepth);
})();
