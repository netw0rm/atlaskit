import keyCode from 'keycode';

export default class KeyPressHandler {
  constructor(key, callback, elem) {
    this.keyListeners = {};
    this.keyListeners[keyCode(key)] = callback;
    this.elem = elem || document;
    this.listener = (e) => {
      if (this.keyListeners[e.keyCode]) {
        this.keyListeners[e.keyCode]();
      }
    };

    this.elem.addEventListener('keydown', this.listener);
  }

  add(key, callback) {
    this.keyListeners[keyCode(key)] = callback;
  }

  destroy(key) {
    if (!key) {
      this.keyListeners = undefined;
      this.elem.removeEventListener('keydown', this.listener);
    } else {
      delete this.keyListeners[keyCode(key)];
    }
  }
}
