/**
 * Converts to an array of items
 */
import { FormErrors } from '@app/components/UI/Form/index.tsx';

export function arrayify<T = string>(items?: T[] | T | boolean | null): T[] {
  if (typeof items === 'undefined' || items === null || typeof items === 'boolean') {
    return [];
  }

  if (Array.isArray(items)) {
    return items;
  }

  return [items];
}

export function hasError(errors: FormErrors) {
  if (errors === true) {
    return true;
  }

  if (typeof errors === 'string') {
    return true;
  }

  if (Array.isArray(errors)) {
    return errors.length > 0;
  }

  return false;
}
