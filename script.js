// script.js
// Simple reveal-on-scroll with prefers-reduced-motion support

(function () {
  const sections = document.querySelectorAll(".reveal");
  if (!sections.length) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    sections.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  sections.forEach((el) => observer.observe(el));
})();
