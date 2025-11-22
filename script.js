// Handle scroll reveals and accent emphasis
const initRevealObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
};

// Lightweight golden particles for background depth
const initParticles = () => {
  const field = document.querySelector('.particle-field');
  if (!field) return;

  const particleCount = 26;
  const { innerWidth: width, innerHeight: height } = window;

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    const x = Math.random() * width;
    const y = Math.random() * height;
    const delay = Math.random() * 6;
    const duration = 10 + Math.random() * 6;
    const scale = 0.6 + Math.random() * 0.8;

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.transform = `scale(${scale})`;

    field.appendChild(particle);
  }
};

const initAccentBoost = () => {
  const lines = document.querySelector('.kintsugi-lines');
  const sections = document.querySelectorAll('[data-accent]');
  if (!lines || !sections.length) return;

  const accentObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lines.style.opacity = '0.6';
          entry.target.classList.add('accented');
        } else {
          entry.target.classList.remove('accented');
          lines.style.opacity = '0.3';
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => accentObserver.observe(section));
};

window.addEventListener('DOMContentLoaded', () => {
  initRevealObserver();
  initParticles();
  initAccentBoost();
});
