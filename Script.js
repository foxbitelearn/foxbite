// ============================================
// FOXBITE LEARNING - MOBILE-OPTIMIZED PREMIUM JS
// Ultra-Professional with Perfect Mobile Experience
// ============================================

'use strict';

// ============================================
// DEVICE DETECTION & CONFIGURATION
// ============================================

const isMobile = {
    Android: () => navigator.userAgent.match(/Android/i),
    BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),
    iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),
    Opera: () => navigator.userAgent.match(/Opera Mini/i),
    Windows: () => navigator.userAgent.match(/IEMobile/i),
    any: function() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
    }
};

const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// Device info logging
function detectDevice() {
    const width = window.innerWidth;
    const isMobileDevice = width <= 768;
    const imageName = isMobileDevice ? 'mobile.png' : 'student.png';
    
    console.log('%c📱 Device Detection:', 'color: #3b82f6; font-weight: bold; font-size: 14px;');
    console.log(`%c   Screen Width: ${width}px`, 'color: #10b981;');
    console.log(`%c   Device Type: ${isMobileDevice ? 'Mobile' : 'Desktop'}`, 'color: #10b981;');
    console.log(`%c   Touch Support: ${isTouch ? 'Yes' : 'No'}`, 'color: #10b981;');
    console.log(`%c   Hero Image: ${imageName}`, 'color: #10b981;');
    
    // Add mobile class to body
    if (isMobileDevice || isMobile.any()) {
        document.body.classList.add('is-mobile');
    } else {
        document.body.classList.remove('is-mobile');
    }
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
                }
            });
            
            // Update mobile nav items
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('active');
                    
                    // Add haptic feedback on mobile
                    if (isTouch && 'vibrate' in navigator) {
                        navigator.vibrate(10);
                    }
                }
            });
        }
    });
}

// Throttled scroll handler
const throttledNavUpdate = throttle(updateActiveNav, 100);
window.addEventListener('scroll', throttledNavUpdate, { passive: true });
updateActiveNav(); // Initial call

// ============================================
// NAVIGATION CLICK HANDLERS
// ============================================

function handleNavClick(e) {
    const target = e.currentTarget;
    const sectionId = target.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
        e.preventDefault();
        
        // Calculate offset (more for mobile)
        const isMobileView = window.innerWidth <= 768;
        const offsetTop = section.offsetTop - (isMobileView ? 10 : 20);
        
        // Smooth scroll
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update active states
        sidebarLinks.forEach(link => link.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
        target.classList.add('active');
        
        // Haptic feedback
        if (isTouch && 'vibrate' in navigator) {
            navigator.vibrate(15);
        }
    }
}

sidebarLinks.forEach(link => link.addEventListener('click', handleNavClick));
mobileNavItems.forEach(item => {
    item.addEventListener('click', handleNavClick);
    
    // Touch feedback for mobile
    item.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.95)';
    }, { passive: true });
    
    item.addEventListener('touchend', function() {
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    }, { passive: true });
});

// ============================================
// COURSE CARD INTERACTIONS - MOBILE OPTIMIZED
// ============================================

const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
    // Desktop: Mouse move parallax effect
    if (!isTouch) {
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
    }
    
    // Mobile: Touch interactions with haptic feedback
    if (isTouch) {
        card.addEventListener('touchstart', function(e) {
            this.classList.add('touched');
            this.style.transform = 'translateY(-4px) scale(0.98)';
            
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        }, { passive: true });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touched');
                this.style.transform = '';
            }, 200);
        }, { passive: true });
        
        card.addEventListener('touchcancel', function() {
            this.classList.remove('touched');
            this.style.transform = '';
        }, { passive: true });
    }
});

// ============================================
// BUTTON INTERACTIONS - MOBILE OPTIMIZED
// ============================================

const buttons = document.querySelectorAll('.btn-course, .btn-sidebar-cta, .btn-feedback');
buttons.forEach(button => {
    if (isTouch) {
        // Touch interactions
        button.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(0.97)';
            
            // Haptic feedback
            if ('vibrate' in navigator) {
                navigator.vibrate(12);
            }
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    } else {
        // Desktop hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
});

// ============================================
// SCROLL INDICATOR - HIDE ON SCROLL
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateScrollIndicator() {
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
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollIndicator);
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// HORIZONTAL SCROLL FOR REVIEWS - OPTIMIZED
// ============================================

const reviewsContainer = document.querySelector('.reviews-horizontal-scroll');
const scrollBtnLeft = document.querySelector('.scroll-btn-left');
const scrollBtnRight = document.querySelector('.scroll-btn-right');

if (reviewsContainer && scrollBtnLeft && scrollBtnRight) {
    // Calculate scroll amount based on device
    function getScrollAmount() {
        const width = window.innerWidth;
        if (width < 480) return 310;
        if (width < 768) return 340;
        return 430;
    }
    
    // Scroll button click handlers
    scrollBtnLeft.addEventListener('click', () => {
        reviewsContainer.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth'
        });
        
        if (isTouch && 'vibrate' in navigator) {
            navigator.vibrate(10);
        }
    });
    
    scrollBtnRight.addEventListener('click', () => {
        reviewsContainer.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth'
        });
        
        if (isTouch && 'vibrate' in navigator) {
            navigator.vibrate(10);
        }
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
    
    reviewsContainer.addEventListener('scroll', throttle(updateScrollButtons, 50), { passive: true });
    window.addEventListener('load', updateScrollButtons);
    window.addEventListener('resize', debounce(updateScrollButtons, 150));
    
    // DESKTOP: Drag to scroll
    if (!isTouch) {
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
    }
    
    // MOBILE: Enhanced touch scrolling with momentum
    if (isTouch) {
        let touchStartX = 0;
        let touchScrollLeft = 0;
        let touchStartTime = 0;
        let lastTouchX = 0;
        
        reviewsContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = reviewsContainer.scrollLeft;
            touchStartTime = Date.now();
            lastTouchX = touchStartX;
        }, { passive: true });
        
        reviewsContainer.addEventListener('touchmove', (e) => {
            const touchX = e.touches[0].pageX;
            const walk = (touchStartX - touchX) * 1.5;
            reviewsContainer.scrollLeft = touchScrollLeft + walk;
            lastTouchX = touchX;
        }, { passive: true });
        
        reviewsContainer.addEventListener('touchend', () => {
            const touchEndTime = Date.now();
            const timeDiff = touchEndTime - touchStartTime;
            const distance = lastTouchX - touchStartX;
            
            // Apply momentum if swipe was fast enough
            if (timeDiff < 300 && Math.abs(distance) > 50) {
                const momentum = (distance / timeDiff) * -300;
                reviewsContainer.scrollBy({
                    left: momentum,
                    behavior: 'smooth'
                });
            }
        }, { passive: true });
    }
}

// ============================================
// FAQ ACCORDION - MOBILE OPTIMIZED
// ============================================

const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question, index) => {
    question.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const faqItem = faqItems[index];
        const isActive = faqItem.classList.contains('active');
        
        // Haptic feedback on mobile
        if (isTouch && 'vibrate' in navigator) {
            navigator.vibrate(12);
        }
        
        // Close all FAQ items
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
            
            // Smooth scroll to bring FAQ into view (mobile-friendly)
            setTimeout(() => {
                const rect = faqItem.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const isMobileView = window.innerWidth <= 768;
                const offset = isMobileView ? 80 : 100;
                const targetY = rect.top + scrollTop - offset;
                
                if (rect.top < offset || rect.bottom > window.innerHeight - 100) {
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
    
    // Touch feedback for mobile
    if (isTouch) {
        question.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        }, { passive: true });
        
        question.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
    }
    
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
        
        // Skip if it's just # or handled elsewhere
        if (href === '#' || 
            this.classList.contains('sidebar-link') || 
            this.classList.contains('mobile-nav-item') ||
            this.classList.contains('faq-question')) {
            return;
        }
        
        // Skip if opens in new tab
        if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const isMobileView = window.innerWidth <= 768;
            const offsetTop = target.offsetTop - (isMobileView ? 20 : 30);
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Haptic feedback
            if (isTouch && 'vibrate' in navigator) {
                navigator.vibrate(10);
            }
        }
    });
});

// ============================================
// INTERSECTION OBSERVER - FADE-IN ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Stagger effect
            const delay = entry.target.dataset.delay || 0;
            entry.target.style.transitionDelay = `${delay}ms`;
            
            // Unobserve after animation
            setTimeout(() => {
                fadeInObserver.unobserve(entry.target);
            }, parseInt(delay) + 800);
        }
    });
}, observerOptions);

// Apply to animated elements
const animatedElements = document.querySelectorAll('.course-card, .why-card, .review-card, .faq-item');
animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    element.dataset.delay = Math.min(index * 100, 300); // Cap delay at 300ms
    fadeInObserver.observe(element);
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================

const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    heroImage.addEventListener('error', function() {
        const isMobileView = window.innerWidth <= 768;
        const imageName = isMobileView ? 'mobile.png' : 'student.png';
        
        console.error(`%c❌ Image failed to load: ${imageName}`, 'color: #ef4444; font-weight: bold;');
        console.log(`%cℹ️  Please ensure ${imageName} exists in the same folder`, 'color: #f59e0b;');
        
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
                    font-size: ${isMobileView ? '1.25rem' : '1.5rem'}; 
                    font-weight: 700; 
                    padding: ${isMobileView ? '2rem' : '3rem'}; 
                    z-index: 1;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(10px);
                    border-radius: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    max-width: 90%;
                ">
                    <div style="font-size: ${isMobileView ? '2.5rem' : '3rem'}; margin-bottom: 1rem;">🖼️</div>
                    ${imageName} Not Found
                    <div style="font-size: ${isMobileView ? '0.8125rem' : '0.875rem'}; opacity: 0.7; margin-top: 1rem; font-weight: 400;">
                        Place ${imageName} in the same folder as index.html
                    </div>
                </div>
            `;
        }
    });
    
    heroImage.addEventListener('load', function() {
        const isMobileView = window.innerWidth <= 768;
        const imageName = isMobileView ? 'mobile.png' : 'student.png';
        console.log(`%c✓ Image loaded: ${imageName}`, 'color: #10b981; font-weight: bold;');
    });
}

// ============================================
// PARALLAX EFFECT - MOBILE OPTIMIZED
// ============================================

let parallaxTicking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const isMobileView = window.innerWidth <= 768;
    
    // Reduce parallax intensity on mobile for performance
    const parallaxIntensity = isMobileView ? 0.15 : 0.3;
    
    // Parallax for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * parallaxIntensity}px)`;
    }
    
    // Parallax for stats overlay (less intense on mobile)
    const statsOverlay = document.querySelector('.stats-overlay');
    if (statsOverlay && scrolled < window.innerHeight) {
        const parallaxAmount = scrolled * (isMobileView ? 0.08 : 0.15);
        if (isMobileView) {
            statsOverlay.style.transform = `translateX(-50%) translateY(${parallaxAmount}px)`;
        } else {
            statsOverlay.style.transform = `translateX(-50%) translateY(${parallaxAmount}px)`;
        }
    }
    
    parallaxTicking = false;
}

// Use passive listener for better mobile performance
window.addEventListener('scroll', () => {
    if (!parallaxTicking) {
        window.requestAnimationFrame(updateParallax);
        parallaxTicking = true;
    }
}, { passive: true });

// ============================================
// UTILITY FUNCTIONS
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

// ============================================
// MOBILE-SPECIFIC OPTIMIZATIONS
// ============================================

if (isMobile.any() || isTouch) {
    // Prevent iOS Safari zoom on input focus
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
        viewportMeta.setAttribute('content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Optimize scroll performance on mobile
    let lastScrollTop = 0;
    let scrollDelta = 0;
    
    window.addEventListener('scroll', () => {
        const st = window.pageYOffset || document.documentElement.scrollTop;
        scrollDelta = Math.abs(lastScrollTop - st);
        lastScrollTop = st;
    }, { passive: true });
    
    // Reduce animation complexity on older mobile devices
    const isOldMobile = () => {
        const ua = navigator.userAgent;
        return /iPhone OS [2-9]_/i.test(ua) || /Android [2-4]\./i.test(ua);
    };
    
    if (isOldMobile()) {
        document.body.classList.add('reduced-animations');
        console.log('%c⚡ Reduced animations for older device', 'color: #f59e0b;');
    }
}

// ============================================
// PRELOAD CRITICAL IMAGES
// ============================================

function preloadImages() {
    const isMobileView = window.innerWidth <= 768;
    const imagesToPreload = [
        isMobileView ? 'mobile.png' : 'student.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`%c✓ Preloaded: ${src}`, 'color: #10b981; font-size: 11px;');
    });
}

// ============================================
// VIEWPORT HEIGHT FIX FOR MOBILE BROWSERS
// ============================================

function setVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', debounce(setVH, 200));

// Update hero height with custom property
const heroSection = document.querySelector('.hero-image-container');
if (heroSection && window.innerWidth <= 768) {
    heroSection.style.height = 'calc(var(--vh, 1vh) * 100)';
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
    console.log('%c🦊 FOXBITE LEARNING', 'color: #3b82f6; font-size: 28px; font-weight: 900; text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);');
    console.log('%c✨ Mobile-Optimized Premium Platform', 'color: #a0a0a0; font-size: 14px; font-weight: 600;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6;');
    console.log('%c✓ Touch interactions active', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c✓ Haptic feedback enabled', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c✓ Responsive image system ready', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c✓ Mobile scroll optimization active', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c✓ Perfect mobile experience loaded', 'color: #10b981; font-size: 12px; font-weight: bold;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #3b82f6;');
    console.log(`%c📱 Device: ${window.innerWidth <= 768 ? 'Mobile' : 'Desktop'} | Touch: ${isTouch ? 'Yes' : 'No'}`, 'color: #f59e0b; font-size: 11px;');
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('%c⚠️ Error:', 'color: #ef4444; font-weight: bold;', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('%c⚠️ Promise rejection:', 'color: #ef4444; font-weight: bold;', e.reason);
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Focus management for mobile
if (isTouch) {
    document.addEventListener('touchstart', () => {
        document.body.classList.remove('keyboard-nav');
    }, { passive: true });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            const connectTime = perfData.responseEnd - perfData.requestStart;
            const renderTime = perfData.domComplete - perfData.domLoading;
            
            console.log('%c⚡ Performance Metrics:', 'color: #3b82f6; font-weight: bold; font-size: 13px;');
            console.log(`%c   Page Load: ${pageLoadTime}ms`, 'color: #10b981; font-size: 11px;');
            console.log(`%c   Server Response: ${connectTime}ms`, 'color: #10b981; font-size: 11px;');
            console.log(`%c   Render Time: ${renderTime}ms`, 'color: #10b981; font-size: 11px;');
            
            // Performance suggestions
            if (pageLoadTime > 3000) {
                console.log('%c⚠️ Consider optimizing image sizes', 'color: #f59e0b; font-size: 11px;');
            }
        }, 0);
    });
}

// ============================================
// NETWORK STATUS MONITORING (PWA-READY)
// ============================================

window.addEventListener('online', () => {
    console.log('%c✓ Back online', 'color: #10b981; font-weight: bold;');
});

window.addEventListener('offline', () => {
    console.log('%c⚠️ Connection lost', 'color: #f59e0b; font-weight: bold;');
});

// ============================================
// FINAL CONSOLE MESSAGE
// ============================================

console.log('%c🚀 Foxbite Learning - Fully Initialized!', 'color: #fff; font-size: 14px; font-weight: bold; background: linear-gradient(135deg, #3b82f6, #2563eb); padding: 10px 20px; border-radius: 8px;');
