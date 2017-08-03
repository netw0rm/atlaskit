// @flow
/* eslint-disable no-console */
import type { Store, Action, State } from '../types';

export default (store: Store) => (next: (Action) => mixed) => (action: Action): mixed => {
  const key = `action: ${action.type}`;
  console.group(key);
  const before: State = store.getState();

  const result: mixed = next(action);

  const after: State = store.getState();

  console.log({ action, before, after });
  console.groupEnd(key);

  return result;
};
