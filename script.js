// Actualiza automáticamente el año del pie de página.
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Marca el enlace de navegación correspondiente a la sección visible.
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const updateActiveLink = () => {
    let currentSection = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }
    });

    navigationLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
};

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();