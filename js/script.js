let currentLanguage = "es";

function translate(key) {
  return UI_TRANSLATIONS[currentLanguage][key] || UI_TRANSLATIONS.es[key] || key;
}

function applyLanguage(language) {
  currentLanguage = UI_TRANSLATIONS[language] ? language : "es";
  document.documentElement.lang = currentLanguage;
  document.title = translate("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = translate(element.dataset.i18nAlt);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });

  document.querySelectorAll(".language-option").forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === currentLanguage),
    );
  });

  const menuToggle = document.getElementById("menu-toggle");
  if (menuToggle) {
    menuToggle.setAttribute(
      "aria-label",
      translate(menuToggle.getAttribute("aria-expanded") === "true" ? "menuClose" : "menuOpen"),
    );
  }
}

function initLanguageSelector() {
  let savedLanguage = "es";
  try {
    savedLanguage = localStorage.getItem("portfolio-language") || "es";
  } catch {
    // The selector still works when browser storage is unavailable.
  }

  applyLanguage(savedLanguage);

  document.querySelectorAll(".language-option").forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.language;
      applyLanguage(language);
      try {
        localStorage.setItem("portfolio-language", currentLanguage);
      } catch {
        // Keep the selected language for the current page even without storage.
      }
    });
  });
}

function initIntro() {
  const intro = document.getElementById("site-intro");
  if (!intro) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    intro.remove();
    document.body.classList.remove("intro-active");
    return;
  }

  function leaveIntro() {
    intro.classList.add("is-leaving");
    document.body.classList.remove("intro-active");
    document.body.classList.add("intro-finished");
    window.setTimeout(() => {
      intro.remove();
    }, 550);
  }

  window.setTimeout(leaveIntro, 2300);
}

function initSkillCarousels() {
  document.querySelectorAll(".scroll-wrapper, .scroll-wrapper2").forEach((wrapper, index) => {
    const list = wrapper.querySelector("ul");
    if (!list || wrapper.querySelector(".marquee-track")) return;

    const clone = list.cloneNode(true);
    clone.classList.add("marquee-group");
    clone.setAttribute("aria-hidden", "true");
    list.classList.add("marquee-group");

    const track = document.createElement("div");
    track.className = `marquee-track ${index === 0 ? "marquee-left" : "marquee-right"}`;
    wrapper.replaceChildren(track);
    track.append(list, clone);
  });
}

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

function initScrollAnimation() {
  const timelineItems = document.querySelectorAll(".experience-item, .study-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );

  timelineItems.forEach((item) => observer.observe(item));
}

function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");
  const menuOverlay = document.getElementById("menu-overlay");

  if (!menuToggle || !nav || !menuOverlay) return;

  function isMenuToggleVisible() {
    return window.getComputedStyle(menuToggle).display !== "none";
  }

  function setMenuOpen(isOpen) {
    nav.classList.toggle("open", isOpen);
    menuOverlay.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", translate(isOpen ? "menuClose" : "menuOpen"));
    document.body.classList.toggle("menu-open", isOpen);
  }

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    if (!isMenuToggleVisible()) return;

    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  menuOverlay.addEventListener("click", () => setMenuOpen(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (!isMenuToggleVisible()) return;

      setMenuOpen(false);
    });
  });

  window.addEventListener("resize", () => {
    if (!isMenuToggleVisible()) setMenuOpen(false);
  });
}

function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);

        if (entry.target.parentElement.classList.contains("projects-list")) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = entry.isIntersecting ? `${index * 0.12}s` : "0s";
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initMainReveal() {
  const sections = document.querySelectorAll("main > *");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
      });
    },
    { threshold: 0.15 },
  );

  sections.forEach((section) => observer.observe(section));
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|hotmail)\.com$/;
    if (!emailRegex.test(email)) {
      formError.textContent = translate("invalidEmail");
      emailInput.focus();
      return;
    }

    if (message.length < 10) {
      formError.textContent = translate("messageTooShort");
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

        formError.textContent = translate("messageSent");
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        formError.classList.remove("form-success");
        formError.classList.add("form-error");

        formError.textContent = translate("messageFailure");
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

  });
}

window.addEventListener("scroll", updateTimeline);
window.addEventListener("resize", updateTimeline);

window.addEventListener("load", () => {
  setTimeout(() => window.scrollTo(0, 0), 10);

  initLanguageSelector();
  initIntro();
  initSkillCarousels();
  initScrollAnimation();
  initReveal();
  initMainReveal();
  initParticles();
  initMobileMenu();
  initEmailJS();
  updateTimeline();
});

