// @flow
type Store = {
  [name: string]: HTMLElement,
};

export default class SpotlightRegistry {
  _store: Store = {}

  add(name, node) {
    this._store[name] = node;
  }
  get(name) {
    return this._store[name];
  }
  remove(name) {
    delete this._store[name];
  }
}
