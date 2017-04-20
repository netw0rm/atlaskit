import { MediaStateManager, MediaState } from './../../media';
import { MediaType, MediaNode } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
  Node,
  Schema,
} from '../../prosemirror';
import { URL_REGEX } from '../hyperlink/regex';
import { MediaProvider, UploadParams, DefaultMediaStateManager } from '../../media';
import PickerFacade from './picker-facade';
import TemporaryNodesList from './temporary-nodes-list';
import { ContextConfig } from '@atlaskit/media-core';
import { analyticsService } from '../../analytics';

import { MediaPluginOptions, MediaPluginBehavior } from './media-plugin-options';
import inputRulePlugin from './input-rule';

const urlRegex = new RegExp(`${URL_REGEX.source}\\b`);

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsPastingLinks: boolean = false;
  public stateManager: MediaStateManager;

  private view: EditorView;
  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private temporaryMediaNodes = new TemporaryNodesList();
  private useDefaultStateManager = true;
  private destroyed = false;
  private behavior: MediaPluginBehavior;
  private mediaProvider: MediaProvider;
  private popupPicker: PickerFacade;
  private dropzonePicker: PickerFacade;
  private clipboardPicker: PickerFacade;

  constructor(state: EditorState<any>, options: MediaPluginOptions) {
    this.behavior = options.behavior;

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
          this.popupPicker.setUploadParams(mediaProvider.uploadParams);
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
          this.initPickers(mediaProvider.uploadParams, uploadContext);
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

  insertFile = (mediaState: MediaState, collection: string): Node => {
    const { view } = this;
    const { state } = view;
    const { id, fileName, fileSize, fileMimeType } = mediaState;

    const node = state.schema.nodes.media!.create({
      id,
      type: 'file',
      collection,
    }) as MediaNode;

    fileName && (node.fileName = fileName);
    fileSize && (node.fileSize = fileSize);
    fileMimeType && (node.fileMimeType = fileMimeType);

    let transaction;

    if (this.isInsideEmptyParagraph()) {
      const { $from } = state.selection;

      transaction = state.tr.replaceWith(
        $from.start($from.depth) - 1,
        $from.end($from.depth) + 1,
        node
      );
    } else {
      transaction = state.tr.insert(this.findInsertPosition(), node);
    }

    view.dispatch(transaction);
    return node;
  }

  showMediaPicker = () => {
    if (!this.popupPicker) {
      return;
    }

    this.popupPicker.show();
  }

  setView(view: EditorView) {
    this.view = view;
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const { dropzonePicker, clipboardPicker, popupPicker, temporaryMediaNodes } = this;

    dropzonePicker && dropzonePicker.destroy();
    clipboardPicker && clipboardPicker.destroy();
    popupPicker && popupPicker.destroy();

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

    const { stateManager } = this;

    const popupPicker = this.popupPicker = new PickerFacade('popup', uploadParams, context, stateManager);
    const clipboardPicker = this.clipboardPicker = new PickerFacade('clipboard', uploadParams, context, stateManager);
    const dropzonePicker = this.dropzonePicker = new PickerFacade('dropzone', uploadParams, context, stateManager);

    [ popupPicker, dropzonePicker, clipboardPicker ].forEach(picker => {
      picker.onStart(this.handleNewMediaPicked);
      picker.onEnd(this.handleNewMediaPublished);
    });
  }

  private handleNewMediaPicked = (state: MediaState) => {
    this.temporaryMediaNodes.push(
      state.id,
      this.insertFile(state, this.mediaProvider.uploadParams.collection)
    );
  }

  private handleNewMediaPublished = (state: MediaState) => {
    this.replaceTemporaryMediaNodes(state.id, state.publicId!);
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
      const pos = node.getPos && node.getPos();

      if (!pos || pos < 1) {
        return;
      }

      const newNode = view.state.schema.nodes.media!.create({
        ...node.attrs,
        id: publicId
      }) as MediaNode;

      const { fileSize, fileName, fileMimeType } = node as MediaNode;

      fileName && (newNode.fileName = fileName);
      fileSize && (newNode.fileSize = fileSize);
      fileMimeType && (newNode.fileMimeType = fileMimeType);

      view.dispatch(view.state.tr.replaceWith(pos, pos + 1, newNode));
    });

    temporaryMediaNodes.delete(tempId);
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

interface PositionedNode extends Node {
  getPos: () => number;
}

function extractFirstURLFromString(string: string) {
  const search = urlRegex.exec(string);
  if (!search) {
    return;
  }

  return search ? search[0] : null;
}
