import * as React from 'react';
import {Component} from 'react';
import {CardAction, CardActionType, FileDetails} from '@atlaskit/media-core';

import {SharedCardProps, CardProcessingStatus} from '../..';
import {FileCardView} from '../cardView';
import {FileCardViewSmall} from '../cardViewSmall';

export interface FileCardProps extends SharedCardProps {
  readonly status: CardProcessingStatus;
  readonly details?: FileDetails;
  readonly dataURI?: string;
  readonly progress?: number;
  readonly onClick?: (event: Event) => void;
};

export class FileCard extends Component<FileCardProps, {}> {
  static defaultProps: Partial<FileCardProps> = {
    actions: []
  };

  render() {
    return this.renderFile();
  }

  onClick = (event: Event) : void => {
    this.props.onClick && this.props.onClick(event);
  }

  renderFile(): JSX.Element {
    const {dimensions, selectable, selected, details, dataURI, progress} = this.props;
    const defaultDetails = {name: undefined, mediaType: undefined, size: undefined};
    const {name, mediaType, size} = details || defaultDetails;
    const errorMessage = this.isError ? 'Error loading card' : undefined;

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
          progress={progress}
        />
      );

    return card;
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

  private _isSmall(): boolean {
    return this.props.appearance === 'small';
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
