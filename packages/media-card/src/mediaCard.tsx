
import * as React from 'react';
import {Component} from 'react';
import {Observable, Subscription} from 'rxjs';
import 'rxjs/add/operator/map';
import {MediaItemType, MediaItem, FileItem, FileDetails, LinkDetails, UrlPreview, DataUriService} from '@atlaskit/media-core';

import {SharedCardProps, CardEventProps, OnLoadingChangeState, CardStatus} from '.';
import {Provider} from './card';
import {CardView} from './cardView';
import {withDataURI} from './withDataURI';

const CardViewWithDataURI = withDataURI(CardView); // tslint:disable-line:variable-name

export interface MediaCardProps extends SharedCardProps, CardEventProps {
  readonly provider: Provider;
  readonly mediaItemType?: MediaItemType;
  readonly dataURIService?: DataUriService;
  readonly getFileBinary?: (id: string) => Promise<string>;
}

export interface MediaCardState {
  readonly subscription?: Subscription;
  readonly status: CardStatus;

  // can NOT use MediaItemDetails because get the following error: https://github.com/Microsoft/TypeScript/issues/9944
  readonly metadata?: FileDetails | LinkDetails | UrlPreview;
  readonly error?: Error;
}

export class MediaCard extends Component<MediaCardProps, MediaCardState> {
  state: MediaCardState = {
    status: 'loading'
  };

  componentDidMount(): void {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: MediaCardProps, nextContext: any): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  private shouldUpdateState(nextProps: MediaCardProps): boolean {
    return nextProps.provider !== this.props.provider;
  }

  private isMediaItem(mediaItem: MediaItem|UrlPreview): mediaItem is FileItem {
    return mediaItem && (mediaItem as MediaItem).details !== undefined;
  }

  observable = (props: MediaCardProps): Observable<FileDetails | LinkDetails | UrlPreview> => {
    const {provider} = props;
    return provider.observable()
      .map((result: MediaItem | UrlPreview) => {
        if (this.isMediaItem(result)) {
          return result.details;
        } else {
          return result;
        }
      })
    ;
  }

  private stateToCardProcessingStatus(): OnLoadingChangeState {
    const {status, error, metadata} = this.state;
    return {
      type: status,
      payload: error || metadata
    };
  }

  private updateState(props: MediaCardProps): void {
    const {onLoadingChange = () => {/* do nothing */}} = this.props;
    this.unsubscribe();

    this.setPartialState(
      {status: 'loading'},
      () => this.setPartialState(
        {
          subscription: this.observable(props).subscribe({
            next: metadata => {
              this.setPartialState(
                {metadata, error: undefined, status: 'processing'},
                () => onLoadingChange(this.stateToCardProcessingStatus())
              );
            },

            complete: () => {
              this.setPartialState(
                {error: undefined, status: 'complete'},
                () => onLoadingChange(this.stateToCardProcessingStatus())
              );
            },

            error: (error) => {
              this.setPartialState(
                {error, status: 'error'},
                () => onLoadingChange(this.stateToCardProcessingStatus())
              );
            }
          })
        },
        () => onLoadingChange(this.stateToCardProcessingStatus())
      )
    );
  }

  private setPartialState(partialState: Partial<MediaCardState>, callback?: () => any) {
    this.setState((previousState, props) => {
      return { ...previousState, ...partialState };
    }, callback);
  }

  private unsubscribe(): void {
    if (this.state && this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  private isFileDetails(metadata?: FileDetails | LinkDetails | UrlPreview): metadata is FileDetails {
    const details = metadata as LinkDetails | UrlPreview;
    return details && details.url === undefined;
  }

  render() {
    const {mediaItemType, provider, dataURIService, onLoadingChange, getFileBinary, ...otherProps} = this.props;
    const {metadata, status} = this.state;
    const {id, mediaType: actualMediaType} = this.isFileDetails(metadata) ? metadata : {id: undefined, mediaType: undefined};

    if (actualMediaType) {
      console.log(actualMediaType, getFileBinary);
    }

    const videoUrl = this.getBinaryUrlPromise({actualMediaType, binaryMediaType: 'video', id});
    const audioUrl = this.getBinaryUrlPromise({actualMediaType, binaryMediaType: 'audio', id});

    return (
      <CardViewWithDataURI
        {...otherProps}

        dataURIService={dataURIService}
        status={status}
        metadata={metadata}
        mediaItemType={mediaItemType}
        videoUrl={videoUrl}
        audioUrl={audioUrl}
      />
    );
  }

  private getBinaryUrlPromise = (
      {binaryMediaType, actualMediaType, id}: {binaryMediaType: string, actualMediaType?: string, id?: string}
    ) => {
    const {getFileBinary} = this.props;

    return actualMediaType === binaryMediaType && id && getFileBinary
      ? getFileBinary(id)
      : undefined;
  }
}
