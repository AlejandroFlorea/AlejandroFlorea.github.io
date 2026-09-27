// Actualiza automáticamente el año del pie de página.
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Sustituye temporalmente el texto por caracteres aleatorios.
const encryptButton = document.querySelector("#encrypt-page");
const encryptLabel = encryptButton?.querySelector(".encrypt-label");
const textNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
const randomCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*+-=?";
let isEncrypted = false;
let textNode;

while ((textNode = textWalker.nextNode())) {
    if (textNode.parentElement?.closest("#encrypt-page")) {
        continue;
    }

    if (textNode.textContent.trim()) {
        textNodes.push({ node: textNode, originalText: textNode.textContent });
    }
}

const toggleEncryption = () => {
    isEncrypted = !isEncrypted;

    textNodes.forEach(({ node, originalText }) => {
        node.textContent = isEncrypted
            ? Array.from(originalText, (character) => {
                if (/\s/.test(character)) {
                    return character;
                }

                const randomIndex = Math.floor(Math.random() * randomCharacters.length);
                return randomCharacters[randomIndex];
            }).join("")
            : originalText;
    });

    encryptLabel.textContent = isEncrypted ? "Mostrar contenido" : "Encriptar página";
};

if (encryptButton) {
    encryptButton.addEventListener("click", toggleEncryption);
}

window.addEventListener("keydown", (event) => {
    const activeElement = document.activeElement;
    const isEditing = activeElement instanceof HTMLElement && (
        activeElement.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(activeElement.tagName)
    );

    if (
        event.key.toLowerCase() === "e" &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !isEditing
    ) {
        event.preventDefault();
        toggleEncryption();
    }
});

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