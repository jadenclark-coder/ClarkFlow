// =========================================================
// Vector East Tucson — Recruiting Site JS
// =========================================================

// Live Vector East Tucson application form (Apply section iframe + fallback button both use it).
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdhi8OqrHJ6RXj7qfuJc723iPFWulgmRzKPuYKh84tqarIWTw/viewform";

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initMobileMenu();
  initTeamGallery();
  wireApplyFallbackButton();
});

function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

// ---------- Mobile menu ----------
function initMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu after tapping a nav link (mobile)
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

// ---------- Team photo gallery (native scroll-snap, no external library) ----------
function initTeamGallery() {
  const scrollEl = document.getElementById("gallery-scroll");
  const thumbsEl = document.getElementById("gallery-thumbs");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  const currentEl = document.getElementById("gallery-current");
  if (!scrollEl || !thumbsEl) return;

  const photos = Array.from(scrollEl.children);
  const thumbButtons = Array.from(thumbsEl.children);
  if (photos.length === 0) return;

  const goToIndex = (index) => {
    const clamped = Math.max(0, Math.min(index, photos.length - 1));
    scrollEl.scrollTo({ left: photos[clamped].offsetLeft, behavior: "smooth" });
  };

  const setActive = (index) => {
    if (currentEl) currentEl.textContent = String(index + 1);
    thumbButtons.forEach((btn, i) => btn.classList.toggle("is-active", i === index));
  };

  let ticking = false;
  scrollEl.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const index = Math.round(scrollEl.scrollLeft / scrollEl.clientWidth);
      setActive(Math.max(0, Math.min(index, photos.length - 1)));
      ticking = false;
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      const current = Math.round(scrollEl.scrollLeft / scrollEl.clientWidth);
      goToIndex(current - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const current = Math.round(scrollEl.scrollLeft / scrollEl.clientWidth);
      goToIndex(current + 1);
    });
  }

  thumbButtons.forEach((btn, i) => {
    btn.addEventListener("click", () => goToIndex(i));
  });

  setActive(0);
}

// ---------- Apply fallback button ----------
function wireApplyFallbackButton() {
  const btn = document.getElementById("apply-fallback-btn");
  if (!btn) return;
  btn.href = GOOGLE_FORM_URL;
  btn.target = "_blank";
  btn.rel = "noopener";
}
