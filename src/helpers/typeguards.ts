/**
 * Filter function to remove possibly undefined value
 * @param value Possibly undefined value
 * @returns value if not undefined
 */
export function notEmpty<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
