declare class MediaViewer {
  constructor(config);
  open(fileQuery?: Object): Promise<void>;
  setFiles(files: Array<Object>, nextFileQuery?: Object): void;

  on(eventName: 'fv.open', callback: () => void, context?: any): void;
  on(eventName: 'fv.close', callback: () => void, context?: any): void;
  on(eventName: 'fv.setFiles', callback: () => void, context?: any): void;
  on(eventName: 'fv.changeMode', callback: (mode: MediaViewerMode) => void, context?: any): void;
  on(eventName: 'fv.updateFiles', callback: () => void, context?: any): void;
  on(eventName: 'fv.changeFile', callback: (file: File) => void, context?: any): void;
  on(eventName: 'fv.showFile', callback: (file: File) => void, context?: any): void;
  on(eventName: 'fv.showFileError', callback: (file: File) => void, context?: any): void;
  on(eventName: 'reset', callback: (files: any) => void, context?: any): void;

  off(eventName?: string, callback?: Function, context?: any): any;
}

type MediaViewerMode = 'BASE' | 'PRESENTATION' | 'CONTAINED';

interface File {
  readonly src: string;
  readonly type: string;
  readonly thumbnail: string;
  readonly poster: string;
  readonly title: string;
  readonly downloadable: boolean;
}
