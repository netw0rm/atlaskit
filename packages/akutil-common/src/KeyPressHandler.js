import keyCode from 'keycode';

export default class KeyPressHandler {
  constructor(key, callback) {
    this.keyListeners = {};
    this.keyListeners[keyCode(key)] = callback;

    this.listener = (e) => {
      if (this.keyListeners[e.keyCode]) {
        this.keyListeners[e.keyCode]();
      }
    };

    document.addEventListener('keydown', this.listener);
  }

  add(key, callback) {
    this.keyListeners[keyCode(key)] = callback;
  }

  destroy(key) {
    if (!key) {
      this.keyListeners = undefined;
      document.removeEventListener('keydown', this.listener);
    } else {
      delete this.keyListeners[keyCode(key)];
    }
  }
}
