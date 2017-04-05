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

import { MediaPluginOptions, MediaPluginBehavior } from './media-plugin-options';
import inputRulePlugin from './input-rules';

import inputRule from './input-rule';

const urlRegex = new RegExp(`${URL_REGEX.source}\\b`);

export type PluginStateChangeSubscriber = (state: MediaPluginState) => any;
export type MediaStateChangeSubscriber = (state: MediaState) => any;

export class MediaPluginState {
  public allowsMedia: boolean = false;
  public allowsUploads: boolean = false;
  public allowsPastingLinks: boolean = false;

  private pluginStateChangeSubscribers: PluginStateChangeSubscriber[] = [];
  private mediaStateChangeSubscribers: MediaStateChangeSubscriber[] = [];
  private state: EditorState<any>;
  private view: EditorView;

  private detached = false;
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
      console.warn('unable to init media plugin - no media or mediaGroup node type in schema');
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

    if (!this.mediaProvider) {
      return;
    }

    const { docView } = this.view;
    const { mentionQuery } = state.schema.marks;
    const { doc, selection } = state;
    const { from, to } = selection;

    let dirty = false;

    if (doc.rangeHasMark(from - 1, to, mentionQuery)) {
      if (!this.queryActive) {
        dirty = true;
        this.queryActive = true;
      }

      const { nodeBefore } = selection.$from;
      const newQuery = (nodeBefore && nodeBefore.textContent || '').substr(1);

      if (this.query !== newQuery) {
        dirty = true;
        this.query = newQuery;
      }
    } else if (this.queryActive) {
      dirty = true;
      this.dismiss();
      return;
    }

    const newAnchorElement = docView.dom.querySelector('[data-mention-query]') as HTMLElement;
    if (newAnchorElement !== this.anchorElement) {
      dirty = true;
      this.anchorElement = newAnchorElement;
    }

    if (dirty) {
      this.mediaStateChangeSubscribers.forEach(cb => cb(this));
    }
  }

  setMediaProvider = (mediaProvider: Promise<MediaProvider>) => {
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

  handleDOMPaste = (e: ClipboardEvent) => {
    const text = e.clipboardData.getData('text/plain');
    if (!text) {
      return;
    }

    const url = this.extractFirstURLFromString(text);
    if (!url) {
      return;
    }

    this.insertLinkFromUrl(url);
  }

  insertLinkFromUrl = (url: string) => {
    const { pm } = this;

    pm.tr.insert(
      this.findInsertPosition(),
      pm.schema.nodes.media!.create({ url, type: 'link' })
    ).apply();
  }

  insertFile = (id: string, filename: string, collection: string) => {
    const { pm } = this;

    const node = pm.schema.nodes.media!.create({
      id,
      collection,
      type: 'file'
    }) as MediaNode;

    node.filename = filename;

    pm.tr.insert(this.findInsertPosition(), node).apply();
  }

  handleClickMediaButton = () => {
    if (!this.popupPicker) {
      return;
    }

    this.popupPicker.show();
  }

  private subscribers = {};

  subscribeForMediaStateUpdates(id: string, cb: (state: MediaState) => void) {
    if (this.subscribers[id] === undefined) {
      this.subscribers[id] = [];
    }

    if (this.subscribers[id].indexOf(cb) > -1) {
      return;
    }

    this.subscribers[id].push(cb);
  }

  unsubscribeFromMediaStateUpdates(id: string, cb: (state: MediaState) => void) {
    const bag = this.subscribers[id];
    if (bag === undefined) {
      return;
    }

    const pos = bag.indexOf(cb);
    if (pos > -1) {
      this.subscribers[id].splice(pos, 1);
    }
  }

  detach() {
    if (this.detached) {
      return;
    }

    this.detached = true;

    const { dropzonePicker, clipboardPicker, popupPicker } = this;

    dropzonePicker && dropzonePicker.deactivate();
    clipboardPicker && clipboardPicker.deactivate();

    if (popupPicker) {
      popupPicker.teardown();

      // TODO: remove after fixing https://jira.atlassian.com/browse/FIL-4012
      popupPicker._userMethodsInteractor._channel.destroy()
      popupPicker._popupIframe._channel.destroy()
      const { _iframe } = popupPicker._userMethodsInteractor;
      _iframe.parentNode.removeChild(_iframe);
    }
  }

  private initPickers(uploadParams: UploadParams, contextConfig: ContextConfig) {
    if (this.detached) {
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
    const bag = this.subscribers[mediaId];
    if (bag === undefined) {
      return;
    }
    this.subscribers[mediaId].forEach(cb => cb.call(cb, state));
  }

  private notifyPluginStateSubscribers = () => {
    this.pluginStateChangeSubscribers.forEach(cb => cb.call(cb, this));
  }

  private handleUploadStart = (event: any) => {
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

  /**
   * Resolve best PM document position to insert a new media item
   */
  private findInsertPosition = () => {
    const { pm } = this;
    const $from = pm.selection.$from;

    // Check if we're already in a media group and prepend the element inside the group
    if ($from.parent.type instanceof MediaGroupNodeType) {
      return $from.start($from.depth);
    }

    // Resolve node adjacent to parent
    const adjacentPos = $from.end($from.depth) + 1;
    const adjacentNode = pm.doc.nodeAt(adjacentPos);

    // There's nothing below, so insert a new media item wrapped in a group there.
    if (!adjacentNode) {
      return adjacentPos;
    }

    // Compact behavior disallows multiple media groups, so prepend the item inside
    // if (this.behavior === 'compact' && adjacentNode.type instanceof MediaGroupNodeType) {
      // return adjacentPos + 1;
    // }


    // The adjacent node is a media group, so let's append there...
    if (adjacentNode.type instanceof MediaGroupNodeType) {
      return adjacentPos + 1;
    }

    // Prepend the item, wrapped in a new group, adjacent to parent
    return adjacentPos;
  }

  private extractFirstURLFromString(string: string) {
    const search = urlRegex.exec(string);
    if (!search) {
      return;
    }

    return search ? search[0] : null;
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
    }
  });
};

export interface MediaData {
  id: string;
  type?: MediaType;
}
