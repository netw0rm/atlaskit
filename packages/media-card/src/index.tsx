// mutate RxJS Observable with required methods
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import {CardAction, MediaItem, MediaItemDetails} from '@atlaskit/media-core';

// the only components we expose to consumers is Card, CardView and CardList
export * from './card';
export * from './cardView';
export * from './list';

export type CardProcessingStatus = 'loading' | 'processing' | 'complete' | 'error';

export type CardAppearance = 'auto' | 'small' | 'image' | 'square' | 'horizontal';

export interface CardDimensions {
  width?: number | string;
  height?: number | string;
}

export interface CardEvent {
  event: Event;
  mediaItemDetails?: MediaItemDetails;
}

export interface OnSelectChangeFuncResult extends CardEvent {
  selected: boolean;
}

export interface OnSelectChangeFunc {
  (result: OnSelectChangeFuncResult):  void;
}

export interface OnLoadingChangeState {
  readonly type: CardProcessingStatus;
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

export interface CardViewEventProps {
  readonly onClick?: (result: CardEvent) => void;
  readonly onHover?: (result: CardEvent) => void;
  readonly onSelectChange?: OnSelectChangeFunc;
}

export interface CardEventProps extends CardViewEventProps {
  readonly onLoadingChange?: OnLoadingChangeFunc;
}
