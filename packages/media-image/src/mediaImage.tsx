import * as React from 'react';
import { Component } from 'react';

export type MediaApiConfig = {
  clientId: string;
  token: string;
  serviceHost: string;
};

export interface MediaImageProps {
  id: string;
  mediaApiConfig: MediaApiConfig;
  collectionName?: string;
}

export interface MediaImageState {}

export class MediaImage extends Component<MediaImageProps, MediaImageState> {
  private get imgSrc(): string {
    const {id, mediaApiConfig, collectionName} = this.props;
    const {clientId, token, serviceHost} = mediaApiConfig;
    const endpoint = `file/${id}/image`;

    return `${serviceHost}/${endpoint}?collection=${collectionName}&client=${clientId}&token=${token}`;
  }

  private get hasAuth(): boolean {
    const {clientId, token, serviceHost} = this.props.mediaApiConfig;

    return !!clientId && !!token && !!serviceHost;
  }

  render() {
    const {hasAuth, imgSrc} = this;
    if (!hasAuth) { return null; }

    return (
      <img src={imgSrc} />
    );
  }
}

export default MediaImage;
