/* Menu mobile + formulaire de contact (sans serveur : ouvre la messagerie). */
const EMAIL_CONTACT = "adresse-retiree";

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");
if (burger && nav) {
  burger.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("ouvert");
    burger.setAttribute("aria-expanded", ouvert ? "true" : "false");
  });
}

const annee = document.getElementById("annee");
if (annee) annee.textContent = new Date().getFullYear();

const form = document.getElementById("form-contact");
if (form) {
  // pré-remplissage depuis une fiche praticien (« Prendre rendez-vous ») ou l'appel aux professionnels
  const params = new URLSearchParams(location.search);
  const objet = params.get("objet");
  if (objet && form.objet.querySelector(`option[value="${objet}"]`)) form.objet.value = objet;
  const praticien = params.get("praticien");
  if (praticien) form.message.value = `Bonjour, je souhaite prendre rendez-vous avec ${praticien}.\n\n`;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const sujet = `[Site] ${form.objet.options[form.objet.selectedIndex].text} — ${form.nom.value || form.email.value}`;
    const corps = `${form.message.value}\n\n—\n${form.nom.value}\n${form.email.value}${form.telephone.value ? "\n" + form.telephone.value : ""}`;
    location.href = `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    document.getElementById("message-envoi").classList.add("visible");
  });
}
