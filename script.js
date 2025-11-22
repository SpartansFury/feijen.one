 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..4b1cb741868b435dba5e011b264fa1e7fa038d9e
--- /dev/null
+++ b/script.js
@@ -0,0 +1,71 @@
+// Intersection observers for reveal animations and kintsugi brightness
+const sections = Array.from(document.querySelectorAll('[data-observe]'));
+const kintsugiLayer = document.querySelector('.kintsugi');
+const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
+
+// Lightweight kintsugi line generator
+function createKintsugiLines(count = 18) {
+  if (!kintsugiLayer) return [];
+
+  const lines = [];
+  for (let i = 0; i < count; i += 1) {
+    const line = document.createElement('div');
+    line.className = 'kintsugi-line';
+    line.dataset.section = sections.length ? String(i % sections.length) : '0';
+
+    const length = Math.random() * 140 + 80; // 80 - 220px
+    const rotate = Math.random() * 80 - 40; // -40 to 40 deg
+    const top = Math.random() * 100;
+    const left = Math.random() * 100;
+
+    line.style.width = `${length}px`;
+    line.style.top = `${top}%`;
+    line.style.left = `${left}%`;
+    line.style.transform = `rotate(${rotate}deg)`;
+    line.style.animationDelay = `${Math.random() * 4}s`;
+
+    lines.push(line);
+    kintsugiLayer.appendChild(line);
+  }
+  return lines;
+}
+
+const kintsugiLines = createKintsugiLines();
+
+function toggleLinesForSection(sectionEl, isVisible) {
+  const index = sections.indexOf(sectionEl);
+  if (index === -1) return;
+
+  kintsugiLines.forEach((line) => {
+    if (Number(line.dataset.section) === index) {
+      line.classList.toggle('glow', isVisible);
+    }
+  });
+}
+
+if (prefersReducedMotion) {
+  sections.forEach((section) => section.classList.add('visible'));
+} else {
+  const revealObserver = new IntersectionObserver(
+    (entries) => {
+      entries.forEach((entry) => {
+        entry.target.classList.toggle('visible', entry.isIntersecting);
+        toggleLinesForSection(entry.target, entry.isIntersecting);
+      });
+    },
+    { threshold: 0.18 }
+  );
+
+  sections.forEach((section) => revealObserver.observe(section));
+}
+
+// Accessible skip to content on load when hash present
+window.addEventListener('DOMContentLoaded', () => {
+  const { hash } = window.location;
+  if (hash) {
+    const target = document.querySelector(hash);
+    target?.setAttribute('tabindex', '-1');
+    target?.focus({ preventScroll: true });
+    target?.scrollIntoView({ behavior: 'smooth' });
+  }
+});
 
EOF
)
