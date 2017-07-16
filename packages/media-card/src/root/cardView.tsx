import * as React from 'react';
import {MouseEvent} from 'react';
import {MediaItemType, MediaItemDetails, LinkDetails, UrlPreview, ImageResizeMode} from '@atlaskit/media-core';

import {SharedCardProps, CardStatus, CardEvent, OnSelectChangeFuncResult} from '..';
import {LinkCard} from '../links';
import {FileCard} from '../files';
import {isLinkDetails} from '../utils/isLinkDetails';
import {CardAction} from '..';

export interface CardViewProps extends SharedCardProps {
  readonly status: CardStatus;
  readonly mediaItemType?: MediaItemType;
  readonly metadata?: MediaItemDetails;
  readonly resizeMode?: ImageResizeMode;

  readonly onClick?: (result: CardEvent) => void;
  readonly onMouseEnter?: (result: CardEvent) => void;
  readonly onSelectChange?: (result: OnSelectChangeFuncResult) => void;

  // allow extra props to be passed down to lower views e.g. dataURI to FileCard
  [propName: string]: any;
}

export class CardView extends React.Component<CardViewProps, {}> {  // tslint:disable-line:variable-name
  componentWillReceiveProps(nextProps: CardViewProps) {
    const {selected: currSelected} = this.props;
    const {selectable: nextSelectable, selected: nextSelected} = nextProps;

    // need to coerce to booleans as both "undefined" and "false" are considered NOT selected
    const cs: boolean = !!currSelected;
    const ns: boolean = !!nextSelected;

    if (nextSelectable && cs !== ns) {
      this.fireOnSelectChangeToConsumer(ns);
    }
  }

  private fireOnSelectChangeToConsumer = (newSelectedState: boolean): void => {
    const {metadata, selectable, onSelectChange} = this.props;

    if (selectable && onSelectChange) {
      onSelectChange({selected: newSelectedState, mediaItemDetails: metadata});
    }
  }

  /** wrap the actions to return the metadata */
  private get actions(): CardAction[] {
    const {actions = [], metadata} = this.props;
    return actions.map(({type, content, handler}) => ({
      type,
      content,
      handler: () => handler(metadata)
    }));
  }

  render() {
    const {mediaItemType} = this.props;

    if (mediaItemType === 'link') {
      return this.renderLink();
    } else if (mediaItemType === 'file') {
      return this.renderFile();
    }

    return this.renderCardFromDetails();
  }

  private renderCardFromDetails = () => {
    const {metadata} = this.props;

    if (isLinkDetails(metadata)) {
      return this.renderLink();
    }

    return this.renderFile();
  }

  private renderLink = () => {
    const {mediaItemType, status, metadata, actions, onClick, onMouseEnter, onSelectChange, ...otherProps} = this.props;

    return (
      <LinkCard
        {...otherProps}
        status={status}
        details={metadata as LinkDetails | UrlPreview}
        actions={this.actions}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
      />
    );
  }

  private renderFile = () => {
    const {mediaItemType, status, metadata, actions, onClick, onMouseEnter, onSelectChange, ...otherProps} = this.props;

    return (
      <FileCard
        {...otherProps}
        status={status}
        details={metadata}
        actions={this.actions}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
      />
    );
  }

  private handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const {onClick, metadata: mediaItemDetails} = this.props;
    if (onClick) {
      onClick({event, mediaItemDetails});
    }
  }

  private handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const {onMouseEnter, metadata: mediaItemDetails} = this.props;
    if (onMouseEnter) {
      onMouseEnter({event, mediaItemDetails});
    }
  }

}
