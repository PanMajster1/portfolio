// ====== Custom Cursor Logic ======
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Sprawdzamy czy nie jesteśmy na ekranie dotykowym
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Poruszanie kropką bezzwłocznie
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Poruszanie obwódką z lekkim opóźnieniem (animacja CSS)
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
    });

    // Powiększanie kursora po najechaniu na interaktywne elementy
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
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

// ====== Sticky Navbar ======
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ====== Podmiana Roku w Stopce ======
document.getElementById('year').textContent = new Date().getFullYear();


// ====== Intersection Observer (Animacja pojawiania się elementów) ======
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Element pojawi się, gdy w 15% jest widoczny na akranie
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Jeśli nie chcesz, żeby animacja odtwarzała się ponownie przy przewijaniu do góry:
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.hidden-element').forEach((el) => {
    observer.observe(el);
});

// Natychmiastowe pokazanie sekcji Hero (ponieważ jest na samej górze i czasem obsever może mieć opóźnienie)
setTimeout(() => {
    const hero = document.getElementById('hero');
    if(hero) hero.classList.add('show');
}, 100);

// ====== Gładkie Przewijanie dla Linków ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ====== Lightbox dla Zdjęć Projektów ======
const lightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const clickableImages = document.querySelectorAll('.clickable-image');

// Otwieranie lightboxa
clickableImages.forEach(img => {
    img.addEventListener('click', function() {
        const fullImageUrl = this.getAttribute('data-full-image');
        if (fullImageUrl) {
            lightboxImg.src = fullImageUrl;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Blokada scrollowania tła
        }
    });
});

// Zamykanie lightboxa funkcja
const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Przywrócenie scrollowania (puste zamiast auto dla lepszej kompatybilności CSS)
    setTimeout(() => {
        lightboxImg.src = ''; // reset source po animacji
    }, 400); 
};

// Zamykanie 'X' i tło klik
if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        // Zamknij jeśli kliknięcie było centralnie w czarne tło (nie w obrazek)
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });
}
