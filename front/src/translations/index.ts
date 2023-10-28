import { I18n, Scope, TranslateOptions } from 'i18n-js';
import fr from './fr';

let i18n: I18n;

export function init() {
  i18n = new I18n({ fr });
  i18n.defaultLocale = 'fr';
  i18n.locale = 'fr';
}

export function trans(key: Scope, params: TranslateOptions | undefined = undefined) {
  return i18n.t(key, params);
}
