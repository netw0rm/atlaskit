import * as React from 'react';
import { Component } from 'react';
import { Context, FileItem } from '@atlaskit/media-core';
import { Subscription } from 'rxjs/Subscription';
import { fetchToken } from '../domain/fetch-token';
import { MediaFileAttributesFactory } from '../domain/media-file-attributes';
import { MediaViewerConstructor, MediaViewerInterface, MediaViewerConfig } from '../mediaviewer';
import { MediaViewerItem } from './media-viewer';
import { Observable } from 'rxjs';

export interface MediaFileListViewerProps {
  readonly context: Context;

  readonly selectedItem: MediaViewerItem;
  readonly surroundingItems: Array<MediaViewerItem>;

  readonly collectionName?: string;

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

  componentDidMount(): void {
    const { context, selectedItem, surroundingItems, collectionName, onClose } = this.props;
    const { config } = context;
    const { serviceHost } = config;
    const { mediaViewer } = this.state;

    if (onClose) {
      mediaViewer.on('fv.close', onClose);
    }

    const filesToProcess = surroundingItems
      .filter(item => item.type === 'file'); // for now we only support files

    const observableFileItems = filesToProcess
      .map(item => context.getMediaItemProvider(item.id, item.type, collectionName))
      .map(provider => provider.observable().map(item => item as FileItem));

    this.state = {
      subscription: Observable
        .zip(...observableFileItems)
        .subscribe({
          next: fileItems => {
            const occurrenceKeys = filesToProcess.map(f => f.occurrenceKey);

            const mvClassicFiles = MediaFileAttributesFactory.fromFileItemList(fileItems, occurrenceKeys, serviceHost);
            const selectedMvClassicId = mvClassicFiles
              .find(f => f.id === selectedItem.id && f.occurrenceKey === selectedItem.occurrenceKey);

            mediaViewer.setFiles(mvClassicFiles);
            mediaViewer.open({ id: selectedMvClassicId });
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
