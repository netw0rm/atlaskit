import * as React from 'react';
import { Component } from 'react';
import { Context, FileItem } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { fetchToken } from '../domain/fetch-token';
import { MediaFileAttributesFactory } from '../domain/media-file-attributes';
import { MediaViewerConstructor, MediaViewerInterface, MediaViewerConfig } from '../mediaviewer';
import { Observable } from 'rxjs';

export interface MediaFileListViewerProps {
  readonly context: Context;

  readonly fileId: string;
  readonly fileIds: Array<string>;
  readonly collectionName: string;

  readonly MediaViewer: MediaViewerConstructor;
  readonly mediaViewerConfiguration?: MediaViewerConfig;
  readonly basePath: string;

  readonly onClose?: () => void;
}

export interface MediaListFileViewerState {
  readonly subscription?: Subscription;
  readonly mediaViewer: MediaViewerInterface;
}

export class MediaFileListViewer extends Component<MediaFileListViewerProps, MediaListFileViewerState> {
  constructor(props: MediaFileListViewerProps) {
    super(props);

    const { context, collectionName, basePath, MediaViewer, mediaViewerConfiguration } = props;
    const { config: {authProvider} } = context;

    this.state = {
      mediaViewer: new MediaViewer({
        ...mediaViewerConfiguration,
        assets: {
          basePath: basePath
        },
        fetchToken: fetchToken(authProvider, collectionName)
      })
    };
  }

  _unique(originalArray: Array<string>): Array<string> {
    return originalArray.reduce((arr: Array<string>, b) => {
      if (arr.indexOf(b) < 0 ) {
        arr.push(b);
      }
      return arr;
    },[]);
  }

  componentDidMount(): void {
    const { context, fileId, fileIds, collectionName, onClose } = this.props;
    const { config } = context;
    const { serviceHost } = config;
    const { mediaViewer } = this.state;

    if (onClose) {
      mediaViewer.on('fv.close', onClose);
    }

    const observableFileItems = this._unique(fileIds)
      .map(fileId => context.getMediaItemProvider(fileId, 'file', collectionName))
      .map(provider => provider.observable().map(item => item as FileItem));

    this.state = {
      subscription: Observable
        .zip(...observableFileItems)
        .subscribe({
          next: items => {
            const files = MediaFileAttributesFactory.fromFileItemList(items, serviceHost);
            mediaViewer.setFiles(files);
            mediaViewer.open({ id: fileId });
          }
        }),
      mediaViewer
    };
  }

  componentWillUnmount(): void {
    const { onClose } = this.props;
    const { mediaViewer, subscription } = this.state;

    if (subscription) {
      subscription.unsubscribe();
    }
    if (onClose) {
      mediaViewer.off('fv.close', onClose);
    }
  }

  render(): JSX.Element {
    return (
      <div />
    );
  }
}
