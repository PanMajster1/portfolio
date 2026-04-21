const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .clickable-image');
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('active');
            cursorOutline.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('active');
            cursorOutline.classList.remove('active');
        });
    });
}

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden-element').forEach((el) => {
    observer.observe(el);
});

setTimeout(() => {
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('show');
}, 100);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const clickableImages = document.querySelectorAll('.clickable-image');

clickableImages.forEach(wrapper => {
    wrapper.addEventListener('click', function() {
        const fullImageUrl = this.getAttribute('data-full-image');
        if (fullImageUrl && lightboxImg) {
            lightboxImg.src = fullImageUrl;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
        if (lightboxImg) lightboxImg.src = '';
    }, 300); 
};

if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target !== lightboxImg) closeLightbox();
    });
}
