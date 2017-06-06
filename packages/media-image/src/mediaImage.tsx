import * as React from 'react';
import { Component } from 'react';

export type MediaApiConfig {
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
  render() {
    return (
      <img src="" alt="" />
    );
  }
}

export default MediaImage;
