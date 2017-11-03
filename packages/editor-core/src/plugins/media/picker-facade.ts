import {
  MediaPicker,
  ModuleConfig,
  MediaPickerComponent,
  MediaPickerComponents,
  ComponentConfigs,

  Popup,
  Browser,
  Dropzone,
  Clipboard,
  BinaryUploader,

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
  private onDragListeners: Array<Function> = [];
  private errorReporter: ErrorReportingHandler;
  private uploadParams: UploadParams;

  constructor(
    pickerType: PickerType,
    uploadParams: UploadParams,
    contextConfig: ContextConfig,
    private stateManager: MediaStateManager,
    errorReporter: ErrorReportingHandler,
    mediaPickerFactory?: (pickerType: PickerType, moduleConfig: ModuleConfig, componentConfig?: ComponentConfigs[PickerType]) => MediaPickerComponents[PickerType]
  ) {
    this.errorReporter = errorReporter;
    this.uploadParams = uploadParams;

    if (!mediaPickerFactory) {
      mediaPickerFactory = MediaPicker;
    }

    let componentConfig;

    if (pickerType === 'dropzone') {
      componentConfig = {
        container: this.getDropzoneContainer(),
        headless: true,
      };
    } else if (pickerType === 'popup') {
      if (contextConfig.userAuthProvider) {
        componentConfig = { userAuthProvider: contextConfig.userAuthProvider };
      } else {
        pickerType = 'browser';
      }
    }

    const picker = this.picker = mediaPickerFactory!(
      pickerType,
      this.buildPickerConfigFromContext(contextConfig),
      componentConfig
    );

    picker.on('upload-start', this.handleUploadStart);
    picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
    picker.on('upload-status-update', this.handleUploadStatusUpdate);
    picker.on('upload-processing', this.handleUploadProcessing);
    picker.on('upload-finalize-ready', this.handleUploadFinalizeReady);
    picker.on('upload-error', this.handleUploadError);
    picker.on('upload-end', this.handleUploadEnd);

    if (picker instanceof Dropzone) {
      picker.on('drag-enter', this.handleDragEnter);
      picker.on('drag-leave', this.handleDragLeave);
    }

    if (picker instanceof Dropzone || picker instanceof Clipboard) {
      picker.activate();
    }
  }

  destroy() {
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

    this.onStartListeners = [];
    this.onDragListeners = [];

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
  }

  setUploadParams(params: UploadParams): void {
    this.uploadParams = params;
    this.picker.setUploadParams(params);
  }

  show(): void {
    if (this.picker instanceof Popup) {
      try {
        this.picker.show();
      } catch (ex) {
        this.errorReporter.captureException(ex);
      }
    } else if (this.picker instanceof Browser) {
      this.picker.browse();
    }
  }

  cancel(id: string): void {
    if (this.picker instanceof Popup) {
      const state = this.stateManager.getState(id);

      if (!state || (state.status === 'cancelled')) {
        return;
      }

      try {
        this.picker.cancel(id);
      } catch (e) {
        // We're deliberately consuming a known Media Picker exception, as it seems that
        // the picker has problems cancelling uploads before the popup picker has been shown
        // TODO: remove after fixing https://jira.atlassian.com/browse/FIL-4161
        if (!/((popupIframe|cancelUpload).*?undefined)|(undefined.*?(popupIframe|cancelUpload))/.test(`${e}`)) {
          throw e;
        }
      }

      this.stateManager.updateState(id, {
        id: id,
        status: 'cancelled',
      });
    }
  }

  upload(url: string, fileName: string): void {
    if (this.picker instanceof BinaryUploader) {
      this.picker.upload(url, fileName);
    }
  }

  onNewMedia(cb: (state: MediaState) => any) {
    this.onStartListeners.push(cb);
  }

  onDrag(cb: (state: 'enter' | 'leave') => any) {
    this.onDragListeners.push(cb);
  }

  private buildPickerConfigFromContext(context: ContextConfig): ModuleConfig {
    return {
      uploadParams: this.uploadParams,
      apiUrl: context.serviceHost,
      authProvider: context.authProvider,
    };
  }

  private getDropzoneContainer() {
    const { dropzoneContainer } = this.uploadParams;

    return dropzoneContainer ? dropzoneContainer : document.body;
  }

  private handleUploadStart = (event: UploadStartPayload) => {
    const { file } = event;
    const { id } = file;
    const state = {
      id,
      status: 'uploading',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    };

    this.stateManager.updateState(id, state as MediaState);
    this.onStartListeners.forEach(cb => cb.call(cb, state));
  }

  private handleUploadStatusUpdate = (event: UploadStatusUpdatePayload) => {
    const { file, progress } = event;
    const { id } = file;
    const currentState = this.stateManager.getState(id);
    const currentStatus = currentState && currentState.status ? currentState.status : 'unknown';

    this.stateManager.updateState(id, {
      id,
      status: currentStatus === 'unknown' ? 'uploading' : currentStatus,
      progress: progress ? progress.portion : undefined,
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadProcessing = (event: UploadProcessingPayload) => {
    const { file } = event;
    const { id } = file;

    this.stateManager.updateState(id, {
      id,
      status: 'processing',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadFinalizeReady = (event: UploadFinalizeReadyPayload) => {
    const { file } = event;
    const { finalize } = event;
    const { id } = file;

    if (!finalize) {
      throw new Error('Editor: Media: Picker emitted finalize-ready event but didn\'t provide finalize callback');
    }

    this.stateManager.updateState(id, {
      id,
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

    const id = error.fileId;
    this.stateManager.updateState(id, {
      id,
      status: 'error',
      error: error ? { description: error!.description, name: error!.name } : undefined,
    });
  }

  private handleUploadEnd = (event: UploadEndPayload) => {
    const { file } = event;
    const { id } = file;

    this.stateManager.updateState(id, {
      id,
      status: 'ready',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileMimeType: file.type as string,
    });
  }

  private handleUploadPreviewUpdate = (event: UploadPreviewUpdatePayload) => {
    const { file: { id } } = event;

    if (event.preview !== undefined) {
      this.stateManager.updateState(id, {
        id,
        thumbnail: event.preview
      });
    }
  }

  private handleDragEnter = () => {
    this.onDragListeners.forEach(cb => cb.call(cb, 'enter'));
  }

  private handleDragLeave = () => {
    this.onDragListeners.forEach(cb => cb.call(cb, 'leave'));
  }
}
