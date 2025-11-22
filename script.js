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
