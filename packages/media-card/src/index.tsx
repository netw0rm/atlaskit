// mutate RxJS Observable with required methods
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import {MouseEvent} from 'react';
import {CardAction, MediaItemDetails, MediaCollectionItem} from '@atlaskit/media-core';

// the only components we expose to consumers is Card, CardView and CardList
export * from './card';
export * from './cardView';
export * from './list';
export {createWidget} from './utils/widget';

export type CardStatus = 'uploading' | 'loading' | 'processing' | 'complete' | 'error';

export type CardAppearance = 'auto' | 'small' | 'image' | 'square' | 'horizontal';

export interface CardDimensions {
  width?: number | string;
  height?: number | string;
}

export interface CardEvent {
  event: MouseEvent<HTMLElement>;
  mediaItemDetails?: MediaItemDetails;
}

export interface CardListEvent {
  event: MouseEvent<HTMLElement>;
  collectionName: string;
  mediaCollectionItem: MediaCollectionItem;
}

export interface OnSelectChangeFuncResult {
  selected: boolean;
  mediaItemDetails?: MediaItemDetails;
}

export interface OnSelectChangeFunc {
  (result: OnSelectChangeFuncResult):  void;
}

export interface OnLoadingChangeState {
  readonly type: CardStatus;
  readonly payload?: Error | MediaItemDetails;
}

export interface OnLoadingChangeFunc {
  (state: OnLoadingChangeState):  void;
}

export interface SharedCardProps {
  readonly appearance?: CardAppearance;
  readonly dimensions?: CardDimensions;

  readonly actions?: Array<CardAction>;
  readonly selectable?: boolean;
  readonly selected?: boolean;
}

export interface CardEventProps {
  readonly onClick?: (result: CardEvent) => void;
  readonly onMouseEnter?: (result: CardEvent) => void;
  readonly onSelectChange?: OnSelectChangeFunc;
  readonly onLoadingChange?: OnLoadingChangeFunc;
}
