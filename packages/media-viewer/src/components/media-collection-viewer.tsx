import * as React from 'react';
import { Component } from 'react';
import { Context, MediaCollectionItem, MediaCollectionFileItem } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { fetchToken } from '../domain/fetch-token';
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
    const { clientId, tokenProvider } = config;

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
      const collectionFileItemFilter = (item: MediaCollectionItem) => item.type === 'file';

      this.subscription = provider.observable().subscribe({
        next: collection => {
          if (onClose) {
            mediaViewer.on('fv.close', onClose);
          }
          const files = collection.items
            .filter(collectionFileItemFilter)
            .map((item: MediaCollectionFileItem) => ({
              id: item.details.occurrenceKey,
              src: `${config.serviceHost}/file/${item.details.id}/binary`,
              type: item.details.mimeType,
              title: item.details.name
            }));

          mediaViewer.setFiles(files);
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
