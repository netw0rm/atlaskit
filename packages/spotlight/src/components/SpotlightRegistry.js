// @flow
type Index = {|
  element: Element,
  ref: HTMLElement,
|};
type Store = {
  [name: string]: Index,
};

export default class SpotlightRegistry {
  store: Store = {}

  add(name, data) {
    this.store[name] = data;
  }
  get(name) {
    return this.store[name];
  }
  remove(name) {
    delete this.store[name];
  }
}
