import * as React from 'react';
import {Component} from 'react';
import {Observable, Subscription} from 'rxjs';
import {MediaItemType, MediaItemProvider, FileDetails, UrlPreview, UrlPreviewProvider, MediaItem, MediaItemDetails} from '@atlaskit/media-core';

import {CardProps, OnLoadingChangeState, OnLoadingChangeFunc} from '.';
import {LinkCard} from './links';
import {FileCard} from './files';
import {Provider} from './card';
import {CardProcessingStatus} from '.';

export interface MediaCardProps extends CardProps {
  readonly type: MediaItemType;
  readonly provider: Provider;
}

export interface MediaCardState {
  readonly subscription?: Subscription;
  readonly cardProcessingStatus: CardProcessingStatus;
  readonly details?: MediaItemDetails;
  readonly error?: Error;
}

export class MediaCard extends Component<MediaCardProps, MediaCardState> {

  static defaultProps: Partial<MediaCardProps> = {
    actions: [],
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

  private isMediaItem(mediaItem: MediaItem|UrlPreview): mediaItem is MediaItem {
    const {details} = (mediaItem as MediaItem);
    return details && details.id !== undefined;
  }

  observable = (): Observable<MediaItemDetails> => {
    const {provider} = this.props;
    return provider.observable().map((result: MediaItem|UrlPreview) => {
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
      subscription: this.observable().subscribe({

        next: details => {
          this.setPartialState(
            {details, error: undefined, cardProcessingStatus: 'processing'},
            () => onLoadingChange(this.stateToCardProcessingStatus())
          );
        },

        complete: () => {
          this.setPartialState(
            {cardProcessingStatus: 'complete'},
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
    const {type, provider, ...otherProps} = this.props;
    const {details, cardProcessingStatus} = this.state;
    if (type === 'link') {
      return (
        <LinkCard
          {...otherProps}
          urlPreview={details}
          cardProcessingStatus={cardProcessingStatus}
        />
      );
    } else {
      return (
        <FileCard {...otherProps} fileDetails={details} cardProcessingStatus={cardProcessingStatus}/>
      );
    }
  }
}
