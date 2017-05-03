import {
  DefaultMediaStateManager,
  MediaProvider,
  MediaState,
  MediaStateManager,
  UploadParams,
} from '@atlaskit/media-core';

import { MediaType, MediaNode } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Node,
  NodeSelection,
  Schema,
  Transaction,
} from '../../prosemirror';
import { URL_REGEX } from '../hyperlink/regex';
import PickerFacade from './picker-facade';
import TemporaryNodesList from './temporary-nodes-list';
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
  public replaceQueue: Array<[PositionedNode, Node | undefined]> = [];

  private options: MediaPluginOptions;
  private view: EditorView;
  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private temporaryMediaNodes = new TemporaryNodesList();
  private useDefaultStateManager = true;
  private destroyed = false;
  private mediaProvider: MediaProvider;
  private pickers: PickerFacade[] = [];
  private popupPicker?: PickerFacade;

  constructor(state: EditorState<any>, options: MediaPluginOptions) {
    this.options = options;

    const { nodes } = state.schema;

    if (!nodes.media || !nodes.mediaGroup) {
      throw new Error('Editor: unable to init media plugin - media or mediaGroup node absent in schema');
    }

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

  setMediaProvider = (mediaProvider?: Promise<MediaProvider>) => {
    if (!mediaProvider) {
      this.allowsPastingLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();

      return;
    }

    mediaProvider.then(mediaProvider => {
      this.mediaProvider = mediaProvider;
      this.allowsMedia = true;

      // release all listeners for default state manager
      const { stateManager } = mediaProvider;
      if (stateManager && this.useDefaultStateManager) {
        (stateManager as DefaultMediaStateManager).destroy();
        this.useDefaultStateManager = false;
      }

      if (stateManager) {
        this.stateManager = stateManager;
      }

      if (mediaProvider.uploadContext && this.popupPicker) {
        this.allowsUploads = true;
        mediaProvider.uploadContext.then(uploadContext => {
          // TODO: re-initialize pickers ?
          if (this.popupPicker && mediaProvider.uploadParams) {
            this.popupPicker.setUploadParams(mediaProvider.uploadParams);
          }
        });
      } else {
        this.allowsUploads = false;
      }

      if (mediaProvider.linkCreateContext) {
        this.allowsPastingLinks = true;
      } else {
        this.allowsPastingLinks = false;
      }

      if (mediaProvider.uploadContext) {
        this.allowsUploads = true;
        mediaProvider.uploadContext.then(uploadContext => {
          if (mediaProvider.uploadParams) {
            this.initPickers(mediaProvider.uploadParams, uploadContext);
          }
        });
      } else {
        this.allowsUploads = false;
      }

      this.notifyPluginStateSubscribers();
    }).catch(err => {
      console.error('Editor Media Provider promise was rejected. Media functionality will be disabled.', err);
      this.allowsPastingLinks = false;
      this.allowsUploads = false;
      this.allowsMedia = false;
      this.notifyPluginStateSubscribers();
    });
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
    const { id, fileName, fileSize, fileMimeType } = mediaState;

    this.stateManager.subscribe(mediaState.id, this.handleMediaState);

    const node = state.schema.nodes.media!.create({
      id,
      type: 'file',
      collection,
    }) as MediaNode;

    if (fileName) {
      node.fileName = fileName;
    }
    if (fileSize) {
      node.fileSize = fileSize;
    }
    if (fileMimeType) {
      node.fileMimeType = fileMimeType;
    }

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

    if (!mediaState.status || mediaState.status === 'uploading' || mediaState.status === 'unknown') {
      this.temporaryMediaNodes.push(
        mediaState.id,
        node
      );
    }

    return [ node, transaction ];
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
    const { temporaryMediaNodes, stateManager } = this;

    return new Promise<void>((resolve, reject) => {
      if (timeout) {
        setTimeout(() => reject(new Error(`Media operations did not finish in ${timeout} ms`)), timeout);
      }

      let outstandingNodes = temporaryMediaNodes.length;
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

      temporaryMediaNodes.forEach((node, mediaId) => {
        const nodeCurrentState = stateManager.getState(mediaId)!;
        const nodeCurrentStatus = nodeCurrentState.status || '';

        if (MEDIA_RESOLVE_STATES.indexOf(nodeCurrentStatus) !== -1) {
          onNodeStateReady(nodeCurrentState);
        } else {
          stateManager.subscribe(mediaId, onNodeStateChanged);
        }
      });
    });
  }

  setView(view: EditorView) {
    this.view = view;
  }

  handleMediaNodeRemoval = (node: PositionedNode) => {
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
      case 'unfinalized':
        pickers.forEach(picker => picker.cancel(id));

        // In case the file has been attached multiple times, remove all occurences
        this.removeTemporaryMediaNodes(id, node);
    }
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const { pickers, temporaryMediaNodes } = this;

    pickers.forEach(picker => picker.destroy());
    pickers.splice(0, pickers.length);
    this.popupPicker = undefined;
    temporaryMediaNodes.clear();
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
    switch (state.status) {
      case 'error':
        // TODO: we would like better error handling and retry support here.
        this.removeTemporaryMediaNodes(state.id);

        const { uploadErrorHandler } = this.options;

        if (uploadErrorHandler) {
          uploadErrorHandler(state);
        }
        break;

      case 'ready':
        this.stateManager.unsubscribe(state.id, this.handleMediaState);
        this.replaceTemporaryMediaNodes(state.id, state.publicId!);
    }

  }

  private notifyPluginStateSubscribers = () => {
    this.pluginStateChangeSubscribers.forEach(cb => cb.call(cb, this));
  }

  private replaceTemporaryMediaNodes = (tempId: string, publicId: string) => {
    const { view, temporaryMediaNodes } = this;

    if (!view) {
      return;
    }

    temporaryMediaNodes.get(tempId).forEach((node: PositionedNode) => {
      const newNode = view.state.schema.nodes.media!.create({
        ...node.attrs,
        id: publicId
      }) as MediaNode;

      const { fileSize, fileName, fileMimeType } = node as MediaNode;

      if (fileName) {
        newNode.fileName = fileName;
      }
      if (fileSize) {
        newNode.fileSize = fileSize;
      }
      if (fileMimeType) {
        newNode.fileMimeType = fileMimeType;
      }

      this.replaceQueue.push([node, newNode]);
    });

    temporaryMediaNodes.delete(tempId);
    view.dispatch(view.state.tr);
  }

  private removeTemporaryMediaNodes = (tempId: string, skipNode?: Node) => {
    const { view, temporaryMediaNodes } = this;

    if (!view) {
      return;
    }

    temporaryMediaNodes.get(tempId).forEach((node: PositionedNode) => {
      if (!skipNode || node !== skipNode) {
        this.replaceQueue.push([node, undefined]);
      }
    });

    temporaryMediaNodes.delete(tempId);
    view.dispatch(view.state.tr);
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

      return {
        update: (view: EditorView, prevState: EditorState<any>) => {
          // Pop items from the replace queue, and dispatch a replace transforms one by one
          const pluginState = stateKey.getState(view.state) as MediaPluginState;
          const item = pluginState.replaceQueue.pop();

          if (item) {
            const pos = item[0].getPos();
            if (!pos || pos < 1) {
              return;
            }

            if (item[1]) {
              view.dispatch(view.state.tr.replaceWith(pos, pos + 1, item[1]!));
            } else {
              const resolvedPos = view.state.doc.resolve(pos);
              if (resolvedPos.parent.childCount > 1) {
                view.dispatch(view.state.tr.delete(pos, pos + 1));
              } else {
                // This is the last item in mediaGroup, so remove the whole group.
                // (works around a bug where ProseMirror would create a dummy empty "media" node)
                view.dispatch(view.state.tr.delete(resolvedPos.before(), resolvedPos.after()));
              }
            }
          }
        }
      };
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
