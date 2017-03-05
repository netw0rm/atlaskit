import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';

import * as styles from './styles';
import EmojiService from '../../api/EmojiService';
import { EmojiDescription, OnEmojiEvent, RelativePosition } from '../../types';
import EmojiList from './EmojiTypeAheadList';
import Popup from '../common/Popup';
import debug from '../../util/logger';

export const defaultListLimit = 50;

export interface OnLifecycle {
  (): void;
};

export interface Props {
  emojiService: EmojiService;
  onSelection?: OnEmojiEvent;
  query?: string;
  listLimit?: number;

  onOpen?: OnLifecycle;
  onClose?: OnLifecycle;

  /** CSS selector, or target HTML element */
  target?: string | HTMLElement;
  position?: RelativePosition;
  zIndex?: number | string;
  offsetX?: number;
  offsetY?: number;
}

export interface State {
  visible: boolean;
  emojis: EmojiDescription[];
}

function searchEmoji(props) {
  if (props.emojiService) {
    return props.emojiService.search(props.query).emojis.slice(0, props.listLimit);
  }
  return [];
}

export default class EmojiTypeAhead extends PureComponent<Props, State> {
  private emojiListRef: EmojiList;

  static defaultProps = {
    onSelection: () => {},
    onOpen: () => {},
    onClose: () => {},
    listLimit: defaultListLimit,
  };

  constructor(props) {
    super(props);
    const emojis = searchEmoji(props);
    const visible = emojis.length > 0;
    this.state = {
      visible,
      emojis,
    };
    if (visible) {
      this.props.onOpen && this.props.onOpen();
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    this.applyPropChanges(this.props, nextProps);
  }

  selectNext = () => {
    if (this.emojiListRef) {
      this.emojiListRef.selectNext();
    }
  }

  selectPrevious = () => {
    if (this.emojiListRef) {
      this.emojiListRef.selectPrevious();
    }
  }

  chooseCurrentSelection = () => {
    if (this.emojiListRef) {
      this.emojiListRef.chooseCurrentSelection();
    }
  }

  // Internal
  private applyPropChanges(prevProps: Props, nextProps: Props) {
    if (prevProps.query !== nextProps.query && nextProps.emojiService) {
      const emojis = searchEmoji(nextProps);
      const wasVisible = this.state.visible;
      const visible = emojis.length > 0;
      debug('emoji-typeahead.applyPropChanges', emojis.length, wasVisible, visible);
      this.setState({
        emojis,
        visible,
      });
      if (wasVisible !== visible) {
        if (visible) {
          this.props.onOpen && this.props.onOpen();
        } else {
          this.props.onClose && this.props.onClose();
        }
      }
    }
  }

  render() {
    const { onSelection, target, position, zIndex, offsetX, offsetY } = this.props;
    const { visible, emojis } = this.state;
    const style = {
      display: visible ? 'block' : 'none',
    };

    const classes = classNames([
      'ak-emoji-typeahead',
      styles.emojiTypeAhead,
    ]);

    const typeAhead = (
      <div style={style} className={classes}>
        <EmojiList
          emojis={emojis}
          onEmojiSelected={onSelection}
          ref={(ref) => { this.emojiListRef = ref; }}
        />
      </div>
    );

    if (position) {
      debug('target, position', target, position);
      if (target) {
        return (
          <Popup
            target={target}
            relativePosition={position}
            zIndex={zIndex}
            offsetX={offsetX}
            offsetY={offsetY}
            children={typeAhead}
          />
        );
      }
      // don't show if we have a position, but no target yet
      return null;
    }

    return typeAhead;
  }
}
