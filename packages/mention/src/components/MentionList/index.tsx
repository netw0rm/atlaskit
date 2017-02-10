import * as React from 'react';
import { MouseEvent } from '@types/react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';
import Error from '../MentionListError';
import MentionItem from '../MentionItem';
import Scrollable from '../Scrollable';
import { Mention, OnSelection } from '../../types';
import debug from '../../util/logger';
import { mouseLocation, actualMouseMove, Position } from '../../util/mouse';

function wrapIndex(mentions: Mention[], index: number): number {
  const len = mentions.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
}

function getKey(index: number, mentions?: Mention[]): string | undefined {
  return mentions && mentions[index] && mentions[index].id;
}

function getIndex(key: string, mentions?: Mention[]): number | undefined {
  let index: number | undefined;
  if (mentions) {
    index = 0;
    while (index < mentions.length && mentions[index].id !== key) {
      index++;
    }
    if (index === mentions.length) {
      index = undefined;
    }
  }
  return index;
}

export interface Props {
  mentions: Mention[];
  showError?: boolean;
  onSelection: OnSelection;
}

export interface State {
  selectedKey?: string;
  selectedIndex: number;
}

export interface Items {
  [index: string]: MentionItem;
}

export default class MentionList extends PureComponent<Props, State> {
  private lastMousePosition: Position | undefined;
  private scrollable: Scrollable;
  private items: Items;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedKey: getKey(0, props.mentions),
      selectedIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    // adjust selection
    const { mentions } = nextProps;
    const { selectedKey } = this.state;
    if (mentions) {
      if (!selectedKey) {
        this.selectIndexNewMentions(0, mentions);
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
      this.selectIndexNewMentions(0, mentions);
    }
  }

  componentDidUpdate() {
    const { mentions } = this.props;
    const { selectedIndex } = this.state;
    if (mentions && mentions[selectedIndex]) {
      this.revealItem(mentions[selectedIndex].id);
    }
    // FIXME - a React version of this _may_ be required for Confluence
    // integration tests. Will remove / fix once known
    // emit(elem, mentionListRenderedEvent);
  }

  // API
  selectNext = () => {
    const newIndex = wrapIndex(this.props.mentions, this.state.selectedIndex + 1);
    this.selectIndex(newIndex);
  }

  selectPrevious = () => {
    const newIndex = wrapIndex(this.props.mentions, this.state.selectedIndex - 1);
    this.selectIndex(newIndex);
  }

  selectIndex(index: number, callback?: () => any): void {
    const { mentions } = this.props;
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(index, mentions),
    }, callback);
  }

  selectId(id: string, callback?: () => any): void {
    const { mentions } = this.props;
    const index = getIndex(id, mentions);
    if (index !== undefined) {
      this.setState({
        selectedIndex: index,
        selectedKey: id,
      }, callback);
    }
  }

  chooseCurrentSelection = () => {
    const { mentions, onSelection } = this.props;
    const { selectedIndex } = this.state;
    const selectedMention = mentions && mentions[selectedIndex || 0];
    debug('ak-mention-list.chooseCurrentSelection', selectedMention);
    if (onSelection && selectedMention) {
      onSelection(selectedMention);
    }
  }

  mentionsCount(): number {
    const { mentions } = this.props;
    return mentions && mentions.length || 0;
  }

  // Internal
  private revealItem(key: string): void {
    const item = this.items[key];
    if (item && this.scrollable) {
      this.scrollable.reveal(item);
    }
  }

  private selectIndexNewMentions(index: number, mentions: Mention[]): void {
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(index, mentions),
    });
  }

  private selectIndexOnHover(mouseEvent: MouseEvent<any>, index: number) {
    const mousePosition = mouseLocation(mouseEvent);
    if (actualMouseMove(this.lastMousePosition, mousePosition)) {
      this.selectIndex(index);
    }
    this.lastMousePosition = mousePosition;
  }

  private renderItems(): JSX.Element | null {
    const { mentions } = this.props;
    const { selectedKey } = this.state;

    if (mentions && mentions.length) {
      this.items = {};

      return (
        <div>
          {mentions.map((mention, idx) => {
            const selected = selectedKey === mention.id;
            const key = mention.id;
            const presence = mention.presence || {};
            const { status, time } = presence;
            const item = (
              <MentionItem
                {...mention}
                avatarUrl={mention.avatarUrl}
                key={key}
                selected={selected}
                status={status}
                time={time}
                onMouseMove={(mouseEvent) => {
                  this.selectIndexOnHover(mouseEvent, idx);
                }}
                /* Cannot use onclick, as onblur will close the element, and prevent
                 * onClick from firing.
                 */
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
    const { mentions, showError } = this.props;

    const hasMentions = mentions && mentions.length;

    // If we get an error, but existing mentions are displayed, lets
    // just continue to show the existing mentions we have
    const mustShowError = showError && !hasMentions;

    const classes = classNames({
      'ak-mention-list': true,
      [styles.list]: true,
      [styles.empty]: !hasMentions && !showError,
    });

    let errorSection: JSX.Element | undefined;
    let resultSection: JSX.Element | undefined;
    if (mustShowError) {
      errorSection = (<Error />);
    } else if (hasMentions) {
      resultSection = (
        <Scrollable
          ref={(ref) => { this.scrollable = ref; }}
        >
          {this.renderItems()}
        </Scrollable>
      );
    }

    return (
      <div className={styles.akMentionList}>
        <div className={classes}>
          {errorSection}
          {resultSection}
        </div>
      </div>
    );
  }
}
