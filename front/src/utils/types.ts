/**
 * Type guard with property existence check
 *
 * @see https://medium.com/rangle-io/how-to-get-the-types-you-want-with-type-guards-ebf4dcf894b9
 */
export function isOfType<T>(props: unknown, propertyToExist: keyof T): props is T {
  return (props as T)[propertyToExist] !== undefined;
}

/**
 * Type guard with property equality check
 */
export function isOfTypeWithEquality<T>(props: unknown, property: keyof T, value: unknown): props is T {
  return (props as T)[property] === value;
}
