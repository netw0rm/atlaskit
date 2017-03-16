export * from './item';
export * from './actions';
export * from './config';
export * from './mediaTypes';
export * from './context/context';
export * from './collection';
export * from './trello';

export interface Metadata {
  id: string;
  mediaType: string;
  mimeType: string;
  name: string;
  processingStatus: string;
  size: number;
}

export type DataUri = string;
