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
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

const openModal = (title, desc) => {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

contentCards.forEach((card) => {
  card.addEventListener("click", () => {
    openModal(card.dataset.title || "콘텐츠", card.dataset.desc || "설명이 준비 중입니다.");
  });
});

closeTargets.forEach((target) => {
  target.addEventListener("click", closeModal);
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

const accordionTriggers = document.querySelectorAll(".accordion-trigger");

accordionTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".accordion-item");
    const panel = trigger.nextElementSibling;
    const isOpen = item.classList.contains("open");

    item.classList.toggle("open", !isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
    panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
  });
});
