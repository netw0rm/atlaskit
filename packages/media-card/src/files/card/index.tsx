import * as React from 'react';
import {Component} from 'react';
import {CardAction, CardActionType, FileDetails} from '@atlaskit/media-core';

import {SharedCardProps, CardProcessingStatus} from '../../index';
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
  readonly fileDetails: FileDetails;
  readonly cardProcessingStatus: CardProcessingStatus;
  readonly error?: Error;
  readonly dataURIService;
};

export interface FileCardState {
  readonly dataURI?: string;
};

export class FileCard extends Component<FileCardProps, FileCardState> {
  static defaultProps: Partial<FileCardProps> = {
    actions: []
  };

  state: FileCardState = {
    dataURI: undefined
  };

  constructor(props: FileCardProps) {
    super(props);
    const {fileDetails, dataURIService} = props;
    this.fetchDataUri(dataURIService, fileDetails);
  }

  componentWillReceiveProps(nextProps: FileCardProps) {
    const {fileDetails: currentFileDetails} = this.props;
    const {fileDetails: nextFileDetails, dataURIService} = nextProps;

    if (nextFileDetails !== currentFileDetails) {
      this.setState({dataURI: null}, () => {
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

  private fetchDataUri(dataUriService, fileDetails?: FileDetails): void {
    if (!fileDetails) {
      return;
    }

    const isGif = fileDetails.mimeType === 'image/gif';

    if (isGif) {
      return dataUriService.fetchOriginalDataUri({
        type: 'file',
        details: fileDetails
      });
    }

    const retinaFactor = isRetina() ? 2 : 1;
    const width = this.dataUriWidth(retinaFactor);
    const height = this.dataUriHeight(retinaFactor);

    dataUriService.fetchImageDataUri(
      { type: 'file', details: fileDetails },
      width,
      height
    ).then(
      dataURI => this.setState({dataURI}),
      error => {/*do nothing*/}
    );
  }

  render() {
    const {fileDetails} = this.props;
    if (fileDetails) {
      return this.renderFile(fileDetails);
    } else {
      return this.renderNoFileItem();
    }
  }

  onClick(event: Event): void { // TODO: select handlers seem to be broken now. fix.
    const {fileDetails} = this.props;
    const onClick = this._getFirstAction(CardActionType.click);

    if (onClick && fileDetails) {
      onClick.handler({type: 'file', details: fileDetails}, event);
    }
  };

  renderNoFileItem(): JSX.Element {
    const {cardProcessingStatus, error, dimensions, selectable, selected} = this.props;
    const {dataURI} = this.state;

    const errorMessage = error ? 'Error loading card' : undefined;

    return (this._isSmall()) ?
      (
        <FileCardViewSmall
          error={errorMessage}
          width={dimensions && dimensions.width}
          loading={cardProcessingStatus === 'loading'}
          dataURI={dataURI}
          actions={this._getActions()}
          onClick={this.onClick.bind(this)}
        />
      ) : (
        <FileCardView
          error={errorMessage}
          dimensions={dimensions}
          loading={cardProcessingStatus === 'loading'}
          selectable={selectable}
          selected={selected}
          dataURI={dataURI}
          actions={this._getActions()}
          onClick={this.onClick.bind(this)}
        />
      );
  }

  renderFile(file: FileDetails): JSX.Element {
    const {cardProcessingStatus, dimensions, selectable, selected} = this.props;
    const {dataURI} = this.state;

    const card = (this._isSmall()) ?
      (
        <FileCardViewSmall
          width={dimensions && dimensions.width}
          loading={cardProcessingStatus === 'loading'}
          dataURI={dataURI}
          mediaName={file.name}
          mediaType={file.mediaType}
          mediaSize={file.size}
          actions={this._getActions()}
          onClick={this.onClick.bind(this)}
        />
      ) : (
        <FileCardView
          loading={cardProcessingStatus === 'loading'}
          dataURI={dataURI}
          dimensions={dimensions}
          mediaName={file.name}
          mediaType={file.mediaType}
          mediaSize={file.size}
          actions={this._getActions()}
          onClick={this.onClick.bind(this)}
          selectable={selectable}
          selected={selected}
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
            action.handler({type: 'file', details: fileDetails});
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

  private _isSmall(): Boolean {
    return this.props.appearance === 'small';
  }
}
