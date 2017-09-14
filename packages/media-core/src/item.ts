import {MediaType} from './mediaTypes';
import {SmartCardResponse} from './smartCardResponse';

export type MediaItemType = 'file' | 'link';

export type MediaItem = FileItem | LinkItem;

export type MediaItemDetails = FileDetails | LinkDetails | UrlPreview;

export interface FileItem {
  type: 'file';
  details: FileDetails;
}

export type FileProcessingStatus = 'pending' | 'running' | 'succeeded' | 'failed';

export type FileArtifact = {
  readonly url: string;
  readonly processingStatus: FileProcessingStatus;
};

export type ArtifactName = 'thumb.jpg' | 'thumb_120.jpg' | 'thumb_large.jpg' | 'thumb_320.jpg' | 'document.pdf' | 'document.txt' |
  'image.jpg' | 'audio.mp3' | 'video_640.mp4' | 'video_1280.mp4' | 'poster_640.jpg' | 'poster_1280.jpg' | 'meta.json';
export type FileArtifacts = {[artifactName: string]: FileArtifact};

export interface FileDetails {
  id?: string;
  name?: string;
  size?: number;
  mimeType?: string;
  mediaType?: MediaType;
  creationDate?: number; // timestamp in milliseconds from EPOCH
  processingStatus?: FileProcessingStatus;
  artifacts?: FileArtifacts;
}

export interface LinkItem {
  type: 'link';
  details: LinkDetails;
}

export interface LinkDetails extends UrlPreview {
  id: string;
}

export interface UrlPreview {
  type: string;
  url: string;
  title: string;
  description?: string;
  site?: string;
  author?: UrlAuthorDetails;
  date?: number;
  resources?: Resources;
}

export interface UrlAuthorDetails {
  name?: string;
  url?: string;
}

export interface Resources {
  icon?: Resource;
  thumbnail?: Resource;
  image?: Resource;
  file?: Resource;
  player?: Resource;
  app?: Resource;
  smartCard?: SmartCardResponse;
}

export interface Resource {
  url?: string;
  type?: string;
  width?: number;
  height?: number;
  aspect_ratio?: number;
  length?: number;
  html?: string;
}

export function isFileItem(mediaItem: MediaItem): mediaItem is FileItem {
  return mediaItem.type === 'file';
}

export function isLinkItem(mediaItem: MediaItem): mediaItem is LinkItem {
  return mediaItem.type === 'link';
}
