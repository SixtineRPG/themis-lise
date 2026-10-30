const TALENTS_URL = "https://sixtinerpg.github.io/themis-lise/talents/talents.json";
//const MEMBERLIST_URL = "../../shared/memberlist_json.php";
const MEMBERLIST_URL = "https://sixtinerpg.github.io/themis-lise/talents/memberlist_local.json";
const OBJETS_URL = "https://sixtinerpg.github.io/themis-lise/talents/objets.json";
const DISTRIBUTION_URL = "https://opensheet.elk.sh/1sRWoDg-4tnX_oiE_v0PK_D7ZGnxLk6OAeJY91PVFkoU/Distributions";


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

// = Normaliser les noms pour les comparaisons.

function normalizeObjectName(name) {
  return normalizeName(name).replace(/[^a-z0-9]/g, "");
}

// = Récupérer un objet par son nom.

function getObjectByName(category, name) {
  const items = objetsData[category];

  if (!Array.isArray(items) || !name) return null;

  return items.find(
    (objet) => normalizeObjectName(objet.nom) === normalizeObjectName(name)
  ) || null;
}

// = Formater une date de distribution.

// = Convertir une date en objet Date.

function parseDate(value) {
  if (!value) return null;

  const text = String(value).trim();

  let year;
  let month;
  let day;

  // = Format AAAA-MM-JJ.

  let match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (match) {
    [, year, month, day] = match;
  } else {
    // = Format JJ/MM/AAAA.

    match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (!match) return null;

    [, day, month, year] = match;
  }

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  // = Vérification de la date.

  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return date;
}

// = Formater une date de distribution.

function formatDate(value) {
  const date = parseDate(value);

  if (!date) return "—";

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

// = Calculer la prochaine distribution.

function getNextDistribution(value, delai) {
  const date = parseDate(value);

  if (!date) return null;

  // = Délai de quinze jours.

  if (delai === "quinzaine") {
    date.setDate(date.getDate() + 15);
  }

  // = Délai mensuel.

  if (delai === "mensuel") {
    const originalDay = date.getDate();

    date.setDate(1);
    date.setMonth(date.getMonth() + 1);

    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    date.setDate(Math.min(originalDay, lastDay));
  }

  return date;
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

function renderTalentsJoueurs(members, talents, distributions) {
  const selectedTalents = getTargetTalents(talents);

  const talentsByName = new Map(
    selectedTalents.map((talent) => [normalizeName(talent.nom), talent])
  );

  // = Index des dernières distributions.
  const distributionsByKey = new Map();

  distributions.forEach((distribution) => {
    const key = `${distribution.joueur_id}::${normalizeName(distribution.talent)}`;

    distributionsByKey.set(key, {
      derniere_distribution: distribution.derniere_distribution,
      dernier_item: distribution.dernier_item,
    });
  });

  const players = members
    .filter((member) => member.id !== "1")
    .map((player) => {
      const playerTalents = (player.talents || [])
        .map((name) => talentsByName.get(normalizeName(name)))
        .filter(Boolean);

      return {
        ...player,
        talents: playerTalents,
      };
    })
    .filter((player) => player.talents.length > 0);

  talentsJoueurs.innerHTML = players
    .map((player) => {
      const playerTalents = player.talents
        .map((talent) => {
          const talentName = talent.nom;
          const normalizedTalent = normalizeName(talentName);

          const category = TALENTS_OBJETS[normalizedTalent];

          const distribution = distributionsByKey.get(
            `${player.id}::${normalizedTalent}`
          );

          const derniereDistribution =
            distribution?.derniere_distribution || "";

          const dernierItem = distribution?.dernier_item || "";

          const dernierObjet = getObjectByName(category, dernierItem);

          return `
            <li
              class="talents__joueur-talent"
              data-talent="${escapeHtml(talentName)}"
              data-category="${category || ""}"
            >
              <div class="talents__joueur-talent-header">
                <img
                  class="talents__icon"
                  src="${escapeHtml(talent.image || "")}"
                  alt=""
                >

                <span class="talents__joueur-talent-name">
                  ${escapeHtml(talentName)}
                </span>

                <div
                  class="talents__type"
                  data-type="${escapeHtml(talent.type || "")}"
                ></div>
              </div>

              <p class="talents__description">
                ${escapeHtml(talent.description || "")}
              </p>

              ${
                category
                  ? `
                    <div class="talents__joueur-talent-recompense">
                      <div class="talents__joueur-talent-dernier">
                        <span class="talents__joueur-talent-label">
                          Dernière récompense
                        </span>

                        ${
                          dernierObjet
                            ? `
                              <div class="talents__joueur-talent-dernier-item-donne">
                                ${
                                  dernierObjet.image
                                    ? `
                                      <img
                                        class="talents__objet-image"
                                        src="${escapeHtml(dernierObjet.image)}"
                                        alt="${escapeHtml(dernierObjet.nom)}"
                                      >
                                    `
                                    : ""
                                }

                                <span>
                                  ${escapeHtml(dernierObjet.nom)}
                                </span>
                              </div>
                            `
                            : `
                              <span class="talents__joueur-talent-empty">
                                Aucun objet distribué
                              </span>
                            `
                        }

                        ${
                          derniereDistribution
                            ? `
                              <span class="talents__joueur-talent-date">
                                ${escapeHtml(derniereDistribution)}
                              </span>
                            `
                            : ""
                        }
                      </div>

                      <div class="talents__joueur-talent-actions">
                        <button
                          class="talents__generer"
                          data-category="${category}"
                          type="button"
                        >
                          Générer un objet
                        </button>

                        <button
                          class="talents__joueur-talent-don"
                          type="button"
                        >
                          Enregistrer la récompense
                        </button>
                      </div>
                    </div>
                  `
                  : ""
              }
            </li>
          `;
        })
        .join("");

      return `
        <article
          class="talents__joueur"
          data-joueur-id="${escapeHtml(player.id)}"
        >
          <h3 class="talents__joueur-name">
            ${escapeHtml(player.name)}
          </h3>

          <ul class="talents__joueur-talents">
            ${playerTalents}
          </ul>
        </article>
      `;
    })
    .join("");
}


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

  // = Affichage de l'objet généré.

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
// DISTRIBUTION DES RÉCOMPENSES
// ==========================================================

talentsJoueurs.addEventListener("click", (event) => {
  const button = event.target.closest(".talents__joueur-talent-don");

  if (!button) return;

  const talent = button.closest(".talents__joueur-talent");
  const joueur = button.closest(".talents__joueur");

  const objet = talent.querySelector(".talents__objet-name");

  if (!objet) {
    button.textContent = "Générer un objet d'abord";
    return;
  }

  // = Récupération des informations.

  const joueurId = joueur.dataset.joueurId;
  const talentName = talent.dataset.talent;
  const objetName = objet.textContent.trim();

  // = Enregistrement de la récompense.

  marquerModification(`${joueurId}::${talentName}::item`, {
    type: "item",
    joueur_id: joueurId,
    talent: talentName,
    dernier_item: objetName,
  });

  // = Confirmation visuelle.

  button.textContent = "Récompense enregistrée";
  button.disabled = true;
});

// ==========================================================
// DATE DE DISTRIBUTION
// ==========================================================

talentsJoueurs.addEventListener("click", (event) => {
  const button = event.target.closest(".talents__joueur-talent-date-submit");

  if (!button) return;

  const talent = button.closest(".talents__joueur-talent");
  const joueur = button.closest(".talents__joueur");

  const input = talent.querySelector(".talents__joueur-talent-date-input");

  const derniereDate = talent.querySelector(
    ".talents__joueur-talent-derniere-date strong"
  );

  const prochaineDate = talent.querySelector(
    ".talents__joueur-talent-prochaine-date"
  );

  if (!input.value) {
    input.reportValidity();
    return;
  }

  // = Récupération des informations.

  const joueurId = joueur.dataset.joueurId;
  const talentName = talent.dataset.talent;
  const delai = talent.dataset.delai;

  // = Calcul de la prochaine distribution.

  const prochaine = getNextDistribution(input.value, delai);

  // = Affichage des dates.

  derniereDate.textContent = formatDate(input.value);

  prochaineDate.textContent = prochaine
    ? prochaine.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "—";

  // = Enregistrement de la modification.

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

// = Réception de la confirmation.

window.addEventListener("message", (event) => {
  // = Vérification de l'origine.

  if (event.origin !== "https://sixtinerpg.github.io") return;

  const response = event.data;

  if (!response || typeof response !== "object") return;
  if (!synchronisationEnCours) return;

  // = Vérification de la requête.

  if (
    response.requestId &&
    response.requestId !== synchronisationEnCours
  ) {
    return;
  }

  synchronisationEnCours = null;

  // = Mise à jour de l'affichage.

  if (response.success) {
    modificationsEnAttente.clear();
    actualiserCompteur();

    synchroniserMessage.textContent = "Synchronisation terminée !";
    synchroniserMessage.dataset.status = "success";
  } else {
    synchroniserMessage.textContent =
      `Erreur : ${response.message || "Synchronisation impossible."}`;

    synchroniserMessage.dataset.status = "error";
  }

  synchroniserButton.disabled = false;
});

// ==========================================================
// INITIALISATION
// ==========================================================

async function initTalents() {
  try {
const [talentsData, membersData, objets, distributions] = await Promise.all([
  fetchJson(TALENTS_URL),
  fetchJson(MEMBERLIST_URL),
  fetchJson(OBJETS_URL),
  fetchJson(DISTRIBUTION_URL)
]);
    const talents = Array.isArray(talentsData) ? talentsData : talentsData.talents;
    const members = Array.isArray(membersData) ? membersData : membersData.members;

    objetsData = objets;

    renderTalents(talents);
    renderTalentsJoueurs(members, talents, distributions);
  } catch (error) {
    console.error("[Talents]", error);
  }
}

initTalents();
