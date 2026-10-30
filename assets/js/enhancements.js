/**
 * Alpine Ascents - Premium Visual Enhancements
 * 1. Hero Particle Snow/Mist Effect (Canvas)
 * 2. Animated Count-Up for Hero Stats
 * 3. Scroll-Reveal for Section Cards
 * 4. 3D Tilt on Hero Stat Cards
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroParticles();
  initStatCountUp();
  initScrollReveal();
  initStatCardTilt();
});

/* ============================================================
   1. HERO PARTICLE SNOW / MIST EFFECT
   ============================================================ */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resize() {
    const hero = canvas.parentElement;
    canvas.width  = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 110;
  const particles = Array.from({ length: COUNT }, () => createParticle(canvas, true));

  function createParticle(canvas, randomY = false) {
    return {
      x:       Math.random() * canvas.width,
      y:       randomY ? Math.random() * canvas.height : -10,
      r:       Math.random() * 2.2 + 0.4,
      speed:   Math.random() * 0.55 + 0.2,
      drift:   (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.55 + 0.15,
      wobble:  Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.005,
    };
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.wobble += p.wobbleSpeed;
      p.x += p.drift + Math.sin(p.wobble) * 0.3;
      p.y += p.speed;

      if (p.y > canvas.height + 10) {
        Object.assign(p, createParticle(canvas, false));
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

/* ============================================================
   2. COUNT-UP ANIMATION FOR HERO STAT NUMBERS
   ============================================================ */
function initStatCountUp() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target) || 0;
    const suffix  = el.dataset.suffix  || '';
    const prefix  = el.dataset.prefix  !== undefined ? el.dataset.prefix : '';
    const duration = 1800;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuart(progress);
      const current  = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Trigger when hero section enters view
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(el => animateCounter(el));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const heroSection = document.querySelector('.hero-section');
  if (heroSection) observer.observe(heroSection);
}

/* ============================================================
   3. SCROLL-REVEAL FOR SECTION CARDS
   ============================================================ */
function initScrollReveal() {
  // Target activity cards, expedition cards, discipline cards etc.
  const targets = document.querySelectorAll(
    '.activity-card, .hero-stat-card, .summit-mosaic-item, .card-alpine, .record-row'
  );

  targets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${(i % 6) * 60}ms,
                           transform 0.55s cubic-bezier(0.16,1,0.3,1) ${(i % 6) * 60}ms`;
  });

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => revealObs.observe(el));
}

/* ============================================================
   4. 3D TILT EFFECT ON HERO STAT CARDS
   ============================================================ */
function initStatCardTilt() {
  const cards = document.querySelectorAll('.hero-stat-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -10;
      const tiltY  = dx *  10;

      card.style.transform   = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px) scale(1.04)`;
      card.style.boxShadow   = `0 12px 35px rgba(0,0,0,0.4), 0 0 18px var(--alpine-primary, rgba(56,189,248,0.4))`;
      card.style.borderColor = `var(--alpine-primary)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform   = '';
      card.style.boxShadow   = '';
      card.style.borderColor = '';
    });

    card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease';
    card.style.willChange = 'transform';
  });
}

