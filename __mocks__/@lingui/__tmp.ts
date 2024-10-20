// @ts-nocheck
import { I18n } from "@lingui/core";
import type { MacroMessageDescriptor } from "@lingui/macro";
import { allMessages, getI18nInstance } from "../../src/translations/i18n";

export const Trans = ({ children, ...props }) => {
  return children;
};
// @ts-ignore
export function t(i18n: I18n): {
  (literals: TemplateStringsArray, ...placeholders: any[]): string;
  (descriptor: MacroMessageDescriptor): string;
};

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => {
    return object[key] === value;
  });
}

export function t(arg1: I18n | TemplateStringsArray, ...placeholders: any[]): string {
  if (arg1 instanceof I18n) {
    const i18n = arg1;
    return (literals: TemplateStringsArray, ...placeholders: any[]): string => {
      // Récupérer la clé de traduction depuis les littéraux
      const key = literals.join("");

      // Chercher la traduction dans l'objet allMessages
      const translatedMessage = allMessages.fr[getKeyByValue(allMessages.en, key)];

      return translatedMessage;
    };
  } else if (Array.isArray(arg1)) {
    // Cas où le premier argument est un TemplateStringsArray
    const literals = arg1 as TemplateStringsArray;
    // On suppose ici que le contexte i18n est global
    const i18n = getI18nInstance("fr"); // à définir quelque part dans ton code

    const key = literals.join("");
    return allMessages[i18n.locale][key] || key;
  } else {
    // Cas où le premier argument est un MacroMessageDescriptor
    const descriptor = arg1 as MacroMessageDescriptor;
    const i18n = getI18nInstance("fr"); // à définir quelque part dans ton code

    const translatedMessage = allMessages[i18n.locale][descriptor.id] || descriptor.message;

    return translatedMessage;
  }
}

export const Plural = ({ value, one, other }) => (value <= 1 ? one : other);
export default { Trans, t, Plural };
