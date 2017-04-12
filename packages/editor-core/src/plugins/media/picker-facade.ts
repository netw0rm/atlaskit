import { MediaStateManager, UploadParams } from './../../media';
import { MediaPicker } from '@atlassian/mediapicker';
import { ContextConfig, Context } from '@atlaskit/media-core';

export default class PickerFacade {
  private picker: any;

  constructor(
    pickerType: string,
    uploadParams: UploadParams,
    contextConfig: ContextConfig,
    private stateManager: MediaStateManager
  ) {
    const picker = this.picker = MediaPicker(
      pickerType,
      this.buildPickerConfigFromContext(uploadParams, contextConfig)
    );

    picker.on('upload-start', this.handleUploadStart);
    picker.on('upload-preview-update', this.handleUploadPreviewUpdate);
    picker.on('upload-status-update', this.handleUploadStatusUpdate);
    picker.on('upload-processing', this.handleUploadProcessing);
    picker.on('upload-end', this.handleUploadEnd);

    if (picker.activate) {
      picker.activate();
    }
  }

  destroy() {
    const { picker } = this;

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

  onStart(cb: (...args: any[]) => any) {
    this.picker.addListener('upload-start', cb);
  }

  onEnd(cb: (...args: any[]) => any) {
    this.picker.addListener('upload-end', cb);
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

  private handleUploadStart = (event: any) => {
    const tempId = `temporary:${event.file.id}`;
    const { file } = event;

    this.stateManager.updateState(tempId, {
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

    this.stateManager.updateState(tempId, {
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

    this.stateManager.updateState(tempId, {
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

    this.stateManager.updateState(tempId, {
      id: file.publicId as string,
      status: 'ready',
      fileName: file.name as string,
      fileSize: file.size as number,
      fileType: file.type as string,
    });
  }

  private handleUploadPreviewUpdate = (event: any) => {
    const tempId = `temporary:${event.file.id}`;

    if (event.preview !== undefined) {
      this.stateManager.updateState(tempId, {
        id: tempId,
        thumbnail: event.preview
      });
    }
  }
}
