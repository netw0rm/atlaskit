import * as React from 'react';
import {Component} from 'react';
import {Context, CardAction, MediaItemType, MediaItem, UrlPreview} from '@atlaskit/media-core';

import {LinkCard} from './links';
import {FileCard} from './files';

export type CardAppearance = 'auto' | 'small' | 'image' | 'square' | 'horizontal';

export interface CardDimensions {
  width?: number | string;
  height?: number | string;
}

export type CardProcessingStatus = 'loading' | 'processing' | 'complete' | 'error';

export interface OnLoadingChangeState {
  readonly type: CardProcessingStatus;
  readonly payload?: Error | UrlPreview;
}

export interface OnLoadingChangeFunc {
  (state: OnLoadingChangeState):  void;
}

export interface MediaIdentifier {
  readonly mediaItemType: MediaItemType;
  readonly id: string;
  readonly collectionName: string;
}

export interface UrlPreviewIdentifier {
  readonly mediaItemType: 'link';
  readonly url: string;
}

export interface CardEvent {
  event: Event;
  mediaItem: MediaItem;
}

export interface OnSelectChangeFuncResult extends CardEvent {
  selected: boolean;
}

export interface OnSelectChangeFunc {
  (result: OnSelectChangeFuncResult):  void;
}

export interface CardProps {
  readonly context: Context;
  readonly identifier: UrlPreviewIdentifier | MediaIdentifier;

  readonly appearance?: CardAppearance;

  readonly dimensions?: CardDimensions;

  readonly actions?: Array<CardAction>;

  readonly selectable?: boolean;
  readonly selected?: boolean;

  readonly onClick?: (result: CardEvent) => void;
  readonly onHover?: (result: CardEvent) => void;
  readonly onSelectChange?: OnSelectChangeFunc;
  readonly onLoadingChange?: OnLoadingChangeFunc;
}

export class Card extends Component<CardProps, {}> {

  static defaultProps = {
    appearance: 'auto'
  };

  render() {
    const isUrlIdentifier = (identifier) => (identifier as UrlPreviewIdentifier).url;

    const getLinkDetails = (identifier) => {
      return isUrlIdentifier(identifier) ? isUrlIdentifier(identifier) : identifier;
    };

    const {identifier, context, dimensions, actions, appearance, selectable, selected} = this.props;
    const {onClick, onHover, onLoadingChange, onSelectChange} = this.props;

    if (isUrlIdentifier(identifier) || identifier.mediaItemType === 'link') {
      return (
        <LinkCard
          context={context}
          link={getLinkDetails(identifier)}

          appearance={appearance}
          dimensions={dimensions}

          actions={actions}

          onClick={onClick}
          onHover={onHover}
          onSelectChange={onSelectChange}
          onLoadingChange={onLoadingChange}
        />
      );
    } else {
      const fileDetails = identifier as MediaIdentifier;

      return (
        <FileCard
          context={context}
          id={fileDetails.id}
          collectionName={fileDetails.collectionName}

          appearance={appearance}
          dimensions={dimensions}

          selectable={selectable}
          selected={selected}

          actions={actions}

          onClick={onClick}
          onHover={onHover}
          onSelectChange={onSelectChange}
          onLoadingChange={onLoadingChange}
        />
      );
    }
  }

}

