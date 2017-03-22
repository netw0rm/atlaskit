import * as React from 'react';
import {Component} from 'react';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {DataUri, Context, CardAction, CardActionType, FileItem, FileDetails} from '@atlaskit/media-core';

import {CardDimensions, CardAppearance, OnLoadingChangeFunc, OnSelectChangeFunc, CardEvent} from '../../card';
import {FileCardView} from '../cardView';
import {FileCardViewSmall} from '../cardViewSmall';
import {isRetina} from '../../utils';

const SMALL_CARD_IMAGE_WIDTH = 32;
const SMALL_CARD_IMAGE_HEIGHT = 32;

const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: 156,
  HEIGHT: 104
};

export interface FileCardProps {
  readonly context: Context;
  readonly id: string;
  readonly collectionName?: string;

  readonly appearance?: CardAppearance;
  readonly dimensions?: CardDimensions;

  readonly selectable?: boolean;
  readonly selected?: boolean;

  readonly menuActions?: Array<CardAction>;

  // TODO FIL-3962 update card to fire click, hover, selectChange and loading change callbacks
  readonly onClick?: (result: CardEvent) => void;
  readonly onHover?: (result: CardEvent) => void;
  readonly onSelectChange?: OnSelectChangeFunc;
  readonly onLoadingChange?: OnLoadingChangeFunc;
}

export interface FileCardState {
  readonly subscription: Subscription;
  readonly loading: boolean;

  readonly fileItem?: FileItem;
  readonly dataURI?: string;
  readonly error?: Error;
}

export class FileCard extends Component<FileCardProps, FileCardState> {

  static defaultProps: Partial<FileCardProps> = {
    menuActions: []
  };

  private setPartialState(partialState: Partial<FileCardState>, callback?: () => any) {
    this.setState((previousState, props) => {
      return {...previousState, ...partialState};
    }, callback);
  }

  private shouldUpdateState(nextProps: FileCardProps): boolean {
    return (nextProps.context !== this.props.context);
  }

  private unsubscribe(): void {
    if (this.state && this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  private dataUriWidth(retinaFactor): number {
    const {width} = this.props.dimensions || {width: undefined};

    if (this._isSmall()) {
      return SMALL_CARD_IMAGE_WIDTH * retinaFactor;
    }

    return (typeof width === 'number' ? width : DEFAULT_CARD_DIMENSIONS.WIDTH) * retinaFactor;
  }

  private dataUriHeight(retinaFactor): number {
    const {height} = this.props.dimensions || {height: undefined};

    if (this._isSmall()) {
      return SMALL_CARD_IMAGE_HEIGHT * retinaFactor;
    }

    return (typeof height === 'number' ? height : DEFAULT_CARD_DIMENSIONS.HEIGHT) * retinaFactor;
  }

  private fetchDataUri(fileItem: FileItem): Promise<DataUri> {
    const service = this.props.context.getDataUriService(this.props.collectionName);

    if (this.isGif(fileItem)) {
      return service.fetchOriginalDataUri(fileItem);
    }

    const retinaFactor = isRetina() ? 2 : 1;
    const width = this.dataUriWidth(retinaFactor);
    const height = this.dataUriHeight(retinaFactor);
    return service.fetchImageDataUri(fileItem, width, height);
  }

  private updateState(props: FileCardProps): void {
    this.unsubscribe();

    const fileItemProvider = props.context.getMediaItemProvider(props.id, 'file', props.collectionName);
    const isProcessingCompleted = (fileItem: FileItem) => fileItem.details.processingStatus !== 'pending';

    const provider = fileItemProvider.observable()
      .mergeMap((fileItem: FileItem) => {
        if (isProcessingCompleted(fileItem)) {
          return Observable.fromPromise(
            this.fetchDataUri(fileItem)
              .then(dataUri => ({fileItem, dataUri}))
              .catch(() => ({fileItem}))
            );
        } else {
          return Observable.of({fileItem});
        }
      });

    this.setPartialState({loading: true});

    this.setPartialState({
      subscription: provider.subscribe({
        next: ({fileItem, dataUri}: {fileItem: FileItem, dataUri?: string}) => {
          this.setPartialState({
            dataURI: dataUri,
            fileItem,
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
  };

  componentWillReceiveProps(nextProps: FileCardProps, nextContext: any): void {
    if (this.shouldUpdateState(nextProps)) {
      this.updateState(nextProps);
    }
  };

  componentWillUnmount(): void {
    this.unsubscribe();
  };

  render() {
    if (this.state) {
      const {fileItem} = this.state;

      if (fileItem) {
        return this.renderFile(fileItem.details);
      } else {
        return this.renderNoFileItem();
      }
    } else {
      return <div />;
    }
  }

  onClick(event: Event): void { // TODO: select handlers seem to be broken now. fix.
    const onClick = this._getFirstAction(CardActionType.click);

    if (onClick && this.state.fileItem) {
      onClick.handler(this.state.fileItem, event);
    }
  };

  renderNoFileItem(): JSX.Element {
    const errorMessage = this.state.error ? 'Error loading card' : undefined;
    const {dimensions} = this.props;

    return (this._isSmall()) ?
      (
        <FileCardViewSmall
          error={errorMessage}
          width={dimensions && dimensions.width}
          loading={this.state.loading}
          dataURI={this.state.dataURI}
          menuActions={this._getMenuActions()}
          onClick={this.onClick.bind(this)}
        />
      ) : (
        <FileCardView
          error={errorMessage}
          dimensions={dimensions}
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
    const {dimensions} = this.props;

    const card = (this._isSmall()) ?
      (
        <FileCardViewSmall
          width={dimensions && dimensions.width}
          loading={this.state.loading}
          dataURI={this.state.dataURI}
          mediaName={file.name}
          mediaType={file.mediaType}
          mediaSize={file.size}
          menuActions={this._getMenuActions()}
          onClick={this.onClick.bind(this)}
        />
      ) : (
        <FileCardView
          loading={this.state.loading}
          dataURI={this.state.dataURI}
          dimensions={dimensions}
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

  private _getFileItem() {
    return this.state.fileItem;
  }

  private _getFirstAction(type: CardActionType): CardAction | null {
    const actions = this._getActionsByType(type);
    return (actions.length) ? actions[0] : null;
  }

  private _getMenuActions(): Array < CardAction > {
    // redundant 'or' guarding to satisfy compiler
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    const actions = this.props.menuActions || [];
    const nonMenuActions = [CardActionType.click];

    return actions
      .filter(action => action.type && nonMenuActions.indexOf(action.type) === -1)
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

  private _getActionsByType(type: CardActionType): Array < CardAction > {
    // redundant 'or' guarding to satisfy compiler
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    const actions: Array<CardAction> = this.props.menuActions || [];
    return actions.filter(action => action.type === type);
  }

  private _isSmall() {
    return this.props.appearance === 'small';
  }

  private isGif(mediaItem) {
    return mediaItem.type === 'file' && mediaItem.details.mimeType === 'image/gif';
  }
}
