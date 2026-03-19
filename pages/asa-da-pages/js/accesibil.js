const btnOpen = document.getElementById("openModal");
const btnClose = document.getElementById("closeModal");
const modal = document.getElementById("modalOverlay");

// Funcția de deschidere
if (btnOpen) {
  btnOpen.onclick = function () {
    modal.style.display = "flex";
    btnClose.focus();
    document.body.style.overflow = "hidden";
  };
}

// Funcția de închidere
function handleClose() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    if (btnOpen) btnOpen.focus();
  }
}

if (btnClose) {
  btnClose.onclick = handleClose;
}

// Închidere dacă user-ul dă click pe fundalul negru, nu pe caseta albă
if (modal) {
  window.onclick = function (event) {
    if (event.target == modal) {
      handleClose();
    }
  };
}

// Închidere la tasta ESC
document.addEventListener("keydown", function (e) {
  if (modal && e.key === "Escape" && modal.style.display === "flex") {
    handleClose();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  // Gestionare Taburi
  const tabButtons = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Deactivează toate taburile și panelurile
      tabButtons.forEach((btn) => btn.setAttribute("aria-selected", "false"));
      tabPanels.forEach((panel) => panel.setAttribute("aria-hidden", "true"));

      // Activează tab-ul și panelul clicat
      button.setAttribute("aria-selected", "true");
      const panelId = button.getAttribute("aria-controls");
      document.getElementById(panelId).setAttribute("aria-hidden", "false");

      // Focus pe tab-ul activ
      button.focus();
    });

    // Navigare cu Arrow Keys
    button.addEventListener("keydown", (e) => {
      let targetButton;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        targetButton =
          button.nextElementSibling || button.parentElement.firstElementChild;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        targetButton =
          button.previousElementSibling ||
          button.parentElement.lastElementChild;
      }

      if (targetButton && targetButton.getAttribute("role") === "tab") {
        targetButton.click();
      }
    });
  });

  const dropbtn = document.querySelector(".dropbtn");
  const dropdown = document.querySelector(".dropdown");

  // Funcție pentru a actualiza starea accesibilității (aria-expanded)
  const toggleMenu = (isOpen) => {
    dropbtn.setAttribute("aria-expanded", isOpen);
  };

  // 1. Gestionare pentru Mouse (Hover)
  dropdown.addEventListener("mouseenter", () => toggleMenu(true));
  dropdown.addEventListener("mouseleave", () => toggleMenu(false));

  // 2. Gestionare pentru Tastatură (Focus)
  // Verificăm dacă focusul a intrat sau a ieșit din zona dropdown-ului
  dropdown.addEventListener("focusin", () => {
    toggleMenu(true);
  });

  dropdown.addEventListener("focusout", (event) => {
    // Verificăm dacă noul element focalizat este tot în interiorul dropdown-ului
    if (!dropdown.contains(event.relatedTarget)) {
      toggleMenu(false);
    }
  });

  // 3. Închidere la tasta Escape (Foarte important pentru accesibilitate!)
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      dropbtn.getAttribute("aria-expanded") === "true"
    ) {
      toggleMenu(false);
      dropbtn.focus(); // Readucem focusul pe butonul principal
    }
  });

  // GESTIONARE FAQ
  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const faqAnswer = button.nextElementSibling;
      const isOpen = button.getAttribute("aria-expanded") === "true";

      // Închide toate celelalte întrebări
      document.querySelectorAll(".faq-question").forEach((otherBtn) => {
        otherBtn.setAttribute("aria-expanded", "false");
        otherBtn.classList.remove("is-active");
        if (otherBtn.nextElementSibling) {
          otherBtn.nextElementSibling.classList.remove("is-open");
          otherBtn.nextElementSibling.setAttribute("aria-hidden", "true");
        }
      });

      // Deschide/Închide întrebarea curentă
      if (!isOpen) {
        button.setAttribute("aria-expanded", "true");
        button.classList.add("is-active");
        faqAnswer.classList.add("is-open");
        faqAnswer.setAttribute("aria-hidden", "false");
      }
    });
  });

  // GESTIONARE SALVARE SETĂRI (Modal)
  const saveBtn = document.querySelector(".modal-content .btn-submit");
  if (saveBtn) {
    saveBtn.onclick = function () {
      const isNewsChecked = document.getElementById("news").checked;
      handleClose();
      alert("Preferințele tale au fost salvate!");
    };
  }
});
