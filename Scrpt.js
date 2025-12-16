// ============================================
// FOXBITE LEARNING - JAVASCRIPT
// Enhanced Interactivity & Animations
// ============================================

'use strict';

// ============================================
// NAVIGATION
// ============================================

const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('active') && 
      !navMenu.contains(e.target) && 
      !mobileToggle.contains(e.target)) {
    mobileToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just '#'
    if (href === '#') return;
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      }
    });
    
    // Toggle current item
    if (isActive) {
      item.classList.remove('active');
      question.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    }
  });
});

// ============================================
// COUNTER ANIMATION
// ============================================

const animateCounter = (element, target, suffix = '') => {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const updateCounter = () => {
    current += increment;
    
    if (current < target) {
      element.textContent = Math.floor(current) + suffix;
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + suffix;
    }
  };
  
  updateCounter();
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const count = parseInt(element.getAttribute('data-count'));
      const text = element.textContent;
      const suffix = text.replace(/[0-9]/g, '');
      
      animateCounter(element, count, suffix);
      counterObserver.unobserve(element);
    }
  });
}, { threshold: 0.5 });

// Observe all stat values
document.querySelectorAll('.stat-value[data-count]').forEach(stat => {
  counterObserver.observe(stat);
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const revealElements = document.querySelectorAll('.course-card, .why-card, .review-card, .faq-item');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(element);
});

// ============================================
// CARD HOVER EFFECTS
// ============================================

const cards = document.querySelectorAll('.course-card, .feature-card, .why-card, .review-card');

cards.forEach(card => {
  card.addEventListener('mouseenter', function(e) {
    this.style.transform = 'translateY(-12px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function(e) {
    this.style.transform = 'translateY(0) scale(1)';
  });
  
  // Add subtle 3D tilt effect
  card.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.02)`;
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
  });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.hero-visual, .floating-badge');
  
  parallaxElements.forEach(element => {
    const speed = element.classList.contains('floating-badge') ? 0.3 : 0.5;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ============================================
// BUTTON RIPPLE EFFECT
// ============================================

const buttons = document.querySelectorAll('.btn, .btn-course');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Fade in hero content
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 100);
  }
  
  // Animate hero visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.style.opacity = '0';
    heroVisual.style.transform = 'translateX(50px)';
    
    setTimeout(() => {
      heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      heroVisual.style.opacity = '1';
      heroVisual.style.transform = 'translateX(0)';
    }, 300);
  }
});

// ============================================
// CURSOR EFFECT (Desktop only)
// ============================================

if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    mix-blend-mode: difference;
    transition: transform 0.15s ease;
  `;
  document.body.appendChild(cursor);
  
  const cursorFollower = document.createElement('div');
  cursorFollower.className = 'cursor-follower';
  cursorFollower.style.cssText = `
    position: fixed;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(59, 130, 246, 0.5);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.3s ease;
  `;
  document.body.appendChild(cursorFollower);
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = (followerX - 15) + 'px';
    cursorFollower.style.top = (followerY - 15) + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Scale cursor on hover
  const interactiveElements = document.querySelectorAll('a, button, .course-card, .why-card, .review-card');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(1.5)';
      cursorFollower.style.transform = 'scale(1.5)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursorFollower.style.transform = 'scale(1)';
    });
  });
}

// ============================================
// ACTIVE SECTION HIGHLIGHTING
// ============================================

const sections = document.querySelectorAll('section[id]');

const highlightNav = () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    
    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.style.color = 'var(--blue-500)';
      } else {
        navLink.style.color = '';
      }
    }
  });
};

window.addEventListener('scroll', highlightNav);

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(highlightNav, 10));

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for FAQ
faqItems.forEach((item, index) => {
  const question = item.querySelector('.faq-question');
  
  question.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      question.click();
    }
    
    if (e.key === 'ArrowDown' && index < faqItems.length - 1) {
      e.preventDefault();
      faqItems[index + 1].querySelector('.faq-question').focus();
    }
    
    if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      faqItems[index - 1].querySelector('.faq-question').focus();
    }
  });
});

// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'visually-hidden';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  background: var(--blue-500);
  color: white;
  z-index: 10001;
  text-decoration: none;
`;

skipLink.addEventListener('focus', () => {
  skipLink.style.clip = 'auto';
  skipLink.style.height = 'auto';
  skipLink.style.width = 'auto';
});

skipLink.addEventListener('blur', () => {
  skipLink.className = 'visually-hidden';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cFoxbite Learning', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cPremium eligibility-based education platform', 'color: #a1a1aa; font-size: 14px;');
console.log('%cInterested in joining our team? Contact us!', 'color: #71717a; font-size: 12px;');

// ============================================
// ANALYTICS READY
// ============================================

// Track button clicks (ready for analytics integration)
document.querySelectorAll('.btn, .btn-course').forEach(button => {
  button.addEventListener('click', function(e) {
    const buttonText = this.textContent.trim();
    const buttonHref = this.getAttribute('href');
    
    console.log('Button clicked:', {
      text: buttonText,
      href: buttonHref,
      timestamp: new Date().toISOString()
    });
    
    // Ready for Google Analytics or other tracking
    // Example: gtag('event', 'button_click', { button_text: buttonText });
  });
});

// Track FAQ interactions
faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', function() {
    const questionText = this.querySelector('span').textContent;
    console.log('FAQ clicked:', questionText);
    
    // Ready for analytics
    // Example: gtag('event', 'faq_interaction', { question: questionText });
  });
});

console.log('%c✓ Website fully loaded and interactive', 'color: #10b981; font-size: 14px; font-weight: bold;');
