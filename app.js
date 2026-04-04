const header = document.querySelector(".site-header");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileBreakpoint = window.matchMedia("(max-width: 899px)");

const setHeaderScrolled = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
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

setHeaderScrolled();

window.addEventListener("scroll", setHeaderScrolled, { passive: true });

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header ? !header.classList.contains("menu-open") : false;
    setMenuState(isOpen);
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

document.querySelectorAll("[data-scroll-control]").forEach((button) => {
  const targetId = button.getAttribute("data-target");
  const direction = button.getAttribute("data-scroll-control");
  const scrollArea = targetId ? document.getElementById(targetId) : null;

  if (!scrollArea) {
    return;
  }

  button.addEventListener("click", () => {
    const firstCard = scrollArea.querySelector(".resource-card");
    const gap = 16;
    const distance = firstCard ? firstCard.getBoundingClientRect().width + gap : scrollArea.clientWidth * 0.85;
    const left = direction === "prev" ? -distance : distance;

    scrollArea.scrollBy({
      left,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  });
});

if (revealItems.length > 0) {
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}
