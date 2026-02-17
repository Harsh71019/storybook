// ============================================================
// Intersection Observer — reveal animations
// ============================================================

const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.12
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    const delay = el.dataset.delay ? parseInt(el.dataset.delay) : 0;

    setTimeout(() => {
      el.classList.add('visible');
    }, delay);

    observer.unobserve(el);
  });
}, observerOptions);

// Observe ego cards
document.querySelectorAll('.ego-card').forEach(card => {
  observer.observe(card);
});

// Observe chapters
document.querySelectorAll('.chapter').forEach(chapter => {
  observer.observe(chapter);
});

// Observe moral cards
document.querySelectorAll('.moral-card').forEach((card, i) => {
  card.dataset.delay = i * 120;
  card.style.opacity = '0';
  card.style.transform = 'translateY(28px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 120);
      cardObserver.unobserve(card);
    });
  }, observerOptions);

  cardObserver.observe(card);
});

// Observe conclusion section
const conclusionScene = document.querySelector('.conclusion__scene');
if (conclusionScene) {
  conclusionScene.style.opacity = '0';
  conclusionScene.style.transform = 'translateY(40px)';
  conclusionScene.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

  const conclusionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      conclusionScene.style.opacity = '1';
      conclusionScene.style.transform = 'translateY(0)';
      conclusionObserver.unobserve(conclusionScene);
    });
  }, observerOptions);

  conclusionObserver.observe(conclusionScene);
}

// ============================================================
// Smooth active nav / subtle parallax on hero
// ============================================================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Subtle parallax on hero content
  if (hero && scrollY < window.innerHeight) {
    const heroContent = hero.querySelector('.hero__content');
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrollY * 0.18}px)`;
      heroContent.style.opacity = 1 - (scrollY / (window.innerHeight * 0.7));
    }
  }
}, { passive: true });
