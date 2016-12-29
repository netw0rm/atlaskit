import styles from 'style!./style.less';

import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';

import debug from './internal/logger';
import EmojiList from './internal/typeahead/EmojiTypeAheadList';
import EmojiPropTypes from './internal/ak-emoji-prop-types';
import Popup from './internal/common/Popup';

const defaultListLimit = 50;

function searchEmoji(props) {
  if (props.emojiService) {
    return props.emojiService.search(props.query).emojis.slice(0, props.listLimit);
  }
  return [];
}

export default class EmojiTypeAhead extends PureComponent {

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    emojiService: EmojiPropTypes.emojiService,  // used in applyPropChanges
    onSelection: PropTypes.func,

    // eslint-disable-next-line react/no-unused-prop-types
    query: PropTypes.string, // used in applyPropChanges
    // eslint-disable-next-line react/no-unused-prop-types
    listLimit: PropTypes.number, // used in searchEmoji

    onOpen: PropTypes.func,
    onClose: PropTypes.func,

    // ak-inline-dialog
    /**
     * id of element to target the picker against.
     * if not specified the picker is rendered inline.
     */
    target: PropTypes.string,
    position: PropTypes.string,
    zIndex: PropTypes.number,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  }

  static defaultProps = {
    onSelection: () => {},
    onOpen: () => {},
    onClose: () => {},
    listLimit: defaultListLimit,
  }

  constructor(props) {
    super(props);
    const emojis = searchEmoji(props);
    const visible = emojis.length > 0;
    this.state = {
      visible,
      emojis,
    };
  }

  componentWillReceiveProps(nextProps) {
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
  applyPropChanges(prevProps, nextProps) {
    if (prevProps.query !== nextProps.query && nextProps.emojiService) {
      const emojis = searchEmoji(nextProps);
      const wasVisible = this.state.visible;
      const visible = emojis.length > 0;
      debug('ak-emoji-typeahead.applyPropChanges', emojis.length, wasVisible, visible);
      this.setState({
        emojis,
        visible,
      });
      if (wasVisible !== visible) {
        if (visible) {
          this.props.onOpen();
        } else {
          this.props.onClose();
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
          onSelection={onSelection}
          ref={(ref) => { this.emojiListRef = ref; }}
        />
      </div>
    );

    let content;

    if (position) {
      debug('target, position', target, position);
      if (target) {
        content = (
          <Popup
            target={target}
            position={position}
            zIndex={zIndex}
            offsetX={offsetX}
            offsetY={offsetY}
          >
            {typeAhead}
          </Popup>
        );
      } else {
        // don't show if we have a position, but no target yet
        content = null;
      }
    } else {
      content = typeAhead;
    }

    return content;
  }
}
