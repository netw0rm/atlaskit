/**
 * A helper for dealing with null-able values.
 *
 * Returns an iterator that will yield a single value for a non-null value, else
 * ends immediately.
 *
 * @param nullable A value that is null, undefined (both considered 'null'), or
 *   something else.
 * @example @js const foo: string | null = 'foo';
 * for (const x = maybe(foo)) {
 *   console.log(`${x} is not null!`);
 * }
 */
export default function<T>(nullable: T | null | undefined) {
  return {
    [Symbol.iterator]() {
      let hasYielded = false;
      return {
        next(): IteratorResult<T> {
          const done = hasYielded || nullable == null;
          hasYielded = true;
          return {
            done: done,
            value: nullable as any,
          };
        }
      };
    }
  };
}
