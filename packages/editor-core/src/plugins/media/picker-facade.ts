import { MediaStateManager, MediaState, UploadParams } from './../../media';
import { MediaPicker } from 'mediapicker';
import { ContextConfig } from '@atlaskit/media-core';

export type PickerEvent = {
  file: PickerEventFile,
  preview?: Blob
  progress?: PickerEventProgress,
  error?: PickerEventError
};

export type PickerEventFile = {
  id: string,           // unique id, which is generated when user picked the file
  name: string,         // file name
  size: number,         // size in bytes
  publicId?: string     // public id of the file, if it was uploaded
  creationDate: number, // timestamp of file creation date
  type: string          // mimetype
};

export type PickerEventProgress = {
  absolute?: number,           // amount of bytes uploaded
  portion?: number,            // percentage of file uploaded (0.55 = 55%)
  max?: number,                // size of the file
  overallTime?: number,        // the total amount of time needed to upload this file (in ms)
  expectedFinishTime?: number, // timestamp of approximate finish time
  timeLeft?: number            // time before finish (in ms)
};

export type PickerEventError = {
  description: string, // description for an error. example: "Token verification failed: invalid token". Can be empty.
  name: string,        // type of error. Available types: 'object_create_fail' (failed to create file object), 'metadata_fetch_fail', 'token_fetch_fail', 'token_source_empty', 'upload_fail'
  fileId?: string      // if available, the id of the file that failed to upload
};

export default class PickerFacade {
  private picker: any;
  private onStartListeners: Array<(state: MediaState) => void> = [];

  constructor(
    pickerType: string,
    uploadParams: UploadParams,
    contextConfig: ContextConfig,
    private stateManager: MediaStateManager,
    mediaPickerFactory?: (pickerType: string, pickerConfig: any) => any
  ) {
    if (!mediaPickerFactory) {
      mediaPickerFactory = MediaPicker;
    }

    const picker = this.picker = mediaPickerFactory(
      pickerType,
      this.buildPickerConfigFromContext(uploadParams, contextConfig)
    );

    picker.on('upload-start', this.handleUploadStart);
    picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
    picker.on('upload-status-update', this.handleUploadStatusUpdate);
    picker.on('upload-processing', this.handleUploadProcessing);
    picker.on('upload-error', this.handleUploadError);
    picker.on('upload-end', this.handleUploadEnd);

    if (picker.activate) {
      picker.activate();
    }
  }

  destroy() {
    const { picker } = this;

    if (!picker) {
      return;
    }

    picker.removeAllListeners();

    if (picker.teardown) {
      picker.teardown();
    } else if (picker.deactivate) {
      picker.deactivate();
    }

    this.picker = null;
  }

  setUploadParams(params: UploadParams): void {
    this.picker.setUploadParams(params);
  }

  show(): void {
    this.picker.show && this.picker.show();
  }

  cancel(tempId: string): void {
    const state = this.stateManager.getState(tempId);

    if (!state || state.status === 'cancelled') {
      return;
    }

    this.picker.cancel(tempId);
    this.stateManager.updateState(tempId, {
      id: tempId,
      status: 'cancelled',
    });
  }

  onNewMedia(cb: (state: MediaState) => any) {
    this.onStartListeners.push(cb);
  }

  private buildPickerConfigFromContext(uploadParams: UploadParams, context: ContextConfig) {
    return {
      uploadParams: uploadParams,
      apiUrl: context.serviceHost,
      apiClientId: context.clientId,
      container: this.getDropzoneContainer(uploadParams),
      tokenSource: { getter: (reject, resolve) => {
        context.tokenProvider(uploadParams.collection).then(resolve, reject);
      }},
    };
  }

  private getDropzoneContainer(uploadParams: UploadParams) {
    const { dropzoneContainer } = uploadParams;

    return dropzoneContainer ? dropzoneContainer : document.body;
  }

  private handleUploadStart = (event: PickerEvent) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;
    const state = {
      id: tempId,
      status: 'uploading',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    };

    this.stateManager.updateState(tempId, state as MediaState);
    this.onStartListeners.forEach(cb => cb.call(cb, state));
  }

  private handleUploadStatusUpdate = (event: PickerEvent) => {
    const { file, progress } = event;
    const tempId = `temporary:${file.id}`;

    this.stateManager.updateState(tempId, {
      id: tempId,
      status: 'uploading',
      progress: progress ? progress.portion : undefined,
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadProcessing = (event: PickerEvent) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'processing',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadError = (event: PickerEvent) => {
    const { file, error } = event;

    if (!file || !file.id) {
      console.error('Editor: Media: unknown upload-error received from Media Picker', error);
      return;
    }

    const tempId = `temporary:${file.id}`;
    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'error',
      error: error ? { description: error!.description, name: error!.name } : undefined,
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadEnd = (event: PickerEvent) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'ready',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadPreviewUpdate = (event: PickerEvent) => {
    const tempId = `temporary:${event.file.id}`;

    if (event.preview !== undefined) {
      this.stateManager.updateState(tempId, {
        id: tempId,
        thumbnail: event.preview
      });
    }
  }
};
