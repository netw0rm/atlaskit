import { EmojiId } from '@atlaskit/emoji';

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

export const equalEmojiId = (l: EmojiId, r: EmojiId): boolean => {
  return (l === r) || (l && r && l.id === r.id && l.shortName === r.shortName);
};

const compareOptionalStrings = (l: string | undefined, r: string | undefined): number => {
  if (l === r) {
    return 0;
  }
  if (!l) {
    return 1;
  }
  if (!r) {
    return -1;
  }
  return l.localeCompare(r);
};

export const compareEmojiId = (l: EmojiId, r: EmojiId): number => {
  if (l === r) {
    return 0;
  }
  if (!l) {
    return 1;
  }
  if (!r) {
    return -1;
  }
  const compareShortName = compareOptionalStrings(l.shortName, r.shortName);
  if (compareShortName) {
    return compareShortName;
  }

  const compareFallback = compareOptionalStrings(l.fallback, r.fallback);
  if (compareFallback) {
    return compareFallback;
  }

  return compareOptionalStrings(l.id, r.id);
};
