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


// Inicializa el control del audio (play/pause) con el botón de altavoz
function initMusicToggle() {
    const musicToggle = document.getElementById("music-toggle");
    const backgroundMusic = document.getElementById("background-music");
    let isPlaying = false;

    musicToggle.addEventListener("click", () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = "🔊";
        } else {
            backgroundMusic.play();
            musicToggle.textContent = "🔇";
        }
        isPlaying = !isPlaying;
    });
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
    initMusicToggle();
    initMobileMenu();
});

const langContainer = document.querySelector('.container-languages ul');
const techContainer = document.querySelector('.container-technologies ul');

// 1. Duplicar contenido para efecto infinito sin huecos


let langPos = 0;
let techPos = 0;
const speed = 0.5; // Ajusta la velocidad del desplazamiento

function animate() {
  // Ancho total del contenido original (sin duplicar)
  const langWidth = langContainer.scrollWidth / 2;
  const techWidth = techContainer.scrollWidth / 2;

  // Mover languages a la izquierda con límite
  langPos -= speed;
  if (langPos <= -langWidth) {
    langPos += langWidth; // Ajusta la posición para que el contenido duplicado se alinee
  }
  langContainer.style.transform = `translateX(${langPos}px)`;

  // Mover technologies a la derecha con límite
  techPos += speed;
  if (techPos >= techWidth) {
    techPos -= techWidth; // Ajusta la posición para que el contenido duplicado se alinee
  }
  techContainer.style.transform = `translateX(${techPos}px)`;

  requestAnimationFrame(animate);
}

animate();





