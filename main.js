const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu');

function setMenu(open) {
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuButton.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !menu.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});

const canvas = document.querySelector('[data-wells]');
const context = canvas.getContext('2d');
if (context) {
  const region = new Path2D(
    'M38 143 63 128 82 100 119 103 128 83 151 85 170 48 190 34 213 47 ' +
    '224 69 245 65 265 92 296 89 315 109 346 105 364 119 399 115 426 131 ' +
    '456 126 468 148 456 163 470 183 435 192 416 211 383 202 355 218 ' +
    '324 200 290 213 259 192 233 201 217 184 187 194 157 181 128 191 ' +
    '107 170 78 181 68 159 42 162 Z',
  );
  context.translate(14, 30);
  context.fillStyle = '#a3cc5f';
  context.strokeStyle = '#53782f';
  context.lineWidth = 2;
  context.fill(region);
  context.stroke(region);
  for (let index = 0; index < 126; index += 1) {
    const x = 43 + (index * 113) % 416;
    const y = 39 + (index * 53) % 177;
    if (!context.isPointInPath(region, x + 14, y + 30)) continue;
    context.beginPath();
    context.arc(x, y, index % 6 === 0 ? 4 : 2.2, 0, Math.PI * 2);
    context.fillStyle = index % 6 === 0 ? '#305326' : '#638f35';
    context.fill();
  }
}

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const reveals = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        reveals.unobserve(entry.target);
      }
    }
  }, { threshold: 0.07 });

  for (const section of document.querySelectorAll('.section-heading, .project, .skills-heading, .about-copy, .contact-section .container')) {
    reveals.observe(section);
  }
}
