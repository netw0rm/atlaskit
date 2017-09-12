// @flow
type Index = {|
  element: Element,
  ref: HTMLElement,
|};
type Store = {
  [name: string]: Index,
};

export default class SpotlightRegistry {
  _store: Store = {}

  add(name, data) {
    this._store[name] = data;
  }
  get(name) {
    return this._store[name];
  }
  remove(name) {
    delete this._store[name];
  }
}
