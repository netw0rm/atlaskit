import * as assert from 'assert';

import {
  Context,
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
  MediaStateManager,
  UploadParams,
  ContextConfig,
  ContextFactory,
} from '@atlaskit/media-core';

import { copyOptionalAttrs, MediaType } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Node as PMNode,
  Schema,
  Transaction,
  NodeSelection,
  Mark,
} from '../../prosemirror';
import PickerFacade from './picker-facade';
import { ErrorReporter } from '../../utils';

import { MediaPluginOptions } from './media-plugin-options';
import { ProsemirrorGetPosHandler } from '../../nodeviews';
import { nodeViewFactory } from '../../nodeviews';
import { ReactMediaGroupNode, ReactMediaNode } from '../../';
import keymapPlugin from './keymap';
import { insertLinks, RangeWithUrls, detectLinkRangesInSteps } from './media-links';
import { insertFile } from './media-files';
import { removeMediaNode, splitMediaGroup } from './media-common';
import * as commands from '../../commands';

const MEDIA_RESOLVE_STATES = ['ready', 'error', 'cancelled'];

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsLinks: boolean = false;
  public stateManager: MediaStateManager;
  public pickers: PickerFacade[] = [];
  public binaryPicker?: PickerFacade;
  public ignoreLinks: boolean = false;
  public selectedMediaElement: HTMLElement | undefined;
  public toolbarVisible: boolean = false;
  private mediaNodes: MediaNodeWithPosHandler[] = [];
  private options: MediaPluginOptions;
  private view: EditorView;
  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private useDefaultStateManager = true;
  private destroyed = false;
  private mediaProvider: MediaProvider;
  private errorReporter: ErrorReporter;
  private selectedMediaNode: PMNode | undefined;

  private popupPicker?: PickerFacade;
  private linkRanges: RangeWithUrls[];

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

      this.allowsLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();

      return;
    }

    // TODO disable (not destroy!) pickers until mediaProvider is resolved

    let resolvedMediaProvider: MediaProvider;

    try {
      resolvedMediaProvider = await mediaProvider;

      assert(
        resolvedMediaProvider && resolvedMediaProvider.viewContext,
        `MediaProvider promise did not resolve to a valid instance of MediaProvider - ${resolvedMediaProvider}`
      );
    } catch (err) {
      const wrappedError = new Error(`Media functionality disabled due to rejected provider: ${err.message}`);
      this.errorReporter.captureException(wrappedError);

      this.destroyPickers();

      this.allowsLinks = false;
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

    this.allowsLinks = !!resolvedMediaProvider.linkCreateContext;
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

  insertFile = (mediaState: MediaState): void => {
    const collection = this.collectionFromProvider();
    if (!collection) {
      return;
    }

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);

    insertFile(this.view, mediaState, collection);

    const { view } = this;
    if (!view.hasFocus()) {
      view.focus();
    }
  }

  insertLinks = async () => {
    const { mediaProvider } = this;

    if (!mediaProvider) {
      return;
    }

    const { linkCreateContext } = this.mediaProvider;

    if (!linkCreateContext) {
      return;
    }

    let linkCreateContextInstance = await linkCreateContext;
    if (!linkCreateContextInstance) {
      return;
    }

    if (!(linkCreateContextInstance as Context).addLinkItem) {
      linkCreateContextInstance = ContextFactory.create(linkCreateContextInstance as ContextConfig);
    }

    return insertLinks(this.view, this.linkRanges, linkCreateContextInstance as Context, this.collectionFromProvider());
  }

  splitMediaGroup = (): boolean => {
    return splitMediaGroup(this.view);
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

  alignLeft(): void {
    if (!this.toolbarVisible) {
      return;
    }

    const { dispatch, state } = this.view;
    const { $from, $to, node } = state.selection as NodeSelection;

    const newNode= node.copy();
    newNode.attrs.width = this.view.dom.getBoundingClientRect().width / 2;

    dispatch(state.tr.replaceSelectionWith(newNode));

    dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.singleImage, {alignment: 'left'}));

    this.updateSelectedMediaNode();
  }

  alignRight(): void {
    if (!this.toolbarVisible) {
      return;
    }

    const { dispatch, state } = this.view;
    const { $from, $to, node } = state.selection as NodeSelection;

    const newNode= node.copy();
    newNode.attrs.width = this.view.dom.getBoundingClientRect().width / 2;

    dispatch(state.tr.replaceSelectionWith(newNode));

    dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.singleImage, {alignment: 'right'}));

    this.updateSelectedMediaNode();
  }

  alignCenter(): void {
    if (!this.toolbarVisible) {
      return;
    }

    const { dispatch, state } = this.view;
    const { $from, $to, node } = state.selection as NodeSelection;

    const newNode= node.copy();
    newNode.attrs.width = 0;

    dispatch(state.tr.replaceSelectionWith(newNode));

    dispatch(state.tr.setBlockType($from.pos, $to.pos, state.schema.nodes.mediaGroup));

    this.updateSelectedMediaNode();
  }

  /**
   * Called from React UI Component when user clicks on "Delete" icon
   * inside of it
   */
  handleMediaNodeRemoval = (node: PMNode, getPos: ProsemirrorGetPosHandler) => {
    removeMediaNode(this.view, node, getPos);
  }

  /**
   * This is called when media node is removed from media group node view
   */
  cancelInFlightUpload(id: string) {
    const mediaNodeWithPos = this.findMediaNode(id);
    if (!mediaNodeWithPos) {
      return;
    }
    const status = this.getMediaNodeStateStatus(id);

    switch (status) {
      case 'uploading':
      case 'processing':
        this.pickers.forEach(picker => picker.cancel(id));
    }
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

  detectLinkRangesInSteps = (tr: Transaction) => {
    const { link } = this.view.state.schema.marks;
    this.linkRanges = [];

    if (this.ignoreLinks) {
      this.ignoreLinks = false;
      return this.linkRanges;
    }

    if (!link || !this.allowsLinks) {
      return this.linkRanges;
    }

    this.linkRanges = detectLinkRangesInSteps(tr, link);
  }

  private destroyPickers = () => {
    const { pickers } = this;

    pickers.forEach(picker => picker.destroy());
    pickers.splice(0, pickers.length);

    this.popupPicker = undefined;
    this.binaryPicker = undefined;
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

      pickers.forEach(picker => picker.onNewMedia(this.insertFile));
    }

    // set new upload params for the pickers
    pickers.forEach(picker => picker.setUploadParams(uploadParams));
  }

  private collectionFromProvider(): string | undefined {
    return this.mediaProvider && this.mediaProvider.uploadParams && this.mediaProvider.uploadParams.collection;
  }

  private handleMediaState = (state: MediaState) => {
    switch (state.status) {
      case 'error':
        // TODO: we would like better error handling and retry support here.
        const mediaNodeWithPos = this.findMediaNode(state.id);
        if (mediaNodeWithPos) {
          removeMediaNode(this.view, mediaNodeWithPos.node, mediaNodeWithPos.getPos);
        }

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

  updateSelectedMediaNode(): void {
    let selectedMediaNode;
    if (this.isMediaNodeSelection()) {
      const { node } = this.view.state.selection as NodeSelection;
      selectedMediaNode = node;
    } else {
      selectedMediaNode = undefined;
    }

    if (this.selectedMediaNode !== selectedMediaNode) {
      this.selectedMediaNode = selectedMediaNode;
      this.selectedMediaElement = this.getSelectedMediaElement() as HTMLElement;
      this.toolbarVisible = !!this.selectedMediaElement && this.isOnlyChild();
      this.notifyPluginStateSubscribers();
    }
  }

  private isOnlyChild(): boolean {
    return this.view.state.selection.$from.parent.childCount === 1;
  }

  private getSelectedMediaElement(): Node | undefined {
    if (!this.selectedMediaNode) {
      return;
    }

    const mediaNodeWithPos = this.findMediaNode(this.selectedMediaNode.attrs.id);

    if (!mediaNodeWithPos) {
      return;
    }

    const { docView, state } = this.view;
    const mediaNodeStartPos = mediaNodeWithPos.getPos();
    const { node } = docView.domFromPos(mediaNodeWithPos.getPos());

    const $mediaNodeStartPos = state.doc.resolve(mediaNodeStartPos);
    const index = $mediaNodeStartPos.index($mediaNodeStartPos.depth);
    const mediaGroupElement = (node as HTMLElement).querySelector('ul');

    if (!mediaGroupElement) {
      return;
    }

    const mediaCardElement = (mediaGroupElement.childNodes[index] as HTMLElement)
      .querySelector('.media-card') as HTMLElement;

    return mediaCardElement;
  }

  removeSelectedMediaNode = (): boolean => {
    const { view } = this;
    if (this.isMediaNodeSelection()) {
      const { from, node } = view.state.selection as NodeSelection;
      removeMediaNode(view, node, () => from);
      return true;
    }
    return false;
  }

  private isMediaNodeSelection() {
    const { selection, schema } = this.view.state;
    return selection instanceof NodeSelection && selection.node.type === schema.nodes.media;
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

export const createPlugin = (schema: Schema<any, any>, options: MediaPluginOptions) => {
  return new Plugin({
    state: {
      init(config, state) {
        return new MediaPluginState(state, options);
      },
      apply(tr, pluginState: MediaPluginState, oldState, newState) {
        pluginState.detectLinkRangesInSteps(tr);

        // Ignore creating link cards during link editing
        const { link } = oldState.schema.marks as { link: Mark };
        const { nodeAfter, nodeBefore } = oldState.selection.$from;

        if ((nodeAfter && link.isInSet(nodeAfter.marks)) ||
          (nodeBefore && link.isInSet(nodeBefore.marks))
        ) {
          pluginState.ignoreLinks = true;
        }

        // NOTE: We're not calling passing new state to the Editor, because we depend on the view.state reference
        //       throughout the lifetime of view. We injected the view into the plugin state, because we dispatch()
        //       transformations from within the plugin state (i.e. when adding a new file).
        return pluginState;
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      const pluginState: MediaPluginState = stateKey.getState(view.state);
      pluginState.setView(view);

      return {
        update: (view: EditorView, prevState: EditorState<any>) => {
          pluginState.insertLinks();
        }
      };
    },
    props: {
      nodeViews: {
        mediaGroup: nodeViewFactory(options.providerFactory, {
          mediaGroup: ReactMediaGroupNode,
          media: ReactMediaNode,
        }, true),
        media: nodeViewFactory(options.providerFactory, {
          media: ReactMediaNode,
        }),
      },
      handleTextInput(view: EditorView, from: number, to: number, text: string): boolean {
        const pluginState: MediaPluginState = stateKey.getState(view.state);
        pluginState.splitMediaGroup();
        return false;
      }
    }
  });
};

const plugins = (schema: Schema<any, any>, options: MediaPluginOptions) => {
  return [createPlugin(schema, options), keymapPlugin(schema)].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

export interface MediaData {
  id: string;
  type?: MediaType;
}
