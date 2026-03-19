// JS PENTRU CAZUL 2

document.addEventListener("DOMContentLoaded", () => {
  const btnOpen = document.getElementById("openModal");
  const btnClose = document.getElementById("closeModal");
  const modal = document.getElementById("modalOverlay");

  // Modal fără management de focus
  if (btnOpen) {
    btnOpen.onclick = () => {
      modal.style.display = "flex";
      // SABOTAJ: Nu mutăm focusul în modal.
      // Utilizatorul de tastatură rămâne "blocat" în spatele modalului.
    };
  }

  if (btnClose) {
    btnClose.onclick = () => {
      modal.style.display = "none";
      // SABOTAJ: Nu returnăm focusul pe butonul care a deschis modalul.
    };
  }

  // Taburi fără suport de tastatură (săgeți)
  const tabs = document.querySelectorAll(".tab-button");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab, index) => {
    tab.onclick = () => {
      panels.forEach((p) => (p.style.display = "none"));
      panels[index].style.display = "block";

      tabs.forEach((t) => t.classList.remove("active-tab"));
      tab.classList.add("active-tab");
      // SABOTAJ: Nu actualizăm aria-selected, deci Screen Reader-ul nu știe ce e activ.
    };
  });

  // SABOTAJ: Am eliminat ascultătorul pentru tasta ESCAPE.
});
function toggleFakeCheckbox(element) {
  // Schimbăm doar aspectul vizual
  element.classList.toggle("is-checked");

  // Aici lipsește orice logică de tip:
  // element.setAttribute("aria-checked", "true");
  // De fapt, elementul nici nu are role="checkbox", deci e degeaba.
}
function toggleFaq(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector(".icon");

  // Toggle între clasa care ascunde vizual și cea care arată
  if (answer.classList.contains("visually-hidden-sabotage")) {
    answer.classList.remove("visually-hidden-sabotage");
    answer.classList.add("is-visible-now");
    if (icon) icon.innerText = "-";
  } else {
    answer.classList.add("visually-hidden-sabotage");
    answer.classList.remove("is-visible-now");
    if (icon) icon.innerText = "+";
  }

  // SABOTAJ: Nu folosim aria-expanded.
  // Screen Reader-ul va citi tot textul de la bun început, fără să anunțe starea butonului.
}
// SABOTAJ: Am eliminat ascultătorul pentru tastele "Enter" sau "Space"
