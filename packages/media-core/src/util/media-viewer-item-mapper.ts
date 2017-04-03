import { MediaItem, FileItem } from '../item';

export type MediaViewerItemType =
  'image/gif' |
  'application/pdf' |
  'image/jpeg' |
  'audio/mpeg' |
  'video/mp4' |
  'application/x-sea' |
  'not/supported';

const typesByMimeType: { [mimeType: string]: MediaViewerItemType } = {
  'image/gif': 'image/gif'
};

const typesByMediaType: { [mediaType: string]: MediaViewerItemType } = {
  doc: 'application/pdf',
  image: 'image/jpeg',
  audio: 'audio/mpeg',
  video: 'video/mp4',
  archive: 'not/supported',
  model: 'application/x-sea',
  unknown: 'not/supported'
};

export default class MediaViewerItemMapper {
  static fromMediaItem(mediaItem: MediaItem): MediaViewerItemType | undefined {
    if (mediaItem.type === 'file') {
      return MediaViewerItemMapper.fromFileMimeType(mediaItem)
        || MediaViewerItemMapper.fromFileMediaType(mediaItem)
        || undefined;
    } else {
      return undefined;
    }
  }

  private static fromFileMimeType(fileItem: FileItem): MediaViewerItemType | undefined {
    const { mimeType } = fileItem.details;
    if (mimeType) {
      return typesByMimeType[mimeType];
    } else {
      return undefined;
    }
  }

  private static fromFileMediaType(fileItem: FileItem): MediaViewerItemType | undefined {
    const { mediaType } = fileItem.details;
    if (mediaType) {
      return typesByMediaType[mediaType];
    } else {
      return undefined;
    }
  }
}
