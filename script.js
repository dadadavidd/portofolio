/* ================= NAVBAR MOBILE ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", isOpen);

    if (isOpen) {
      menuBtn.setAttribute("aria-label", "Tutup menu");
    } else {
      menuBtn.setAttribute("aria-label", "Buka menu");
    }
  });

  // Tutup menu setelah link diklik
  const links = navLinks.querySelectorAll("a");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Buka menu");
    });
  });

  // Tutup menu jika kembali ke ukuran desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      navLinks.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Buka menu");
    }
  });
}


/* ================= GALLERY ================= */

const galleryImg = document.getElementById("galleryImg");
const nextBtn = document.getElementById("nextBtn");
const galleryCounter = document.getElementById("galleryCounter");

const galleryImages = [
  "image/gallery1.png",
  "image/gallery2.jpeg",
  "image/gallery3.webp"
];

const galleryAlt = [
  "Galeri foto 1",
  "Galeri foto 2",
  "Galeri foto 3"
];

let currentImage = 0;

if (galleryImg && nextBtn && galleryCounter) {
  nextBtn.addEventListener("click", () => {
    galleryImg.style.opacity = "0";

    setTimeout(() => {
      currentImage++;

      if (currentImage >= galleryImages.length) {
        currentImage = 0;
      }

      galleryImg.src = galleryImages[currentImage];
      galleryImg.alt = galleryAlt[currentImage];

      galleryCounter.textContent =
        `${currentImage + 1} / ${galleryImages.length}`;

      galleryImg.style.opacity = "1";
    }, 180);
  });
}


/* ================= CONTACT FORM ================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const purpose = document.getElementById("purpose").value.trim();

    const whatsappNumber = "6285143045980";

    const message =
      `Halo David!%0A%0A` +
      `Nama: ${name}%0A` +
      `Nomor Telepon: ${phone}%0A` +
      `Tujuan: ${purpose}`;

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${message}`;

    window.open(whatsappURL, "_blank");

    contactForm.reset();
  });
}