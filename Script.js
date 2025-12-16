// ============================================
// FOXBITE LEARNING - FUTURISTIC PREMIUM JS
// Ultra-Professional Interactions & Animations
// ============================================

'use strict';

// ============================================
// RESPONSIVE IMAGE DETECTION
// ============================================

function detectDevice() {
    const isMobile = window.innerWidth <= 768;
    const imageName = isMobile ? 'mobile.png' : 'student.png';
    console.log(`%c📱 Device: ${isMobile ? 'Mobile' : 'Desktop'}`, 'color: #3b82f6; font-weight: bold;');
    console.log(`%c🖼️  Loading: ${imageName}`, 'color: #10b981; font-weight: bold;');
}

window.addEventListener('load', detectDevice);
window.addEventListener('resize', debounce(detectDevice, 250));

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

const sidebarLinks = document.querySelectorAll('.sidebar-link');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 120;
    
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
                    
                    // Add pulse animation to active link
                    link.style.animation = 'none';
                    setTimeout(() => {
                        link.style.animation = 'linkPulse 0.5s ease';
                    }, 10);
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

// Add link pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes linkPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Initial call

// Navigation click handlers
function handleNavClick(e) {
    const target = e.currentTarget;
    const sectionId = target.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
        e.preventDefault();
        
        // Calculate offset
        const offsetTop = section.offsetTop - 20;
        
        // Smooth scroll
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update active states
        sidebarLinks.forEach(link => link.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }
}

sidebarLinks.forEach(link => link.addEventListener('click', handleNavClick));
mobileNavItems.forEach(item => item.addEventListener('click', handleNavClick));

// ============================================
// COURSE CARD INTERACTIONS
// ============================================

const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
    // Mouse move parallax effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
    
    // Touch interactions for mobile
    card.addEventListener('touchstart', function() {
        this.classList.add('touched');
    });
    
    card.addEventListener('touchend', function() {
        setTimeout(() => {
            this.classList.remove('touched');
        }, 300);
    });
});

// ============================================
// HIDE SCROLL INDICATOR ON SCROLL
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 150) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.transform = 'translateX(-50%) translateY(0)';
            scrollIndicator.style.pointerEvents = 'auto';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ============================================
// HORIZONTAL SCROLL FOR REVIEWS
// ============================================

const reviewsContainer = document.querySelector('.reviews-horizontal-scroll');
const scrollBtnLeft = document.querySelector('.scroll-btn-left');
const scrollBtnRight = document.querySelector('.scroll-btn-right');

if (reviewsContainer && scrollBtnLeft && scrollBtnRight) {
    // Scroll button click handlers
    scrollBtnLeft.addEventListener('click', () => {
        const scrollAmount = window.innerWidth < 768 ? 340 : 430;
        reviewsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    scrollBtnRight.addEventListener('click', () => {
        const scrollAmount = window.innerWidth < 768 ? 340 : 430;
        reviewsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Update scroll button visibility
    function updateScrollButtons() {
        const maxScroll = reviewsContainer.scrollWidth - reviewsContainer.clientWidth;
        const currentScroll = reviewsContainer.scrollLeft;
        
        // Left button
        if (currentScroll <= 5) {
            scrollBtnLeft.style.opacity = '0.3';
            scrollBtnLeft.style.pointerEvents = 'none';
        } else {
            scrollBtnLeft.style.opacity = '1';
            scrollBtnLeft.style.pointerEvents = 'auto';
        }
        
        // Right button
        if (currentScroll >= maxScroll - 5) {
            scrollBtnRight.style.opacity = '0.3';
            scrollBtnRight.style.pointerEvents = 'none';
        } else {
            scrollBtnRight.style.opacity = '1';
            scrollBtnRight.style.pointerEvents = 'auto';
        }
    }
    
    reviewsContainer.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('load', updateScrollButtons);
    window.addEventListener('resize', debounce(updateScrollButtons, 150));
    
    // Drag to scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;
    let velocity = 0;
    let lastX = 0;
    let lastTime = Date.now();
    
    reviewsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        reviewsContainer.style.cursor = 'grabbing';
        reviewsContainer.style.userSelect = 'none';
        startX = e.pageX - reviewsContainer.offsetLeft;
        scrollLeft = reviewsContainer.scrollLeft;
        velocity = 0;
        lastX = e.pageX;
        lastTime = Date.now();
    });
    
    reviewsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsContainer.style.cursor = 'grab';
    });
    
    reviewsContainer.addEventListener('mouseup', () => {
        isDown = false;
        reviewsContainer.style.cursor = 'grab';
        
        // Apply momentum
        if (Math.abs(velocity) > 1) {
            const momentum = velocity * 15;
            reviewsContainer.scrollBy({
                left: momentum,
                behavior: 'smooth'
            });
        }
    });
    
    reviewsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        
        const x = e.pageX - reviewsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsContainer.scrollLeft = scrollLeft - walk;
        
        // Calculate velocity
        const now = Date.now();
        const dt = now - lastTime;
        const dx = e.pageX - lastX;
        velocity = dx / dt;
        lastX = e.pageX;
        lastTime = now;
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    
    reviewsContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchScrollLeft = reviewsContainer.scrollLeft;
    }, { passive: true });
    
    reviewsContainer.addEventListener('touchmove', (e) => {
        const touchX = e.touches[0].pageX;
        const walk = (touchStartX - touchX) * 1.5;
        reviewsContainer.scrollLeft = touchScrollLeft + walk;
    }, { passive: true });
}

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question, index) => {
    question.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const faqItem = faqItems[index];
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items with animation
        faqItems.forEach((item, i) => {
            if (i !== index) {
                item.classList.remove('active');
                item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
        });
        
        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            
            // Smooth scroll to bring FAQ into view
            setTimeout(() => {
                const rect = faqItem.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = rect.top + scrollTop - 100;
                
                if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
                    window.scrollTo({
                        top: targetY,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        } else {
            faqItem.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
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
        
        if (e.key === 'Home') {
            e.preventDefault();
            faqQuestions[0].focus();
        }
        
        if (e.key === 'End') {
            e.preventDefault();
            faqQuestions[faqQuestions.length - 1].focus();
        }
    });
});

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a nav link (already handled)
        if (href === '#' || this.classList.contains('sidebar-link') || this.classList.contains('mobile-nav-item')) {
            return;
        }
        
        // Skip if opens in new tab
        if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 30;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add stagger effect for multiple elements
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.transitionDelay = `${delay}ms`;
        }
    });
}, observerOptions);

// Apply to course cards, why cards, review cards, and FAQ items
const animatedElements = document.querySelectorAll('.course-card, .why-card, .review-card, .faq-item');
animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    element.dataset.delay = index * 100;
    fadeInObserver.observe(element);
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================

const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    heroImage.addEventListener('error', function() {
        const isMobile = window.innerWidth <= 768;
        const imageName = isMobile ? 'mobile.png' : 'student.png';
        
        console.error(`%c❌ Image failed to load: ${imageName}`, 'color: #ef4444; font-weight: bold;');
        console.log(`%cℹ️  Please ensure ${imageName} is in the same folder as index.html`, 'color: #f59e0b;');
        
        this.style.display = 'none';
        const container = this.closest('.hero-image-container');
        if (container) {
            container.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%)';
            container.innerHTML += `
                <div style="
                    position: absolute; 
                    top: 50%; 
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                    text-align: center; 
                    color: white; 
                    font-size: 1.5rem; 
                    font-weight: 700; 
                    padding: 3rem; 
                    z-index: 1;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(10px);
                    border-radius: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                ">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🖼️</div>
                    ${imageName} Not Found
                    <div style="font-size: 0.875rem; opacity: 0.7; margin-top: 1rem; font-weight: 400;">
                        Place ${imageName} in the same folder as index.html
                    </div>
                </div>
            `;
        }
    });
    
    heroImage.addEventListener('load', function() {
        const isMobile = window.innerWidth <= 768;
        const imageName = isMobile ? 'mobile.png' : 'student.png';
        console.log(`%c✓ Image loaded successfully: ${imageName}`, 'color: #10b981; font-weight: bold;');
    });
}

// ============================================
// BUTTON HOVER EFFECTS
// ============================================

const buttons = document.querySelectorAll('.btn-course, .btn-sidebar-cta, .btn-feedback');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ============================================
// PARALLAX EFFECT ON SCROLL
// ============================================

let ticking = false;
function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Parallax for stats overlay
    const statsOverlay = document.querySelector('.stats-overlay');
    if (statsOverlay && scrolled < window.innerHeight) {
        const parallaxAmount = scrolled * 0.15;
        statsOverlay.style.transform = `translateX(-50%) translateY(${parallaxAmount}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

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

const throttledScroll = throttle(updateActiveNav, 100);
window.addEventListener('scroll', throttledScroll);

// ============================================
// PRELOAD CRITICAL IMAGES
// ============================================

function preloadImages() {
    const isMobile = window.innerWidth <= 768;
    const imagesToPreload = [
        isMobile ? 'mobile.png' : 'student.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Preload images
    preloadImages();
    
    // Fade in hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease';
            heroSection.style.opacity = '1';
        }, 100);
    }
    
    // Console branding
    console.log('%c🦊 FOXBITE LEARNING', 'color: #3b82f6; font-size: 24px; font-weight: 900; text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);');
    console.log('%c✨ Ultra-Premium Education Platform', 'color: #a0a0a0; font-size: 14px; font-weight: 600;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6;');
    console.log('%c✓ Responsive image system active', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c✓ Desktop: student.png | Mobile: mobile.png', 'color: #10b981; font-size: 12px;');
    console.log('%c✓ Futuristic animations enabled', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c✓ Premium interactions ready', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c✓ All systems operational', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6;');
    console.log('%c💡 Built with cutting-edge web technologies', 'color: #f59e0b; font-size: 11px; font-style: italic;');
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('%c⚠️ Error detected:', 'color: #ef4444; font-weight: bold;', e.message);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('%c⚠️ Unhandled promise rejection:', 'color: #ef4444; font-weight: bold;', e.reason);
});

// ============================================
// PASSIVE EVENT LISTENERS FOR PERFORMANCE
// ============================================

document.addEventListener('touchstart', function() {}, { passive: true });
document.addEventListener('touchmove', function() {}, { passive: true });

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add skip to content link functionality
const skipLink = document.querySelector('a[href="#main-content"]');
if (skipLink) {
    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const mainContent = document.querySelector('#main-content') || document.querySelector('main');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// DYNAMIC YEAR UPDATE (IF FOOTER EXISTS)
// ============================================

const yearElements = document.querySelectorAll('.current-year');
if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
}

// ============================================
// COPY TO CLIPBOARD FUNCTIONALITY (IF NEEDED)
// ============================================

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('%c✓ Copied to clipboard', 'color: #10b981; font-weight: bold;');
        }).catch(err => {
            console.error('%c❌ Failed to copy', 'color: #ef4444; font-weight: bold;', err);
        });
    }
}

// ============================================
// PERFORMANCE MONITORING (OPTIONAL)
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            console.log('%c⚡ Performance Metrics:', 'color: #3b82f6; font-weight: bold;');
            console.log(`%c   Page Load Time: ${pageLoadTime}ms`, 'color: #10b981;');
            console.log(`%c   Server Response: ${connectTime}ms`, 'color: #10b981;');
            console.log(`%c   Render Time: ${renderTime}ms`, 'color: #10b981;');
        }, 0);
    });
}

console.log('%c🚀 Foxbite Learning initialized successfully!', 'color: #3b82f6; font-size: 16px; font-weight: bold; background: rgba(59, 130, 246, 0.1); padding: 8px 16px; border-radius: 8px;');
