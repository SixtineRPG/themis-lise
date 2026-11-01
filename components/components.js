import { Button } from "./buttons/buttons.js";

// ==========================================================
// CONFIGURATION
// ==========================================================

const examples = [
  // ==========================================================
  // container
  // ==========================================================

  // > Small
  {
    target: "#button-container-sm",
    options: {
      text: "Small",
      variant: "container",
      size: "sm",
    },
  },
  {
    target: "#button-container-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "container",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-container-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "container",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-container-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "container",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-container-md",
    options: {
      text: "Medium",
      variant: "container",
      size: "md",
    },
  },
  {
    target: "#button-container-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "container",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-container-md-icon-right",
    options: {
      text: "Modifier",
      variant: "container",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-container-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "container",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-container-lg",
    options: {
      text: "Large",
      variant: "container",
      size: "lg",
    },
  },
  {
    target: "#button-container-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "container",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-container-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "container",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-container-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "container",
      size: "lg",
    },
  },

  // ==========================================================
  // CONTENT
  // ==========================================================

  // > Small
  {
    target: "#button-content-sm",
    options: {
      text: "Small",
      variant: "content",
      size: "sm",
    },
  },
  {
    target: "#button-content-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "content",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-content-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "content",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-content-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "content",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-content-md",
    options: {
      text: "Medium",
      variant: "content",
      size: "md",
    },
  },
  {
    target: "#button-content-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "content",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-content-md-icon-right",
    options: {
      text: "Modifier",
      variant: "content",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-content-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "content",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-content-lg",
    options: {
      text: "Large",
      variant: "content",
      size: "lg",
    },
  },
  {
    target: "#button-content-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "content",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-content-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "content",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-content-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "content",
      size: "lg",
    },
  },

  // ==========================================================
  // inset
  // ==========================================================

  // > Small
  {
    target: "#button-inset-sm",
    options: {
      text: "Small",
      variant: "inset",
      size: "sm",
    },
  },
  {
    target: "#button-inset-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "inset",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inset-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "inset",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inset-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inset",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-inset-md",
    options: {
      text: "Medium",
      variant: "inset",
      size: "md",
    },
  },
  {
    target: "#button-inset-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "inset",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inset-md-icon-right",
    options: {
      text: "Modifier",
      variant: "inset",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inset-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inset",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-inset-lg",
    options: {
      text: "Large",
      variant: "inset",
      size: "lg",
    },
  },
  {
    target: "#button-inset-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "inset",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inset-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "inset",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inset-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inset",
      size: "lg",
    },
  },

  // ==========================================================
  // element
  // ==========================================================

  // > Small
  {
    target: "#button-element-sm",
    options: {
      text: "Small",
      variant: "element",
      size: "sm",
    },
  },
  {
    target: "#button-element-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "element",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-element-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "element",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-element-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "element",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-element-md",
    options: {
      text: "Medium",
      variant: "element",
      size: "md",
    },
  },
  {
    target: "#button-element-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "element",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-element-md-icon-right",
    options: {
      text: "Modifier",
      variant: "element",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-element-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "element",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-element-lg",
    options: {
      text: "Large",
      variant: "element",
      size: "lg",
    },
  },
  {
    target: "#button-element-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "element",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-element-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "element",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-element-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "element",
      size: "lg",
    },
  },

  // ==========================================================
  // INVERSE
  // ==========================================================

  // > Small
  {
    target: "#button-inverse-sm",
    options: {
      text: "Small",
      variant: "inverse",
      size: "sm",
    },
  },
  {
    target: "#button-inverse-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "inverse",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inverse-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "inverse",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inverse-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inverse",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-inverse-md",
    options: {
      text: "Medium",
      variant: "inverse",
      size: "md",
    },
  },
  {
    target: "#button-inverse-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "inverse",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inverse-md-icon-right",
    options: {
      text: "Modifier",
      variant: "inverse",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inverse-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inverse",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-inverse-lg",
    options: {
      text: "Large",
      variant: "inverse",
      size: "lg",
    },
  },
  {
    target: "#button-inverse-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "inverse",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inverse-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "inverse",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inverse-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inverse",
      size: "lg",
    },
  },

  // ==========================================================
  // INVERSE SECONDARY
  // ==========================================================

  // > Small
  {
    target: "#button-inverse-secondary-sm",
    options: {
      text: "Small",
      variant: "inverse-secondary",
      size: "sm",
    },
  },
  {
    target: "#button-inverse-secondary-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "inverse-secondary",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inverse-secondary-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "inverse-secondary",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inverse-secondary-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inverse-secondary",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-inverse-secondary-md",
    options: {
      text: "Medium",
      variant: "inverse-secondary",
      size: "md",
    },
  },
  {
    target: "#button-inverse-secondary-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "inverse-secondary",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inverse-secondary-md-icon-right",
    options: {
      text: "Modifier",
      variant: "inverse-secondary",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inverse-secondary-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inverse-secondary",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-inverse-secondary-lg",
    options: {
      text: "Large",
      variant: "inverse-secondary",
      size: "lg",
    },
  },
  {
    target: "#button-inverse-secondary-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "inverse-secondary",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-inverse-secondary-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "inverse-secondary",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-inverse-secondary-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "inverse-secondary",
      size: "lg",
    },
  },

  // ==========================================================
  // PRIMARY
  // ==========================================================

  // > Small
  {
    target: "#button-primary-sm",
    options: {
      text: "Small",
      variant: "primary",
      size: "sm",
    },
  },
  {
    target: "#button-primary-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "primary",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-primary-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "primary",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-primary-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-primary-md",
    options: {
      text: "Medium",
      variant: "primary",
      size: "md",
    },
  },
  {
    target: "#button-primary-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "primary",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-primary-md-icon-right",
    options: {
      text: "Modifier",
      variant: "primary",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-primary-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-primary-lg",
    options: {
      text: "Large",
      variant: "primary",
      size: "lg",
    },
  },
  {
    target: "#button-primary-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "primary",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-primary-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "primary",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-primary-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      size: "lg",
    },
  },

  // ==========================================================
  // SECONDARY
  // ==========================================================

  // > Small
  {
    target: "#button-secondary-sm",
    options: {
      text: "Small",
      variant: "secondary",
      size: "sm",
    },
  },
  {
    target: "#button-secondary-sm-icon-left",
    options: {
      text: "Ajouter",
      variant: "secondary",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-secondary-sm-icon-right",
    options: {
      text: "Modifier",
      variant: "secondary",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-secondary-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "secondary",
      size: "sm",
    },
  },

  // > Medium
  {
    target: "#button-secondary-md",
    options: {
      text: "Medium",
      variant: "secondary",
      size: "md",
    },
  },
  {
    target: "#button-secondary-md-icon-left",
    options: {
      text: "Ajouter",
      variant: "secondary",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-secondary-md-icon-right",
    options: {
      text: "Modifier",
      variant: "secondary",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-secondary-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "secondary",
      size: "md",
    },
  },

  // > Large
  {
    target: "#button-secondary-lg",
    options: {
      text: "Large",
      variant: "secondary",
      size: "lg",
    },
  },
  {
    target: "#button-secondary-lg-icon-left",
    options: {
      text: "Ajouter",
      variant: "secondary",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
    },
  },
  {
    target: "#button-secondary-lg-icon-right",
    options: {
      text: "Modifier",
      variant: "secondary",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
    },
  },
  {
    target: "#button-secondary-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "secondary",
      size: "lg",
    },
  },

  // ==========================================================
  // SUCCESS
  // ==========================================================

  // > Small
  {
    target: "#button-success-sm",
    options: {
      text: "Small - Enregistrer",
      variant: "primary",
      feedback: "success",
      size: "sm",
      successText: "Enregistré !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-sm-icon-left",
    options: {
      text: "Small - Ajouter",
      variant: "primary",
      feedback: "success",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
      successText: "Ajouté !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-sm-icon-right",
    options: {
      text: "Small - Modifier",
      variant: "primary",
      feedback: "success",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
      successText: "Modifié !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      feedback: "success",
      size: "sm",
      successIcon: "fa-solid fa-check",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },

  // > Medium
  {
    target: "#button-success-md",
    options: {
      text: "Medium - Enregistrer",
      variant: "primary",
      feedback: "success",
      size: "md",
      successText: "Enregistré !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-md-icon-left",
    options: {
      text: "Medium - Ajouter",
      variant: "primary",
      feedback: "success",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
      successText: "Ajouté !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-md-icon-right",
    options: {
      text: "Medium - Modifier",
      variant: "primary",
      feedback: "success",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
      successText: "Modifié !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      feedback: "success",
      size: "md",
      successIcon: "fa-solid fa-check",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },

  // > Large
  {
    target: "#button-success-lg",
    options: {
      text: "Large - Enregistrer",
      variant: "primary",
      feedback: "success",
      size: "lg",
      successText: "Enregistré !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-lg-icon-left",
    options: {
      text: "Large - Ajouter",
      variant: "primary",
      feedback: "success",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
      successText: "Ajouté !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-lg-icon-right",
    options: {
      text: "Large - Modifier",
      variant: "primary",
      feedback: "success",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
      successText: "Modifié !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-success-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      feedback: "success",
      size: "lg",
      successIcon: "fa-solid fa-check",
      onClick: () => {
        console.log("tes");
      },
    },
  },

  // ==========================================================
  // ERROR
  // ==========================================================

  // > Small
  {
    target: "#button-error-sm",
    options: {
      text: "Small - Enregistrer",
      variant: "primary",
      feedback: "error",
      size: "sm",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-sm-icon-left",
    options: {
      text: "Small - Ajouter",
      variant: "primary",
      feedback: "error",
      size: "sm",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-sm-icon-right",
    options: {
      text: "Small - Modifier",
      variant: "primary",
      feedback: "error",
      size: "sm",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-sm-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      feedback: "error",
      size: "sm",
      errorIcon: "fa-solid fa-xmark",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },

  // > Medium
  {
    target: "#button-error-md",
    options: {
      text: "Medium - Enregistrer",
      variant: "primary",
      feedback: "error",
      size: "md",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-md-icon-left",
    options: {
      text: "Medium - Ajouter",
      variant: "primary",
      feedback: "error",
      size: "md",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-md-icon-right",
    options: {
      text: "Medium - Modifier",
      variant: "primary",
      feedback: "error",
      size: "md",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-md-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      feedback: "error",
      size: "md",
      errorIcon: "fa-solid fa-xmark",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },

  // > Large
  {
    target: "#button-error-lg",
    options: {
      text: "Large - Enregistrer",
      variant: "primary",
      feedback: "error",
      size: "lg",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-lg-icon-left",
    options: {
      text: "Large - Ajouter",
      variant: "primary",
      feedback: "error",
      size: "lg",
      icon: "fa-solid fa-plus",
      iconPosition: "left",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-lg-icon-right",
    options: {
      text: "Large - Modifier",
      variant: "primary",
      feedback: "error",
      size: "lg",
      icon: "fa-solid fa-pen",
      iconPosition: "right",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },
  {
    target: "#button-error-lg-icon-only",
    options: {
      icon: "fa-solid fa-trash",
      ariaLabel: "Supprimer",
      variant: "primary",
      feedback: "error",
      size: "lg",
      errorIcon: "fa-solid fa-xmark",
      onClick: () => {
        console.log("tes");
      },
    },
  },

  // ========================================================
  // FEEDBACK BOTH
  // ========================================================

  // > Small - Succès
  {
    target: "#button-both-success-sm",
    options: {
      text: "Small - Succès",
      variant: "primary",
      feedback: "both",
      size: "sm",
      successText: "Enregistré !",
      errorText: "Erreur !",
      onClick: () => {
        console.log("Action validée !");
      },
    },
  },

  // > Small - Erreur
  {
    target: "#button-both-error-sm",
    options: {
      text: "Small - Erreur",
      variant: "primary",
      feedback: "both",
      size: "sm",
      successText: "Enregistré !",
      errorText: "Erreur !",
      onClick: () => {
        throw new Error("Impossible d'enregistrer !");
      },
    },
  },
];

// ==========================================================
// INITIALISATION
// ==========================================================

examples.forEach(({ target, options }) => {
  const container = document.querySelector(target);

  if (!container) return;

  container.append(Button.create(options));
});
