const revealTargets = document.querySelectorAll(
  '.product-card, .manifesto p, .about-grid, .product-reviews'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => observer.observe(el));

/* Welcome intro — homepage only, once per browser session */
const welcomeScreen = document.getElementById('welcomeScreen');

if (welcomeScreen) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const alreadySeen = sessionStorage.getItem('crbendito-welcome-seen');

  if (alreadySeen || reducedMotion) {
    welcomeScreen.remove();
  } else {
    document.documentElement.style.overflow = 'hidden';

    window.setTimeout(() => {
      welcomeScreen.classList.add('is-leaving');
      document.documentElement.style.overflow = '';
      sessionStorage.setItem('crbendito-welcome-seen', '1');

      window.setTimeout(() => welcomeScreen.remove(), 700);
    }, 1450);
  }
}

/* Cursor glow */


/* Smooth gold light following the pointer */
const cursorGlow = document.getElementById('cursorGlow');

if (
  cursorGlow &&
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  let targetX = window.innerWidth * 0.5;
  let targetY = window.innerHeight * 0.35;
  let currentX = targetX;
  let currentY = targetY;

  const animateGlow = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    cursorGlow.style.transform =
      `translate3d(${currentX - 210}px, ${currentY - 210}px, 0)`;

    requestAnimationFrame(animateGlow);
  };

  window.addEventListener('pointermove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    document.body.classList.add('has-cursor-glow');
  }, { passive: true });

  window.addEventListener('pointerleave', () => {
    document.body.classList.remove('has-cursor-glow');
  });

  animateGlow();
}

/* Download thank-you moment */
const downloadTrigger = document.querySelector('.download-trigger');
const downloadThanks = document.getElementById('downloadThanks');

function createGoldBurst() {
  const count = 44;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    particle.className = 'gold-burst';

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.22;
    const distance = 100 + Math.random() * Math.min(window.innerWidth * 0.28, 360);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = 2 + Math.random() * 5;
    const life = 850 + Math.random() * 650;

    particle.style.setProperty('--burst-x', `${x}px`);
    particle.style.setProperty('--burst-y', `${y}px`);
    particle.style.setProperty('--burst-size', `${size}px`);
    particle.style.setProperty('--burst-life', `${life}ms`);

    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), life + 100);
  }
}

if (downloadTrigger && downloadThanks) {
  downloadTrigger.addEventListener('click', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.setTimeout(() => {
      downloadThanks.classList.add('is-visible');
      downloadThanks.setAttribute('aria-hidden', 'false');
      createGoldBurst();

      window.setTimeout(() => {
        downloadThanks.classList.remove('is-visible');
        downloadThanks.setAttribute('aria-hidden', 'true');
      }, 1750);
    }, 120);
  });
}
