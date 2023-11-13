/**
 * Removes char from start of the string if it exists.
 */
export function ltrimChar(value: string, char: string): string {
  return value.replace(RegExp(`^${char}+`), '');
}

/**
 * Removes str from start of the string if it exists.
 */
export function ltrimStr(value: string, str: string): string {
  return value.replace(RegExp(`^(${str})+`), '');
}

/**
 * Removes char from end of the string if it exists.
 */
export function rtrimChar(value: string, char: string): string {
  return value.replace(RegExp(`${char}+$`), '');
}

/**
 * Enforces a string starts with given char.
 */
export function startWith(value: string, char: string): string {
  return char + ltrimChar(value, char);
}

/**
 * Lowercases the first letter of the string.
 */
export function lcFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

/**
 * Capitalizes the string.
 */
export function capitalize(value: string): string {
  return value.split(' ').map(word => word.charAt(0).toUpperCase() + value.slice(1)).join(' ');
}
