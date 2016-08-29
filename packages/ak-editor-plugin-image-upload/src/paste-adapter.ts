import { ProseMirror } from 'prosemirror/dist/edit/main';

export type ImageUploadPasteHandler = (pm: ProseMirror, e: ClipboardEvent) => boolean;

function isPastedFile(
  e: ClipboardEvent
) : boolean {
  return Array.prototype.slice.call(e.clipboardData.types).indexOf('Files') !== -1;
}

export default class PasteAdapter {
  pm: ProseMirror;
  handlers: ImageUploadPasteHandler[];

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.handlers = [];
    this.__onPaste__ = this.__onPaste__.bind(this);
    pm.content.parentNode.addEventListener('paste', this.__onPaste__, true);
  }

  add(handler: ImageUploadPasteHandler) {
    this.handlers.push(handler);
  }

  remove(handler: ImageUploadPasteHandler) {
    this.handlers = this.handlers.reduce((
      handlers: Array<ImageUploadPasteHandler>,
      func: ImageUploadPasteHandler
    ) => {
      if (handler !== func) {
        handlers.push(func);
      }

      return handlers;
    }, []);
  }

  detach() {
    this.handlers = [];
    this.pm.content.parentNode.removeEventListener('drop', this.__onPaste__);
  }

  __onPaste__(e: ClipboardEvent) {
    if (!isPastedFile(e) || !this.handlers.length) {
      return false;
    }

    e.preventDefault();
    e.stopPropagation();

    return this.handlers.every(handler => handler(this.pm, e));
  }
}
