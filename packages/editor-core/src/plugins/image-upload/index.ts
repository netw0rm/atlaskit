import { analyticsService } from '../../analytics';
import {
  DOMFromPos,
  NodeSelection,
  Plugin,
  ProseMirror,
  Schema,
} from '../../prosemirror';
import { ImageNodeType } from '../../schema';
import DropAdapter from './drop-adapter';
import PasteAdapter from './paste-adapter';

export interface ImageUploadPluginOptions {
  defaultHandlersEnabled?: boolean;
  supportedImageTypes?: string[];
  maxFileSizeInBytes: number;
}

export type ImageUploadHandler = (e: any, insertImageFn: any) => void;

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
  uploadHandler?: ImageUploadHandler;
  src?: string = undefined;
  element?: HTMLElement = undefined;

  constructor(pm: PM, options: ImageUploadPluginOptions) {
    this.pm = pm;
    this.pasteAdapter = new PasteAdapter(pm);
    this.dropAdapter = new DropAdapter(pm);
    this.config = { ...DEFAULT_OPTIONS, ...options };
    this.hidden = !pm.schema.nodes.image;
    this.enabled = this.canInsertImage();

    pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());

    this.pasteAdapter.add(() => {
      analyticsService.trackEvent('atlassian.editor.image.paste');
      return true;
    });

    this.dropAdapter.add(() => {
      analyticsService.trackEvent('atlassian.editor.image.drop');
      return true;
    });

    this.dropAdapter.add(this.handleImageUpload);
    this.pasteAdapter.add(this.handleImageUpload);

    this.update(true);
  }

  handleImageUpload = (_?: any, e?: any): boolean => {
    const { uploadHandler } = this;

    if (!uploadHandler) {
      return false;
    }

    uploadHandler(e, this.addImage);

    return true;
  }

  subscribe = (cb: StateChangeHandler): void => {
    this.changeHandlers.push(cb);
    cb(this);
  }

  unsubscribe(cb: StateChangeHandler) {
    this.changeHandlers = this.changeHandlers.filter(ch => ch !== cb);
  }

  /**
   * Insert an image at the current selection.
   */
  addImage = (options: { src?: string }): void => {
    const { pm } = this;
    const { image } = pm.schema.nodes;
    if (this.enabled && image) {
      pm.tr.insert(pm.selection.$to.pos, image.create(options)).apply();
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

  private update(dirty = false): void {

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
      return node.parentElement!;
    }

    return node.childNodes[offset] as HTMLElement;
  }

  private canInsertImage(): boolean {
    const { pm } = this;
    const { image } = pm.schema.nodes;
    const { $to} = pm.selection;

    return !!image
      && $to.parent.canReplaceWith($to.parentOffset, $to.parentOffset, image);
  }
}

// IE11 + multiple prosemirror fix.
Object.defineProperty(ImageUploadState, 'name', { value: 'ImageUploadState' });

export default new Plugin(ImageUploadState);

export interface S extends Schema {
  nodes: {
    image?: ImageNodeType
  };
}

export interface PM extends ProseMirror {
  schema: S;
}

export type StateChangeHandler = (state: ImageUploadState) => any;
