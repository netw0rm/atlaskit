import * as React from 'react';
import {Component} from 'react';
import {CardAction, CardActionType, FileDetails} from '@atlaskit/media-core';

import {SharedCardProps, CardStatus} from '../..';
import {FileCardView} from '../cardView';
import {FileCardViewSmall} from '../cardViewSmall';
import {CardVideoView, CardAudioView, toHumanReadableMediaSize} from '../../utils';

export interface FileCardProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly details?: FileDetails;
  readonly progress?: number;
  readonly dataURI?: string;

  readonly videoUrl?: Promise<string>;
  readonly audioUrl?: Promise<string>;
};

export class FileCard extends Component<FileCardProps, {}> {
  private static defaultDetails: FileDetails = {
    id: undefined,
    name: undefined,
    mediaType: undefined,
    size: undefined
  };

  static defaultProps: Partial<FileCardProps> = {
    actions: [],
    details: FileCard.defaultDetails
  };

  render() {
    return this.renderFile();
  }

  onClick = (event: Event) : void => { // TODO: select handlers seem to be broken now. fix.
    const {details} = this.props;
    const onClick = this._getFirstAction(CardActionType.click);

    if (onClick && details) {
      onClick.handler({type: 'file', details}, event);
    }
  }

  renderFile(): JSX.Element {
    const {appearance, details, videoUrl, audioUrl} = this.props;
    const {mediaType} = details || FileCard.defaultDetails;

    if (appearance === 'small') {
      return this.renderSmallView();
    }

    if (appearance === 'image') {
      return this.renderImageView();
    }

    if (mediaType === 'video' && videoUrl) {
      return this.renderVideoView(videoUrl);
    }

    if (mediaType === 'audio' && audioUrl) {
      return this.renderAudioView(audioUrl);
    }

    return this.renderImageView();
  }

  private renderSmallView = (): JSX.Element => {
    const {dimensions, dataURI, details} = this.props;
    const {name, mediaType, size} = details || FileCard.defaultDetails;
    const errorMessage = this.isError ? 'Error loading card' : undefined;

    return (
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
    );
  }

  private renderImageView = (): JSX.Element => {
    const {dimensions, selectable, selected, details, dataURI, status, progress, videoUrl} = this.props;
    const {name, mediaType, size} = details || FileCard.defaultDetails;
    const errorMessage = this.isError ? 'Error loading card' : undefined;

    return (
      <FileCardView
        error={errorMessage}
        dimensions={dimensions}
        selectable={selectable}
        selected={selected}
        dataURI={dataURI}
        videoUrl={videoUrl}
        mediaName={name}
        mediaType={mediaType}
        mediaSize={size}
        actions={this._getActions()}
        onClick={this.onClick}
        status={status}
        progress={progress}
      />
    );
  }

  private renderVideoView = (videoUrl: Promise<string>): JSX.Element => {
    const {details} = this.props;
    const {name, size} = details || FileCard.defaultDetails;

    return (
      <CardVideoView
        videoUrl={videoUrl}
        title={name}
        subtitle={size !== undefined ? toHumanReadableMediaSize(size) : ''}
      />
    );
  }
  private renderAudioView = (audioUrl: Promise<string>): JSX.Element => {
    const {details, dataURI, dimensions} = this.props;
    const {name, size} = details || FileCard.defaultDetails;

    return (
      <CardAudioView
        audioUrl={audioUrl}
        title={name}
        subtitle={size !== undefined ? toHumanReadableMediaSize(size) : ''}
        dataURI={dataURI}
        dimensions={dimensions}
      />
    );
  }

  private _getFirstAction(type: CardActionType): CardAction | null {
    const actions = this._getActionsByType(type);
    return (actions.length) ? actions[0] : null;
  }

  private _getActions(): Array <CardAction> {
    const {details} = this.props;
    // redundant 'or' guarding to satisfy compiler
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    const actions = this.props.actions || [];

    return actions
      .map((action: CardAction) => {
        return {
          label: action.label,
          type: action.type,
          handler: () => {
            // TODO remove || guarding and update action signature to be correct
            action.handler({type: 'file', details: details || {}});
          }
        };
      });
  }

  private _getActionsByType(type: CardActionType): Array <CardAction> {
    // redundant 'or' guarding to satisfy compiler
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/11640
    const actions: Array<CardAction> = this.props.actions || [];
    return actions.filter(action => action.type === type);
  }

  private get isLoading(): boolean {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }

  private get isError(): boolean {
    const {status} = this.props;
    return status === 'error';
  }
}
