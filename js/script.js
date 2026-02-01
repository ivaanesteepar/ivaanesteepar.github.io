function initParticles() {
  particlesJS("particles-js", {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: "#61dafb" },
      shape: { type: "circle" },
      opacity: { value: 0.6, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 120,
        color: "#61dafb",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: false, mode: "grab" },
        onclick: { enable: false, mode: "push" },
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.5 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
}

// Añade la clase 'active' a los elementos de experiencia que están en vista (animación al hacer scroll)
function initScrollAnimation() {
  const experienceItems = document.querySelectorAll(".experience-item");
  const studyItems = document.querySelectorAll(".study-item");

  function checkPosition() {
    const windowHeight = window.innerHeight;

    experienceItems.forEach((item) => {
      const positionFromTop = item.getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= -100) {
        item.classList.add("active");
      }
    });

    studyItems.forEach((item) => {
      const positionFromTop = item.getBoundingClientRect().top;
      if (positionFromTop - windowHeight <= -100) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", checkPosition);
  checkPosition(); // Activar al cargar la página
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");

  if (!menuToggle || !nav) return;

  // Función para saber si el botón es visible (está en móvil)
  function isMenuToggleVisible() {
    return window.getComputedStyle(menuToggle).display !== "none";
  }

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isMenuToggleVisible()) return; // Si botón no visible, no hacemos nada
    nav.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!isMenuToggleVisible()) return; // Solo cerrar si botón visible
    if (
      nav.classList.contains("open") &&
      !nav.contains(e.target) &&
      e.target !== menuToggle
    ) {
      nav.classList.remove("open");
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!isMenuToggleVisible()) return; // Solo cerrar si botón visible
      nav.classList.remove("open");
    });
  });
}

// ---------------- REVEAL ON SCROLL ----------------
function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.parentElement.classList.contains("projects-list")) {
            const items = entry.target.parentElement.querySelectorAll("li");
            items.forEach((item, index) => {
              setTimeout(() => item.classList.add("active"), index * 200); // 200ms entre cada tarjeta
            });
            observer.unobserve(entry.target);
          } else {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold: 0.2 },
  );

  reveals.forEach((el) => observer.observe(el));
}

function initMainReveal() {
  const sections = document.querySelectorAll("main > *");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

// ---------------- EMAILJS FORM ----------------
function initEmailJS() {
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
      .then(() => {
        alert("Mensaje enviado correctamente");
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Error al enviar el mensaje");
      });
  });
}

// Hace scroll up si se recarga la página
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

// Carga las animaciones cuando se recarga la página
window.addEventListener("load", initScrollAnimation);

// Función principal que se ejecuta al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  // Animación principal del main
  document.querySelector("main").classList.add("fadeInUp");

  // Inicialización de funcionalidades
  initParticles();
  initScrollAnimation();
  initMobileMenu();
  initReveal();
  initMainReveal();
  initEmailJS();
});