import * as React from 'react';
import {Component} from 'react';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {CardView, CardViewSmall, DEFAULT_CARD_DIMENSIONS} from '..';
import {DataUri, Context, CardAction, CardActionType, MediaItem, MediaItemType, LinkDetails, FileDetails} from '@atlaskit/media-core';
import {isRetina} from './util/isRetina';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/fromPromise';

const SMALL_CARD_IMAGE_WIDTH = 32;
const SMALL_CARD_IMAGE_HEIGHT = 32;

export interface CardProps {
  readonly context: Context;
  readonly id: string;
  readonly mediaItemType: MediaItemType;
  readonly collectionName?: string;

  readonly selectable?: boolean;
  readonly selected?: boolean;

  readonly actions?: Array<CardAction>;

  readonly width?: number;
  readonly height?: number;

  readonly type?: 'normal' | 'small';
  readonly onClick?: (event: Event, item: MediaItem) => void;
  readonly onHover?: (event: any) => void;
  readonly onError?: (error: Error) => void;
  readonly onSelect?: (mediaItem: MediaItem) => void;
  readonly onDeselect?: (mediaItem: MediaItem) => void;
}

export interface CardState {
  readonly subscription: Subscription;
  readonly loading: boolean;

  readonly mediaItem?: MediaItem;
  readonly dataURI?: string;
  readonly error?: Error;
}

export class Card extends Component<CardProps, CardState> {

  static defaultProps: Partial<CardProps> = {
    actions: []
  };

  private setPartialState(partialState: Partial<CardState>, callback?: () => any) {
    this.setState((previousState, props) => {
      return {...previousState, ...partialState};
    }, callback);
  }

  private shouldUpdateState(nextProps: CardProps): boolean {
    return (nextProps.context !== this.props.context);
  }

  private unsubscribe(): void {
    if (this.state && this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  private fetchDataUri(mediaItem: MediaItem): Promise<DataUri> {
    if (mediaItem.type === 'link') {
      if (mediaItem.details.resources && mediaItem.details.resources.thumbnail && mediaItem.details.resources.thumbnail.url) {
        return Promise.resolve(mediaItem.details.resources.thumbnail.url);
      }

      return Promise.reject(undefined);
    }
    else if (mediaItem.type === 'file' && mediaItem.details.mimeType === 'image/gif') {
      return this.props.context.getDataUriService(this.props.collectionName).fetchOriginalDataUri(mediaItem);
    } else {
      const retinaFactor = isRetina() ? 2 : 1;
      const width = (this._isSmall() ? SMALL_CARD_IMAGE_WIDTH : this.props.width || DEFAULT_CARD_DIMENSIONS.WIDTH) * retinaFactor;
      const height = (this._isSmall() ? SMALL_CARD_IMAGE_HEIGHT : this.props.height || DEFAULT_CARD_DIMENSIONS.HEIGHT) * retinaFactor;
      return this.props.context.getDataUriService(this.props.collectionName).fetchImageDataUri(mediaItem, width, height).catch(error => {});
    }
  }

  private updateState(props: CardProps): void {
    this.unsubscribe();

    const mediaItemProvider = props.context.getMediaItemProvider(props.id, props.mediaItemType, props.collectionName);
    const isProcessingCompleted = (mediaItem: MediaItem) => (mediaItem.type === 'file' && mediaItem.details.processingStatus !== 'pending') || (mediaItem.type === 'link');

    const provider = mediaItemProvider.observable()
      .mergeMap(mediaItem => {
        if (isProcessingCompleted(mediaItem)) {
          return Observable.fromPromise(
            this.fetchDataUri(mediaItem)
              .then(dataUri => ({mediaItem, dataUri})));
        } else {
          return Observable.of({mediaItem});
        }
      });

    this.setPartialState({loading: true});

    this.setPartialState({
      subscription: provider.subscribe({
        next: ({mediaItem, dataUri}) => {
          this.setPartialState({
            dataURI: dataUri,
            mediaItem,
            error: undefined,
            loading: false
          });
        },
        complete: () => {
          this.setPartialState({
            loading: false
          });
        },
        error: (error) => {
          this.setPartialState({
            error: error,
            loading: false
          });
        }
      })
    });
  }

  componentDidMount(): void {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps: CardProps, nextContext: any): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  }

  componentWillUnmount(): void {
    this.unsubscribe();
  }

  render() {
    if (this.state) {
      const item = this.state.mediaItem;

      if (item) {
        switch (item.type) {
          case 'file':
            return this.renderFile(item.details);
          case 'link':
            return this.renderLink(item.details);
          default:
            return this.renderNoMediaItem();
        }
      } else {
        return this.renderNoMediaItem();
      }
    } else {
      return <div />;
    }
  }

  onClick(event: Event): void { // TODO: select handlers seem to be broken now. fix.
    const onClick = this._getFirstAction(CardActionType.click);

    if (onClick && this.state.mediaItem) {
      onClick.handler(this.state.mediaItem, event);
    }
  }

  renderNoMediaItem(): JSX.Element {
    const errorMessage = this.state.error ? 'Error loading card' : undefined;
    return (this._isSmall()) ?
      (
        <CardViewSmall
          error={errorMessage}
          width={this.props.width}
          loading={this.state.loading}
          dataURI={this.state.dataURI}
          menuActions={this._getMenuActions()}
          onClick={this.onClick.bind(this)}
        />
      ) : (
        <CardView
          error={errorMessage}
          height={this.props.height || DEFAULT_CARD_DIMENSIONS.HEIGHT}
          width={this.props.width || DEFAULT_CARD_DIMENSIONS.WIDTH}
          loading={this.state.loading}
          selectable={this.props.selectable}
          selected={this.props.selected}
          dataURI={this.state.dataURI}
          menuActions={this._getMenuActions()}
          onClick={this.onClick.bind(this)}
        />
      );
  }

  renderFile(file: FileDetails): JSX.Element {
    const card = (this._isSmall()) ?
      (
        <CardViewSmall
          width={this.props.width}
          loading={this.state.loading}
          dataURI={this.state.dataURI}
          mediaName={file.name}
          mediaType={file.mediaType}
          mediaSize={file.size}
          menuActions={this._getMenuActions()}
          onClick={this.onClick.bind(this)}
        />
      ) : (
        <CardView
          width={this.props.width || DEFAULT_CARD_DIMENSIONS.WIDTH}
          height={this.props.height || DEFAULT_CARD_DIMENSIONS.HEIGHT}
          loading={this.state.loading}
          dataURI={this.state.dataURI}
          mediaName={file.name}
          mediaType={file.mediaType}
          mediaSize={file.size}
          menuActions={this._getMenuActions()}
          onClick={this.onClick.bind(this)}
          selectable={this.props.selectable}
          selected={this.props.selected}
        />
      );

    return card;
  }

  // TODO: mediaType is hard coded. this needs a bit more of thought.
  renderLink(link: LinkDetails): JSX.Element {
    return <CardView
      height={this.props.height || DEFAULT_CARD_DIMENSIONS.HEIGHT}
      width={this.props.width || DEFAULT_CARD_DIMENSIONS.WIDTH}
      loading={this.state.loading}
      selectable={this.props.selectable}
      selected={this.props.selected}
      dataURI={this.state.dataURI}
      mediaType={'image'}
      mediaName={link.title}
      menuActions={this._getMenuActions()}
      onClick={this.onClick.bind(this)}
    />;
  }

  private _getFileItem() {
    return this.state.mediaItem;
  }

  private _getFirstAction(type: CardActionType): CardAction {
    const actions = this._getActionsByType(type);
    return (actions.length) ? actions[0] : null;
  }

  private _getMenuActions(): Array<CardAction> {
    const actions = this.props.actions;
    const nonMenuActions = [CardActionType.click];

    return actions.filter(action => nonMenuActions.indexOf(action.type) === -1)
      .map((action: CardAction) => {
        return {
          label: action.label,
          type: action.type,
          handler: () => {
            action.handler(this._getFileItem());
          }
        };
      });
  }

  private _getActionsByType(type: CardActionType): Array<CardAction> {
    const actions: Array<CardAction> = this.props.actions;
    return actions.filter(action => action.type === type);
  }

  private _isSmall() {
    return this.props.type === 'small';
  }
}
