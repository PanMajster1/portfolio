document.addEventListener('DOMContentLoaded', () => {

    // 1. Animacje pojawiania się sekcji (Fade In)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animuj tylko raz
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // 2. Obsługa Lightboxa (Powiększanie zdjęć na pełny ekran)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const clickableImages = document.querySelectorAll('.clickable-image');

    // Otwieranie zdjęcia
    clickableImages.forEach(container => {
        container.addEventListener('click', () => {
            // Pobierz link z atrybutu data-full (lub z obrazka wewnątrz, jako fallback)
            const src = container.getAttribute('data-full');
            if (src) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
                // Blokada scrollowania strony w tle
                document.body.style.overflow = 'hidden'; 
            }
        });
    });

    // Zamykanie zdjęcia (funkcja)
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        // Przywrócenie scrollowania na stronie!
        document.body.style.overflow = ''; 
        
        // Czyszczenie src po zakończeniu animacji (żeby obrazek nie mignął przy kolejnym otwarciu)
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    };

    // Zamykanie po kliknięciu 'X'
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    // Zamykanie po kliknięciu w czarne tło obok zdjęcia
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            // Zamykaj tylko jeśli kliknięto w tło (a nie w samo zdjęcie)
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    // Zamykanie klawiszem ESC (dobra praktyka UX)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
