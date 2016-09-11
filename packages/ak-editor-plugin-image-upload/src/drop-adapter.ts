import { ProseMirror } from 'ak-editor-prosemirror';

export type ImageUploadDropHandler = (pm: ProseMirror, e: DragEvent) => boolean;

function isDroppedFile(
  e: DragEvent
) : boolean {
  return Array.prototype.slice.call(e.dataTransfer.types).indexOf('Files') !== -1;
}

export default class DropAdapter {
  pm: ProseMirror;
  handlers: ImageUploadDropHandler[];
  dropHandler: Function;

  constructor(pm: ProseMirror) {
    this.pm = pm;
    this.handlers = [];
    this.__dropHandler__ = this.__dropHandler__.bind(this);
    pm.content.parentNode.addEventListener('drop', this.__dropHandler__, true);
  }

  add(handler: ImageUploadDropHandler) {
    this.handlers.push(handler);
  }

  remove(handler: ImageUploadDropHandler) {
    this.handlers = this.handlers.reduce((
      handlers: ImageUploadDropHandler[],
      func: ImageUploadDropHandler
    ) => {
      if (handler !== func) {
        handlers.push(func);
      }

      return handlers;
    }, []);
  }

  detach() {
    this.handlers = [];
    this.pm.content.parentNode.removeEventListener('drop', this.__dropHandler__);
  }

  __dropHandler__(e: DragEvent) {
    if (!isDroppedFile(e) || !this.handlers.length) {
      return false;
    }

    e.preventDefault();
    e.stopPropagation();

    return this.handlers.every(handler => handler(this.pm, e));
  }
}
