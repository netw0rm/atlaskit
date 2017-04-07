import { mediaGroup } from './../../schema/nodes/media-group';
import { MediaType } from './../../schema/nodes/media';
import {
  EditorState,
  EditorView,
  Plugin,
  PluginKey,
} from '../../prosemirror';
import { reconfigure } from '../utils';
import { URL_REGEX } from '../hyperlink/url-regex';
import { MediaPicker } from '@atlassian/mediapicker';
import { MediaProvider, MediaState, UploadParams } from '../../media';
import { ContextConfig } from '@atlaskit/media-core';
import { analyticsService } from '../../analytics';

import { MediaPluginOptions, MediaPluginBehavior } from './media-plugin-options';
import { inputRulePlugin } from './input-rule';

const urlRegex = new RegExp(`${URL_REGEX.source}\\b`);

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;
export type MediaStateChangeSubscriber = (state: MediaState) => any;

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsPastingLinks: boolean = false;

  // private view: EditorView;
  private state: EditorState<any>;
  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private mediaStateChangeSubscribers: { [key: string]: MediaStateChangeSubscriber[] } = {};
  private destroyed = false;
  private behavior: MediaPluginBehavior;
  private mediaProvider: MediaProvider;
  private popupPicker: any;
  private dropzonePicker: any;
  private clipboardPicker: any;

  constructor(state: EditorState<any>, options: MediaPluginOptions) {
    this.state = state;
    this.behavior = options.behavior;

    const { nodes } = state.schema;

    if (!nodes.media || !nodes.mediaGroup) {
      console.warn('Editor: unable to init media plugin - media or mediaGroup node absent in schema');
      return;
    }

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

  update(state: EditorState<any>) {
    this.state = state;
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
    const { state } = this;

    return state.tr.insert(
      this.findInsertPosition(),
      state.schema.nodes.media.create({ url, type: 'link' })
    );
  }

  insertFile = (id: string, filename: string, collection: string) => {
    const { state } = this;
    const node = state.schema.nodes.media!.create({
      id,
      collection,
      type: 'file'
    });

    node.filename = filename;

    state.apply(state.tr.insert(this.findInsertPosition(), node));
  }

  showMediaPicker = () => {
    if (!this.popupPicker) {
      return;
    }

    this.popupPicker.show();
  }

  subscribeForMediaStateUpdates(id: string, cb: (state: MediaState) => void) {
    if (this.mediaStateChangeSubscribers[id] === undefined) {
      this.mediaStateChangeSubscribers[id] = [];
    }

    if (this.mediaStateChangeSubscribers[id].indexOf(cb) > -1) {
      return;
    }

    this.mediaStateChangeSubscribers[id].push(cb);
  }

  unsubscribeFromMediaStateUpdates(id: string, cb: (state: MediaState) => void) {
    const bag = this.mediaStateChangeSubscribers[id];
    if (bag === undefined) {
      return;
    }

    const pos = bag.indexOf(cb);
    if (pos > -1) {
      this.mediaStateChangeSubscribers[id].splice(pos, 1);
    }
  }

  destroy() {
    if (this.destroyed) {
      return;
    }

    this.destroyed = true;

    const { dropzonePicker, clipboardPicker, popupPicker } = this;

    dropzonePicker && dropzonePicker.deactivate();
    clipboardPicker && clipboardPicker.deactivate();

    if (popupPicker) {
      popupPicker.teardown();
    }
  }

  /**
   * Determine best PM document position to insert a new media item at.
   */
  findInsertPosition = () => {
    const { state } = this;
    const $from = state.selection.$from;

    // Check if we're already in a media group and prepend the element inside the group
    if ($from.parent.type === mediaGroup) {
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
    if (adjacentNode.type === mediaGroup) {
      return adjacentPos + 1;
    }

    // Prepend the item, wrapped in a new group, adjacent to parent
    return adjacentPos;
  }

  private initPickers(uploadParams: UploadParams, contextConfig: ContextConfig) {
    if (this.destroyed) {
      return;
    }

    const pickerConfig = this.buildPickerConfigFromContext(uploadParams, contextConfig);
    const popupPicker = this.popupPicker = MediaPicker('popup', pickerConfig);
    const clipboardPicker = this.clipboardPicker = MediaPicker('clipboard', pickerConfig);
    const dropzonePicker = this.dropzonePicker = MediaPicker('dropzone', pickerConfig);

    [ popupPicker, dropzonePicker, clipboardPicker ].forEach(picker => {
      picker.on('upload-start', this.handleUploadStart);
      picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
      picker.on('upload-status-update', this.handleUploadStatusUpdate);
      picker.on('upload-processing', this.handleUploadProcessing);
      picker.on('upload-end', this.handleUploadEnd);
    });

    dropzonePicker.activate();
    clipboardPicker.activate();
  }

  private notifyMediaStateSubscribers(mediaId: string, state: MediaState) {
    const bag = this.mediaStateChangeSubscribers[mediaId];
    if (bag === undefined) {
      return;
    }
    this.mediaStateChangeSubscribers[mediaId].forEach(cb => cb.call(cb, state));
  }

  private notifyPluginStateSubscribers = () => {
    this.pluginStateChangeSubscribers.forEach(cb => cb.call(cb, this));
  }

  private handleUploadStart = (event: any) => {
    if (!this.allowsUploads) {
      console.warn('Editor: media plugin: an upload started even though uploads are not allowed in current state.', this);
      return;
    }

    const tempId = `temporary:${event.file.id}`;
    const { file } = event;

    this.insertFile(tempId, file.name, this.mediaProvider.uploadParams.collection);
    this.notifyMediaStateSubscribers(tempId, {
      id: tempId,
      status: 'uploading',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadStatusUpdate = (event: any, progress: any) => {
    const tempId = `temporary:${event.file.id}`;
    const { file } = event;

    this.notifyMediaStateSubscribers(tempId, {
      id: tempId,
      status: 'uploading',
      progress: progress ? progress.portion : undefined,
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadProcessing = (event: any) => {
    const tempId = `temporary:${event.file.id}`;
    const { file } = event;

    this.notifyMediaStateSubscribers(tempId, {
      id: file.publicId as string,
      status: 'processing',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadEnd = (event: any) => {
    const tempId = `temporary:${event.file.id}`;
    const { file } = event;

    this.notifyMediaStateSubscribers(tempId, {
      id: file.publicId as string,
      status: 'ready',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadPreviewUpdate = (event: any) => {
    const { thumbnailProvider } = this.mediaProvider;

    if (thumbnailProvider && event.preview !== undefined) {
      thumbnailProvider.setThumbnail(event.file.id, event.preview);
    }
  }

  private buildPickerConfigFromContext(uploadParams: UploadParams, config: ContextConfig) {
    return {
      uploadParams: uploadParams,
      apiUrl: config.serviceHost,
      apiClientId: config.clientId,
      container: this.getDropzoneContainer(uploadParams),
      tokenSource: { getter: (reject, resolve) => {
        config.tokenProvider(uploadParams.collection).then(resolve, reject);
      }},
    };
  }

  private getDropzoneContainer(uploadParams: UploadParams) {
    const { dropzoneContainer } = uploadParams;

    return dropzoneContainer ? dropzoneContainer : document.body;
  }
}

export const stateKey = new PluginKey('mediaPlugin');

export default function mediaPluginFactory (options: MediaPluginOptions) {
  return new Plugin({
    state: {
      init(config, state) {
        return new MediaPluginState(state, options);
      },
      apply(tr, pluginState, oldState, newState) {
        // NOTE: Don't call pluginState.update here.
        return pluginState;
      }
    },
    key: stateKey,
    view: (view: EditorView) => {
      reconfigure(view, [inputRulePlugin(view.state.schema)]);
      const pluginState = stateKey.getState(view.state);
      pluginState.setView(view);

      return {
        update(view: EditorView, prevState: EditorState<any>) {
          pluginState.update(view.state, view);
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
};

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
