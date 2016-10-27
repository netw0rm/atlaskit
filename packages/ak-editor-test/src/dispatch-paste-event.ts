import { ProseMirror } from 'ak-editor-prosemirror';
import createEvent from './create-event';

function focusAndSelect(element: HTMLElement) {
  const range = document.createRange();
  const selection = window.getSelection();

  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);

  element.focus();
}

interface PasteContent {
  plain?: string;
  html?: string;
}

export default (pm: ProseMirror, content: PasteContent) => {
  const event = createEvent('paste');

  event.clipboardData = {
    getData(type: string) {
       if (type === 'text/plain') {
         return content.plain;
       }
       if (type === 'text/html') {
         return content.html;
       }
    },
    types: []
  };
  // ProseMirror must be focused, else it does not attempt to handle pasted content.
  focusAndSelect(pm.content);

  pm.content.dispatchEvent(event);
}
