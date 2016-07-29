import { enumeration } from './properties';
import Alignment from './Alignment';
import keyCode from './key-code';

function keyPressHandler(key, callback) {
  document.addEventListener('keydown', (e) => {
    if ((e.keyCode === keyCode[key]) || (e.keyCode === key)) {
      callback();
    }
  });
}

export { enumeration, Alignment, keyCode, keyPressHandler };
