// Intersection observer for reveal animations and kintsugi brightness
const observed = document.querySelectorAll('[data-observe]');
const kintsugiLayer = document.querySelector('.kintsugi');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        kintsugiLayer?.classList.add('active');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  },
  { threshold: 0.15 }
);

observed.forEach((section) => observer.observe(section));

// Lightweight kintsugi line generator
function createKintsugiLines(count = 16) {
  if (!kintsugiLayer) return;

  for (let i = 0; i < count; i += 1) {
    const line = document.createElement('div');
    line.className = 'kintsugi-line';

    const length = Math.random() * 140 + 80; // 80 - 220px
    const rotate = Math.random() * 80 - 40; // -40 to 40 deg
    const top = Math.random() * 100;
    const left = Math.random() * 100;

    line.style.width = `${length}px`;
    line.style.top = `${top}%`;
    line.style.left = `${left}%`;
    line.style.transform = `rotate(${rotate}deg)`;
    line.style.animationDelay = `${Math.random() * 4}s`;

    kintsugiLayer.appendChild(line);
  }
}

createKintsugiLines();

// Subtle pulse when background is active
const observerForBg = new IntersectionObserver(
  (entries) => {
    const hasVisible = entries.some((entry) => entry.isIntersecting);
    kintsugiLayer?.querySelectorAll('.kintsugi-line').forEach((line) => {
      line.classList.toggle('active', hasVisible);
    });
  },
  { threshold: 0.25 }
);

observed.forEach((section) => observerForBg.observe(section));

// Accessible skip to content on load when hash present
window.addEventListener('DOMContentLoaded', () => {
  const { hash } = window.location;
  if (hash) {
    const target = document.querySelector(hash);
    target?.setAttribute('tabindex', '-1');
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ behavior: 'smooth' });
  }
});
