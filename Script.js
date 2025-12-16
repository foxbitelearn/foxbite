// ============================================
// FOXBITE LEARNING - ULTRA PREMIUM JS
// Physics-Based Motion & Parallax Effects
// ============================================

'use strict';

// ============================================
// NAVIGATION ACTIVE STATE
// ============================================

const sidebarLinks = document.querySelectorAll('.sidebar-link');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
const sections = document.querySelectorAll('.section');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            sidebarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
            
            mobileNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('data-section') === sectionId) {
                    item.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

function handleNavClick(e) {
    const target = e.currentTarget;
    const sectionId = target.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    
    if (section) {
        e.preventDefault();
        const offsetTop = section.offsetTop - 20;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        sidebarLinks.forEach(link => link.classList.remove('active'));
        mobileNavItems.forEach(item => item.classList.remove('active'));
        target.classList.add('active');
    }
}

sidebarLinks.forEach(link => link.addEventListener('click', handleNavClick));
mobileNavItems.forEach(item => item.addEventListener('click', handleNavClick));

// ============================================
// PARALLAX SCROLL EFFECTS
// ============================================

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax === 'hero' ? 0.5 : 0.3;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ============================================
// ANIMATED COUNTER FOR STATS
// ============================================

function animateCounter(element, target, suffix = '+') {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const target = parseInt(entry.target.dataset.count);
                const suffix = entry.target.closest('.stat-item').querySelector('.stat-label').textContent.includes('Rate') ? '%' : '+';
                animateCounter(entry.target, target, suffix);
                entry.target.classList.add('counted');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

// ============================================
// HORIZONTAL SCROLL FOR REVIEWS
// ============================================

const reviewsContainer = document.querySelector('.reviews-horizontal-scroll');
const scrollBtnLeft = document.querySelector('.scroll-btn-left');
const scrollBtnRight = document.querySelector('.scroll-btn-right');

if (reviewsContainer && scrollBtnLeft && scrollBtnRight) {
    scrollBtnLeft.addEventListener('click', () => {
        const scrollAmount = window.innerWidth < 768 ? 320 : 400;
        reviewsContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    scrollBtnRight.addEventListener('click', () => {
        const scrollAmount = window.innerWidth < 768 ? 320 : 400;
        reviewsContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    function updateScrollButtons() {
        const maxScroll = reviewsContainer.scrollWidth - reviewsContainer.clientWidth;
        
        scrollBtnLeft.style.opacity = reviewsContainer.scrollLeft <= 0 ? '0.5' : '1';
        scrollBtnLeft.style.pointerEvents = reviewsContainer.scrollLeft <= 0 ? 'none' : 'auto';
        
        scrollBtnRight.style.opacity = reviewsContainer.scrollLeft >= maxScroll - 5 ? '0.5' : '1';
        scrollBtnRight.style.pointerEvents = reviewsContainer.scrollLeft >= maxScroll - 5 ? 'none' : 'auto';
    }
    
    reviewsContainer.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('load', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    
    // Drag to scroll
    let isDown = false;
    let startX;
    let scrollLeft;
    
    reviewsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        reviewsContainer.style.cursor = 'grabbing';
        startX = e.pageX - reviewsContainer.offsetLeft;
        scrollLeft = reviewsContainer.scrollLeft;
    });
    
    reviewsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsContainer.style.cursor = 'grab';
    });
    
    reviewsContainer.addEventListener('mouseup', () => {
        isDown = false;
        reviewsContainer.style.cursor = 'grab';
    });
    
    reviewsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsContainer.scrollLeft = scrollLeft - walk;
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach((question, index) => {
    question.addEventListener('click', () => {
        const faqItem = faqItems[index];
        const isActive = faqItem.classList.contains('active');
        
        faqItems.forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        if (!isActive) {
            faqItem.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
    
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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || this.classList.contains('sidebar-link') || this.classList.contains('mobile-nav-item')) {
            return;
        }
        
        // Skip external links
        if (this.hasAttribute('target') && this.getAttribute('target') === '_blank') {
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
// INTERSECTION OBSERVER FOR ANIMATIONS
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

const animatedElements = document.querySelectorAll('.course-card, .why-card, .review-card, .faq-item');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(element);
});

// ============================================
// MOUSE FOLLOW EFFECT (SUBTLE)
// ============================================

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateMouseFollow() {
    const floatingElements = document.querySelectorAll('.floating');
    
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    floatingElements.forEach((element, index) => {
        const speed = (index % 3 + 1) * 0.002;
        const x = (currentX - window.innerWidth / 2) * speed;
        const y = (currentY - window.innerHeight / 2) * speed;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateMouseFollow);
}

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

const debouncedScroll = debounce(updateActiveNav, 10);
window.addEventListener('scroll', debouncedScroll);

// ============================================
// INITIALIZATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Initialize all features
    initParallax();
    initCounters();
    animateMouseFollow();
    
    // Fade in hero
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 0.8s ease';
            heroSection.style.opacity = '1';
        }, 100);
    }
    
    console.log('%c🦊 Foxbite Learning', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
    console.log('%cUltra-premium glassmorphic platform', 'color: #a0a0a0; font-size: 14px;');
    console.log('%c✓ All systems operational', 'color: #10b981; font-size: 12px; font-weight: bold;');
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
});
