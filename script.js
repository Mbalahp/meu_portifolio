(() => {
  const root = document.documentElement;

  const yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const themeToggle = document.getElementById('theme-toggle');
  const systemPrefersLight = () => window.matchMedia('(prefers-color-scheme: light)').matches;
  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
      themeToggle.textContent = theme === 'light' ? 'Tema Escuro' : 'Tema Claro';
    }
  };
  const storedTheme = localStorage.getItem('theme');
  applyTheme(storedTheme || (systemPrefersLight() ? 'light' : 'dark'));
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.dataset.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }

  const targets = Array.from(document.querySelectorAll('header.cab, section, .crd'));
  if (targets.length) {
    targets.forEach((el) => el.classList.add('reveal'));

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
      );

      targets.forEach((el) => observer.observe(el));
    }
  }

  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  const cards = Array.from(document.querySelectorAll('.crd[data-tags]'));
  const applyFilter = (filter) => {
    filterButtons.forEach((btn) => {
      const active = btn.dataset.filter === filter;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    cards.forEach((card) => {
      const tags = (card.dataset.tags || '').split(' ');
      const matches = filter === 'all' || tags.includes(filter);
      card.hidden = !matches;
    });
  };
  if (filterButtons.length && cards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => applyFilter(btn.dataset.filter));
    });
    applyFilter('all');
  }

  const toast = document.getElementById('toast');
  let toastTimer = null;
  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
  };

  const copyBtn = document.getElementById('copy-email');
  const emailEl = document.getElementById('email');
  if (copyBtn && emailEl) {
    copyBtn.addEventListener('click', async () => {
      const email = emailEl.textContent.trim();
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        showToast('Email copiado!');
      } catch (error) {
        showToast('Não foi possível copiar');
      }
    });
  }

  const toTopBtn = document.getElementById('to-top');
  if (toTopBtn) {
    const toggleToTop = () => {
      toTopBtn.classList.toggle('show', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleToTop, { passive: true });
    toggleToTop();
    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  const navLinks = Array.from(document.querySelectorAll('.top-nav a'));
  const sections = Array.from(document.querySelectorAll('main section'));
  if (navLinks.length && sections.length) {
    const linkMap = new Map(navLinks.map((link) => [link.getAttribute('href').slice(1), link]));
    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((link) => link.classList.remove('active'));
              const active = linkMap.get(entry.target.id);
              if (active) active.classList.add('active');
            }
          });
        },
        { rootMargin: '-35% 0px -55% 0px', threshold: 0.1 }
      );
      sections.forEach((section) => navObserver.observe(section));
    } else {
      navLinks[0].classList.add('active');
    }
  }
})();
