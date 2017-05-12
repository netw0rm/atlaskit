import * as assert from 'assert';

import {
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
  MediaStateManager,
  UploadParams,
} from '@atlaskit/media-core';

import { MediaType } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Node,
  NodeSelection,
  Schema,
  Transaction,
  closeHistory
} from '../../prosemirror';
import { URL_REGEX } from '../hyperlink/regex';
import PickerFacade from './picker-facade';
import { ContextConfig } from '@atlaskit/media-core';
import { analyticsService } from '../../analytics';

import { MediaPluginBehavior, MediaPluginOptions } from './media-plugin-options';
import inputRulePlugin from './input-rule';

const MEDIA_RESOLVE_STATES = ['ready', 'error', 'cancelled'];
const urlRegex = new RegExp(`${URL_REGEX.source}\\b`);

export type MediaPluginBehavior = MediaPluginBehavior;

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsPastingLinks: boolean = false;
  public stateManager: MediaStateManager;
  private mediaNodes: PositionedNode[] = [];
  private options: MediaPluginOptions;
  private view: EditorView;
  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private useDefaultStateManager = true;
  private destroyed = false;
  private mediaProvider: MediaProvider;
  private pickers: PickerFacade[] = [];
  private popupPicker?: PickerFacade;
  private binaryPicker?: PickerFacade;

  constructor(state: EditorState<any>, options: MediaPluginOptions) {
    this.options = options;

    const { nodes } = state.schema;
    assert(nodes.media && nodes.mediaGroup, 'Editor: unable to init media plugin - media or mediaGroup node absent in schema');

    this.stateManager = new DefaultMediaStateManager();
    options.providerFactory.subscribe('mediaProvider', (name, provider: Promise<MediaProvider>) => this.setMediaProvider(provider));
  }

  subscribe(cb: PluginStateChangeSubscriber) {
    this.pluginStateChangeSubscribers.push(cb);
    cb(this);
  }

  unsubscribe(cb: PluginStateChangeSubscriber) {
    const { pluginStateChangeSubscribers } = this;
    const pos = pluginStateChangeSubscribers.indexOf(cb);

    if (pos > -1) {
      pluginStateChangeSubscribers.splice(pos, 1);
    }
  }

  setMediaProvider = async (mediaProvider?: Promise<MediaProvider>) => {
    if (!mediaProvider) {
      this.allowsPastingLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();

      return;
    }

    let resolvedMediaProvider;

    try {
      resolvedMediaProvider = await mediaProvider;
    } catch (err) {
      console.error('Editor Media Provider promise was rejected. Media functionality will be disabled.', err);

      this.allowsPastingLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();

      return;
    }

    this.mediaProvider = resolvedMediaProvider;
    this.allowsMedia = true;

    // release all listeners for default state manager
    const { stateManager } = resolvedMediaProvider;
    if (stateManager && this.useDefaultStateManager) {
      (stateManager as DefaultMediaStateManager).destroy();
      this.useDefaultStateManager = false;
    }

    if (stateManager) {
      this.stateManager = stateManager;
    }

    this.allowsPastingLinks = Boolean(resolvedMediaProvider.linkCreateContext);
    this.allowsUploads = Boolean(resolvedMediaProvider.uploadContext);

    if (this.allowsUploads) {
      const uploadContext = await resolvedMediaProvider.uploadContext;

      // TODO: re-initialize pickers ?
      if (resolvedMediaProvider.uploadParams) {
        if (this.popupPicker) {
          this.popupPicker.setUploadParams(resolvedMediaProvider.uploadParams);
        }

        this.initPickers(resolvedMediaProvider.uploadParams, uploadContext);
      }
    }

    this.notifyPluginStateSubscribers();
  }

  insertLinkFromUrl = (url: string) => {
    const state = this.view.state;

    return state.tr.insert(
      this.findInsertPosition(),
      state.schema.nodes.media.create({ url, type: 'link' })
    );
  }

  insertFile = (mediaState: MediaState, collection: string): [ Node, Transaction ] => {
    const { options, view } = this;
    const { state } = view;
    const { id } = mediaState;

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);

    const node = state.schema.nodes.media!.create({
      id,
      type: 'file',
      collection
    }) as PositionedNode;

    let transaction;

    if (this.isInsideEmptyParagraph() && options.behavior !== 'compact') {
      const { $from } = state.selection;

      // empty paragraph always exists inside the document
      if (state.doc.childCount === 1) {
        // add media group before this empty paragraph
        transaction = state.tr.insert($from.start($from.depth) - 1, node);
      } else {
        // replace this empty paragraph with media group
        transaction = state.tr.replaceWith(
          $from.start($from.depth) - 1,
          $from.end($from.depth) + 1,
          node
        );
      }
    } else {
      transaction = state.tr.insert(this.findInsertPosition(), node);
    }

    return [ node, transaction ];
  }

  insertFileFromDataUrl = (url: string, fileName: string) => {
    const { binaryPicker } = this;

    if (!binaryPicker) {
      throw new Error('Unable to insert file because media pickers have not been initialized yet');
    }

    binaryPicker.upload(url, fileName);
  }

  showMediaPicker = () => {
    if (!this.popupPicker) {
      return;
    }

    this.popupPicker.show();
  }

  /**
   * Returns a promise that is resolved after all pending operations have been finished.
   * An optional timeout will cause the promise to reject if the operation takes too long
   *
   * NOTE: The promise will resolve even if some of the media have failed to process.
   *
   */
  waitForPendingTasks = (timeout?: Number) => {
    const { mediaNodes, stateManager } = this;

    return new Promise<void>((resolve, reject) => {
      if (timeout) {
        setTimeout(() => reject(new Error(`Media operations did not finish in ${timeout} ms`)), timeout);
      }

      let outstandingNodes = mediaNodes.length;
      if (!outstandingNodes) {
        return resolve();
      }

      function onNodeStateChanged(state: MediaState) {
        const { status } = state;

        if (MEDIA_RESOLVE_STATES.indexOf(status || '') !== -1) {
          onNodeStateReady(state);
        }
      }

      function onNodeStateReady(state: MediaState) {
        outstandingNodes--;
        stateManager.unsubscribe(state.id, onNodeStateChanged);

        if (outstandingNodes <= 0) {
          resolve();
        }
      }

      mediaNodes.forEach(node => {
        const internalId = node.attrs.id;
        const nodeCurrentState = stateManager.getState(internalId)!;
        const nodeCurrentStatus = nodeCurrentState.status || '';

        if (MEDIA_RESOLVE_STATES.indexOf(nodeCurrentStatus) !== -1) {
          onNodeStateReady(nodeCurrentState);
        } else {
          stateManager.subscribe(internalId, onNodeStateChanged);
        }
      });
    });
  }

  setView(view: EditorView) {
    this.view = view;
  }

  /**
   * Called from React UI Component when user clicks on "Delete" icon
   * inside of it
   */
  handleMediaNodeRemove = (node: PositionedNode) => {
    const { stateManager, pickers } = this;
    const { id } = node.attrs;
    const state = stateManager.getState(id);

    if (!state) {
      return;
    }

    switch (state.status) {
      // In-flight media items that we should cancel
      case 'uploading':
      case 'processing':
        pickers.forEach(picker => picker.cancel(id));

        // In case the file has been attached multiple times, remove all occurences
        this.removeMediaNode(id);
        break;

      case 'ready':
        const { view } = this;
        const nodePos = node.getPos();
        const tr = view.state.tr.deleteRange(nodePos, nodePos + node.nodeSize);

        view.dispatch(tr);
        break;
    }
  }

  /**
   * Called from React UI Component on componentDidMount
   */
  handleMediaNodeMount = (node: PositionedNode) => {
    this.mediaNodes.push(node);
  }

  /**
   * Called from React UI Component on componentWillUnmount.
   * This also means that we can't no longer use its underlying PM node's getPos()
   */
  handleMediaNodeUnmount = (oldNode: PositionedNode) => {
    this.mediaNodes = this.mediaNodes.filter(node => oldNode !== node);
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const { pickers, mediaNodes } = this;

    pickers.forEach(picker => picker.destroy());
    pickers.splice(0, pickers.length);
    mediaNodes.splice(0, mediaNodes.length);
    this.popupPicker = undefined;
  }

  private findMediaNode = (id: string): PositionedNode | null => {
    const { mediaNodes } = this;

    // Array#find... no IE support
    return mediaNodes.reduce((memo: PositionedNode | null, node: PositionedNode) => {
      if (memo) {
        return memo;
      }

      if (node.attrs.id === id) {
        return node;
      }

      return memo;
    }, null);
  }

  /**
   * Determine whether the cursor is inside empty paragraph
   */
  private isInsideEmptyParagraph = () => {
    const { state } = this.view;
    const { $from, empty } = state.selection;

    if (!empty) {
      return false;
    }

    return (
      $from.parent.type === state.schema.nodes.paragraph &&
      !$from.parent.content.childCount
    );
  }

  /**
   * Determine best PM document position to insert a new media item at.
   */
  private findInsertPosition = () => {
    const state = this.view.state;
    const $from = state.selection.$from;

    // Check if we're already in a media group and prepend the element inside the group
    if ($from.parent.type === state.schema.nodes.mediaGroup) {
      return $from.start($from.depth);
    }

    // Resolve node adjacent to parent
    const adjacentPos = $from.end($from.depth) + 1;
    const adjacentNode = state.doc.nodeAt(adjacentPos);

    // There's nothing below, so insert a new media item wrapped in a group there.
    if (!adjacentNode) {
      return adjacentPos;
    }

    // TODO: review this for HCNG
    // Compact behavior disallows multiple media groups, so prepend the item inside
    // if (this.behavior === 'compact' && adjacentNode.type instanceof MediaGroupNodeType) {
      // return adjacentPos + 1;
    // }

    // The adjacent node is a media group, so let's append there...
    if (adjacentNode.type === state.schema.nodes.mediaGroup) {
      return adjacentPos + 1;
    }

    // Prepend the item, wrapped in a new group, adjacent to parent
    return adjacentPos;
  }

  private initPickers(uploadParams: UploadParams, context: ContextConfig) {
    if (this.destroyed) {
      return;
    }

    const { stateManager, pickers } = this;

    pickers.push(this.binaryPicker = new PickerFacade('binary', uploadParams, context, stateManager));
    pickers.push(this.popupPicker = new PickerFacade('popup', uploadParams, context, stateManager));
    pickers.push(new PickerFacade('clipboard', uploadParams, context, stateManager));
    pickers.push(new PickerFacade('dropzone', uploadParams, context, stateManager));

    pickers.forEach(picker => picker.onNewMedia(this.handleNewMediaPicked));
  }

  private handleNewMediaPicked = (state: MediaState) => {
    if (!this.mediaProvider.uploadParams) {
      return;
    }

    const [ node, transaction ] = this.insertFile(state, this.mediaProvider.uploadParams.collection);
    const { options, view } = this;

    view.dispatch(transaction);

    if (options.behavior !== 'compact') {
      this.selectInsertedMediaNode(node as PositionedNode);
    }
  }

  private handleMediaState = (state: MediaState) => {
    console.log(state);
    switch (state.status) {
      case 'error':
        // TODO: we would like better error handling and retry support here.
        this.removeMediaNode(state.id);

        const { uploadErrorHandler } = this.options;

        if (uploadErrorHandler) {
          uploadErrorHandler(state);
        }
        break;

      case 'ready':
        this.stateManager.unsubscribe(state.id, this.handleMediaState);
        this.addPublicId(state.id, state.publicId!);
        break;
    }
  }

  private notifyPluginStateSubscribers = () => {
    this.pluginStateChangeSubscribers.forEach(cb => cb.call(cb, this));
  }

  private addPublicId = (internalId: string, publicId: string) => {
    const { view } = this;
    if (!view) {
      return;
    }

    const mediaNode = this.findMediaNode(internalId);
    if (!mediaNode) {
      return;
    }

    const newNode: PositionedNode = view.state.schema.nodes.media!.create({
      ...mediaNode.attrs,
      publicId
    });

    const nodePos = mediaNode.getPos();
    const tr = view.state.tr.replaceWith(nodePos, nodePos + mediaNode.nodeSize, newNode);
    view.dispatch(tr);
  }

  /**
   * Called when:
   * 1) user wants to delete the node when is hasn't been finalized (not ready) from UI
   * 2) when upload process finished with "error" status
   * In both cases we just delete the PM node from the document
   */
  private removeMediaNode = (id: string) => {
    const { view } = this;
    if (!view) {
      return;
    }

    const mediaNode = this.findMediaNode(id);
    if (!mediaNode) {
      return;
    }

    const nodePos = mediaNode.getPos();
    const tr = view.state.tr.deleteRange(nodePos, nodePos + mediaNode.nodeSize);
    view.dispatch(tr);
  }

  private selectInsertedMediaNode = (node: PositionedNode) => {
    const { view } = this;
    const { doc, tr } = view.state;
    const pos = doc.resolve(node.getPos());
    const selection = new NodeSelection(pos);

    view.dispatch(tr.setSelection(selection));
  }
}

export const stateKey = new PluginKey('mediaPlugin');

function mediaPluginFactory(options: MediaPluginOptions) {
  return new Plugin({
    state: {
      init(config, state) {
        return new MediaPluginState(state, options);
      },
      apply(tr, pluginState, oldState, newState) {
        // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
        //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
        //       transformations from within the plugin state (i.e. when adding a new file).
        return pluginState;
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      const pluginState = stateKey.getState(view.state);
      pluginState.setView(view);

      return {};
    },
    props: {
      handleDOMEvents: {
        paste(view: EditorView, event: ClipboardEvent) {
          const pluginState: MediaPluginState = stateKey.getState(view.state);

          if (!pluginState.allowsPastingLinks) {
            return false;
          }

          const text = event.clipboardData.getData('text/plain');

          if (!text) {
            return false;
          }

          const url = extractFirstURLFromString(text);
          if (!url) {
            return false;
          }

          view.state.apply(pluginState.insertLinkFromUrl(url));
          analyticsService.trackEvent('atlassian.editor.media.link.paste');

          // The URL is inserted as a Media Link item, however we do not return true
          // so we're not preventing a text link (mark) to be added as well.
          return false;
        }
      }
    }
  });
}

const plugins = (schema: Schema<any, any>, options: MediaPluginOptions) => {
  const plugin = mediaPluginFactory(options);
  return [plugin, inputRulePlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

export interface MediaData {
  id: string;
  type?: MediaType;
}

export interface PositionedNode extends Node {
  getPos: () => number;
}

function extractFirstURLFromString(string: string) {
  const search = urlRegex.exec(string);
  if (!search) {
    return;
  }

  return search ? search[0] : null;
}
