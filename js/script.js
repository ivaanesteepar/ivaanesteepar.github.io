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

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");

  if (!menuToggle || !nav) return;

  function isMenuToggleVisible() {
    return window.getComputedStyle(menuToggle).display !== "none";
  }

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!isMenuToggleVisible()) return;

    nav.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!isMenuToggleVisible()) return;

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
      if (!isMenuToggleVisible()) return;

      nav.classList.remove("open");
    });
  });
}

function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active");
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initEmailJS() {
  emailjs.init(EMAILJS_PUBLIC_KEY);

  const form = document.getElementById("contact-form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const formError = document.getElementById("form-error");

    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    formError.textContent = "";
    formError.classList.remove("form-success");
    formError.classList.add("form-error");

    if (message.length < 10) {
      formError.textContent =
        "El mensaje debe tener al menos 10 caracteres.";
      messageInput.focus();
      return;
    }

    submitButton.disabled = true;

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        form.reset();

        formError.classList.remove("form-error");
        formError.classList.add("form-success");

        formError.textContent = "Mensaje enviado correctamente.";
      })
      .catch((error) => {
        console.error("EmailJS error:", error);

        formError.classList.remove("form-success");
        formError.classList.add("form-error");

        formError.textContent =
          "No se ha podido enviar el mensaje. Inténtalo de nuevo.";
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
}

function updateTimeline() {
  const timelines = document.querySelectorAll(
    ".studies-list, .experience-list"
  );

  timelines.forEach((timeline) => {
    const items = timeline.querySelectorAll(
      ".study-item, .experience-item"
    );

    if (!items.length) return;

    const timelineRect = timeline.getBoundingClientRect();
    const triggerPoint = window.innerHeight * 0.75;

    const progress = triggerPoint - timelineRect.top;

    const maxHeight = timeline.offsetHeight;

    const lineHeight = Math.max(
      0,
      Math.min(progress, maxHeight)
    );

    timeline.style.setProperty(
      "--timeline-height",
      `${lineHeight}px`
    );

    items.forEach((item, index) => {
      const isFirstStudy =
        index === 0 && item.classList.contains("study-item");

      if (isFirstStudy) {
        item.classList.add("active");
        return;
      }

      const itemRect = item.getBoundingClientRect();

      if (itemRect.top < triggerPoint) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

  });
}

function initCarousels() {
  const languagesCarousel = new Splide(".languages-carousel", {
    type: "loop",
    drag: "free",
    arrows: false,
    pagination: false,
    perPage: 6,
    gap: "15px",
    autoWidth: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    autoScroll: {
      speed: 0.5,
      pauseOnHover: true,
      pauseOnFocus: true,
    },
  });

  const technologiesCarousel = new Splide(".technologies-carousel", {
    type: "loop",
    drag: "free",
    arrows: false,
    pagination: false,
    perPage: 6,
    gap: "15px",
    autoWidth: true,
    pauseOnHover: true,
    pauseOnFocus: true,
    autoScroll: {
      speed: -0.5,
      pauseOnHover: true,
      pauseOnFocus: true,
    },
  });

  languagesCarousel.mount(window.splide.Extensions);
  technologiesCarousel.mount(window.splide.Extensions);
}

window.addEventListener("scroll", updateTimeline);
window.addEventListener("resize", updateTimeline);

window.addEventListener("load", () => {
  setTimeout(() => window.scrollTo(0, 0), 10);

  initReveal();
  initParticles();
  initMobileMenu();
  initEmailJS();
  initCarousels();
  updateTimeline();
});

