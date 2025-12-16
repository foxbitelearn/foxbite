// ============================================
// FOXBITE LEARNING - JAVASCRIPT
// Premium Interactivity
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

sidebarLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
});

mobileNavItems.forEach(item => {
    item.addEventListener('click', handleNavClick);
});

// ============================================
// HORIZONTAL SCROLL FOR REVIEWS
// ============================================

const reviewsContainer = document.querySelector('.reviews-horizontal-scroll');
const scrollBtnLeft = document.querySelector('.scroll-btn-left');
const scrollBtnRight = document.querySelector('.scroll-btn-right');

if (reviewsContainer && scrollBtnLeft && scrollBtnRight) {
    // Scroll left
    scrollBtnLeft.addEventListener('click', () => {
        reviewsContainer.scrollBy({
            left: -400,
            behavior: 'smooth'
        });
    });
    
    // Scroll right
    scrollBtnRight.addEventListener('click', () => {
        reviewsContainer.scrollBy({
            left: 400,
            behavior: 'smooth'
        });
    });
    
    // Hide/show buttons based on scroll position
    function updateScrollButtons() {
        const maxScroll = reviewsContainer.scrollWidth - reviewsContainer.clientWidth;
        
        if (reviewsContainer.scrollLeft <= 0) {
            scrollBtnLeft.style.opacity = '0.5';
            scrollBtnLeft.style.pointerEvents = 'none';
        } else {
            scrollBtnLeft.style.opacity = '1';
            scrollBtnLeft.style.pointerEvents = 'auto';
        }
        
        if (reviewsContainer.scrollLeft >= maxScroll - 5) {
            scrollBtnRight.style.opacity = '0.5';
            scrollBtnRight.style.pointerEvents = 'none';
        } else {
            scrollBtnRight.style.opacity = '1';
            scrollBtnRight.style.pointerEvents = 'auto';
        }
    }
    
    reviewsContainer.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('load', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
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
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
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

const debouncedScroll = debounce(updateActiveNav, 10);
window.addEventListener('scroll', debouncedScroll);

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 0.8s ease';
            heroSection.style.opacity = '1';
        }, 100);
    }
});

// ============================================
// CONSOLE BRANDING
// ============================================

console.log('%cFoxbite Learning', 'color: #3b82f6; font-size: 24px; font-weight: bold;');
console.log('%cPremium eligibility-based education platform', 'color: #a8a9b4; font-size: 14px;');
console.log('%c✓ Website loaded successfully', 'color: #10b981; font-size: 12px; font-weight: bold;');

