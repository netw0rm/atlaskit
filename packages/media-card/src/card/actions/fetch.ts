import {MediaItem} from '@atlaskit/media-core';
import {ActionType} from './index';

export interface FetchingMediaItemSucceeded {
  type: ActionType.FetchingMediaItemSucceeded;
  mediaItem: MediaItem;
}

export interface FetchingMediaItemFailed {
  type: ActionType.FetchingMediaItemFailed;
  error: Error;
}

export interface FetchingImageSucceeded {
  type: ActionType.FetchingImageSucceeded;
  dataURI: string;
}

export interface FetchingImageFailed {
  type: ActionType.FetchingImageFailed;
  error: Error;
}

export interface CardClicked {
  type: ActionType.CardClicked;
  mediaItem: MediaItem;
}

export interface SelectStateUpdated {
  type: ActionType.SelectStateUpdated;
  selected: boolean;
}

export function fetchingMediaItemSucceeded(mediaItem: MediaItem): FetchingMediaItemSucceeded {
  return {
    type: ActionType.FetchingMediaItemSucceeded,
    mediaItem: mediaItem
  };
}

export function fetchingMediaItemFailed(error: Error): FetchingMediaItemFailed {
  return {
    type: ActionType.FetchingMediaItemFailed,
    error
  };
}

export function fetchingImageSucceeded(dataURI: string): FetchingImageSucceeded {
  return {
    type: ActionType.FetchingImageSucceeded,
    dataURI
  };
}

export function fetchingImageFailed(error: Error): FetchingImageFailed {
  return {
    type: ActionType.FetchingImageFailed,
    error
  };
}

export function cardClicked(mediaItem: MediaItem): CardClicked {
  return {
    type: ActionType.CardClicked,
    mediaItem
  };
}

export function selectStateUpdated(selected: boolean): SelectStateUpdated {
  return {
    type: ActionType.SelectStateUpdated,
    selected
  };
}
