import { Plugin, ProseMirror } from 'prosemirror/dist/edit';
import { UpdateScheduler } from 'prosemirror/dist/edit/update';
import { ResolvedPos } from 'prosemirror/dist/model/resolvedpos';
import { DOMFromPos as getDomElementFromPosition } from 'prosemirror/dist/edit/dompos';
import { Node } from 'prosemirror/dist/model';

import PasteAdapter from './paste-adapter';
import DropAdapter from './drop-adapter';

export interface ImageUploadPluginOptions {
  defaultHandlersEnabled?: boolean;
  supportedImageTypes?: Array<string>;
  maxFileSizeInBytes: number;
}

export interface ImageUploadOptions {
  src?: string;
  alt?: string;
  title?: string;
}

export interface ImageUploadState extends ImageUploadOptions {
  active?: boolean;
  enabled?: boolean;
  element?: HTMLElement;
}

export type StateChangeHandler = (state: ImageUploadState) => any;

export const DISABLED_GROUP = 'non-insertable-image';

const DEFAULT_STATE: ImageUploadState = {
  active: false,
  enabled: true,
  alt: '',
  title: '',
  src: '',
};

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

function getDomElement(
  pm: ProseMirror,
  pos: number
) : HTMLElement {
  const {
    node,
    offset,
  } = getDomElementFromPosition(pm, pos, true);

  if (node.childNodes.length === 0) {
    return node.parentNode;
  }

  return node.childNodes[offset];
}

function isNodeInsertable(
  proseMirrorInstance: ProseMirror,
  node: Node
) : boolean {
  const nodeType = node.type.name;
  const nodeSpecOrderedMap = proseMirrorInstance.schema.nodeSpec;
  return nodeSpecOrderedMap.get(nodeType).group.split(' ')
      .indexOf(DISABLED_GROUP) === -1;
}

function isShallowObjectEqual(
  oldObject: ImageUploadState,
  newObject: ImageUploadState
) : boolean {
  return JSON.stringify(oldObject) === JSON.stringify(newObject);
}

export default new Plugin(class ImageUploadPlugin {
  changeHandlers: StateChangeHandler[];
  name: string;
  pasteAdapter: PasteAdapter;
  dropAdapter: DropAdapter;
  pm: ProseMirror;
  state: ImageUploadState;
  updater: UpdateScheduler;
  config: ImageUploadPluginOptions;

  constructor(pm: ProseMirror, options: ImageUploadPluginOptions) {
    this.pm = pm;
    this.pasteAdapter = new PasteAdapter(pm);
    this.dropAdapter = new DropAdapter(pm);
    this.state = DEFAULT_STATE;
    this.config = Object.assign({}, DEFAULT_OPTIONS, options);
    this.changeHandlers = [];

    this.updater = pm.updateScheduler([
      pm.on.selectionChange,
      pm.on.change,
      pm.on.activeMarkChange,
    ], () => this.update());
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  getState(): ImageUploadState {
    return Object.assign({}, this.state);
  }

  // When typescript spread operator is implemented we can remove this boiler
  // plate in favour of spread assignment
  setState(...newState: ImageUploadState[]): ImageUploadState {
    this.state = Object.assign.apply(
      Object,
      [
        {},
        DEFAULT_STATE,
      ].concat(newState)
    );
    return this.state;
  }

  update() {
    const pm = this.pm;
    const {
      $head,
      $from,
      $to,
      node,
    } = pm.selection;
    const oldState = this.getState();

    const $resolvedPos: ResolvedPos = $head || $to;
    const activeNode: Node = pm.doc.nodeAt($resolvedPos.pos);
    const isImage: Node = node && node.type.name === 'image' ? node : null;
    const isInsertable: boolean | undefined = activeNode ? isNodeInsertable(pm, activeNode) : oldState.enabled;

    if (isImage) {
      this.setState(
        isImage.attrs,
        {
          active: true,
          element: getDomElement(pm, $from.pos),
        }
      );
    } else if (!isInsertable) {
      this.setState(
        {
          enabled: false,
        }
      );
    } else {
      this.setState();
    }

    if (!isShallowObjectEqual(oldState, this.state)) {
      this.changeHandlers.every((cb: StateChangeHandler) => cb(this.getState()));
    }
  }

  onChange(cb: StateChangeHandler) {
    this.changeHandlers.push(cb);
  }

  addImage(options: ImageUploadOptions) : boolean {
    const pm = this.pm;
    const selection = pm.selection;
    const {
      $to,
      $head,
      node,
    } = selection;
    const $resolvedPos = $head || $to;
    const isImage: Node = node && node.type.name === 'image' ? node : null;
    const {
      enabled,
    } = this.getState();

    if (!enabled || isImage) {
      return false;
    }

    pm.tr.insert(
      $resolvedPos.pos,
      pm.schema.nodes.image.create(options)
    ).apply();

    return true;
  }

  removeImage() : boolean {
    const pm = this.pm;
    const selection = pm.selection;
    const {
      $from,
      $to,
      node,
    } = selection;

    const isImage = node && node.type.name === 'image' ? node : null;

    if (!isImage) {
      return false;
    }

    pm.tr.delete(
      $from.pos,
      $to.pos
    ).apply();

    return true;
  }

  updateImage(options: ImageUploadOptions) {
    if (!options || !this.removeImage()) {
      return false;
    }

    return this.addImage(options);
  }
});
