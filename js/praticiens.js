/* =============================================================
   LES PRATICIENS — données et affichage par profession (onglets)
   Source : liste des professionnels de la structure au 31/12/2025.

   Pour compléter une fiche : telephone, horaires (ex. "Lundi - Vendredi · 9h00 - 17h00")
   et rdv (lien Doctolib, Perfactive…). Un champ vide n'est simplement pas affiché ;
   sans lien de rendez-vous, le bouton mène à la page Contact.
   Autres champs facultatifs : rdvTel: true (rendez-vous uniquement par téléphone : le bouton appelle le numéro),
   mail (adresse affichée sur la fiche), entree (accès à préciser), specialites (liste), note (phrase libre).
   ============================================================= */

const ADRESSES = {
  103: "103 route d’Albi, 31200 Toulouse",
  110: "110 route d’Albi, 31200 Toulouse",
  160: "160 route d’Albi, 31200 Toulouse",
  164: "164 route d’Albi, 31200 Toulouse",
};

const PROFESSIONS = [
  { cle: "medecins", nom: "Médecins généralistes", court: "Médecins", icone: "stetho",
    intro: "Consultations de médecine générale, suivi au long cours, prévention. Nos médecins accueillent aussi des internes en formation." },
  { cle: "infirmiers", nom: "Infirmières diplômées d’État libérales", court: "Infirmières", icone: "seringue",
    intro: "Soins à domicile et au cabinet : pansements, injections, prises de sang, suivi des traitements." },
  { cle: "pharmaciens", nom: "Pharmaciens", court: "Pharmaciens", icone: "pharmacie",
    intro: "Délivrance des médicaments, conseils, vaccinations et accompagnement des traitements, en lien avec les médecins de la maison de santé." },
  { cle: "kines", nom: "Masseurs-kinésithérapeutes", court: "Kinés", icone: "kine",
    intro: "Rééducation, kinésithérapie respiratoire, prise en charge des douleurs et des suites de blessures." },
  { cle: "sages-femmes", nom: "Sage-femme", court: "Sage-femme", icone: "bebe",
    intro: "Suivi de grossesse, préparation à la naissance, suivi gynécologique de prévention et rééducation périnéale." },
  { cle: "orthophonistes", nom: "Orthophoniste", court: "Orthophoniste", icone: "parole",
    intro: "Bilans et rééducation du langage, de la parole, de la voix et de la déglutition, chez l’enfant comme chez l’adulte." },
  { cle: "psychologues", nom: "Psychologue et neuropsychologue", court: "Psychologue", icone: "esprit",
    intro: "Consultations de psychologie et de neuropsychologie, accompagnement des profils neuroatypiques." },
];

const PRATICIENS = [
  // Médecins généralistes (maîtres de stage)
  { profession: "medecins", nom: "DAMASE", prenom: "Luc", adresse: 103, jours: 4, stage: true },
  { profession: "medecins", nom: "FAJADET", prenom: "Guillaume", adresse: 103, jours: 4, stage: true },
  { profession: "medecins", nom: "JAMBU", prenom: "Christelle", adresse: 103, jours: 4, stage: true,
    telephone: "05 61 49 29 29", telNote: "secrétariat", rdv: "https://www.maiia.com/medecin-generaliste/31200-toulouse/jambu-christelle", nouveauxPatients: false },
  { profession: "medecins", nom: "LATIL", prenom: "Marie", adresse: 103, jours: 3, stage: true },
  { profession: "medecins", nom: "PLARD", prenom: "Carine", adresse: 160, jours: 4, stage: true },
  { profession: "medecins", nom: "VERGE-BRIAN", prenom: "Philippe", adresse: 103, jours: 4, stage: true,
    telephone: "05 61 49 29 29", telNote: "secrétariat", rdv: "https://www.maiia.com/medecin-generaliste/31200-toulouse/verge-brian-philippe", nouveauxPatients: false },
  // Infirmières (les collaboratrices passent au second plan)
  { profession: "infirmiers", nom: "BOIVERT", prenom: "Agathe", adresse: 103, jours: 1.5, badge: "Infirmière Asalée",
    titre: "Cabinet infirmier Agathe Boivert", telephone: "06 28 40 68 53", rdvTel: true },
  { profession: "infirmiers", nom: "SIRAT VERDIÉ", prenom: "Marielle", adresse: 103, horaires: "7 jours de présence par semaine",
    telephone: "06 37 89 03 10", rdvTel: true, mail: "idel.toulouse31@gmail.com" },
  { profession: "infirmiers", nom: "CHARIFOU", prenom: "Virginie", adresse: 103, horaires: "7 jours de présence par semaine",
    telephone: "06 37 89 03 10", rdvTel: true, mail: "idel.toulouse31@gmail.com" },
  { profession: "infirmiers", nom: "BOLDODUCK", prenom: "Malala", adresse: 103, horaires: "7 jours de présence par semaine",
    telephone: "06 37 89 03 10", rdvTel: true, mail: "idel.toulouse31@gmail.com" },
  { profession: "infirmiers", nom: "GBEDO", prenom: "Mélissa", adresse: 103, jours: 5 },
  { profession: "infirmiers", nom: "SIMON LOPES", prenom: "Lucie", adresse: 103, jours: 1.5 },
  // Pharmaciens
  { profession: "pharmaciens", nom: "PEYROTAU", prenom: "Elisabeth", titre: "Pharmacienne", adresse: 103, jours: 5.5 },
  { profession: "pharmaciens", enseigne: "Pharmacie des 4 Chemins", titre: "Pharmacie", adresse: 110,
    telephone: "05 61 48 62 26", horaires: "Du lundi au samedi · 9h - 12h30 et 14h15 - 19h30" },
  { profession: "pharmaciens", enseigne: "Pharmacie des Landes", titre: "Pharmacie", adresse: 164,
    telephone: "05 34 25 84 30", horaires: "Lundi · 14h15 - 19h30 ; du mardi au samedi · 9h - 12h30 et 14h15 - 19h30" },
  // Kinésithérapeutes
  { profession: "kines", nom: "DELGAL", prenom: "Patrick", adresse: 160, jours: 4, telephone: "05 61 26 09 87", rdvTel: true },
  { profession: "kines", nom: "DI BIAGIO", prenom: "Gabriele", adresse: 160, jours: 5, telephone: "05 61 26 09 87", rdvTel: true },
  { profession: "kines", nom: "LELONG", prenom: "Denis", adresse: 160, jours: 4, telephone: "05 61 26 09 87", rdvTel: true },
  // Sage-femme
  { profession: "sages-femmes", nom: "COUVEZ", prenom: "Agathe", adresse: 103, jours: 4,
    telephone: "07 66 95 16 16", rdv: "https://www.doctolib.fr/sage-femme/toulouse/agathe-couvez",
    entree: "Entrée par le 6 rue Yves Prépognot",
    specialites: [
      "Préparation à la naissance et à la parentalité",
      "Suivi gynécologique de prévention et contraception",
      "Visites à domicile dans le cadre du post-partum",
    ] },
  // Orthophoniste
  { profession: "orthophonistes", nom: "SERVAT", prenom: "Clara", adresse: 164, jours: 4, horaires: "4 jours de présence par semaine, du lundi au jeudi",
    telephone: "07 83 95 73 34", rdv: "https://perfactive.fr/orthophoniste/toulouse/clara-servat",
    entree: "Entrée du cabinet : 6 rue Yves Prépognot",
    specialites: [
      "Troubles oro-myo-fonctionnels (ventilation buccale, posture linguale…)",
      "Langage écrit",
      "Neurologie (AVC, maladies neurodégénératives)",
      "Bégaiement",
      "Voix",
      "Oralité",
    ],
    note: "Clara exerce avec sa petite chienne Tahia, un bichon frisé qui ne saute pas et n’aboie pas." },
  // Psychologue
  { profession: "psychologues", nom: "GIACOBONE", prenom: "Camille", titre: "Psychologue et neuropsychologue", adresse: 164,
    telephone: "07 56 83 99 51", rdv: "https://www.doctolib.fr/psychologue/toulouse/camille-giacobone",
    entree: "Entrée du cabinet : 6 rue Yves Prépognot",
    specialites: ["Accompagnement des profils neuroatypiques"] },
].map((p) => ({ telephone: "", horaires: "", rdv: "", ...p }));

/* ===== Icônes (traits, couleur héritée) ===== */
const ICONES = {
  stetho: '<path d="M6 3v6a5 5 0 0 0 10 0V3"/><path d="M11 14v2a5 5 0 0 0 10 0v-3"/><circle cx="21" cy="11" r="2"/>',
  seringue: '<path d="m18 2 4 4"/><path d="m17 7 3-3"/><path d="M19 9 8.7 19.3a2.4 2.4 0 0 1-3.4 0l-.6-.6a2.4 2.4 0 0 1 0-3.4L15 5"/><path d="m9 11 4 4"/><path d="m5 19-3 3"/>',
  pharmacie: '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M12 7v10M7 12h10"/>',
  kine: '<circle cx="12" cy="4.5" r="2"/><path d="M12 7v6l-3 7M12 13l3 7M7 10h10"/>',
  bebe: '<circle cx="12" cy="8" r="4"/><path d="M6 21a6 6 0 0 1 12 0"/><path d="M10.5 8h.01M13.5 8h.01"/>',
  parole: '<path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.5A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  esprit: '<path d="M12 3a6 6 0 0 0-6 6c0 2 .9 3.2 2 4.3V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-3.7c1.1-1.1 2-2.3 2-4.3a6 6 0 0 0-6-6z"/><path d="M10 22h4M12 7v5"/>',
  lieu: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  tel: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  porte: '<path d="M5 21V4a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v17"/><path d="M3 21h18"/><path d="M12.5 12h.01"/>',
  patte: '<circle cx="7" cy="9" r="1.7"/><circle cx="11" cy="6" r="1.7"/><circle cx="15" cy="6" r="1.7"/><circle cx="19" cy="9" r="1.7"/><path d="M8 17c0-3 2-5 5.5-5S19 14 19 17c0 2-2 3-4 2-1.5-.7-2.5-.7-4 0-2 1-3 0-3-2z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m3 8 9 6 9-6"/>',
  horloge: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  calendrier: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/>',
};
const icone = (n, taille = 18) =>
  `<svg class="ico" width="${taille}" height="${taille}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES[n] || ""}</svg>`;

const ech = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const presence = (j) => `${String(j).replace(".", ",")} jour${j > 1 ? "s" : ""} de présence par semaine`;

/** Rendez-vous : lien de prise de rendez-vous, appel direct (rdvTel) ou page Contact. */
function boutonRdv(p, lienRdv) {
  if (p.profession === "pharmaciens") return ""; // pas de rendez-vous en pharmacie
  if (p.rdvTel && p.telephone) {
    return `<a class="btn btn-contour" href="tel:${ech(p.telephone.replace(/\s/g, ""))}">${icone("tel", 16)} Prendre rendez-vous au ${ech(p.telephone)}</a>`;
  }
  return `<a class="btn btn-contour" href="${ech(lienRdv)}"${p.rdv ? ' target="_blank" rel="noopener"' : ""}>${icone("calendrier", 16)} Prendre rendez-vous</a>`;
}

function carte(p, prof) {
  const initiales = p.enseigne ? "Ph" : (p.prenom[0] + p.nom[0]).toUpperCase();
  const lienRdv = p.rdv || "contact.html";
  const badges = [
    p.stage ? '<span class="badge">Maître de stage</span>' : "",
    p.badge ? `<span class="badge">${ech(p.badge)}</span>` : "",
    p.nouveauxPatients === false ? '<span class="badge badge-alerte">Plus de nouveaux patients</span>' : "",
  ].join("");
  return `
    <article class="praticien" data-profession="${prof.cle}">
      <div class="praticien-tete">
        <div class="avatar" aria-hidden="true">${initiales}</div>
        <div>
          <h3 class="praticien-nom">${p.enseigne ? ech(p.enseigne) : `<span class="nom">${ech(p.nom)}</span> ${ech(p.prenom)}`}</h3>
          <p class="praticien-metier">${ech(p.titre || prof.court.replace(/s$/, ""))}</p>
        </div>
      </div>
      ${badges ? `<div class="badges">${badges}</div>` : ""}
      <ul class="praticien-infos">
        <li>${icone("lieu")}<span>${ech(ADRESSES[p.adresse])}</span></li>
        ${p.entree ? `<li>${icone("porte")}<span>${ech(p.entree)}</span></li>` : ""}
        ${p.telephone ? `<li>${icone("tel")}<span><a class="tel-num" href="tel:${ech(p.telephone.replace(/\s/g, ""))}">${ech(p.telephone)}</a>${p.telNote ? ` (${ech(p.telNote)})` : ""}</span></li>` : ""}
        ${p.mail ? `<li>${icone("mail")}<a href="mailto:${ech(p.mail)}">${ech(p.mail)}</a></li>` : ""}
        ${p.horaires || p.jours ? `<li>${icone("horloge")}<span>${ech(p.horaires || presence(p.jours))}</span></li>` : ""}
      </ul>
      ${p.specialites ? `<div class="praticien-specialites"><p class="praticien-sous-titre">Prend en charge</p><ul>${p.specialites.map((x) => `<li>${ech(x)}</li>`).join("")}</ul></div>` : ""}
      ${p.note ? `<p class="praticien-note">${icone("patte", 16)}<span>${ech(p.note)}</span></p>` : ""}
      ${boutonRdv(p, lienRdv)}
    </article>`;
}

function afficherPraticiens(cle) {
  const prof = PROFESSIONS.find((x) => x.cle === cle) || PROFESSIONS[0];
  document.querySelectorAll(".onglet").forEach((b) => {
    const actif = b.dataset.cle === prof.cle;
    b.classList.toggle("actif", actif);
    b.setAttribute("aria-selected", actif ? "true" : "false");
  });
  const liste = PRATICIENS.filter((p) => p.profession === prof.cle);
  document.getElementById("panneau").innerHTML = `
    <div class="panneau-tete">
      <span class="panneau-icone">${icone(prof.icone, 26)}</span>
      <div>
        <h2>${ech(prof.nom)}</h2>
        <p>${ech(prof.intro)}</p>
      </div>
    </div>
    <div class="grille-praticiens">${liste.map((p) => carte(p, prof)).join("")}</div>`;
  if (location.hash !== "#" + prof.cle) history.replaceState(null, "", "#" + prof.cle);
}

function initPraticiens() {
  const barre = document.getElementById("onglets");
  barre.innerHTML = PROFESSIONS.map((p) => {
    const n = PRATICIENS.filter((x) => x.profession === p.cle).length;
    return `<button class="onglet" role="tab" data-cle="${p.cle}" aria-controls="panneau">${icone(p.icone)}<span>${ech(p.court)}</span><span class="compte">${n}</span></button>`;
  }).join("");
  barre.addEventListener("click", (e) => {
    const b = e.target.closest(".onglet");
    if (b) afficherPraticiens(b.dataset.cle);
  });
  afficherPraticiens(location.hash.slice(1));
  window.addEventListener("hashchange", () => afficherPraticiens(location.hash.slice(1)));
}

if (document.getElementById("onglets")) initPraticiens();
