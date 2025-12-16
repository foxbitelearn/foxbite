// ============================================
// FOXBITE LEARNING - JAVASCRIPT
// Premium Interactivity
// ============================================

'use strict';

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

// Get all navigation links (sidebar and mobile)
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const sections = document.querySelectorAll('.section');

// Function to update active state
function updateActiveNav() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      // Update sidebar links
      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
          link.classList.add('active');
        }
      });
      
      // Update mobile nav items
      mobileNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
          item.classList.add('active');
        }
      });
    }
  });
}

// Listen for scroll events
window.addEventListener('scroll', updateActiveNav);

// Handle click events on navigation links
function handleNavClick(e) {
  const target = e.currentTarget;
  const sectionId = target.getAttribute('data-section');
  const section = document.getElementById(sectionId);
  
  if (section) {
    e.preventDefault();
    
    // Calculate scroll position
    const offsetTop = section.offsetTop - 20;
    
    // Smooth scroll to section
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
    
    // Update active state immediately
    sidebarLinks.forEach(link => link.classList.remove('active'));
    mobileNavItems.forEach(item => item.classList.remove('active'));
    target.classList.add('active');
  }
}

// Add click event listeners
sidebarLinks.forEach(link => {
  link.addEventListener('click', handleNavClick);
});

mobileNavItems.forEach(item => {
  item.addEventListener('click', handleNavClick);
});

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question, index) => {
  question.addEventListener('click', () => {
    const faqItem = faqItems[index];
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    faqItems.forEach(item => {
      item.classList.remove('active');
      item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    
    // Open clicked item if it was closed
    if (!isActive) {
      faqItem.classList.add('active');
      question.setAttribute('aria-expanded', 'true');
    }
  });
  
  // Keyboard navigation for FAQ
  question.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      question.click();
    }
    
    // Arrow key navigation
    if (e.key === 'ArrowDown' && index < faqQuestions.length - 1) {
      e.preventDefault();
      faqQuestions[index + 1].focus();
    }
    
    if (e.key === 'ArrowUp' && index > 0) {
      e.preventDefault();
      faqQuestions[index - 1].focus();
    }
  });
});

// ============================================
// SMOOTH SCROLLING FOR ALL ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just '#' or already handled by navigation
    if (href === '#' || this.classList.contains('sidebar-link') || this.classList.contains('mobile-nav-item')) {
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const offsetTop = target.offsetTop - 20;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// COURSE CARD HOVER EFFECTS
// ============================================

const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ============================================
// BUTTON CLICK TRACKING
// ============================================

const buttons = document.querySelectorAll('.btn, .btn-course, .btn-sidebar-cta');

buttons.forEach(button => {
  button.addEventListener('click', function(e) {
    const buttonText = this.textContent.trim();
    const buttonHref = this.getAttribute('href');
    
    // Log button click (ready for analytics integration)
    console.log('Button clicked:', {
      text: buttonText,
      href: buttonHref,
      timestamp: new Date().toISOString()
    });
    
    // Example: Google Analytics tracking
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', 'button_click', {
    //     button_text: buttonText,
    //     button_url: buttonHref
    //   });
    // }
  });
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
const animatedElements = document.querySelectorAll('.course-card, .why-card, .review-card, .faq-item');

animatedElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(30px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(element);
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for scroll events
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

// Apply debounce to scroll handler
const debouncedScroll = debounce(updateActiveNav, 10);
window.addEventListener('scroll', debouncedScroll);

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%cFoxbite Learning', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cPremium eligibility-based education platform', 'color: #a8a9b4; font-size: 14px;');
console.log('%cWebsite loaded successfully', 'color: #10b981; font-size: 12px; font-weight: bold;');

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Fade in hero content
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.style.opacity = '0';
    
    setTimeout(() => {
      heroSection.style.transition = 'opacity 0.8s ease';
      heroSection.style.opacity = '1';
    }, 100);
  }
  
  console.log('%c✓ All animations loaded', 'color: #10b981; font-size: 14px;');
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content link (for screen readers)
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: var(--accent-primary);
  color: white;
  text-decoration: none;
  z-index: 10000;
  transition: top 0.2s;
`;

skipLink.addEventListener('focus', () => {
  skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
  skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
  console.error('Error caught:', e.message);
});

// ============================================
// READY STATE
// ============================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('%c✓ DOM fully loaded', 'color: #10b981; font-size: 12px;');
  });
} else {
  console.log('%c✓ DOM already loaded', 'color: #10b981; font-size: 12px;');
}
