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
  TextSelection,
  Schema,
  AddMarkStep,
  ReplaceStep,
  Transaction,
  MarkType,
  Fragment,
} from '../../prosemirror';
import PickerFacade from './picker-facade';
import { ContextConfig } from '@atlaskit/media-core';
import {
  ErrorReporter, atTheEndOfDoc, atTheEndOfBlock, atTheBeginningOfBlock,
  endPositionOfParent, startPositionOfParent
} from '../../utils';

import { MediaPluginOptions } from './media-plugin-options';
import { ProsemirrorGetPosHandler } from '../../nodeviews';
import { nodeViewFactory } from '../../nodeviews';
import { ReactMediaGroupNode, ReactMediaNode } from '../../';

const MEDIA_RESOLVE_STATES = ['ready', 'error', 'cancelled'];

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;

export interface MediaNodeWithPosHandler {
  node: PMNode;
  getPos: ProsemirrorGetPosHandler;
}

export interface Range {
  start: number;
  end: number;
}

export interface RangeWithUrls extends Range {
  urls: string[];
}

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsLinks: boolean = false;
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

  private insertMedia = (node: PMNode): void => {
    const { view } = this;
    const { state } = view;
    const { $to } = state.selection;
    let transaction = state.tr;

    // insert a paragraph after if reach the end of doc
    // and there is no media group in the front or selection is a non media block node
    if (atTheEndOfDoc(state) && (!this.posOfMediaGroupExistsAsAnAjacentNodeBefore(state) || this.isSelectionNonMediaBlockNode())) {
      const paragraphInsertPos = this.isSelectionNonMediaBlockNode() ? $to.pos : $to.pos + 1;
      transaction = transaction.insert(paragraphInsertPos, state.schema.nodes.paragraph.create());
    }

    const mediaInsertPos = this.findMediaInsertPos();

    // delete the selection or empty paragraph
    const deleteRange = this.findDeleteRange();

    if (!deleteRange) {
      transaction = transaction.insert(mediaInsertPos, node);
    } else if (mediaInsertPos <= deleteRange.start) {
      transaction = transaction.deleteRange(deleteRange.start, deleteRange.end).insert(mediaInsertPos, node);
    } else {
      transaction = transaction.insert(mediaInsertPos, node).deleteRange(deleteRange.start, deleteRange.end);
    }

    view.dispatch(transaction);

    this.setSelectionAfterMediaInsertion(node);
  }

  private createMediaFileNode = (mediaState: MediaState, collection: string): PMNode => {
    const { view } = this;
    const { state } = view;
    const { id } = mediaState;

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

    return node;
  }

  insertFile = (mediaState: MediaState, fileData = this.mediaDataFromProvider()): void => {
    if (!fileData) {
      return;
    }

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);
    const node = this.createMediaFileNode(mediaState, fileData);

    this.insertMedia(node);

    const { view } = this;
    if (!view.hasFocus()) {
      view.focus();
    }
  }

  insertLinkFromUrl = (url: string) => {
    this.insertMedia(this.view.state.schema.nodes.media.create({ url, type: 'link' }));
  }

  // insertLinks = (): void => {
  //   const { state } = this.view;
  //   const { tr } = state;
  //   const { linkRanges } = this;
  //   if (linkRanges.length <= 0) {
  //     return;
  //   }

  //   let linksInfo = { latestPos: 0, urls: [] as String[] };

  //   linksInfo = linkRanges.reduce((linksInfo, rangeWithUrl) => {
  //     linksInfo.urls = linksInfo.urls.concat(rangeWithUrl.urls);
  //     if (rangeWithUrl.end > linksInfo.latestPos) {
  //       linksInfo.latestPos = rangeWithUrl.end;
  //     }
  //     return linksInfo;
  //   }, linksInfo);

  //   const insertPos = endPositionOfParent(tr.doc.resolve(linksInfo.latestPos));
  //   this.view.dispatch(tr.replaceWith(insertPos, insertPos, state.schema.text(('hello'))));
  // }

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

  private isSelectionNonMediaBlockNode = (): boolean => {
    const { state } = this.view;
    const { node } = state.selection as NodeSelection;

    return node && node.type !== state.schema.nodes.media && node.isBlock;
  }

  /**
   * Determine whether the cursor is inside empty paragraph
   * or the selection is the entire paragraph
   */
  private isInsidePotentialEmptyParagraph = (): boolean => {
    const { state } = this.view;
    const { $from } = state.selection;

    return $from.parent.type === state.schema.nodes.paragraph && atTheBeginningOfBlock(state) && atTheEndOfBlock(state);
  }

  private posOfMediaGroupExistsAsAnAjacentNodeBefore(state: EditorState<any>): number | undefined {
    if (!atTheBeginningOfBlock(state)) {
      return;
    }

    const { $from } = state.selection;
    let adjacentPos;
    let adjacentNode;

    if (this.isSelectionNonMediaBlockNode()) {
      adjacentPos = $from.pos;
      adjacentNode = $from.nodeBefore;
    } else {
      adjacentPos = startPositionOfParent($from) - 1;
      adjacentNode = state.doc.resolve(adjacentPos).nodeBefore;
    }

    if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
      return adjacentPos - adjacentNode.nodeSize + 1;
    }
  }

  private posOfMediaGroupExisitsAsAnAjacentNodeAfter(state: EditorState<any>): number | undefined {
    if (!atTheEndOfBlock(state)) {
      return;
    }
    const { $to } = state.selection;
    let adjacentPos;
    let adjacentNode;

    if (this.isSelectionNonMediaBlockNode()) {
      adjacentPos = $to.pos;
      adjacentNode = $to.nodeAfter;
    } else {
      adjacentPos = endPositionOfParent($to);
      adjacentNode = state.doc.nodeAt(adjacentPos);
    }

    if (adjacentNode && adjacentNode.type === state.schema.nodes.mediaGroup) {
      return adjacentPos + 1;
    }
  }

  private posOfMediaGroupExistsAsAParentNode(state: EditorState<any>): number | undefined {
    const { $from } = state.selection;

    if ($from.parent.type === state.schema.nodes.mediaGroup) {
      return startPositionOfParent($from);
    }
  }

  private posOfMediaGroupNearBy(state: EditorState<any>): number | undefined {
    return this.posOfMediaGroupExistsAsAParentNode(state)
      || this.posOfMediaGroupExisitsAsAnAjacentNodeAfter(state)
      || this.posOfMediaGroupExistsAsAnAjacentNodeBefore(state);
  }

  private findMediaInsertPos = (): number => {
    const state = this.view.state;
    const { $from, $to } = state.selection;

    const nearByMediaGroupPos = this.posOfMediaGroupNearBy(state);

    if (nearByMediaGroupPos) {
      return nearByMediaGroupPos;
    }

    if (this.isSelectionNonMediaBlockNode()) {
      return $to.pos;
    }

    if (atTheEndOfBlock(state)) {
      return $to.pos + 1;
    }

    if (atTheBeginningOfBlock(state)) {
      return $from.pos - 1;
    }

    return $to.pos;
  }

  private findDeleteRange = (): Range | undefined => {
    const { state } = this.view;
    const { $from, $to } = state.selection;

    if (this.posOfMediaGroupExistsAsAParentNode(state)) {
      return;
    }

    if (!this.isInsidePotentialEmptyParagraph() || this.posOfMediaGroupNearBy(state)) {
      return this.range($from.pos, $to.pos);
    }

    return this.range(startPositionOfParent($from) - 1, endPositionOfParent($to));
  }

  private range(start: number, end: number = start) {
    return { start, end };
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

  private mediaDataFromProvider(): string | undefined {
    return this.mediaProvider.uploadParams && this.mediaProvider.uploadParams.collection;
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

  private setSelectionAfterMediaInsertion = (node: PMNode) => {
    // by this time node has already been mounted
    const mediaNodeWithPos = this.findMediaNode(node.attrs.id);
    if (!mediaNodeWithPos) {
      return;
    }

    const { view } = this;
    const { doc, tr } = view.state;
    const { getPos } = mediaNodeWithPos;
    const resolvedPos = doc.resolve(getPos());
    const endOfMediaGroup = endPositionOfParent(resolvedPos);
    let selection;

    if (endOfMediaGroup + 1 >= doc.nodeSize - 1) {
      // if nothing after the media group, fallback to select the newest uploaded media item
      selection = new NodeSelection(resolvedPos);
    } else {
      selection = TextSelection.create(doc, endOfMediaGroup + 1);
    }

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

  detectLinkRangesInSteps = (tr: Transaction): RangeWithUrls[] => {
    const { link } = this.view.state.schema.marks;
    this.linkRanges = [];
    if (!link || !this.allowsLinks) {
      return this.linkRanges;
    }

    tr.steps.forEach((step) => {
      let rangeWithUrls;
      if (step instanceof AddMarkStep) {
        rangeWithUrls = this.findRangesWithUrlsInAddMarkStep(step as AddMarkStep);
      } else if (step instanceof ReplaceStep) {
        rangeWithUrls = this.findRangesWithUrlsInReplaceStep(step as ReplaceStep);
      }

      if (rangeWithUrls) {
        this.linkRanges.push(rangeWithUrls);
      }
    });

    return this.linkRanges;
  }

  private findRangesWithUrlsInAddMarkStep = (step: AddMarkStep): RangeWithUrls | undefined => {
    const { link } = this.view.state.schema.marks;
    if (step.mark.type === link) {
      return { start: step.from, end: step.to, urls: [step.mark.attrs.href] };
    }
  }

  private findRangesWithUrlsInReplaceStep(step: ReplaceStep): RangeWithUrls | undefined {
    const { link } = this.view.state.schema.marks;
    const urls: string[] = this.findLinksInNodeContent([], step.slice.content, link);
    if (urls.length > 0) {
      return { start: step.from, end: step.to, urls: urls };
    }
  }

  private findLinksInNodeContent(urls: string[], content: Fragment, link: MarkType) {
    content.forEach((child) => {
      const linkMarks = child.marks.filter((mark) => {
        return mark.type === link;
      });

      if (linkMarks.length > 0) {
        urls.push(linkMarks[0].attrs.href);
      }

      this.findLinksInNodeContent(urls, child.content, link);
    });

    return urls;
  }
}

export const stateKey = new PluginKey('mediaPlugin');

function mediaPluginFactory(options: MediaPluginOptions) {
  return new Plugin({
    state: {
      init(config, state) {
        return new MediaPluginState(state, options);
      },
      apply(tr, pluginState: MediaPluginState, oldState, newState) {
        pluginState.detectLinkRangesInSteps(tr);

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

      return {
        update: (view: EditorView, prevState: EditorState<any>) => {
          // pluginState.insertLinks();
        }
      };
    },
    props: {
      nodeViews: {
        mediaGroup: nodeViewFactory(options.providerFactory, {
          mediaGroup: ReactMediaGroupNode,
          media: ReactMediaNode,
        }, true),
      }
    }
  });
}

const plugins = (schema: Schema<any, any>, options: MediaPluginOptions) => {
  const plugin = mediaPluginFactory(options);
  return [plugin].filter((plugin) => !!plugin) as Plugin[];
};

export default plugins;

export interface MediaData {
  id: string;
  type?: MediaType;
}
