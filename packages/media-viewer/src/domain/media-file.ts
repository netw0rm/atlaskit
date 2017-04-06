import { FileItem } from '@atlaskit/media-core';
import { ArtifactFormat } from './artifact-format';

export interface MediaFile {
  readonly src: string;
  readonly srcDownload: string;

  readonly type?: string;
  readonly title?: string;
  readonly src_hd?: string;
  readonly poster?: string;
}

export class MediaFile {
  static fromFileItem(fileItem: FileItem, serviceHost: string): MediaFile {
    const getArtifactUrl = (name: string) => {
      return fileItem.details.artifacts &&
        fileItem.details.artifacts[name] &&
        fileItem.details.artifacts[name].url;
    };

    const binary = `/file/${fileItem.details.id}/binary`;
    const artifactFormat = ArtifactFormat.fromFileItem(fileItem);
    const resource = artifactFormat && getArtifactUrl(artifactFormat.name) || binary;
    const video1280 = getArtifactUrl('video_1280.mp4');
    const poster1280 = getArtifactUrl('poster_1280.jpg');
    const poster640 = getArtifactUrl('poster_640.jpg');

    return {
      src: `${serviceHost}${resource}`,
      srcDownload: `${serviceHost}${binary}&dl=1`,
      type: artifactFormat ? artifactFormat.type : fileItem.details.mediaType,
      title: fileItem.details.name,
      src_hd: video1280 && `${serviceHost}${video1280}`,
      poster: poster1280 ? `${serviceHost}${poster1280}` : poster640 && `${serviceHost}${poster640}`
    };
  }
}
