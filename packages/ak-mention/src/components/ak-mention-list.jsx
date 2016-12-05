import styles from 'style!./ak-mention-list.less';

import React, { Component, PropTypes } from 'react';

import Error from './ak-mention-list-error';
import Item from './ak-mention-item';
import Scrollable from './ak-scrollable';

import MentionPropTypes from '../internal/ak-mention-prop-types';
import debug from '../util/logger';
import { mouseLocation, actualMouseMove } from '../util/mouse';

function wrapIndex(mentions, index) {
  const len = mentions.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
}

export default class MentionList extends Component {
  static propTypes = {
    mentions: PropTypes.arrayOf(MentionPropTypes.mention),
    showError: PropTypes.bool,
    onSelection: PropTypes.func,
  }

  constructor(props) {
    super(props);
    // Bind methods so that they're usable from a reactified version.
    this.selectNext = this.selectNext.bind(this);
    this.selectPrevious = this.selectPrevious.bind(this);
    this.chooseCurrentSelection = this.chooseCurrentSelection.bind(this);

    this.state = {
      selectedKey: null,
      selectedIndex: 0,
    };

    this._lastMousePosition = null;
  }

  componentWillReceiveProps(nextProps) {
    // adjust selection
    const { mentions } = nextProps;
    const { selectedKey } = this.state;
    if (!selectedKey) {
      this._selectIndexNewMentions(0, mentions);
      return;
    }
    for (let i = 0; i < mentions.length; i++) {
      if (selectedKey === mentions[i].id) {
        this.setState({
          selectedIndex: i,
        });
        return;
      }
    }
    // existing selection not in results, pick first
    this._selectIndexNewMentions(0, mentions);
  }

  componentDidUpdate() {
    const { mentions } = this.props;
    const { selectedIndex } = this.state;
    if (mentions && mentions[selectedIndex]) {
      this._revealItem(this, mentions[selectedIndex].id);
    }
    // FIXME - a React version of this _may_ be required for Confluence
    // integration tests. Will remove / fix once known
    // emit(elem, mentionListRenderedEvent);
  }

  selectNext() {
    const newIndex = wrapIndex(this.props.mentions, this.state.selectedIndex + 1);
    this._selectIndex(newIndex);
  }

  selectPrevious() {
    const newIndex = wrapIndex(this.props.mentions, this.state.selectedIndex - 1);
    this._selectIndex(newIndex);
  }

  chooseCurrentSelection() {
    const { mentions, onSelection } = this.props;
    const { selectedIndex } = this.state;
    const selectedMention = mentions[selectedIndex];
    debug('ak-mention-list.chooseCurrentSelection', selectedMention);
    if (onSelection) {
      onSelection(selectedMention);
    }
  }

  _revealItem(key) {
    const item = this._items[key];
    if (item && this._scrollable) {
      this._scrollable.reveal(item);
    }
  }

  _selectIndexNewMentions(index, mentions) {
    const key = mentions && mentions[index] && mentions[index].id;
    this.setState({
      selectedIndex: index,
      selectedKey: key,
    });
  }

  _selectIndex(index, callback) {
    const { mentions } = this.props;
    const key = mentions && mentions[index] && mentions[index].id;
    this.setState({
      selectedIndex: index,
      selectedKey: key,
    }, callback);
  }

  _selectIndexOnHover(mouseEvent, index) {
    const mousePosition = mouseLocation(mouseEvent);
    if (actualMouseMove(this._lastMousePosition, mousePosition)) {
      this._selectIndex(index);
    }
    this._lastMousePosition = mousePosition;
  }

  _renderItems() {
    let idx = 0;

    const { mentions } = this.props;
    const { selectedKey } = this.state;

    if (mentions.length) {
      this._items = {};

      return (
        <div>
          {mentions.map((mention) => {
            const selected = selectedKey === mention.id;
            const currentIdx = idx;
            const key = mention.id;
            const { status, time } = mention.presence || {};
            const item = (
              <Item
                {...mention}
                avatarUrl={mention.avatarUrl}
                key={key}
                idx={idx}
                selected={selected}
                status={status}
                time={time}
                onMouseMove={(mouseEvent) => {
                  this._selectIndexOnHover(mouseEvent, currentIdx);
                }}
                /* Cannot use onclick, as onblur will close the element, and prevent
                 * onClick from firing.
                 */
                onSelection={() => {
                  this._selectIndex(currentIdx, () => {
                    this.chooseCurrentSelection();
                  });
                }}
                ref={(ref) => {
                  if (ref) {
                    this._items[key] = ref;
                  } else {
                    delete this._items[key];
                  }
                }}
              />
            );
            idx++;
            return item;
          })}
        </div>
      );
    }
    return null;
  }

  render() {
    const { mentions, showError } = this.props;

    const classes = [
      styles.list,
    ];
    const scollableClasses = [
      styles.scrollable,
    ];

    const hasMentions = mentions && mentions.length;
    // If we get an error, but existing mentions are displayed, lets
    // just continue to show the existing mentions we have
    const mustShowError = showError && !hasMentions;

    if (!mentions.length && !showError) {
      classes.push(styles.empty);
    }

    if (!mentions.length) {
      scollableClasses.push(styles.empty);
    }

    let errorSection = null;
    let resultSection = null;
    if (mustShowError) {
      errorSection = (<Error />);
    } else {
      resultSection = (
        <Scrollable
          ref={(ref) => { this._scrollable = ref; }}
        >
          {this._renderItems()}
        </Scrollable>
      );
    }

    return (
      <div className={styles.akMentionList}>
        <div className={classes.join(' ')}>
          {errorSection}
          {resultSection}
        </div>
      </div>
    );
  }
}
