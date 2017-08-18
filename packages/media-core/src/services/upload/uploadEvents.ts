import { FileDetails } from '../..';

export type UploadEventType = 'progress' | 'finalize-ready' | 'needs-conversion' | 'end';

export interface UploadEvent {
  type: UploadEventType;
}

export interface UploadProgressEvent extends UploadEvent {
  type: 'progress';
  bytesUploaded: number;
  totalBytes: number;
}

export type FinalizeCallback = () => void;

export interface UploadFinalizeReadyEvent extends UploadEvent {
  type: 'finalize-ready';
  callback: FinalizeCallback;
}

export interface UploadEndEvent extends UploadEvent {
  type: 'end';
  fileDetails: FileDetails;
}
