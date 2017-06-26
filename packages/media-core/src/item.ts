import { MediaType } from './mediaTypes';
export type MediaItemType = 'file' | 'link';

export type MediaItem = FileItem | LinkItem;

export type MediaItemDetails = FileDetails | LinkDetails | UrlPreview;

export interface FileItem {
  type: 'file';
  details: FileDetails;
}

export type FileProcessingStatus = 'pending' | 'running' | 'succeeded' | 'failed';

export interface FileDetails {
  id?: string;
  name?: string;
  size?: number;
  mimeType?: string;
  mediaType?: MediaType;
  creationDate?: number; // timestamp in milliseconds from EPOCH
  processingStatus?: FileProcessingStatus;
  artifacts?: Object;
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
  app?: App;
}

export interface Resource {
  url?: string;
  type?: string;
  width?: number;
  height?: number;
  length?: number;
  html?: string;
}

export interface App {
  title: AppTitle;
  description?: AppDescription;
  details?: AppDetail[];
  context?: AppContext;
  preview?: {url: string}; // an image URL
  background?: {url: string}; // an image URL
}

export interface AppTitle {
  text: string;
  user?: AppUser;
  lozenge?: AppLozenge;
}

export interface AppDescription {
  title?: string; // the bolded bit
  text: string;
}

export interface AppIcon {
  url: string;    // an image URL
  label: string;  // accessibility text e.g. tooltip or voiceover
}

export interface AppUser {
  icon: AppIcon;
}

export interface AppBadge {
  value: number;
  max?: number;
  theme?: 'default' | 'dark';
  appearance?: 'default' | 'primary' | 'important' | 'added' | 'removed';
}

export interface AppLozenge {
  text: string;
  bold?: boolean;
  appearance?: 'default' | 'success' | 'removed' | 'inprogress' | 'new' | 'moved';
}

export interface AppDetail {
  title?: string;
  icon?: AppIcon;
  badge?: AppBadge;
  lozenge?: AppLozenge;
  users?: AppUser[];
  text?: string;
}

export interface AppContext {
  text: string;
  icon?: AppIcon;
}
