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


/* ================= CODING JOURNEY ================= */

const journeySection = document.getElementById("journey");
const journeyItems = document.querySelectorAll(".journey-item");
const journeyProgress = document.querySelector(".journey-line-progress");

if (journeySection && journeyItems.length && journeyProgress) {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ================= REVEAL STORY ================= */

  if (reducedMotion) {
    journeyItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  } else {
    const journeyObserver = new IntersectionObserver(
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
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    journeyItems.forEach((item) => {
      journeyObserver.observe(item);
    });
  }

  /* ================= LINE PROGRESS ================= */

  let progressTicking = false;

  const updateJourneyProgress = () => {
    const rect = journeySection.getBoundingClientRect();

    /*
      Titik acuan berada sedikit di bawah tengah layar.
      Saat titik ini bergerak melewati section,
      garis utama akan ikut terisi.
    */
    const triggerPoint = window.innerHeight * 0.55;

    const totalHeight = rect.height;

    if (totalHeight <= 0) {
      journeyProgress.style.height = "0%";
      return;
    }

    let progress = (triggerPoint - rect.top) / totalHeight;

    progress = Math.max(0, Math.min(progress, 1));

    journeyProgress.style.height = `${progress * 100}%`;

    progressTicking = false;
  };

  const requestJourneyProgressUpdate = () => {
    if (progressTicking) {
      return;
    }

    progressTicking = true;

    window.requestAnimationFrame(updateJourneyProgress);
  };

  window.addEventListener(
    "scroll",
    requestJourneyProgressUpdate,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    requestJourneyProgressUpdate
  );

  updateJourneyProgress();
}