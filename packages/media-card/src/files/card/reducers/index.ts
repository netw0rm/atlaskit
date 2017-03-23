import {Action, ActionType} from '../actions';
import {FileCardState} from '../../card';

export function reducer(state: FileCardState, action: Action): FileCardState {
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
