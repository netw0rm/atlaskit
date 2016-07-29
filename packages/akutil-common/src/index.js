import { enumeration } from './properties';
import Alignment from './Alignment';
import keyCode from 'keycode';


class KeyPressHandler {
  constructor(key, callback) {
    this.keyListeners = {};
    this.keyListeners[keyCode(key)] = callback;

    this.listener = (e) => {
      if (this.keyListeners[e.keyCode]) {
        callback();
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
      delete this.keyListeners[key];
    }
  }
}


export { enumeration, Alignment, keyCode, KeyPressHandler };
