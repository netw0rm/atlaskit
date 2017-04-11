import * as React from 'react';
import { Component } from 'react';
import { Context } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { fetchToken } from '../domain/fetch-token';
import { MediaFileAttributesFactory } from '../domain/media-file-attributes';
import { MediaViewerInterface, MediaViewerConstructor } from '../mediaviewer';

export interface MediaCollectionViewerProps {
  readonly context: Context;
  readonly occurenceKey: string;
  readonly collectionName: string;

  readonly MediaViewer: MediaViewerConstructor;
  readonly basePath: string;
  readonly onClose?: () => void;
}

export interface MediaCollectionViewerState {
  readonly mediaViewer: MediaViewerInterface;
}

export class MediaCollectionViewer extends Component<MediaCollectionViewerProps, MediaCollectionViewerState> {
  private subscription: Subscription;

  componentDidMount(): void {
    const { context, occurenceKey, collectionName, basePath, onClose, MediaViewer } = this.props;
    const { config } = context;
    const { serviceHost, clientId, tokenProvider } = config;

    this.setState({
      mediaViewer: new MediaViewer({
        assets: {
          basePath: basePath
        },
        fetchToken: fetchToken(clientId, tokenProvider, collectionName)
      })
    }, () => {
      const { mediaViewer } = this.state;
      const provider = context.getMediaCollectionProvider(collectionName, 50);

      this.subscription = provider.observable().subscribe({
        next: collection => {
          if (onClose) {
            mediaViewer.on('fv.close', onClose);
          }
          mediaViewer.setFiles(MediaFileAttributesFactory.fromMediaCollection(collection, serviceHost));
          mediaViewer.open({ id: occurenceKey });
        }
      });
    });
  }

  componentWillUnmount?(): void {
    this.subscription.unsubscribe();
  }

  render(): JSX.Element {
    return (
      <div />
    );
  }
}
