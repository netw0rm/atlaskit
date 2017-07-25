// @flow
import type { HTMLElement } from '../../src/types';

const getClosestScrollable = (el: ?HTMLElement): ?HTMLElement => {
  // cannot do anything else!
  if (el == null) {
    return null;
  }

  if (el.scrollHeight === el.clientHeight) {
    return getClosestScrollable(el.parentElement);
  }

  // success!
  return el;
};

export default getClosestScrollable;
