import { I18n } from "@lingui/core";
import type { MacroMessageDescriptor } from "@lingui/macro";

export const Trans = ({ children }) => children;
// @ts-ignore
export function t(i18n: I18n): {
  (literals: TemplateStringsArray, ...placeholders: any[]): string;
  (descriptor: MacroMessageDescriptor): string;
};

export function t(arg1: I18n | TemplateStringsArray, ...placeholders: any[]): string {
  if (arg1 instanceof I18n) {
    // @ts-ignore
    return (literals: TemplateStringsArray, ...placeholders: any[]) => {
      return `${literals.join("")}`;
    };
  } else if (Array.isArray(arg1)) {
    const literals = arg1 as TemplateStringsArray;
    return `${literals.join("")}`;
  } else {
    const descriptor = arg1 as unknown as MacroMessageDescriptor;
    return `${descriptor.message}`;
  }
}
export const Plural = ({ value, one, other }) => (value <= 1 ? one : other);
export default { Trans, t, Plural };
