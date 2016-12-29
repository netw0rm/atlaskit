import styles from 'style!../../style.less';

import classNames from 'classnames';
import React, { PropTypes, PureComponent } from 'react';

import EmojiItem from './EmojiTypeAheadItem';
import Scrollable from './Scrollable';

import EmojiPropTypes from '../ak-emoji-prop-types';
import debug from '../logger';
import { mouseLocation, actualMouseMove } from '../mouse';

function wrapIndex(emojis, index) {
  const len = emojis.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
}

function getKey(index, emojis) {
  return emojis && emojis[index] && emojis[index].id;
}

export default class EmojiTypeAheadList extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji),
    onSelection: PropTypes.func,
  }

  static defaultProps = {
    onSelection: () => {},
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedKey: getKey(0, props.emojis),
      selectedIndex: 0,
    };

    this.lastMousePosition = null;
  }

  componentWillReceiveProps(nextProps) {
    // adjust selection
    const { emojis } = nextProps;
    const { selectedKey } = this.state;
    if (!selectedKey) {
      this.selectIndexNewEmoji(0, emojis);
      return;
    }
    for (let i = 0; i < emojis.length; i++) {
      if (selectedKey === emojis[i].id) {
        this.setState({
          selectedIndex: i,
        });
        return;
      }
    }
    // existing selection not in results, pick first
    this.selectIndexNewEmoji(0, emojis);
  }

  componentDidUpdate() {
    const { emojis } = this.props;
    const { selectedIndex } = this.state;
    if (emojis && emojis[selectedIndex]) {
      this.revealItem(emojis[selectedIndex].id);
    }
  }

  // API
  selectNext = () => {
    const newIndex = wrapIndex(this.props.emojis, this.state.selectedIndex + 1);
    this.selectIndex(newIndex);
  }

  selectPrevious = () => {
    const newIndex = wrapIndex(this.props.emojis, this.state.selectedIndex - 1);
    this.selectIndex(newIndex);
  }

  chooseCurrentSelection = () => {
    const { emojis, onSelection } = this.props;
    const { selectedIndex } = this.state;
    const selectedEmoji = emojis[selectedIndex];
    debug('ak-typeahead-list.chooseCurrentSelection', selectedEmoji);
    if (onSelection) {
      onSelection(selectedEmoji);
    }
  }

  // Internal
  revealItem(key) {
    const item = this.items[key];
    if (item && this.scrollable) {
      this.scrollable.reveal(item);
    }
  }

  selectIndexNewEmoji(index, emojis) {
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(index, emojis),
    });
  }

  selectIndex(index, callback) {
    const { emojis } = this.props;
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(index, emojis),
    }, callback);
  }

  selectIndexOnHover(mouseEvent, index) {
    const mousePosition = mouseLocation(mouseEvent);
    if (actualMouseMove(this.lastMousePosition, mousePosition)) {
      this.selectIndex(index);
    }
    this.lastMousePosition = mousePosition;
  }

  renderItems(emojis) {
    const { selectedKey } = this.state;

    if (emojis && emojis.length) {
      this.items = {};

      return (
        <div>
          {emojis.map((emoji, idx) => {
            const selected = selectedKey === emoji.id;
            const key = emoji.id;
            const item = (
              <EmojiItem
                emoji={emoji}
                key={key}
                idx={idx}
                selected={selected}
                onMouseMove={(mouseEvent) => {
                  this.selectIndexOnHover(mouseEvent, idx);
                }}
                onSelection={() => {
                  this.selectIndex(idx, () => {
                    this.chooseCurrentSelection();
                  });
                }}
                ref={(ref) => {
                  if (ref) {
                    this.items[key] = ref;
                  } else {
                    delete this.items[key];
                  }
                }}
              />
            );
            return item;
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    const { emojis } = this.props;

    const hasEmoji = emojis && emojis.length;

    const classes = classNames({
      'ak-emoji-typeahead-list': true,
      [styles.list]: true,
      [styles.empty]: !hasEmoji,
    });

    return (
      <div className={styles.akMentionList}>
        <div className={classes}>
          <Scrollable
            ref={(ref) => { this.scrollable = ref; }}
          >
            {this.renderItems(emojis)}
          </Scrollable>
        </div>
      </div>
    );
  }
}
