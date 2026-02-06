// ========================================
// BURGER MENU - Obsługa menu mobilnego
// ========================================

const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

/**
 * Toggle burger menu
 * Dodaje/usuwa klasę 'active' która:
 * - Animuje burger w ikonę X
 * - Wysuwa menu z prawej strony
 */
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Blokada scrollowania gdy menu otwarte
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

/**
 * Zamknij menu po kliknięciu w link
 * Zapewnia płynne przejście do sekcji
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

/**
 * Zamknij menu po kliknięciu poza nim
 */
document.addEventListener('click', (e) => {
    if (!burger.contains(e.target) && !navMenu.contains(e.target)) {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ========================================
// STICKY NAVBAR - Navbar z cieniem po scrollu
// ========================================

const navbar = document.getElementById('navbar');

/**
 * Dodaje klasę 'scrolled' do navbaru po przescrollowaniu 50px
 * Klasa ta dodaje dodatkowy cień i zmienia przezroczystość
 */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========================================
// ACTIVE LINK - Podświetlenie aktywnej sekcji
// ========================================

/**
 * Aktualizuje aktywny link w menu na podstawie
 * aktualnie widocznej sekcji
 */
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const sectionId = section.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// SCROLL ANIMATIONS - Intersection Observer API
// ========================================

/**
 * Intersection Observer wykrywa, gdy element wchodzi w viewport
 * i dodaje klasę 'visible', która uruchamia animację CSS
 * 
 * Opcje:
 * - threshold: 0.15 = animacja rozpoczyna się gdy 15% elementu jest widoczne
 * - rootMargin: '0px' = bez dodatkowego marginesu
 */

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px'
};

/**
 * Callback wywoływany gdy element wchodzi/wychodzi z viewportu
 */
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // Jeśli element jest widoczny
        if (entry.isIntersecting) {
            // Dodaj klasę 'visible' która uruchamia animację CSS
            entry.target.classList.add('visible');
            
            // Przestań obserwować ten element (animacja tylko raz)
            observer.unobserve(entry.target);
        }
    });
};

// Stwórz observer
const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

// Znajdź wszystkie elementy do animacji
const animatedElements = document.querySelectorAll('.scroll-animate');

/**
 * Rozpocznij obserwację każdego elementu
 * Gdy element wejdzie w viewport, zostanie dodana klasa 'visible'
 */
animatedElements.forEach(element => {
    scrollObserver.observe(element);
});

// ========================================
// SMOOTH SCROLL - Płynne przewijanie
// ========================================

/**
 * Dodatkowa kontrola nad smooth scroll dla starszych przeglądarek
 * Nowoczesne przeglądarki używają CSS: scroll-behavior: smooth
 */
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CTA BUTTON - Animacja przycisku w Hero
// ========================================

const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        const menuSection = document.querySelector('#menu');
        const navHeight = navbar.offsetHeight;
        const targetPosition = menuSection.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
}

// ========================================
// LAZY LOADING IMAGES - Optymalizacja
// ========================================

/**
 * Lazy loading dla obrazków
 * Obrazy ładują się dopiero gdy wchodzą w viewport
 */
const imageObserverOptions = {
    threshold: 0,
    rootMargin: '50px'
};

const imageObserverCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            
            // Jeśli obraz ma atrybut data-src, zamień go na src
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            
            observer.unobserve(img);
        }
    });
};

const imageObserver = new IntersectionObserver(imageObserverCallback, imageObserverOptions);

// Obserwuj wszystkie obrazy z atrybutem data-src
const lazyImages = document.querySelectorAll('img[data-src]');
lazyImages.forEach(img => imageObserver.observe(img));

// ========================================
// PIZZA CARDS - Dodatkowe efekty hover
// ========================================

const pizzaCards = document.querySelectorAll('.pizza-card');

pizzaCards.forEach(card => {
    /**
     * Efekt parallax przy ruchu myszką
     * Karta lekko rotuje się w kierunku kursora
     */
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    /**
     * Reset transformacji po opuszczeniu karty
     */
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ========================================
// PERFORMANCE - Throttle scroll events
// ========================================

/**
 * Throttle function - ogranicza częstotliwość wywołań funkcji
 * Poprawia performance przy scroll events
 */
function throttle(func, wait) {
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

// Zastosuj throttle do funkcji scroll
const throttledScroll = throttle(() => {
    updateActiveLink();
}, 100);

window.addEventListener('scroll', throttledScroll);

// ========================================
// INICJALIZACJA - Uruchom po załadowaniu
// ========================================

/**
 * Kod uruchamiany po pełnym załadowaniu strony
 */
window.addEventListener('load', () => {
    // Aktualizuj aktywny link przy starcie
    updateActiveLink();
    
    // Dodaj małe opóźnienie dla animacji hero
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.animate-on-load');
        heroElements.forEach(element => {
            element.style.opacity = '1';
        });
    }, 100);
});

// ========================================
// ACCESSIBILITY - Obsługa klawiatury
// ========================================

/**
 * Zamknij menu po naciśnięciu Escape
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

/**
 * Focus trap - utrzymuje focus w menu gdy jest otwarte
 */
const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
const firstFocusable = focusableElements[0];
const lastFocusable = focusableElements[focusableElements.length - 1];

navMenu.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;
    
    if (e.key === 'Tab') {
        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }
});

// ========================================
// CONSOLE INFO
// ========================================

console.log('🍕 Bella Napoli - Strona załadowana pomyślnie!');
console.log('📱 Burger menu: Gotowe');
console.log('🎨 Animacje scroll: Aktywne');
console.log('📍 Sticky navbar: Włączony');
