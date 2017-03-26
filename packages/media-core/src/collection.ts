export interface MediaCollectionFileItem {
  type: 'file';
  id: string;
  occurrenceKey: string;
  name: string;
  mimeType: string;
}

export interface MediaCollectionLinkItem {
  type: 'link';
  id: string;
  occurrenceKey: string;
  url: string;
}

export type MediaCollectionItem = MediaCollectionFileItem | MediaCollectionLinkItem;

export interface MediaCollection {
  id: string;
  items: Array<MediaCollectionItem>;
}
