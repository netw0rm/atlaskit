import {Action, ActionType} from '../actions';
import {CardState} from '../card';

export function reducer(state: CardState, action: Action): CardState {
  switch (action.type) {
    case ActionType.FetchingMediaItemSucceeded:
      return {...state, loading: true, mediaItem: action.mediaItem};
    case ActionType.FetchingMediaItemFailed:
      return {...state, loading: false};
    case ActionType.FetchingImageSucceeded:
      return {...state, loading: false, dataURI: action.dataURI};
    case ActionType.FetchingImageFailed:
      return {...state, loading: false};
    case ActionType.SelectStateUpdated:
      return {...state, selected: action.selected};
    default:
      return state;
  }
}
