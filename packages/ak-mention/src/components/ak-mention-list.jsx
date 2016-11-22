import styles from 'style!./ak-mention-list.less';

import React, { Component, PropTypes } from 'react';

import Error from './ak-mention-list-error';
import Item from './ak-mention-item';
import Scrollable from './ak-scrollable';

import MentionPropTypes from '../internal/ak-mention-prop-types';
import debug from '../util/logger';
import { mouseLocation, actualMouseMove } from '../util/mouse';

function revealItem(component, key) {
  const item = component._items[key];
  if (item && component._scrollable) {
    component._scrollable.reveal(item);
  }
}

function selectIndexNewMentions(component, index, mentions) {
  const key = mentions && mentions[index] && mentions[index].id;
  component.setState({
    selectedIndex: index,
    selectedKey: key,
  });
}

function selectIndex(component, index, callback) {
  const mentions = component.props.mentions;
  const key = mentions && mentions[index] && mentions[index].id;
  component.setState({
    selectedIndex: index,
    selectedKey: key,
  }, callback);
}

function selectIndexOnHover(mouseEvent, component, index) {
  const mousePosition = mouseLocation(mouseEvent);
  if (actualMouseMove(component._lastMousePosition, mousePosition)) {
    selectIndex(component, index);
  }
  component._lastMousePosition = mousePosition;
}

function renderItems(component) {
  let idx = 0;

  const { mentions } = component.props;
  const { selectedKey } = component.state;

  if (mentions.length) {
    component._items = {};

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
                selectIndexOnHover(mouseEvent, component, currentIdx);
              }}
              /* Cannot use onclick, as onblur will close the element, and prevent
               * onClick from firing.
               */
              onSelection={() => {
                selectIndex(component, currentIdx, () => {
                  component.chooseCurrentSelection();
                });
              }}
              ref={(ref) => {
                if (ref) {
                  component._items[key] = ref;
                } else {
                  delete component._items[key];
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

function wrapIndex(component, index) {
  const { mentions } = component.props;
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
      selectIndexNewMentions(this, 0, mentions);
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
    selectIndexNewMentions(this, 0, mentions);
  }

  componentDidUpdate() {
    const { mentions } = this.props;
    const { selectedIndex } = this.state;
    if (mentions && mentions[selectedIndex]) {
      revealItem(this, mentions[selectedIndex].id);
    }
    // FIXME - a React version of this _may_ be required for Confluence
    // integration tests. Will remove / fix once known
    // emit(elem, mentionListRenderedEvent);
  }

  selectNext() {
    const newIndex = wrapIndex(this, this.state.selectedIndex + 1);
    selectIndex(this, newIndex);
  }

  selectPrevious() {
    const newIndex = wrapIndex(this, this.state.selectedIndex - 1);
    selectIndex(this, newIndex);
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
          {renderItems(this)}
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
