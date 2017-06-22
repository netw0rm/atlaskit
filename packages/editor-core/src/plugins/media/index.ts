import * as assert from 'assert';

import {
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
  MediaStateManager,
  UploadParams,
} from '@atlaskit/media-core';

import { copyOptionalAttrs, MediaType } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Node as PMNode,
  NodeSelection,
  Schema,
  Transaction,
} from '../../prosemirror';
import { URL_REGEX } from '../hyperlink/regex';
import PickerFacade from './picker-facade';
import { ContextConfig } from '@atlaskit/media-core';
import { analyticsService } from '../../analytics';
import { ErrorReporter } from '../../utils';

import { MediaPluginOptions } from './media-plugin-options';
import inputRulePlugin from './input-rule';
import { ProsemirrorGetPosHandler } from '../../nodeviews';
import { nodeViewFactory } from '../../nodeviews';
import { ReactMediaGroupNode, ReactMediaNode } from '../../';

const MEDIA_RESOLVE_STATES = ['ready', 'error', 'cancelled'];
const urlRegex = new RegExp(`${URL_REGEX.source}\\b`);

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsPastingLinks: boolean = false;
  public stateManager: MediaStateManager;
  private mediaNodes: MediaNodeWithPosHandler[] = [];
  private options: MediaPluginOptions;
  private view: EditorView;
  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private useDefaultStateManager = true;
  private destroyed = false;
  private mediaProvider: MediaProvider;
  private errorReporter: ErrorReporter;

  private pickers: PickerFacade[] = [];
  private popupPicker?: PickerFacade;
  private binaryPicker?: PickerFacade;

  constructor(state: EditorState<any>, options: MediaPluginOptions) {
    this.options = options;

    const { nodes } = state.schema;
    assert(nodes.media && nodes.mediaGroup, 'Editor: unable to init media plugin - media or mediaGroup node absent in schema');

    this.stateManager = new DefaultMediaStateManager();
    options.providerFactory.subscribe('mediaProvider', (name, provider: Promise<MediaProvider>) => this.setMediaProvider(provider));

    this.errorReporter = options.errorReporter || new ErrorReporter();
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
      this.destroyPickers();

      this.allowsPastingLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();

      return;
    }

    // TODO disable (not destroy!) pickers until mediaProvider is resolved

    let resolvedMediaProvider: MediaProvider;

    try {
      resolvedMediaProvider = await mediaProvider;

      if (!resolvedMediaProvider || !resolvedMediaProvider.viewContext) {
        throw new Error(`MediaProvider promise did not resolve to a valid instance of MediaProvider - ${resolvedMediaProvider}`);
      }
    } catch (err) {
      const wrappedError = new Error(`Media functionality disabled due to rejected provider: ${err.message}`);
      this.errorReporter.captureException(wrappedError);

      this.destroyPickers();

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

    this.allowsPastingLinks = !!resolvedMediaProvider.linkCreateContext;
    this.allowsUploads = !!resolvedMediaProvider.uploadContext;

    if (this.allowsUploads) {
      const uploadContext = await resolvedMediaProvider.uploadContext;

      if (resolvedMediaProvider.uploadParams && uploadContext) {
        this.initPickers(resolvedMediaProvider.uploadParams, uploadContext);
      } else {
        this.destroyPickers();
      }
    } else {
      this.destroyPickers();
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

  insertFile = (mediaState: MediaState, collection: string): [ PMNode, Transaction ] => {
    const { view } = this;
    const { state } = view;
    const { id } = mediaState;

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);

    const node = state.schema.nodes.media!.create({
      id,
      type: 'file',
      collection
    });

    ['fileName', 'fileSize', 'fileMimeType'].forEach(key => {
      if (mediaState[key]) {
        node.attrs[`__${key}`] = mediaState[key];
      }
    });

    let transaction;

    if (this.isInsideEmptyParagraph()) {
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
    assert(binaryPicker, 'Unable to insert file because media pickers have not been initialized yet');

    binaryPicker!.upload(url, fileName);
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
          onNodeStateReady(state.id);
        }
      }

      function onNodeStateReady(id: string) {
        outstandingNodes--;
        stateManager.unsubscribe(id, onNodeStateChanged);

        if (outstandingNodes <= 0) {
          resolve();
        }
      }

      mediaNodes.forEach(({ node }) => {
        const mediaNodeId = node.attrs.id;
        const nodeCurrentStatus = this.getMediaNodeStateStatus(mediaNodeId);

        if (MEDIA_RESOLVE_STATES.indexOf(nodeCurrentStatus) !== -1) {
          onNodeStateReady(mediaNodeId);
        } else {
          stateManager.subscribe(mediaNodeId, onNodeStateChanged);
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
  handleMediaNodeRemove = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    this.handleMediaNodeRemoval(node, getPos, true);
  }

  /**
   * Nodes can be removed not only by user action but also from PM transform.
   * For example when some plugin or even user manually calls "state.tr.deleteRange(...)"
   * This function is called in this case
   */
  handleMediaNodeOutsideRemove = (id: string) => {
    const mediaNodeWithPos = this.findMediaNode(id);
    if (!mediaNodeWithPos) {
      return;
    }

    const { node, getPos } = mediaNodeWithPos;
    this.handleMediaNodeRemoval(node, getPos, false);
  }

  /**
   * Called from React UI Component on componentDidMount
   */
  handleMediaNodeMount = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    this.mediaNodes.push({ node, getPos });
  }

  /**
   * Called from React UI Component on componentWillUnmount and componentWillReceiveProps
   * when React component's underlying node property is replaced with a new node
   */
  handleMediaNodeUnmount = (oldNode: PMNode) => {
    this.mediaNodes = this.mediaNodes.filter(({ node }) => oldNode !== node);
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const { mediaNodes } = this;
    mediaNodes.splice(0, mediaNodes.length);

    this.destroyPickers();
  }

  findMediaNode = (id: string): MediaNodeWithPosHandler | null => {
    const { mediaNodes } = this;

    // Array#find... no IE support
    return mediaNodes.reduce((memo: MediaNodeWithPosHandler | null, nodeWithPos: MediaNodeWithPosHandler) => {
      if (memo) {
        return memo;
      }

      const { node } = nodeWithPos;
      if (node.attrs.id === id) {
        return nodeWithPos;
      }

      return memo;
    }, null);
  }

  private destroyPickers = () => {
    const { pickers } = this;

    pickers.forEach(picker => picker.destroy());
    pickers.splice(0, pickers.length);

    this.popupPicker = undefined;
    this.binaryPicker = undefined;
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

    const {
      errorReporter,
      pickers,
      stateManager,
    } = this;

    // create pickers if they don't exist, re-use otherwise
    if (!pickers.length) {
      pickers.push(this.binaryPicker = new PickerFacade('binary', uploadParams, context, stateManager, errorReporter));
      pickers.push(this.popupPicker = new PickerFacade('popup', uploadParams, context, stateManager, errorReporter));
      pickers.push(new PickerFacade('clipboard', uploadParams, context, stateManager, errorReporter));
      pickers.push(new PickerFacade('dropzone', uploadParams, context, stateManager, errorReporter));

      pickers.forEach(picker => picker.onNewMedia(this.handleNewMediaPicked));
    }

    // set new upload params for the pickers
    pickers.forEach(picker => picker.setUploadParams(uploadParams));
  }

  private handleNewMediaPicked = (state: MediaState) => {
    if (!this.mediaProvider.uploadParams) {
      return;
    }

    const [ node, transaction ] = this.insertFile(state, this.mediaProvider.uploadParams.collection);
    const { view } = this;

    view.dispatch(transaction);

    if (!view.hasFocus()) {
      view.focus();
    }

    this.selectInsertedMediaNode(node);
  }

  private handleMediaNodeRemoval = (node: PMNode, getPos: ProsemirrorGetPosHandler, activeUserAction: boolean) => {
    const { id } = node.attrs;
    const status = this.getMediaNodeStateStatus(id);

    switch (status) {
      case 'uploading':
      case 'processing':
        this.pickers.forEach(picker => picker.cancel(id));

        if (!activeUserAction) {
          return;
        }

        this.removeMediaNode(id);
        break;

      default:
        if (!activeUserAction) {
          return;
        }

        const { view } = this;
        const nodePos = getPos();
        const tr = view.state.tr.deleteRange(nodePos, nodePos + node.nodeSize);

        view.dispatch(tr);
        break;
    }
  }

  private handleMediaState = (state: MediaState) => {
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
        this.replaceNodeWithPublicId(state.id, state.publicId!);
        break;
    }
  }

  private notifyPluginStateSubscribers = () => {
    this.pluginStateChangeSubscribers.forEach(cb => cb.call(cb, this));
  }

  private replaceNodeWithPublicId = (temporaryId: string, publicId: string) => {
    const { view } = this;
    if (!view) {
      return;
    }

    const mediaNodeWithPos = this.findMediaNode(temporaryId);
    if (!mediaNodeWithPos) {
      return;
    }

    const {
      getPos,
      node: mediaNode,
    } = mediaNodeWithPos;

    const newNode = view.state.schema.nodes.media!.create({
      ...mediaNode.attrs,
      id: publicId,
    });

    // Copy all optional attributes from old node
    copyOptionalAttrs(mediaNode.attrs, newNode.attrs);

    // replace the old node with a new one
    const nodePos = getPos();
    const tr = view.state.tr.replaceWith(nodePos, nodePos + mediaNode.nodeSize, newNode);
    view.dispatch(tr.setMeta('addToHistory', false));
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

    const mediaNodeWithPos = this.findMediaNode(id);
    if (!mediaNodeWithPos) {
      return;
    }

    const { node, getPos } = mediaNodeWithPos;
    const nodePos = getPos();
    const tr = view.state.tr.deleteRange(nodePos, nodePos + node.nodeSize);
    view.dispatch(tr.setMeta('addToHistory', false));
  }

  private selectInsertedMediaNode = (node: PMNode) => {
    // by this time node has already been mounted
    const mediaNodeWithPos = this.findMediaNode(node.attrs.id);
    if (!mediaNodeWithPos) {
      return;
    }

    const { view } = this;
    const { doc, tr } = view.state;
    const { getPos } = mediaNodeWithPos;
    const pos = doc.resolve(getPos());
    const selection = new NodeSelection(pos);

    view.dispatch(tr.setSelection(selection));
  }

  /**
   * Since we replace nodes with public id when node is finalized
   * stateManager contains no information for public ids
   */
  private getMediaNodeStateStatus = (id: string) => {
    const { stateManager } = this;
    const state = stateManager.getState(id);

    return (state && state.status) || 'ready';
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
      nodeViews: {
        mediaGroup: nodeViewFactory(options.providerFactory, {
          mediaGroup: ReactMediaGroupNode,
          media: ReactMediaNode,
        }, true),
      },
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

function extractFirstURLFromString(string: string) {
  const search = urlRegex.exec(string);
  if (!search) {
    return;
  }

  return search ? search[0] : null;
}
