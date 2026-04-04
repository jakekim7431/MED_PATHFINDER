const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileBreakpoint = window.matchMedia("(max-width: 899px)");

const setHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

const setMenuState = (isOpen) => {
  if (!header || !menuToggle || !mobileNav) {
    return;
  }

  header.classList.toggle("menu-open", isOpen);
  document.body.classList.toggle("nav-open", isOpen && mobileBreakpoint.matches);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const shouldOpen = header ? !header.classList.contains("menu-open") : false;
    setMenuState(shouldOpen);
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    if (!header || !header.classList.contains("menu-open")) {
      return;
    }

    if (header.contains(event.target)) {
      return;
    }

    setMenuState(false);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuState(false);
    }
  });
}

window.addEventListener("resize", () => {
  if (!mobileBreakpoint.matches) {
    setMenuState(false);
  }
});

if (revealItems.length > 0) {
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => observer.observe(item));
  }
}
