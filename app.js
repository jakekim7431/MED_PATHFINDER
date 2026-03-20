const THEME_STORAGE_KEY = "medpathfinder-theme";
const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");

const getPreferredTheme = () => {
  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme) => {
  const nextTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = nextTheme;

  if (themeToggle) {
    const nextLabel = nextTheme === "dark" ? "Light mode" : "Dark mode";
    themeToggle.textContent = nextLabel;
    themeToggle.setAttribute("aria-label", `Switch to ${nextLabel.toLowerCase()}`);
    themeToggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
  }
};

applyTheme(getPreferredTheme());

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  });
}

const heroImage = document.getElementById("hero-image");
const heroVisual = document.getElementById("hero-visual");

if (heroImage && heroVisual) {
  const fallbackToPlaceholder = () => heroVisual.classList.remove("has-image");
  const enableRealImage = () => heroVisual.classList.add("has-image");

  if (heroImage.complete && heroImage.naturalWidth > 0) {
    enableRealImage();
  } else {
    heroImage.addEventListener("load", enableRealImage);
    heroImage.addEventListener("error", fallbackToPlaceholder);
  }
}

const modal = document.getElementById("content-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const contentCards = document.querySelectorAll(".content-card");
const closeTargets = document.querySelectorAll("[data-close-modal]");

const closeModal = () => {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const openModal = (title, desc) => {
  if (!modal || !modalTitle || !modalDesc) {
    return;
  }

  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

contentCards.forEach((card) => {
  card.addEventListener("click", () => {
    openModal(card.dataset.title || "Content", card.dataset.desc || "Details will be added soon.");
  });
});

closeTargets.forEach((target) => {
  target.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && modal.classList.contains("is-open")) {
    closeModal();
  }
});

const accordionTriggers = document.querySelectorAll(".accordion-trigger");

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion-item");
    const panel = trigger.nextElementSibling;

    if (!item || !panel) {
      return;
    }

    const isOpen = item.classList.contains("open");
    item.classList.toggle("open", !isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});
