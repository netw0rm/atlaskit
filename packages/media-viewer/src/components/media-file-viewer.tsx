import * as React from 'react';
import { Component } from 'react';
import { Subscription } from 'rxjs/Subscription';
import { Context, FileItem } from '@atlaskit/media-core';
import { fetchToken } from '../util/fetch-token';

export interface MediaFileViewerProps {
  readonly context: Context;
  readonly fileId: string;
  readonly collectionName?: string;
  readonly basePath: string;

  readonly onClose?: () => void;
}

export interface MediaFileViewerState {
  readonly mediaViewer: MediaViewer;
}

export class MediaFileViewer extends Component<MediaFileViewerProps, MediaFileViewerState> {
  private subscription: Subscription;

  componentDidMount(): void {
    const { context, fileId, collectionName, basePath, onClose } = this.props;
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
      const provider = context.getMediaItemProvider(fileId, 'file', collectionName);

      this.subscription = provider.observable().subscribe({
        next: (item: FileItem) => {
          if (onClose) {
            mediaViewer.on('fv.close', onClose);
          }
          mediaViewer.setFiles([{
            id: item.details.id,
            src: `${config.serviceHost}/file/${item.details.id}/binary`,
            type: item.details.mimeType,
            title: item.details.name
          }]);
          mediaViewer.open({ id: item.details.id });
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
