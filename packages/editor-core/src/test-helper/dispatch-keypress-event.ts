import { ProseMirror } from '../';
import { browser } from '../';

/**
 * Dispatch a keyPress event
 */
export default (pm: ProseMirror, key: string) => {
    let browserKey;
    if (browser.mac) {
      browserKey = key.replace(/Mod/i, 'Cmd');
    } else {
      browserKey = key.replace(/Mod/i, 'Ctrl');
    }
    pm.input.dispatchKey(browserKey);
};
