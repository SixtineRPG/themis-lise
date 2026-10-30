const TALENTS_URL = "https://sixtinerpg.github.io/themis-lise/talents/talents.json";
//const MEMBERLIST_URL = "../../shared/memberlist_json.php";
const MEMBERLIST_URL = "https://sixtinerpg.github.io/themis-lise/talents/memberlist_local.json";
const OBJETS_URL = "https://sixtinerpg.github.io/themis-lise/talents/objets.json";


// ==========================================================
// CONFIGURATION
// ==========================================================

const TARGET_TALENTS = {
  // AUTOMATIQUE
  Prévoyant: {
    type: "automatique",
    delai: "quinzaine",
    effet: "Récupérer 4 Poké Balls.",
  },
  "Fana de l’évolution": {
    type: "aléatoire",
    delai: "quinzaine",
    effet: "Récupérer 1 objet évolutif aléatoire.",
  },
  "Expert en Omelette": {
    type: "aléatoire",
    delai: "quinzaine",
    effet: "Récupérer 1 œuf à tirer avec la roulette.",
  },
  "Docteur du Jurassique": {
    type: "aléatoire",
    delai: "quinzaine",
    effet: "Récupérer 1 fossile aléatoire.",
  },
  "Chasseur de primes": {
    type: "demande",
    delai: "quinzaine",
    effet: "Permet d’accepter une mission de capture d’espèces spécifiques contre 20, 30 ou 40 PO.",
  },

  // QUINZAINE
  Chef: {
    type: "demande",
    delai: "quinzaine",
    effet: "Cuisiner un plat aléatoire.",
  },
  Pensionnaire: {
    type: "demande",
    delai: "quinzaine",
    effet: "Demander une reproduction entre deux Pokémon de joueurs.",
  },
  "Passeur de savoir": {
    type: "demande",
    delai: "quinzaine",
    effet: "Prêt temporaire d’un talent de rang D ou C à un autre joueur.",
  },
  Mentor: {
    type: "demande",
    delai: "quinzaine",
    effet: "Offrir une montée de rang D → C à un autre joueur.",
  },
  "Graveur de CD": {
    type: "demande",
    delai: "quinzaine",
    effet: "Fabrication d’une CT à usage unique.",
  },
  "Donneur de capacités": {
    type: "demande",
    delai: "quinzaine",
    effet: "Enseignement d’une attaque de reproduction / donneur de capacités.",
  },
  "Professeur Pokémon": {
    type: "demande",
    delai: "quinzaine",
    effet: "Proposition d’une mission de recherche à d’autres joueurs.",
  },
  "CT Douteuse": {
    type: "demande",
    delai: "quinzaine",
    effet: "Enseignement d’une attaque normalement inaccessible à un Pokémon (validation du staff).",
  },
  Transmission: {
    type: "demande",
    delai: "quinzaine",
    effet: "Offre à un autre joueur du bénéfice d’un talent à utilisation unique de rang A ou inférieur.",
  },
  "Aimant à raretés": {
    type: "demande",
    delai: "quinzaine",
    effet: "Demande d’une apparition tirée uniquement parmi les Pokémon Peu Communs et Rares.",
  },

  // MENSUEL
  Cristalliseur: {
    type: "demande",
    delai: "mensuel",
    effet: "Fabrication d’un Cristal Z.",
  },
  Joaillier: {
    type: "demande",
    delai: "mensuel",
    effet: "	Fabrication d’une Méga-Gemme.",
  },
  "Pousseur de fonte": {
    type: "demande",
    delai: "mensuel",
    effet: "	Fabrication d’un objet Dynamax ou Gigamax.",
  },
  Princesse: {
    type: "demande",
    delai: "mensuel",
    effet: "Fabrication d’un Orbe Téracristal.",
  },
};

// ==========================================================
// ÉLÉMENTS HTML
// ==========================================================

const talentsList = document.querySelector("#talents-list");
const talentsJoueurs = document.querySelector("#talents-joueurs");

let objetsData = {};

// ==========================================================
// CHARGEMENT DES DONNÉES
// ==========================================================

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status} : ${url}`);
  }

  return response.json();
}

// ==========================================================
// UTILITAIRES
// ==========================================================

function normalizeName(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .trim()
    .toLowerCase();
}

function escapeHtml(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character],
  );
}

// = Index des talents cibles.
const TARGET_TALENTS_BY_NAME = new Map(Object.entries(TARGET_TALENTS).map(([name, config]) => [normalizeName(name), config]));

function getTargetTalents(talents) {
  return talents.filter((talent) => TARGET_TALENTS_BY_NAME.has(normalizeName(talent.nom)));
}

// = Catégories d'objets associées aux talents.
const TALENTS_OBJETS = {
  [normalizeName("Fana de l’évolution")]: "objets_evolutifs",
  [normalizeName("Docteur du Jurassique")]: "fossiles",
};

// = Sélection aléatoire d'un objet.
function getRandomObject(category, objets) {
  const items = objets[category];

  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return items[Math.floor(Math.random() * items.length)];
}

// ==========================================================
// TALENTS CONCERNÉS
// Source : talents.json
// ==========================================================

function renderTalents(talents) {
  const selectedTalents = getTargetTalents(talents);

  const sections = [
    { delai: "quinzaine", title: "Quinzaine" },
    { delai: "mensuel", title: "Mensuel" },
  ];

  talentsList.innerHTML = sections
    .map(({ delai, title }) => {
      const items = selectedTalents
        .filter((talent) => {
          const config = TARGET_TALENTS_BY_NAME.get(normalizeName(talent.nom));

          return config?.delai === delai;
        })
        .map((talent) => {
          const config = TARGET_TALENTS_BY_NAME.get(normalizeName(talent.nom));

          return `
            <li class="talents__item">
              ${
                talent.icon
                  ? `<img
                      class="talents__icon"
                      src="${escapeHtml(talent.icon)}"
                      alt=""
                    >`
                  : ""
              }

              <h3 class="talents__name">
                ${escapeHtml(talent.nom)}
              </h3>

              <div
                class="talents__type"
                data-type="${escapeHtml(config?.type || "")}"
              ></div>

              <p class="talents__effet">
                ${escapeHtml(config?.effet || "")}
              </p>
            </li>
          `;
        })
        .join("");

      if (!items) return "";

      return `
        <li class="talents__section">
          <h2 class="talents__section-title">
            ${title}
          </h2>

          <ul class="talents__items">
            ${items}
          </ul>
        </li>
      `;
    })
    .join("");
}

// ==========================================================
// RÉPARTITION DES TALENTS PAR JOUEUR
// Sources : memberlist_json.php + talents.json
// ==========================================================

function renderTalentsJoueurs(members, talents) {
  const selectedTalents = getTargetTalents(talents);

  const talentsByName = new Map(selectedTalents.map((talent) => [normalizeName(talent.nom), talent]));

  const players = members
    .filter((member) => member.id !== "1")
    .map((member) => {
      const playerTalents = (member.talents || []).map((name) => talentsByName.get(normalizeName(name))).filter(Boolean);

      return {
        ...member,
        talents: playerTalents,
      };
    })
    .filter((member) => member.talents.length > 0)
    .sort((a, b) => a.pseudo.localeCompare(b.pseudo, "fr"));

  talentsJoueurs.innerHTML = players
    .map((player, index) => {
      const previewTalents = player.talents;
      const detailsId = `talents-details-${index}`;

      return `
  <li
    class="talents__joueur border-grp"
    data-group="grp-${escapeHtml(player.groupe)}"
    data-joueur-id="${escapeHtml(player.id)}"
  >
          <!-- = Avatar -->
          <img
            class="talents__joueur-avatar"
            src="${escapeHtml(player.avatar)}"
            alt=""
          >

          <!-- = Identité -->
          <div class="talents__joueur-identity">
            <h3 class="talents__joueur-name txt-grp">
              ${escapeHtml(player.pseudo)}
            </h3>

            <span class="talents__joueur-rank">
              rang ${escapeHtml(player.rank)}
            </span>

            <span class="talents__joueur-count">
              ${player.talents.length}
              talent${player.talents.length > 1 ? "s" : ""}
            </span>
          </div>

          <!-- = Bouton d'ouverture -->
          <button
            class="talents__joueur-toggle"
            type="button"
            aria-expanded="false"
            aria-controls="${detailsId}"
            aria-label="Afficher les talents de ${escapeHtml(player.pseudo)}"
          >
            <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>
          </button>

          <!-- = Aperçu des talents -->
          <div class="talents__joueur-preview">
            ${previewTalents
              .map(
                (talent) => `
                  <span class="talents__joueur-badge">
                    ${escapeHtml(talent.nom)}
                  </span>
                `,
              )
              .join("")}
          </div>

          <!-- = Détails dépliables -->
          <div
            class="talents__joueur-details"
            id="${detailsId}"
            aria-hidden="true"
            inert
          >
            <div class="talents__joueur-details-inner">
              <ul class="talents__joueur-list">
                ${player.talents
                  .map((talent) => {
                    const config = TARGET_TALENTS_BY_NAME.get(normalizeName(talent.nom));

                    const category = TALENTS_OBJETS[normalizeName(talent.nom)];

                    return `
<li
  class="talents__joueur-talent"
  data-talent="${escapeHtml(talent.nom)}"
  data-delai="${escapeHtml(config?.delai || "")}"
>                        ${
                          talent.icon
                            ? `
                              <img
                                class="talents__joueur-talent-icon"
                                src="${escapeHtml(talent.icon)}"
                                alt=""
                              >
                            `
                            : ""
                        }

                        <div class="talents__joueur-talent-info">
                          <h4 class="talents__joueur-talent-name">
                            ${escapeHtml(talent.nom)}
                          </h4>
                          <p class="talents__joueur-talent-description">
                            ${escapeHtml(config?.effet || "")}
                          </p>
                        </div>
                        <div class="talents__joueur-talent-generation">
                        


                          ${
                            category
                              ? `
                                <button
                                  class="talents__generer"
                                  type="button"
                                  data-category="${escapeHtml(category)}"
                                >
                                  Générer aléatoirement
                                </button>
                              `
                              : ""
                          }
                        </div>
<div class="talents__joueur-talent-reference">

  <button
    class="talents__joueur-talent-don"
    type="button"
  >
    Donner la récompense
  </button>

  <div class="talents__joueur-talent-date">
    <label>
      <i class="fa-regular fa-calendar"></i>

      <input
        class="talents__joueur-talent-date-input"
        type="date"
        aria-label="Date de distribution de ${escapeHtml(talent.nom)}"
      >
    </label>

    <button
      class="talents__joueur-talent-date-submit"
      type="button"
    >
      Valider la date
    </button>
  </div>

  <div class="talents__joueur-talent-prochaine">
    <span>Prochaine distribution</span>
    <strong class="talents__joueur-talent-prochaine-date">
      —
    </strong>
  </div>

</div>
                      </li>
                    `;
                  })
                  .join("")}
              </ul>
            </div>
          </div>
        </li>
      `;
    })
    .join("");
}

// ==========================================================
// GÉNÉRATION ALÉATOIRE D'OBJETS
// ==========================================================

talentsJoueurs.addEventListener("click", (event) => {
  const button = event.target.closest(".talents__generer");

  if (!button) return;

  const objet = getRandomObject(button.dataset.category, objetsData);

  if (!objet) {
    button.textContent = "Aucun objet disponible";
    button.disabled = true;
    return;
  }

  button.outerHTML = `
    <div class="talents__objet-result">
      ${
        objet.image
          ? `<img
              class="talents__objet-image"
              src="${escapeHtml(objet.image)}"
              alt="${escapeHtml(objet.nom)}"
            >`
          : ""
      }

      <span class="talents__objet-name">
        ${escapeHtml(objet.nom)}
      </span>
    </div>
  `;
});

      // ==========================================================
// MODIFICATIONS NON ENREGISTRÉES
// ==========================================================

const modificationsEnAttente = new Map();

const synchroniserCompteur = document.querySelector("#synchroniser-compteur");

// = Enregistrer une modification.

function marquerModification(key, data) {
  modificationsEnAttente.set(key, data);

  actualiserCompteur();
}

// = Actualiser le compteur.

function actualiserCompteur() {
  const count = modificationsEnAttente.size;

  if (!synchroniserCompteur) return;

  synchroniserCompteur.textContent = count > 0
    ? `${count} modification${count > 1 ? "s" : ""} non enregistrée${count > 1 ? "s" : ""} sur Google Sheets`
    : "Aucune modification en attente";
}

// = Avertissement avant de quitter.

window.addEventListener("beforeunload", (event) => {
  if (modificationsEnAttente.size === 0) return;

  event.preventDefault();
  event.returnValue = "";
});

// ==========================================================
// DATE DE DISTRIBUTION
// ==========================================================

talentsJoueurs.addEventListener("click", (event) => {
  const button = event.target.closest(".talents__joueur-talent-date-submit");

  if (!button) return;

  const talent = button.closest(".talents__joueur-talent");
  const input = talent.querySelector(".talents__joueur-talent-date-input");
  const output = talent.querySelector(".talents__joueur-talent-prochaine-date");

  if (!input.value) {
    input.reportValidity();
    return;
  }

  // = Récupération de la date.

  const [year, month, day] = input.value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  // = Calcul du délai.

  const delai = talent.dataset.delai;

  if (delai === "quinzaine") {
    date.setDate(date.getDate() + 15);
  }

  if (delai === "mensuel") {
    const originalDay = date.getDate();

    date.setDate(1);
    date.setMonth(date.getMonth() + 1);

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    date.setDate(Math.min(originalDay, lastDay));
  }

  // = Affichage de la prochaine distribution.

  output.textContent = date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // = Enregistrement de la modification.

const joueur = button.closest(".talents__joueur");

const joueurId = joueur.dataset.joueurId;
const talentName = talent.dataset.talent;

marquerModification(`${joueurId}::${talentName}`, {
  type: "date",
  joueur_id: joueurId,
  talent: talentName,
  derniere_distribution: input.value,
});
});

      // ==========================================================
// SYNCHRONISATION GOOGLE SHEETS
// ==========================================================

const GOOGLE_SHEETS_API_URL = "https://script.google.com/macros/s/AKfycby7sfWJyZ_2PMn1gm8MuaHk594uk6_dEUxTEEEV6j5Bo3lp2rgoBhcHPzbMmWSuGjtoGw/exec";

// ==========================================================
// SYNCHRONISATION GOOGLE SHEETS
// ==========================================================

const synchroniserButton = document.querySelector("#synchroniser-sheets");
const synchroniserMessage = document.querySelector("#synchroniser-message");
const synchroniserFrame = document.querySelector("#synchroniser-frame");

let synchronisationEnCours = null;

// = Création du formulaire d'envoi.

const synchroniserForm = document.createElement("form");

synchroniserForm.method = "POST";
synchroniserForm.action = GOOGLE_SHEETS_API_URL;
synchroniserForm.target = "synchroniser-frame";
synchroniserForm.hidden = true;

const synchroniserPayload = document.createElement("input");

synchroniserPayload.type = "hidden";
synchroniserPayload.name = "payload";

synchroniserForm.appendChild(synchroniserPayload);
document.body.appendChild(synchroniserForm);

// = Envoi des modifications.

synchroniserButton.addEventListener("click", () => {
  if (modificationsEnAttente.size === 0) {
    synchroniserMessage.textContent = "Aucune modification à synchroniser.";
    return;
  }

  synchroniserButton.disabled = true;
  synchroniserMessage.textContent = "Synchronisation en cours...";

const payload = {
  requestId: String(Date.now()),
  modifications: Array.from(modificationsEnAttente.values()),
};

synchronisationEnCours = payload.requestId;

synchroniserPayload.value = JSON.stringify(payload);
synchroniserForm.submit();
});

// = Réception de la réponse Apps Script.

// ==========================================================
// RETOUR DE SYNCHRONISATION
// ==========================================================

window.addEventListener("message", (event) => {
  console.log("[SYNC] Message reçu :", event);
  console.log("[SYNC] Origine :", event.origin);
  console.log("[SYNC] Source :", event.source);
  console.log("[SYNC] Iframe :", synchroniserFrame.contentWindow);
  console.log("[SYNC] Réponse :", event.data);
  console.log("[SYNC] ID attendu :", synchronisationEnCours);

  if (event.origin !== "https://sixtinerpg.github.io") return;
  if (event.source !== synchroniserFrame.contentWindow) return;

  const response = event.data;

  if (!response || typeof response !== "object") return;
  if (response.requestId !== synchronisationEnCours) return;

  synchronisationEnCours = null;

  if (response.success) {
    modificationsEnAttente.clear();
    actualiserCompteur();

    synchroniserMessage.textContent = "Synchronisation terminée !";
  } else {
    synchroniserMessage.textContent =
      `Erreur : ${response.message || "Synchronisation impossible."}`;
  }

  synchroniserButton.disabled = false;
});

// ==========================================================
// INITIALISATION
// ==========================================================

async function initTalents() {
  try {
    const [talentsData, membersData, objets] = await Promise.all([fetchJson(TALENTS_URL), fetchJson(MEMBERLIST_URL), fetchJson(OBJETS_URL)]);

    const talents = Array.isArray(talentsData) ? talentsData : talentsData.talents;
    const members = Array.isArray(membersData) ? membersData : membersData.members;

    objetsData = objets;

    renderTalents(talents);
    renderTalentsJoueurs(members, talents);
  } catch (error) {
    console.error("[Talents]", error);
  }
}

initTalents();
