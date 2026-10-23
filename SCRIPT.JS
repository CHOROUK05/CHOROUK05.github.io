
/* =====================================
   1. SÉLECTION DES ÉLÉMENTS HTML
===================================== */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const backToTop = document.getElementById("back-to-top");
const yearElement = document.getElementById("year");

/* =====================================
   2. MENU DE NAVIGATION MOBILE
===================================== */

// Ouvrir ou fermer le menu au clic
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fermer le menu après avoir choisi une section
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.textContent = "☰";
    });
});

// Fermer le menu avec la touche Échap
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Ouvrir le menu");
        menuToggle.textContent = "☰";
    }
});

/* =====================================
   3. ANNÉE AUTOMATIQUE
===================================== */

yearElement.textContent = new Date().getFullYear();

/* =====================================
   4. BOUTON RETOUR EN HAUT
===================================== */

function updateBackToTop() {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
}

window.addEventListener("scroll", updateBackToTop, {
    passive: true
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* =====================================
   5. ANIMATION DES SECTIONS
===================================== */

// Ajouter la classe reveal aux éléments à animer
const elementsToReveal = document.querySelectorAll(
    ".about-content > div, .skill-card, .project-card, .contact-content"
);

elementsToReveal.forEach((element) => {
    element.classList.add("reveal");
});

// Observer les éléments qui entrent dans l'écran
if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    elementsToReveal.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    // Solution de secours pour les anciens navigateurs
    elementsToReveal.forEach((element) => {
        element.classList.add("visible");
    });
}

/* =====================================
   6. NAVIGATION ACTIVE
===================================== */

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;

                    navigationLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        if (isActive) {
                            link.classList.add("active");
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.classList.remove("active");
                            link.removeAttribute("aria-current");
                        }
                    });
                }
            });
        },
        {
            rootMargin: "-25% 0px -60% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

/* =====================================
   7. MESSAGE DE CONFIRMATION
===================================== */

console.log("Bienvenue sur le portfolio de Chorouk El Jamali !");
