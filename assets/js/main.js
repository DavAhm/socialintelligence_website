/**
 * Social Intelligence Lab - Main JavaScript
 * Lightweight, vanilla JS for mobile menu and interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? 'Close' : 'Menu';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', false);
        mobileToggle.innerHTML = 'Menu';
      }
    });
  }

  // 2. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // 3. Highlight Current Page in Navigation
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 4. "Read more" for long team bios (team page). Short bios get no button.
  document.querySelectorAll('.team-bio').forEach(bio => {
    if (bio.scrollHeight <= bio.clientHeight + 1) return;

    const button = document.createElement('button');
    button.className = 'team-bio-toggle';
    button.textContent = 'Read more';
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', () => {
      const isOpen = bio.classList.toggle('expanded');
      button.textContent = isOpen ? 'Show less' : 'Read more';
      button.setAttribute('aria-expanded', isOpen);
    });

    bio.after(button);
  });
});
