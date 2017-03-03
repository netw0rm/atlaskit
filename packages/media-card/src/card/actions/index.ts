import {
  FetchingMediaItemSucceeded,
  fetchingMediaItemSucceeded,
  FetchingMediaItemFailed,
  fetchingMediaItemFailed,
  FetchingImageSucceeded,
  FetchingImageFailed,
  CardClicked,
  SelectStateUpdated,
} from './fetch';

export enum ActionType {
  FetchingMediaItemSucceeded,
  FetchingMediaItemFailed,
  FetchingImageSucceeded,
  FetchingImageFailed,
  CardClicked,
  SelectStateUpdated
}

export type Action =
  FetchingMediaItemSucceeded
    | FetchingMediaItemFailed
    | FetchingImageSucceeded
    | FetchingImageFailed
    | CardClicked
    | SelectStateUpdated;

export {
  fetchingMediaItemSucceeded,
  fetchingMediaItemFailed
}
