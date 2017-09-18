import * as mediapicker from 'mediapicker';
import {
  ModuleConfig,
  MediaPickerComponent,
  MediaPickerComponents,
  ComponentConfigs,

  UploadStartPayload,
  UploadPreviewUpdatePayload,
  UploadStatusUpdatePayload,
  UploadProcessingPayload,
  UploadFinalizeReadyPayload,
  UploadErrorPayload,
  UploadEndPayload,
} from 'mediapicker';

import {
  ContextConfig,
  MediaStateManager,
  MediaState,
  UploadParams,
} from '@atlaskit/media-core';

import { ErrorReportingHandler } from '../../utils';

export type PickerType = keyof MediaPickerComponents;

export default class PickerFacade {
  private picker: MediaPickerComponent;
  private onStartListeners: Array<(state: MediaState) => void> = [];
  private errorReporter: ErrorReportingHandler;
  private uploadParams: UploadParams;

  constructor(
    pickerType: PickerType,
    uploadParams: UploadParams,
    contextConfig: ContextConfig,
    private stateManager: MediaStateManager,
    errorReporter: ErrorReportingHandler,
    mediaPickerFactory?: (pickerType: PickerType, pickerConfig: ModuleConfig, extraConfig?: ComponentConfigs[PickerType]) => MediaPickerComponents[PickerType]
  ) {
    this.errorReporter = errorReporter;
    this.uploadParams = uploadParams;

    this.mediaPickerReady().then(mediaPickerModule => {
      const { MediaPicker, Dropzone, Clipboard } = <typeof mediapicker>mediaPickerModule;
      if (!mediaPickerFactory) {
        mediaPickerFactory = MediaPicker;
      }

      const picker = this.picker = mediaPickerFactory!(
        pickerType,
        this.buildPickerConfigFromContext(contextConfig),
        pickerType === 'dropzone' ? { container: this.getDropzoneContainer() } : undefined
      );

      picker.on('upload-start', this.handleUploadStart);
      picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
      picker.on('upload-status-update', this.handleUploadStatusUpdate);
      picker.on('upload-processing', this.handleUploadProcessing);
      picker.on('upload-finalize-ready', this.handleUploadFinalizeReady);
      picker.on('upload-error', this.handleUploadError);
      picker.on('upload-end', this.handleUploadEnd);

      if (picker instanceof Dropzone || picker instanceof Clipboard) {
        picker.activate();
      }
    });
  }

  destroy() {
    this.mediaPickerReady().then(mediaPickerModule => {
      const { Popup, Browser, Dropzone, Clipboard } = <typeof mediapicker>mediaPickerModule;
      const { picker } = this;

      if (!picker) {
        return;
      }

      picker.removeAllListeners('upload-start');
      picker.removeAllListeners('upload-preview-update');
      picker.removeAllListeners('upload-status-update');
      picker.removeAllListeners('upload-processing');
      picker.removeAllListeners('upload-finalize-ready');
      picker.removeAllListeners('upload-error');
      picker.removeAllListeners('upload-end');

      try {
        if (picker instanceof Dropzone || picker instanceof Clipboard) {
          picker.deactivate();
        }

        if (picker instanceof Popup || picker instanceof Browser) {
          picker.teardown();
        }
      } catch (ex) {
        this.errorReporter.captureException(ex);
      }
    });
  }

  private mediaPickerReady (): Promise<any> {
    return new Promise((resolve, reject) => {
      require.ensure([], require => {
        resolve(require('mediapicker'));
      });
    });
  }

  setUploadParams(params: UploadParams): void {
    this.uploadParams = params;

    this.mediaPickerReady().then(() => {
      this.picker.setUploadParams(params);
    });
  }

  show(): void {
    this.mediaPickerReady().then(mediaPickerModule => {
      const { Popup } = <typeof mediapicker>mediaPickerModule;
      if (this.picker instanceof Popup) {
        try {
          this.picker.show();
        } catch (ex) {
          this.errorReporter.captureException(ex);
        }
      }
    });
  }

  cancel(tempId: string): void {
    this.mediaPickerReady().then(mediaPickerModule => {
      const { Popup } = <typeof mediapicker>mediaPickerModule;

      if (this.picker instanceof Popup) {
        const state = this.stateManager.getState(tempId);

        if (!state || (state.status === 'cancelled')) {
          return;
        }

        try {
          this.picker.cancel(tempId);
        } catch (e) {
          // We're deliberately consuming a known Media Picker exception, as it seems that
          // the picker has problems cancelling uploads before the popup picker has been shown
          // TODO: remove after fixing https://jira.atlassian.com/browse/FIL-4161
          if (!/((popupIframe|cancelUpload).*?undefined)|(undefined.*?(popupIframe|cancelUpload))/.test(`${e}`)) {
            throw e;
          }
        }

        this.stateManager.updateState(tempId, {
          id: tempId,
          status: 'cancelled',
        });
      }
    });
  }

  upload(url: string, fileName: string): void {
    this.mediaPickerReady().then(mediaPickerModule => {
      const { BinaryUploader } = <typeof mediapicker>mediaPickerModule;
      if (this.picker instanceof BinaryUploader) {
        this.picker.upload(url, fileName);
      }
    });
  }

  onNewMedia(cb: (state: MediaState) => any) {
    this.onStartListeners.push(cb);
  }

  private buildPickerConfigFromContext(context: ContextConfig): ModuleConfig {
    return {
      uploadParams: this.uploadParams,
      apiUrl: context.serviceHost,
      apiClientId: context.clientId,
      tokenSource: { getter: (reject, resolve) => {
        context.tokenProvider(this.uploadParams.collection).then(resolve, reject);
      }},
    };
  }

  private getDropzoneContainer() {
    const { dropzoneContainer } = this.uploadParams;

    return dropzoneContainer ? dropzoneContainer : document.body;
  }

  private handleUploadStart = (event: UploadStartPayload) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;
    const state = {
      id: tempId,
      status: 'uploading',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    };

    this.stateManager.updateState(tempId, state as MediaState);
    this.onStartListeners.forEach(cb => cb.call(cb, state));
  }

  private handleUploadStatusUpdate = (event: UploadStatusUpdatePayload) => {
    const { file, progress } = event;
    const tempId = `temporary:${file.id}`;
    const currentState = this.stateManager.getState(tempId);
    const currentStatus = currentState && currentState.status ? currentState.status : 'unknown';

    this.stateManager.updateState(tempId, {
      id: tempId,
      status: currentStatus === 'unknown' ? 'uploading' : currentStatus,
      progress: progress ? progress.portion : undefined,
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadProcessing = (event: UploadProcessingPayload) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'processing',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadFinalizeReady = (event: UploadFinalizeReadyPayload) => {
    const { file } = event;
    const { finalize } = event;
    const tempId = `temporary:${file.id}`;

    if (!finalize) {
      throw new Error('Editor: Media: Picker emitted finalize-ready event but didn\'t provide finalize callback');
    }

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      finalizeCb: finalize,
      status: 'unfinalized',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadError = ({ error }: UploadErrorPayload) => {
    if (!error || !error.fileId) {
      const err = new Error(`Media: unknown upload-error received from Media Picker: ${error && error.name}`);
      this.errorReporter.captureException(err);

      return;
    }

    const tempId = `temporary:${error.fileId}`;
    this.stateManager.updateState(tempId, {
      id: tempId,
      status: 'error',
      error: error ? { description: error!.description, name: error!.name } : undefined,
    });
  }

  private handleUploadEnd = (event: UploadEndPayload) => {
    const { file } = event;
    const tempId = `temporary:${file.id}`;

    this.stateManager.updateState(tempId, {
      id: tempId,
      publicId: file.publicId as string,
      status: 'ready',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadPreviewUpdate = (event: UploadPreviewUpdatePayload) => {
    const tempId = `temporary:${event.file.id}`;

    if (event.preview !== undefined) {
      this.stateManager.updateState(tempId, {
        id: tempId,
        thumbnail: event.preview
      });
    }
  }
}
