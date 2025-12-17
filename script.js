// ============================================
// FOXBITE LEARNING - ENHANCED JAVASCRIPT
// With Fixed Enroll Button Functionality
// ============================================

'use strict';

// ============================================
// UTILITIES
// ============================================

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

const sidebarLinks = $$('.sidebar-link');
const mobileNavItems = $$('.mobile-nav-item');
const sections = $$('.section');

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

// Throttled scroll listener
window.addEventListener('scroll', throttle(updateActiveNav, 100), { passive: true });

// Handle navigation click
function handleNavClick(e) {
    e.preventDefault();
    const target = e.currentTarget;
    const sectionId = target.getAttribute('data-section');
    const section = $('#' + sectionId);
    
    if (section) {
        const offsetTop = section.offsetTop - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update active state immediately
        sidebarLinks.forEach(link => link.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
        target.classList.add('active');
        
        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(15);
        }
    }
}

// Add click listeners to all navigation items
sidebarLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});

mobileNavItems.forEach(item => {
    item.addEventListener('click', handleNavClick);
});

// ============================================
// FAQ ACCORDION - FULLY FUNCTIONAL
// ============================================

const faqItems = $$('.faq-item');
const faqQuestions = $$('.faq-question');

faqQuestions.forEach((question, index) => {
    question.addEventListener('click', function() {
        const faqItem = faqItems[index];
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach((item, i) => {
            if (i !== index) {
                item.classList.remove('active');
                faqQuestions[i].setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current item
        if (isActive) {
            faqItem.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
        } else {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
            
            // Smooth scroll to bring FAQ into view
            setTimeout(() => {
                const rect = faqItem.getBoundingClientRect();
                const isInView = rect.top >= 100 && rect.bottom <= window.innerHeight;
                
                if (!isInView) {
                    const scrollTop = window.pageYOffset + rect.top - 120;
                    window.scrollTo({
                        top: scrollTop,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    });
    
    // Keyboard navigation
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
        
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
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

$$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if already handled or if it's an external link
        if (href === '#' || 
            this.classList.contains('sidebar-link') || 
            this.classList.contains('mobile-nav-item')) {
            return;
        }
        
        const target = $(href);
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
// ENROLL BUTTONS - FIXED TO OPEN IN NEW TAB
// ============================================

const enrollButtons = $$('.btn-course');

enrollButtons.forEach(button => {
    // Ensure the button opens in new tab
    button.setAttribute('target', '_blank');
    button.setAttribute('rel', 'noopener noreferrer');
    
    button.addEventListener('click', function(e) {
        const buttonHref = this.getAttribute('href');
        
        // Log for analytics
        console.log('Enroll button clicked:', {
            href: buttonHref,
            timestamp: new Date().toISOString()
        });
        
        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(20);
        }
        
        // Ensure it opens (fallback)
        if (buttonHref && buttonHref.startsWith('http')) {
            // Let the default behavior handle it
            return true;
        } else {
            e.preventDefault();
            console.error('Invalid enrollment link');
        }
    });
});

// ============================================
// COURSE CARD INTERACTIONS
// ============================================

const courseCards = $$('.course-card');

courseCards.forEach(card => {
    // Hover effect (desktop only)
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
    
    // Touch feedback (mobile)
    card.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
    }, { passive: true });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    }, { passive: true });
});

// ============================================
// BUTTON CLICK TRACKING
// ============================================

const buttons = $$('.btn, .btn-sidebar-cta');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        // Log for analytics
        console.log('Button clicked:', {
            text: buttonText,
            href: buttonHref,
            timestamp: new Date().toISOString()
        });
        
        // Add ripple effect
        if (e.clientX && e.clientY) {
            createRipple(e, this);
        }
        
        // Haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(20);
        }
    });
});

// ============================================
// RIPPLE EFFECT
// ============================================

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// INTERSECTION OBSERVER - SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 30);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animations
const animatedElements = $$('.course-card, .why-card, .review-card, .faq-item');

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in hero section
    const heroSection = $('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 0.8s ease';
            heroSection.style.opacity = '1';
        }, 100);
    }
    
    // Console branding
    console.log('%c🦊 Foxbite Learning', 'color: #3b82f6; font-size: 24px; font-weight: 900;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #6c757d;');
    console.log('%c✓ White Theme UI loaded', 'color: #10b981; font-size: 12px; font-weight: 600;');
    console.log('%c✓ Enroll buttons working', 'color: #10b981; font-size: 12px; font-weight: 600;');
    console.log('%c✓ All interactions ready', 'color: #10b981; font-size: 12px; font-weight: 600;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #6c757d;');
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Skip to main content
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    padding: 8px 16px;
    background: var(--accent-primary);
    color: white;
    text-decoration: none;
    z-index: 10000;
    border-radius: 0 0 8px 0;
    font-weight: 600;
    transition: top 0.2s;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// Keyboard navigation indicator
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add keyboard navigation styles
const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--accent-primary) !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
    }
`;
document.head.appendChild(keyboardStyle);

// ============================================
// TOUCH FEEDBACK ENHANCEMENTS
// ============================================

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouch) {
    // Haptic feedback for all interactive elements
    $$('a, button').forEach(element => {
        element.addEventListener('touchstart', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        }, { passive: true });
    });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            console.log(`%c⚡ Page Load: ${pageLoadTime}ms`, 'color: #10b981; font-size: 11px;');
            
            if (pageLoadTime < 2000) {
                console.log('%c🚀 Excellent performance!', 'color: #10b981; font-size: 12px; font-weight: 700;');
            } else if (pageLoadTime < 3500) {
                console.log('%c✓ Good performance', 'color: #3b82f6; font-size: 12px;');
            }
        }, 0);
    });
}

// ============================================
// RESIZE HANDLER
// ============================================

let resizeTimer;
window.addEventListener('resize', debounce(() => {
    updateActiveNav();
}, 250));

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise:', e.reason);
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%c🎨 White Theme UI by Foxbite', 'color: #6c757d; font-size: 10px; font-style: italic;');
console.log('%c✨ Enroll buttons fully functional', 'color: #6c757d; font-size: 10px; font-style: italic;');
