
import { Button } from "https://sixtinerpg.github.io/themis-lise/components/buttons/buttons.js";
import { Dropdown } from "https://sixtinerpg.github.io/themis-lise/components/dropdown/dropdown.js";

const TALENTS_URL = "https://sixtinerpg.github.io/themis-lise/talents/talents.json";
//const MEMBERLIST_URL = "../../shared/memberlist_json.php";
const MEMBERLIST_URL = "https://sixtinerpg.github.io/themis-lise/talents/memberlist_local.json";
const OBJETS_URL = "https://sixtinerpg.github.io/themis-lise/talents/objets.json";
//const OBJETS_URL = "../../shared/data/objets.json";
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
    effet: "Fabrication d’une Méga-Gemme.",
  },
  "Pousseur de fonte": {
    type: "demande",
    delai: "mensuel",
    effet: "Fabrication d’un objet Dynamax ou Gigamax.",
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

const TARGET_TALENTS_BY_NAME = new Map(
  Object.entries(TARGET_TALENTS).map(([name, config]) => [
    normalizeName(name),
    config,
  ]),
);

function getTargetTalents(talents) {
  return talents.filter((talent) =>
    TARGET_TALENTS_BY_NAME.has(normalizeName(talent.nom)),
  );
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
// GESTION DES DATES
// ==========================================================

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
    Number(day),
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
      0,
    ).getDate();

    date.setDate(Math.min(originalDay, lastDay));
  }

  return date;
}

// ==========================================================
// MODIFICATIONS NON ENREGISTRÉES
// ==========================================================

const modificationsEnAttente = new Map();

const synchroniserCompteur = document.querySelector(
  "#synchroniser-compteur",
);

// = Enregistrer une modification.

function marquerModification(key, data) {
  const modificationExistante =
    modificationsEnAttente.get(key) || {};

  modificationsEnAttente.set(key, {
    ...modificationExistante,
    ...data,
  });

  actualiserCompteur();
}

// = Actualiser le compteur.

function actualiserCompteur() {
  const count = modificationsEnAttente.size;

  if (!synchroniserCompteur) return;

  synchroniserCompteur.textContent =
    count > 0
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
          const config = TARGET_TALENTS_BY_NAME.get(
            normalizeName(talent.nom),
          );

          return config?.delai === delai;
        })
        .map((talent) => {
          const config = TARGET_TALENTS_BY_NAME.get(
            normalizeName(talent.nom),
          );

          return `
            <li class="talents__item">
              ${
                talent.icon
                  ? `
                    <img
                      class="talents__icon"
                      src="${escapeHtml(talent.icon)}"
                      alt=""
                    >
                  `
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
// Sources : LOCAL
// ==========================================================

function renderTalentsJoueurs(members, talents, distributions) {
  const selectedTalents = getTargetTalents(talents);

  const talentsByName = new Map(
    selectedTalents.map((talent) => [
      normalizeName(talent.nom),
      talent,
    ]),
  );

  // = Index des dernières distributions.

  const distributionsByKey = new Map(
    distributions.map((distribution) => [
      `${distribution.joueur_id}::${normalizeName(distribution.talent)}`,
      {
        derniere_distribution: distribution.derniere_distribution,
        dernier_item: distribution.dernier_item,
      },
    ]),
  );

  // = Préparation des joueurs.

  const players = members
    .filter((member) => member.id !== "1")
    .map((member) => {
      const playerTalents = (member.talents || [])
        .map((name) => talentsByName.get(normalizeName(name)))
        .filter(Boolean);

      return { ...member, talents: playerTalents };
    })
    .filter((member) => member.talents.length > 0)
    .sort((a, b) => a.pseudo.localeCompare(b.pseudo, "fr"));

  // = Génération HTML.

  talentsJoueurs.innerHTML = players
    .map((player, index) => {
      const previewTalents = player.talents;
      const detailsId = `talents-details-${index}`;

      return `
        <li
          class="talents__joueur border-grp"
          data-group="grp-${escapeHtml(player.groupe)}"
          data-joueur-id="${escapeHtml(player.id)}"
          data-joueur-name="${escapeHtml(player.pseudo)}"
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
                    const config = TARGET_TALENTS_BY_NAME.get(
                      normalizeName(talent.nom),
                    );

                    const talentName = talent.nom;
                    const talentKey = normalizeName(talentName);
                    const category = TALENTS_OBJETS[talentKey];

                    // = Récupération de la dernière distribution.

                    const distribution = distributionsByKey.get(
                      `${player.id}::${talentKey}`,
                    );

                    const derniereDistribution =
                      distribution?.derniere_distribution;

                    const dernierItem = distribution?.dernier_item;

                    // = Recherche du dernier objet distribué.

                    const dernierObjet = (
                      objetsData[category] || []
                    ).find(
                      (objet) =>
                        normalizeName(objet.nom) ===
                        normalizeName(dernierItem || ""),
                    );

                    // = Calcul de la prochaine distribution.

                    const prochaineDistribution = getNextDistribution(
                      derniereDistribution,
                      config?.delai,
                    );

                    const isCristalliseur =
                      talentKey === normalizeName("Cristalliseur");

                    const isJoaillier =
                      talentKey === normalizeName("Joaillier");

                    return `
                      <li
                        class="talents__joueur-talent"
                        data-talent="${escapeHtml(talentName)}"
                        data-delai="${escapeHtml(config?.delai || "")}"
                      >

                        <!-- Informations sur le talent -->

                        <div class="talents__joueur-talent-info">
                          ${
                            talent.icon
                              ? `
                                <img
                                  class="talents__joueur-talent-info-icon"
                                  src="${escapeHtml(talent.icon)}"
                                  alt=""
                                >
                              `
                              : ""
                          }

                          <h4 class="talents__joueur-talent-info-name">
                            ${escapeHtml(talentName)}
                          </h4>

                          <p class="talents__joueur-talent-info-description">
                            ${escapeHtml(config?.effet || "")}
                          </p>
                        </div>

                        <!-- Historique précédent du talent -->

                        <div class="talents__joueur-talent-historique">

                          <div class="talents__joueur-talent-historique-derniere-date">
                            <span>Dernière distribution</span>

                            <strong>
                              ${formatDate(derniereDistribution)}
                            </strong>
                          </div>

                          <div class="talents__joueur-talent-historique-dernier-item">
                            <span class="talents__joueur-talent-historique-dernier-item-title">
                              Dernier objet distribué
                            </span>

                            ${
                              dernierObjet?.image
                                ? `
                                  <img
                                    class="talents__joueur-talent-historique-dernier-item-icon"
                                    src="${escapeHtml(dernierObjet.image)}"
                                    alt=""
                                  >
                                `
                                : ""
                            }

                            <strong class="talents__joueur-talent-historique-dernier-item-name">
                              ${escapeHtml(dernierItem || "—")}
                            </strong>
                          </div>

                        </div>

                        <!-- Génération de l'item aléatoire ou dropdowns -->

                        <div class="talents__joueur-talent-generation">

                          ${
                            category
                              ? `
                                <span
                                  data-button="generate"
                                  data-category="${escapeHtml(category)}"
                                ></span>
                              `
                              : ""
                          }

                          ${
                            isCristalliseur
                              ? `
                                <div
                                  id="dropdown-cristalZ-${escapeHtml(player.id)}"
                                  data-dropdown="cristal-z"
                                ></div>
                              `
                              : ""
                          }

                          ${
                            isJoaillier
                              ? `
                                <div
                                  id="dropdown-megaGemmes-${escapeHtml(player.id)}"
                                  data-dropdown="mega-gemmes"
                                ></div>
                              `
                              : ""
                          }

                        </div>

                        <!-- Distribution du talent -->

                        <div class="talents__joueur-talent-distribution">

                          <input
                            class="talents__joueur-talent-distribution-date-input"
                            type="date"
                            aria-label="Date de distribution"
                          >

                          <span data-button="date-submit"></span>

                          <div class="talents__joueur-talent-distribution-prochaine-date">
                            <span>Prochaine distribution</span>

                            <strong class="talents__joueur-talent-prochaine-date">
                              ${
                                prochaineDistribution
                                  ? prochaineDistribution.toLocaleDateString(
                                      "fr-FR",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      },
                                    )
                                  : "—"
                              }
                            </strong>
                          </div>

                          ${category ? `<span data-button="reward"></span>` : ""}

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

  // ========================================================
  // BOUTONS DE GÉNÉRATION
  // ========================================================

  talentsJoueurs
    .querySelectorAll('[data-button="generate"]')
    .forEach((placeholder) => {
      const category = placeholder.dataset.category;

      const button = Button.create({
        text: "Générer aléatoirement",
        variant: "inset",
        size: "sm",
        icon: "fa-solid fa-dice",
        iconPosition: "right",
        feedback: "error",
        errorText: "Aucun objet disponible",
        className: "talents__generer",

        onClick: () => {
          const availableObjects = objetsData[category] || [];

          if (!availableObjects.length) {
            throw new Error("Aucun objet disponible");
          }

          const objet =
            availableObjects[
              Math.floor(Math.random() * availableObjects.length)
            ];

          const talentElement = button.closest(
            ".talents__joueur-talent",
          );

          talentElement.dataset.generatedItem = objet.nom;

          const result = document.createElement("div");
          result.className = "talents__objet-result";

          result.innerHTML = `
            ${objet.image ? `<img src="${escapeHtml(objet.image)}" alt="">` : ""}
            <span>${escapeHtml(objet.nom)}</span>
          `;

          button.replaceWith(result);
        },
      });

      placeholder.replaceWith(button);
    });

  // ========================================================
  // BOUTONS D'ENREGISTREMENT DES DATES
  // ========================================================

  talentsJoueurs
    .querySelectorAll('[data-button="date-submit"]')
    .forEach((placeholder) => {
      const button = Button.create({
        text: "Valider la date",
        variant: "inset",
        size: "sm",
        feedback: "both",
        successText: "Date enregistrée !",
        errorText: "Date invalide !",

        onClick: () => {
          const talentElement = button.closest(
            ".talents__joueur-talent",
          );

          const playerElement = button.closest(
            ".talents__joueur",
          );

          const input = talentElement.querySelector(
            "input[type='date']",
          );

          const nextDateElement = talentElement.querySelector(
            ".talents__joueur-talent-prochaine-date",
          );

          if (!input.value) {
            input.reportValidity();
            return false;
          }

          const joueurId = playerElement.dataset.joueurId;
          const talentName = talentElement.dataset.talent;
          const delai = talentElement.dataset.delai;

          const prochaineDistribution = getNextDistribution(
            input.value,
            delai,
          );

          // = Actualisation de la prochaine date.

          if (nextDateElement) {
            nextDateElement.textContent = prochaineDistribution
              ? prochaineDistribution.toLocaleDateString(
                  "fr-FR",
                  {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  },
                )
              : "—";
          }

          // = Enregistrement de la modification.

          marquerModification(
  `${joueurId}::${normalizeName(talentName)}`,
  {
    joueur_id: joueurId,
    talent: talentName,
    type: "date",
    derniere_distribution: input.value,
  },
);

          updateDistributionDates();
        },
      });

      placeholder.replaceWith(button);
    });

  // ========================================================
  // BOUTONS D'ENREGISTREMENT DES RÉCOMPENSES
  // ========================================================

  talentsJoueurs
    .querySelectorAll('[data-button="reward"]')
    .forEach((placeholder) => {
      const button = Button.create({
        text: "Valider la récompense",
        variant: "inset",
        size: "sm",
        feedback: "both",
        successText: "Récompense enregistrée !",
        errorText: "Générer un objet d'abord",
        errorDuration: 1000,

        onClick: () => {
          const talentElement = button.closest(
            ".talents__joueur-talent",
          );

          const playerElement = button.closest(
            ".talents__joueur",
          );

          const objetName = talentElement.dataset.generatedItem;

          if (!objetName) {
            return false;
          }

          const joueurId = playerElement.dataset.joueurId;
          const talentName = talentElement.dataset.talent;

          // = Enregistrement de la modification.

          marquerModification(
  `${joueurId}::${normalizeName(talentName)}`,
  {
    joueur_id: joueurId,
    talent: talentName,
    type: "item",
    dernier_item: objetName,
  },
);
        },
      });

      placeholder.replaceWith(button);
    });

  // ========================================================
  // MISE À JOUR DES DATES
  // ========================================================

  updateDistributionDates();

  // ========================================================
  // INITIALISATION DES DROPDOWNS
  // ========================================================

  initDropdownCristalZ(objetsData);
  initDropdownMegaGemmes(objetsData);
}

// ==========================================================
// STATUT DES DATES DE DISTRIBUTION
// ==========================================================

function updateDistributionDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  document
    .querySelectorAll(".talents__joueur-talent-prochaine-date")
    .forEach((element) => {
      const date = parseDate(element.textContent.trim());

      if (!date) return;

      date.setHours(0, 0, 0, 0);

      const difference = Math.round(
        (date - today) / 86400000,
      );

      let status = "";

      if (difference === 0) {
        status = "today";
      } else if (difference === -3) {
        status = "3daysBefore";
      } else if (difference === -1) {
        status = "yesterday";
      } else if (difference === 3) {
        status = "3daysAfter";
      }

      if (status) {
        element.dataset.date = status;
      } else {
        delete element.dataset.date;
      }
    });
}

// ==========================================================
// SYNCHRONISATION GOOGLE SHEETS
// ==========================================================

const GOOGLE_SHEETS_API_URL =
  "https://script.google.com/macros/s/AKfycby7sfWJyZ_2PMn1gm8MuaHk594uk6_dEUxTEEEV6j5Bo3lp2rgoBhcHPzbMmWSuGjtoGw/exec";

const synchroniserButton = document.querySelector(
  "#synchroniser-sheets",
);

const synchroniserMessage = document.querySelector(
  "#synchroniser-message",
);

const synchroniserFrame = document.querySelector(
  "#synchroniser-frame",
);

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

if (synchroniserButton) {
  synchroniserButton.addEventListener("click", () => {
    if (modificationsEnAttente.size === 0) {
      synchroniserMessage.textContent =
        "Aucune modification à synchroniser.";

      return;
    }

    synchroniserButton.disabled = true;

    synchroniserMessage.textContent =
      "Synchronisation en cours...";

    const payload = {
      requestId: String(Date.now()),
      modifications: Array.from(
        modificationsEnAttente.values(),
      ),
    };

    synchronisationEnCours = payload.requestId;

    synchroniserPayload.value = JSON.stringify(payload);

    synchroniserForm.submit();
  });
}

// = Réception de la confirmation.

window.addEventListener("message", (event) => {
  // = Vérification de l'origine.

  if (event.origin !== "https://sixtinerpg.github.io") {
    return;
  }

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

    synchroniserMessage.textContent =
      "Synchronisation terminée !";

    synchroniserMessage.dataset.status = "success";
  } else {
    synchroniserMessage.textContent =
      `Erreur : ${response.message || "Synchronisation impossible."}`;

    synchroniserMessage.dataset.status = "error";
  }

  if (synchroniserButton) {
    synchroniserButton.disabled = false;
  }
});

// ==========================================================
// ACCORDÉON DES JOUEURS
// ==========================================================

talentsJoueurs.addEventListener("click", (event) => {
  const button = event.target.closest(
    ".talents__joueur-toggle",
  );

  if (!button || !talentsJoueurs.contains(button)) return;

  const card = button.closest(".talents__joueur");

  const details = card.querySelector(
    ".talents__joueur-details",
  );

  if (!card || !details) return;

  const isOpen = card.classList.toggle("is-open");

  button.setAttribute("aria-expanded", String(isOpen));

  details.setAttribute("aria-hidden", String(!isOpen));

  details.inert = !isOpen;
});

// ==========================================================
// FILTRE DES JOUEURS
// ==========================================================

async function initDropdownJoueurs(members) {
  await Dropdown.create({
    container: "#dropdown-joueurs",

    options: members,

    type: "filter",
    mode: "multiple",

    valueKey: "id",
    labelKey: "pseudo",
    searchKeys: ["pseudo"],

    placeholder: "Filtrer les joueurs",
    searchPlaceholder: "Rechercher un joueur...",

    // = Affichage des options.

    renderOption: (member) => {
      const wrapper = document.createElement("div");
      wrapper.className = "dropdown__member";

      const avatar = document.createElement("img");
      avatar.className = "dropdown__avatar";
      avatar.src = member.avatar;
      avatar.alt = "";
      avatar.loading = "lazy";

      const pseudo = document.createElement("span");
      pseudo.textContent = member.pseudo;

      wrapper.append(avatar, pseudo);

      return wrapper;
    },

    // = Filtrage des joueurs.

    onChange: (selectedIds) => {
      const cards = talentsJoueurs.querySelectorAll(
        ".talents__joueur",
      );

      cards.forEach((card) => {
        const isVisible =
          selectedIds.length === 0 ||
          selectedIds.some(
            (id) =>
              String(id) === String(card.dataset.joueurId),
          );

        card.hidden = !isVisible;
      });
    },
  });
}

// ==========================================================
// FILTRE DES MÉGA-GEMMES
// ==========================================================

async function initDropdownMegaGemmes(objetsData) {
  const megaGemmes = objetsData["mega-gemmes"] || [];

  const dropdowns = document.querySelectorAll(
    '[data-dropdown="mega-gemmes"]',
  );

  await Promise.all(
    [...dropdowns].map(async (dropdown) => {
      await Dropdown.create({
        container: `#${dropdown.id}`,

        options: megaGemmes,

        type: "filter",
        mode: "single",

        valueKey: "nom",
        labelKey: "nom",
        searchKeys: ["nom"],

        placeholder: "Choisir une Méga-Gemme",
        searchPlaceholder: "Rechercher une Méga-Gemme...",

        renderOption: (objet) => {
          const wrapper = document.createElement("div");
          wrapper.className = "dropdown__member";

          const image = document.createElement("img");
          image.className = "dropdown__avatar";
          image.src = objet.image || "";
          image.alt = "";
          image.loading = "lazy";

          const nom = document.createElement("span");
          nom.textContent = objet.nom;

          wrapper.append(image, nom);

          return wrapper;
        },

        renderValue: (objet) => {
          const wrapper = document.createElement("div");
          wrapper.className = "dropdown__member";

          const image = document.createElement("img");
          image.className = "dropdown__avatar";
          image.src = objet.image || "";
          image.alt = "";
          image.loading = "lazy";

          const nom = document.createElement("span");
          nom.textContent = objet.nom;

          wrapper.append(image, nom);

          return wrapper;
        },
      });
    }),
  );
}

// ==========================================================
// FILTRE DES CRISTAUX Z
// ==========================================================

async function initDropdownCristalZ(objetsData) {
  const cristauxZ = objetsData["cristal-z"] || [];

  const dropdowns = document.querySelectorAll(
    '[data-dropdown="cristal-z"]',
  );

  await Promise.all(
    [...dropdowns].map(async (dropdown) => {
      await Dropdown.create({
        container: `#${dropdown.id}`,

        options: cristauxZ,

        type: "filter",
        mode: "single",

        valueKey: "nom",
        labelKey: "nom",
        searchKeys: ["nom"],

        placeholder: "Choisir un Cristal Z",
        searchPlaceholder: "Rechercher un Cristal Z...",

        renderOption: (objet) => {
          const wrapper = document.createElement("div");
          wrapper.className = "dropdown__member";

          const image = document.createElement("img");
          image.className = "dropdown__avatar";
          image.src = objet.image || "";
          image.alt = "";
          image.loading = "lazy";

          const nom = document.createElement("span");
          nom.textContent = objet.nom;

          wrapper.append(image, nom);

          return wrapper;
        },

        renderValue: (objet) => {
          const wrapper = document.createElement("div");
          wrapper.className = "dropdown__member";

          const image = document.createElement("img");
          image.className = "dropdown__avatar";
          image.src = objet.image || "";
          image.alt = "";
          image.loading = "lazy";

          const nom = document.createElement("span");
          nom.textContent = objet.nom;

          wrapper.append(image, nom);

          return wrapper;
        },
      });
    }),
  );
}

// ==========================================================
// INITIALISATION
// ==========================================================

async function initTalents() {
  try {
    const [
      talentsData,
      membersData,
      objets,
      distributionsData,
    ] = await Promise.all([
      fetchJson(TALENTS_URL),
      fetchJson(MEMBERLIST_URL),
      fetchJson(OBJETS_URL),
      fetchJson(DISTRIBUTION_URL),
    ]);

    const talents = Array.isArray(talentsData)
      ? talentsData
      : talentsData.talents;

    const members = Array.isArray(membersData)
      ? membersData
      : membersData.members;

    const distributions = Array.isArray(distributionsData)
      ? distributionsData
      : [];

    objetsData = objets;

    renderTalents(talents);

    renderTalentsJoueurs(
      members,
      talents,
      distributions,
    );

    await initDropdownJoueurs(members);
  } catch (error) {
    console.error("[Talents]", error);
  }
}

initTalents();
