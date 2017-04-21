import * as React from 'react';
import {Component} from 'react';
import {CardAction, CardActionType, FileDetails, DataUriService} from '@atlaskit/media-core';

import {SharedCardProps, CardProcessingStatus} from '../..';
import {FileCardView} from '../cardView';
import {FileCardViewSmall} from '../cardViewSmall';
import {isRetina} from '../../utils';

const SMALL_CARD_IMAGE_WIDTH = 32;
const SMALL_CARD_IMAGE_HEIGHT = 32;

const DEFAULT_CARD_DIMENSIONS = {
  WIDTH: 156,
  HEIGHT: 104
};

export interface FileCardProps extends SharedCardProps {
  readonly cardProcessingStatus: CardProcessingStatus;
  readonly fileDetails?: FileDetails;
  readonly dataURIService: DataUriService;
  readonly error?: Error;
};

export interface FileCardState {
  readonly dataURI?: string;
};

export class FileCard extends Component<FileCardProps, FileCardState> {
  static defaultProps: Partial<FileCardProps> = {
    actions: []
  };

  state: FileCardState = {};

  constructor(props: FileCardProps) {
    super(props);
    const {fileDetails, dataURIService} = props;
    this.fetchDataUri(dataURIService, fileDetails);
  }

  componentWillReceiveProps(nextProps: FileCardProps) {
    const {fileDetails: currentFileDetails} = this.props;
    const {fileDetails: nextFileDetails, dataURIService} = nextProps;

    if (nextFileDetails !== currentFileDetails) {
      this.setState({dataURI: undefined}, () => {
        this.fetchDataUri(dataURIService, nextFileDetails);
      });
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

  fetchDataUri(dataUriService, fileDetails?: FileDetails): void {
    if (!fileDetails) {
      return;
    }

    const isGif = fileDetails.mimeType === 'image/gif';

    if (isGif) {
      return dataUriService.fetchOriginalDataUri({
        type: 'file',
        details: fileDetails
      }).then(
        dataURI => this.setState({dataURI}),
        () => this.setState({dataURI: undefined})
      );
    }

    const retinaFactor = isRetina() ? 2 : 1;
    const width = this.dataUriWidth(retinaFactor);
    const height = this.dataUriHeight(retinaFactor);

    return dataUriService.fetchImageDataUri(
      { type: 'file', details: fileDetails },
      width,
      height
    ).then(
      dataURI => this.setState({dataURI}),
      () => this.setState({dataURI: undefined})
    );
  }

  render() {
    return this.renderFile();
  }

  onClick = (event: Event) : void => { // TODO: select handlers seem to be broken now. fix.
    const {fileDetails} = this.props;
    const onClick = this._getFirstAction(CardActionType.click);

    if (onClick && fileDetails) {
      onClick.handler({type: 'file', details: fileDetails}, event);
    }
  }

  renderFile(): JSX.Element {
    const {dataURI} = this.state;
    const {dimensions, selectable, selected, fileDetails, error} = this.props;
    const defaultDetails = {name: undefined, mediaType: undefined, size: undefined};
    const {name, mediaType, size} = fileDetails ? fileDetails : defaultDetails;
    const errorMessage = error ? 'Error loading card' : undefined;
    const card = (this._isSmall()) ?
      (
        <FileCardViewSmall
          error={errorMessage}
          width={dimensions && dimensions.width}
          dataURI={dataURI}
          mediaName={name}
          mediaType={mediaType}
          mediaSize={size}
          loading={this.isLoading}
          actions={this._getActions()}
          onClick={this.onClick}
        />
      ) : (
        <FileCardView
          error={errorMessage}
          dimensions={dimensions}
          selectable={selectable}
          selected={selected}
          dataURI={dataURI}
          mediaName={name}
          mediaType={mediaType}
          mediaSize={size}
          loading={this.isLoading}
          actions={this._getActions()}
          onClick={this.onClick}
        />
      );

    return card;
  }

  private _getFirstAction(type: CardActionType): CardAction | null {
    const actions = this._getActionsByType(type);
    return (actions.length) ? actions[0] : null;
  }

  private _getActions(): Array < CardAction > {
    const {fileDetails} = this.props;
    // redundant 'or' guarding to satisfy compiler
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    const actions = this.props.actions || [];
    const nonActions = [CardActionType.click];

    return actions
      .filter(action => action.type && nonActions.indexOf(action.type) === -1)
      .map((action: CardAction) => {
        return {
          label: action.label,
          type: action.type,
          handler: () => {
            // TODO remove || guarding and update action signature to be correct
            action.handler({type: 'file', details: fileDetails || {}});
          }
        };
      });
  }

  private _getActionsByType(type: CardActionType): Array < CardAction > {
    // redundant 'or' guarding to satisfy compiler
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    const actions: Array<CardAction> = this.props.actions || [];
    return actions.filter(action => action.type === type);
  }

  private _isSmall(): boolean {
    return this.props.appearance === 'small';
  }

  private get isLoading(): boolean {
    const {cardProcessingStatus} = this.props;

    return cardProcessingStatus === 'loading' || cardProcessingStatus === 'processing';
  }
}
