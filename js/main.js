/* Menu mobile. */

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
