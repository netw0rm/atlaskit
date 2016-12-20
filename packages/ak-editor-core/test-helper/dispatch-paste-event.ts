import { ProseMirror } from '../';
import createEvent from './create-event';

function focusAndSelect(element: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);

  element.focus();
}

export interface PasteContent {
  plain?: string;
  html?: string;
}

/**
 * Dispatch a paste event on the given ProseMirror instance
 *
 * Usage:
 *     dispatchPasteEvent(pm, {
 *         plain: 'copied text'
 *     });
 */
export default (pm: ProseMirror, content: PasteContent) => {
  const event = createEvent('paste');

  const clipboardData = {
    getData(type: string) {
       if (type === 'text/plain') {
         return content.plain;
       }
       if (type === 'text/html') {
         return content.html;
       }
    },
    types: [],
  };

  try {
    Object.defineProperty(event, 'clipboardData', { value: clipboardData });
  } catch (e) {
    // iOS 9 will throw if we assign `clipboardData` to `event`
    // revert this change once iOS 10 is out
    return false;
  }

  // ProseMirror must be focused, else it does not attempt to handle pasted content.
  focusAndSelect(pm.content);

  pm.content.dispatchEvent(event);
  return true;
}
