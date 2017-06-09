import * as React from 'react';
import {Component, MouseEvent} from 'react';
import {CardAction, FileDetails} from '@atlaskit/media-core';

import {SharedCardProps, CardStatus} from '../..';
import {FileCardImageView} from '../cardImageView';
import {FileCardViewSmall} from '../cardViewSmall';
import {CardVideoView, CardAudioView, toHumanReadableMediaSize} from '../../utils';

export interface FileCardProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly details?: FileDetails;
  readonly progress?: number;
  readonly dataURI?: string;

  readonly videoUrl?: Promise<string>;
  readonly audioUrl?: Promise<string>;
  readonly onClick?: (result: MouseEvent<HTMLElement>) => void;
  readonly onMouseEnter?: (result: MouseEvent<HTMLElement>) => void;
}

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

  renderFile(): JSX.Element {
    const {appearance, videoUrl, audioUrl} = this.props;
    const {mediaType} = this.details;

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
    const {dimensions, dataURI, onClick, audioUrl, videoUrl} = this.props;
    const {name, mediaType, size} = this.details;

    // console.log(audioUrl, videoUrl);
    return (
      <FileCardViewSmall
        error={this.errorMessage}
        width={dimensions && dimensions.width}
        dataURI={dataURI}
        mediaName={name}
        mediaType={mediaType}
        mediaSize={size}
        loading={this.isLoading}
        actions={this._getActions()}
        onClick={onClick}

        audioUrl={audioUrl}
        videoUrl={videoUrl}
      />
    );
  }

  private renderImageView = (): JSX.Element => {
    const {dimensions, selectable, selected, dataURI, status, progress, onClick, audioUrl, videoUrl} = this.props;
    const {name, mediaType, size} = this.details;

    return (
      <FileCardImageView
        error={this.errorMessage}
        dimensions={dimensions}
        selectable={selectable}
        selected={selected}
        dataURI={dataURI}
        mediaName={name}
        mediaType={mediaType}
        mediaSize={size}
        actions={this._getActions()}
        onClick={onClick}
        status={status}
        progress={progress}

        audioUrl={audioUrl}
        videoUrl={videoUrl}
      />
    );
  }

  private renderVideoView = (videoUrl: Promise<string>): JSX.Element => {
    const {name} = this.details;

    return (
      <CardVideoView
        videoUrl={videoUrl}
        title={name}
        subtitle={this.subtitle}
      />
    );
  }

  private renderAudioView = (audioUrl: Promise<string>): JSX.Element => {
    const {dataURI, dimensions} = this.props;
    const {name} = this.details;

    return (
      <CardAudioView
        audioUrl={audioUrl}
        title={name}
        subtitle={this.subtitle}
        dataURI={dataURI}
        dimensions={dimensions}
      />
    );
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

  private get isLoading(): boolean {
    const {status} = this.props;
    return status === 'loading' || status === 'processing';
  }

  private get isError(): boolean {
    const {status} = this.props;
    return status === 'error';
  }

  private get errorMessage(): string | undefined {
    return this.isError ? 'Error loading card' : undefined;
  }

  private get subtitle(): string {
    const {size} = this.details;
    return size !== undefined ? toHumanReadableMediaSize(size) : '';
  }

  private get details(): FileDetails {
    const {details} = this.props;
    return details || FileCard.defaultDetails;
  }
}
