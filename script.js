/* ═══════════════════════════════════════════════════
   SHYMA S M — PORTFOLIO  |  script.js
   Author : Shyma S M
═══════════════════════════════════════════════════ */

/* ── 1. CUSTOM CURSOR ─────────────────────────────── */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

let dotX = 0, dotY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  dotX = e.clientX;
  dotY = e.clientY;
  cursorDot.style.left = `${dotX - 4}px`;
  cursorDot.style.top  = `${dotY - 4}px`;
});

/* Smooth ring follow */
function animateRing() {
  ringX += (dotX - ringX) * 0.12;
  ringY += (dotY - ringY) * 0.12;
  cursorRing.style.left = `${ringX - 18}px`;
  cursorRing.style.top  = `${ringY - 18}px`;
  requestAnimationFrame(animateRing);
}
animateRing();

/* Expand ring on interactive elements */
const interactiveEls = document.querySelectorAll(
  'a, button, .skill-card, .project-card, .edu-card, .form-submit'
);
interactiveEls.forEach((el) => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('expand'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('expand'));
});


/* ── 2. NAVBAR SCROLL BEHAVIOUR ───────────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  /* Back-to-top button */
  const backTop = document.getElementById('backTop');
  if (window.scrollY > 400) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }
});


/* ── 3. MOBILE MENU ───────────────────────────────── */
function toggleMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
}


/* ── 4. HERO ROLE TYPEWRITER ──────────────────────── */
const roles = [
  `<span class="hero-role-accent">Graphic Design Executive</span> at The Social Magnet`,
  `<span style="color:var(--violet)">UI/UX Designer</span> — crafting user journeys`,
  `<span style="color:var(--amber)">Frontend Developer</span> — building the web`,
  `<span class="hero-role-accent">Creative Problem Solver</span> — always`,
];
let roleIndex = 0;
const roleEl  = document.getElementById('roleText');

setInterval(() => {
  /* Slide out */
  roleEl.style.opacity   = '0';
  roleEl.style.transform = 'translateY(-10px)';
  roleEl.style.transition = 'all 0.4s ease';

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.innerHTML  = roles[roleIndex];
    roleEl.style.transform = 'translateY(10px)';
    roleEl.style.transition = 'none';

    /* Slide in */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        roleEl.style.transition = 'all 0.4s ease';
        roleEl.style.opacity    = '1';
        roleEl.style.transform  = 'translateY(0)';
      });
    });
  }, 400);
}, 3000);


/* ── 5. SCROLL REVEAL ─────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        /* Animate skill bars inside revealed cards */
        entry.target.querySelectorAll('.bar-fill').forEach((bar) => {
          setTimeout(() => {
            bar.style.width = bar.dataset.width + '%';
          }, 250);
        });
      }
    });
  },
  { threshold: 0.12 }
);

/* Observe all animated elements */
const revealTargets = document.querySelectorAll(
  '.reveal, .timeline-item, .skill-card, .project-card, .edu-card'
);
revealTargets.forEach((el) => revealObserver.observe(el));

/* Stagger timeline items */
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.transitionDelay = `${i * 0.12}s`;
});

/* Stagger skill cards */
document.querySelectorAll('.skill-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

/* Stagger edu cards */
document.querySelectorAll('.edu-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});


/* ── 6. CONTACT FORM ──────────────────────────────── */
function handleFormSubmit(e) {
  // Let the form submit natively to FormSubmit
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Sending…';
  
  // We don't use e.preventDefault() here so the browser handles the POST request
  // and directs the user to FormSubmit's activation/success page.
}


/* ── 7. SMOOTH SCROLL for anchor links ───────────── */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ── 8. ACTIVE NAV HIGHLIGHT on scroll ───────────── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('nav-active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('nav-active');
          }
        });
      }
    });
  },
  { threshold: 0.35 }
);
sections.forEach((sec) => sectionObserver.observe(sec));