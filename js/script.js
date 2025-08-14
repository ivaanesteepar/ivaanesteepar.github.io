function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#61dafb" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.6, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 120,
                "color": "#61dafb",
                "opacity": 0.3,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": false, "mode": "grab" },
                "onclick": { "enable": false, "mode": "push" }
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// Añade la clase 'active' a los elementos de experiencia que están en vista (animación al hacer scroll)
function initScrollAnimation() {
    const experienceItems = document.querySelectorAll('.experience-item');
    const studyItems = document.querySelectorAll('.study-item');

    function checkPosition() {
        const windowHeight = window.innerHeight;

        experienceItems.forEach(item => {
            const positionFromTop = item.getBoundingClientRect().top;
            if (positionFromTop - windowHeight <= -100) {
                item.classList.add('active');
            }
        });

        studyItems.forEach(item => {
            const positionFromTop = item.getBoundingClientRect().top;
            if (positionFromTop - windowHeight <= -100) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkPosition);
    checkPosition(); // Activar al cargar la página
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('nav');

    if (!menuToggle || !nav) return;

    // Función para saber si el botón es visible (está en móvil)
    function isMenuToggleVisible() {
        return window.getComputedStyle(menuToggle).display !== 'none';
    }

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isMenuToggleVisible()) return; // Si botón no visible, no hacemos nada
        nav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!isMenuToggleVisible()) return; // Solo cerrar si botón visible
        if (nav.classList.contains('open') && !nav.contains(e.target) && e.target !== menuToggle) {
            nav.classList.remove('open');
        }
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!isMenuToggleVisible()) return; // Solo cerrar si botón visible
            nav.classList.remove('open');
        });
    });
}

function initScrollArrow() {
    const arrow = document.getElementById("scroll-arrow");
    if (!arrow) {
        return;
    }

    function checkArrowVisibility() {
        if (window.scrollY > 5) {
            arrow.classList.add("hidden");
        } else {
            arrow.classList.remove("hidden");
        }
    }

    // Revisar al cargar y en scroll
    checkArrowVisibility();
    window.addEventListener("scroll", checkArrowVisibility);
}


// Añade la animación al main cuando se entra a la página
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('main').classList.add('fadeInUp');
});

// Hace scroll up si se recarga la página
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Carga las animaciones cuando se recarga la página
window.addEventListener('load', initScrollAnimation);

// Función principal que se ejecuta al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollAnimation();
    initMobileMenu();
    initScrollArrow();
});















