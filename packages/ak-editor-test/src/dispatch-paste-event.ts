import { ProseMirror } from 'ak-editor-prosemirror';

interface PasteContent {
  plain?: string;
  html?: string;
}

export default (pm: ProseMirror, content: PasteContent) => {
  const event = new Event('paste', {
    bubbles: true,
    cancelable: true
  }) as any;
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
  pm.content.focus();
  pm.content.dispatchEvent(event);
}
