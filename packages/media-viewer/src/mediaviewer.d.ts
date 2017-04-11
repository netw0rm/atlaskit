import 'jquery';

export interface MediaFileAttributes {
  readonly src: string;
  readonly srcDownload: string;

  readonly id?: string;
  readonly type?: string;
  readonly title?: string;
  readonly src_hd?: string;
  readonly poster?: string;
  readonly thumbnail?: string;
  readonly downlodable?: boolean;
}

export interface MediaFile {
  readonly attributes: MediaFileAttributes;
}

export type MediaViewerAssets = {
  readonly basePath: string
};

export interface MediaViewerConfig {
  readonly assets: MediaViewerAssets;
  readonly fetchToken: (file: MediaFile) => JQueryPromise<MediaFileAttributes>;
}

export type MediaViewerMode = 'BASE' | 'PRESENTATION' | 'CONTAINED';

export interface MediaViewerInterface {
  open(fileQuery?: Object): Promise<void>;
  setFiles(files: Array<Object>, nextFileQuery?: Object): void;

  on(eventName: 'fv.open', callback: () => void, context?: any): void;
  on(eventName: 'fv.close', callback: () => void, context?: any): void;
  on(eventName: 'fv.setFiles', callback: () => void, context?: any): void;
  on(eventName: 'fv.changeMode', callback: (mode: MediaViewerMode) => void, context?: any): void;
  on(eventName: 'fv.updateFiles', callback: () => void, context?: any): void;
  on(eventName: 'fv.changeFile', callback: (file: MediaFileAttributes) => void, context?: any): void;
  on(eventName: 'fv.showFile', callback: (file: MediaFileAttributes) => void, context?: any): void;
  on(eventName: 'fv.showFileError', callback: (file: MediaFileAttributes) => void, context?: any): void;
  on(eventName: 'reset', callback: (files: any) => void, context?: any): void;

  off(eventName: string, callback: Function, context?: any): any;
}

export interface MediaViewerConstructor {
  new (config: MediaViewerConfig): MediaViewerInterface;
}
