# Le Coin Santé — site de la maison de santé

Site statique (HTML, CSS, JavaScript), sans outil de construction : il suffit d'ouvrir `index.html` ou de déposer le dossier chez n'importe quel hébergeur (GitHub Pages, OVH, Netlify…).

## Pages
- `index.html` : accueil (présentation, métiers, lieu, appel aux professionnels, accès et plan).
- `praticiens.html` : les praticiens par métier, avec un onglet par profession. Le lien direct vers un onglet se fait avec `praticiens.html#pharmaciens`, `#medecins`, `#infirmiers`, `#kines`, `#sages-femmes` ou `#orthophonistes`.
- `contact.html` : formulaire. Sans serveur, il ouvre la messagerie du visiteur avec le message prêt à envoyer à adresse-retiree.
- `mentions-legales.html` : mentions légales, à compléter.

## Modifier les praticiens
Tout est dans `js/praticiens.js`, tableau `PRATICIENS`. Pour chaque personne, on peut ajouter :
- `telephone: "05 .. .. .. .."`
- `horaires: "Lundi - Vendredi · 9h00 - 17h00"` (sinon on affiche les jours de présence par semaine)
- `rdv: "https://www.doctolib.fr/..."` (sinon « Prendre rendez-vous » mène à la page Contact)

## À compléter avant la mise en ligne
- [x] Logo définitif (`assets/img/logo.png` ; déclinaisons : `logo-symbole.png` en-tête, `logo-complet-blanc.png` pied de page, `favicon.png`)
- [ ] Nom de domaine.
- [ ] Téléphone, horaires et lien de rendez-vous de chaque praticien (`js/praticiens.js`).
- [ ] Horaires et téléphone des pharmacies (103 et 110 route d'Albi).
- [ ] Photos des praticiens si souhaité (aujourd'hui : initiales).
- [ ] Mentions légales : forme juridique, SIRET, directeur de la publication, hébergeur.
- [ ] Vérifier les textes de présentation (repris et adaptés de la brochure de septembre 2024).

Sources : liste des professionnels au 31/12/2025, brochure « Le Coin Santé » (septembre 2024).
