import {
  Plugin,
  ProseMirror,
  UpdateScheduler,
  ResolvedPos,
  DOMFromPos,
  Node,
  NodeSelection,
  Schema,
  TextSelection
} from 'ak-editor-prosemirror';
import { ImageNodeType } from 'ak-editor-schema';
import PasteAdapter from './paste-adapter';
import DropAdapter from './drop-adapter';

export interface ImageUploadPluginOptions {
  defaultHandlersEnabled?: boolean;
  supportedImageTypes?: Array<string>;
  maxFileSizeInBytes: number;
}

const DEFAULT_OPTIONS: ImageUploadPluginOptions = {
  maxFileSizeInBytes: 10000000,
  supportedImageTypes: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'svg',
  ],
};

export class ImageUploadState {
  private changeHandlers: StateChangeHandler[] = [];
  private pm: PM;
  private pasteAdapter: PasteAdapter;
  private dropAdapter: DropAdapter;
  private config: ImageUploadPluginOptions;

  // public state
  active = false;
  enabled = false;
  hidden = false;
  src?: string = undefined;
  element?: HTMLElement = undefined;

  constructor(pm: PM, options: ImageUploadPluginOptions) {
    this.pm = pm;
    this.pasteAdapter = new PasteAdapter(pm);
    this.dropAdapter = new DropAdapter(pm);
    this.config = Object.assign({}, DEFAULT_OPTIONS, options);
    this.hidden = !pm.schema.nodes.image;
    this.enabled = this.canInsertImage();

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());
  }

  subscribe(cb: StateChangeHandler): void {
    this.changeHandlers.push(cb);
    cb(this);
  }

  /**
   * Insert an image at the current selection.
   */
  addImage(options: { src?: string }): void {
    const { pm } = this;
    const { image } = pm.schema.nodes;
    if (this.enabled && image && pm.selection instanceof TextSelection) {
      pm.tr.insert(pm.selection.$head.pos, image.create(options)).apply();
    }
  }

  /**
   * Remove the selected image.
   */
  removeImage(): void {
    const { pm } = this;
    const { $from, $to } = pm.selection;

    if (this.isImageSelected()) {
      pm.tr.delete($from.pos, $to.pos).apply();
    }
  }

  /**
   * Update the selected image.
   */
  updateImage(options: { src?: string }): void {
    if (this.isImageSelected()) {
      this.removeImage();
      this.addImage(options);
    }
  }

  private isImageSelected(): boolean {
    const { selection } = this.pm;
    return selection instanceof NodeSelection
      && selection.node.type instanceof ImageNodeType;
  }

  private update(): void {
    const { pm } = this;
    const { $from, empty } = pm.selection;
    let dirty = false;

    const newActive = this.isImageSelected();
    if (newActive !== this.active) {
      this.active = newActive;
      dirty = true;
    }

    const newEnabled = this.canInsertImage();
    if (newEnabled !== this.enabled) {
      this.enabled = newEnabled;
      dirty = true;
    }

    const newElement = newActive
      ? this.getActiveImageElement()
      : undefined;
    if (newElement !== this.element) {
      this.element = newElement;
      dirty = true;
    }

    if (dirty) {
      this.changeHandlers.forEach(cb => cb(this));
    }
  }

  private getActiveImageElement(): HTMLElement {
    const { $from } = this.pm.selection;
    const { node, offset } = DOMFromPos(this.pm, $from.pos, true);

    if (node.childNodes.length === 0) {
      return node.parentNode;
    }

    return node.childNodes[offset];
  }

  private canInsertImage(): boolean {
    const { pm } = this;
    const { image } = pm.schema.nodes;
    const { $from, $to, empty } = pm.selection;

    return image
      && empty
      && $from.parent.canReplaceWith($from.parentOffset, $to.parentOffset, image);
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(ImageUploadState, 'name', { value: 'ImageUploadState' });

export default new Plugin(ImageUploadState);

interface S extends Schema {
  nodes: {
    image?: ImageNodeType
  }
}

interface PM extends ProseMirror {
  schema: S;
}

export type StateChangeHandler = (state: ImageUploadState) => any;
