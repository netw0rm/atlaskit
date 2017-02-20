export const isLeftClick = event => (
  event.button === 0
    && !event.altKey
    && !event.ctrlKey
    && !event.metaKey
    && !event.shiftKey
);

export const findIndex = (array: any[], predicate: (item: any) => boolean): number => {
  let index = -1;
  array.some((item, i) => {
    if (predicate(item)) {
      index = i;
      return true;
    }
    return false;
  });

  return index;
};

export const unique = (array: any[], predicate: (item: any) => string) => {
  const seen = {};
  return array.filter(item => seen[predicate(item)] ? false : (seen[predicate(item)] = true));
};
