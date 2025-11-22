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
