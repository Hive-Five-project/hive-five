export function sequence(count: number, start = 0): number[] {
  return Array.from({ length: count }, (_, i) => i + start);
}

/**
 * Split an array into chunks of a given size.
 */
export function toChunks<T>(arr: readonly T[], chunkSize: number): readonly T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);

    chunks.push(chunk);
  }

  return chunks;
}

type DiscrType = string | number;
type KeyFinder<T, Discr extends DiscrType> = (value: T) => Discr;

export function groupBy<Value, Discr extends DiscrType>(
  values: ReadonlyArray<Value>,
  keyFinder: KeyFinder<Value, Discr>,
): Record<ReturnType<KeyFinder<Value, Discr>>, Value[]> {
  // using reduce to aggregate values
  return values.reduce((a, b) => {
    const key = keyFinder(b);

    // aggregate values based on the keys
    a[key] = [...a[key] ?? [], b];

    return a;
  }, {} as Record<ReturnType<KeyFinder<Value, Discr>>, Value[]>);
}
