import * as React from 'react';
import {Component} from 'react';
import {Observable, Subscription} from 'rxjs';
import {MediaItem, FileItem, MediaItemDetails, UrlPreview} from '@atlaskit/media-core';

import {SharedCardProps, CardEventProps, OnLoadingChangeState, OnLoadingChangeFunc} from '.';
import {LinkCard} from './links';
import {FileCard} from './files';
import {Provider} from './card';
import {CardProcessingStatus} from '.';

export interface MediaCardProps extends SharedCardProps, CardEventProps {
  readonly type: string;
  readonly provider: Provider;
  readonly dataURIService;
}

export interface MediaCardState {
  readonly subscription?: Subscription;
  readonly cardProcessingStatus: CardProcessingStatus;
  readonly details?: MediaItemDetails;
  readonly error?: Error;
}

export class MediaCard extends Component<MediaCardProps, MediaCardState> {
  static defaultProps: Partial<MediaCardProps> = {
    onLoadingChange: () => {}
  };

  state: MediaCardState = {
    cardProcessingStatus: 'loading'
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

  private observable = (props: MediaCardProps): Observable<MediaItemDetails> => {
    const {provider} = props;

    return provider.observable()
      .map((result: MediaItem | UrlPreview) => {
        if (this.isMediaItem(result)) {
          return result.details;
        } else {
          return result;
        }
      });
  }

  private stateToCardProcessingStatus(): OnLoadingChangeState {
    const {cardProcessingStatus, error, details} = this.state;
    return {
      type: cardProcessingStatus,
      payload: error ? error : details
    };
  }

  private updateState(props: MediaCardProps): void {
    this.unsubscribe();
    this.setPartialState({cardProcessingStatus: 'loading'});

    const onLoadingChange = this.props.onLoadingChange as OnLoadingChangeFunc;
    onLoadingChange(this.stateToCardProcessingStatus());

    this.setPartialState({
      subscription: this.observable(props).subscribe({
        next: details => {
          this.setPartialState(
            {details, error: undefined, cardProcessingStatus: 'processing'},
            () => onLoadingChange(this.stateToCardProcessingStatus())
          );
        },

        complete: () => {
          this.setPartialState(
            {error: undefined, cardProcessingStatus: 'complete'},
            () => onLoadingChange(this.stateToCardProcessingStatus())
          );
        },

        error: (error) => {
          this.setPartialState(
            {error, cardProcessingStatus: 'error'},
            () => onLoadingChange(this.stateToCardProcessingStatus())
          );
        }
      })
    });
  }

  private setPartialState(partialState: Partial<MediaCardState>, callback?: () => any) {
    this.setState((previousState, props) => {
      return { ...previousState, ...partialState };
    }, callback);
  }

  private unsubscribe(): void {
    this.state && this.state.subscription && this.state.subscription.unsubscribe();
  }

  render() {
    const {type, provider, dataURIService, onLoadingChange, ...otherProps} = this.props;
    const {details, cardProcessingStatus, error} = this.state;

    if (type === 'link') {
      return (
        <LinkCard
          {...otherProps}
          urlPreview={details as UrlPreview | undefined}
          cardProcessingStatus={cardProcessingStatus}
          error={error}
        />
      );
    } else {
      return (
        <FileCard
          {...otherProps}
          fileDetails={details}
          cardProcessingStatus={cardProcessingStatus}
          error={error}
          dataURIService={dataURIService}
        />
      );
    }
  }
}
