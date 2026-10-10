const menuButton = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
function closeMenu() {
  if (!menuButton || !navLinks) return;
  navLinks.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Buka menu");
}
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  });
  navLinks
    .querySelectorAll("a")
    .forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) closeMenu();
  });
}
const galleryImage = document.getElementById("galleryImg");
const galleryCounter = document.getElementById("galleryCounter");
const previousButton = document.getElementById("previousBtn");
const nextButton = document.getElementById("nextBtn");
const galleryImages = [
  { src: "image/gallery1.png", alt: "Galeri foto 1" },
  { src: "image/gallery2.jpeg", alt: "Galeri foto 2" },
  { src: "image/gallery3.webp", alt: "Galeri foto 3" },
];
let currentImage = 0;
function showImage(nextIndex) {
  if (!galleryImage || !galleryCounter) return;
  currentImage = (nextIndex + galleryImages.length) % galleryImages.length;
  const image = galleryImages[currentImage];
  galleryImage.style.opacity = "0";
  window.setTimeout(() => {
    galleryImage.src = image.src;
    galleryImage.alt = image.alt;
    galleryCounter.textContent = `Foto ${currentImage + 1} dari ${galleryImages.length}`;
    galleryImage.style.opacity = "1";
  }, 160);
}
previousButton?.addEventListener("click", () => showImage(currentImage - 1));
nextButton?.addEventListener("click", () => showImage(currentImage + 1));
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Lengkapi semua kolom sebelum menyiapkan pesan.";
    formStatus.classList.add("is-error");
    contactForm.reportValidity();
    return;
  }
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const purpose = document.getElementById("purpose").value.trim();
  const message = `Halo David!\n\nNama: ${name}\nNomor telepon: ${phone}\nPesan: ${purpose}`;
  const messageWindow = window.open(
    `https://wa.me/6285143045980?text=${encodeURIComponent(message)}`,
    "_blank",
  );
  formStatus.classList.remove("is-error");
  if (messageWindow) {
    messageWindow.opener = null;
    formStatus.textContent =
      "WhatsApp dibuka di tab baru. Pesan Anda siap untuk dikirim.";
    contactForm.reset();
  } else {
    formStatus.textContent =
      "Browser memblokir pembukaan WhatsApp. Izinkan pop-up, lalu coba lagi.";
    formStatus.classList.add("is-error");
  }
});
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const revealItems = document.querySelectorAll(".reveal");
if (reducedMotion) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -5% 0px" },
  );
  revealItems.forEach((item) => observer.observe(item));
}
