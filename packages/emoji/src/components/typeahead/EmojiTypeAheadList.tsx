import * as classNames from 'classnames';
import * as React from 'react';
import { MouseEvent, PureComponent } from 'react';
import Spinner from '@atlaskit/spinner';

import * as styles from './styles';
import EmojiItem from './EmojiTypeAheadItem';
import Scrollable from './Scrollable';
import { EmojiDescription, EmojiId, OnEmojiEvent } from '../../types';
import debug from '../../util/logger';
import { mouseLocation, actualMouseMove, Position } from '../../util/mouse';
import { toEmojiId } from '../../api/EmojiService';

function wrapIndex(emojis: EmojiDescription[], index: number): number {
  const len = emojis.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
}

function getKey(emojis: EmojiDescription[], index: number): string {
  return emojis && emojis[index] && emojis[index].id;
}

export interface Props {
  emojis: EmojiDescription[];
  onEmojiSelected?: OnEmojiEvent;
  loading?: boolean;
}

export interface State {
  selectedIndex: number;
  selectedKey?: string;
}

interface ItemReferences {
  [index: string]: EmojiItem | HTMLElement;
}

export default class EmojiTypeAheadList extends PureComponent<Props, State> {
  private lastMousePosition: Position;
  private scrollable: Scrollable;
  private items: ItemReferences;

  static defaultProps = {
    onEmojiSelected: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedKey: getKey(props.emojis, 0),
      selectedIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps: Props) {
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
    const { emojis, onEmojiSelected } = this.props;
    const { selectedIndex } = this.state;
    const selectedEmoji = emojis[selectedIndex];
    debug('ak-typeahead-list.chooseCurrentSelection', selectedEmoji);
    if (onEmojiSelected) {
      onEmojiSelected(toEmojiId(selectedEmoji), selectedEmoji);
    }
  }

  // Internal
  private revealItem(key: string) {
    const item = this.items[key];
    if (item && this.scrollable) {
      this.scrollable.reveal(item as HTMLElement);
    }
  }

  private selectIndexNewEmoji(index: number, emojis: EmojiDescription[]) {
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(emojis, index),
    });
  }

  private selectIndex(index: number, callback?: () => any) {
    const { emojis } = this.props;
    this.setState({
      selectedIndex: index,
      selectedKey: getKey(emojis, index),
    }, callback);
  }

  private selectKey(key: string, callback?: () => any) {
    const { emojis } = this.props;
    let index = -1;
    for (let i = 0; i < emojis.length; i++) {
      if (emojis[i].id === key) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      this.selectIndex(index, callback);
    }
  }

  private selectIndexOnHover = (emojiId: EmojiId, emoji: EmojiDescription, event: MouseEvent<any>) => {
    const mousePosition = mouseLocation(event);
    if (actualMouseMove(this.lastMousePosition, mousePosition)) {
      this.selectKey(emojiId.id);
    }
    this.lastMousePosition = mousePosition;
  }

  private itemSelected = (emojiId: EmojiId) => {
    this.selectKey(emojiId.id, () => {
      this.chooseCurrentSelection();
    });
  }

  private renderItems(emojis: EmojiDescription[]) {
    const { selectedKey } = this.state;

    if (emojis && emojis.length) {
      this.items = {};

      return (
        <div>
          {emojis.map((emoji) => {
            const selected = selectedKey === emoji.id;
            const key = emoji.id;
            const item = (
              <EmojiItem
                emoji={emoji}
                key={key}
                selected={selected}
                onMouseMove={this.selectIndexOnHover}
                onSelection={this.itemSelected}
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
    const { emojis, loading } = this.props;

    const hasEmoji = emojis && emojis.length;

    const classes = classNames({
      'ak-emoji-typeahead-list': true,
      [styles.typeAheadList]: true,
      [styles.typeAheadEmpty]: !hasEmoji && !loading,
    });

    let listBody;
    if (loading) {
      listBody = (
        <div className={styles.emojiTypeAheadSpinnerContainer}>
          <div className={styles.emojiTypeAheadSpinner}>
            <Spinner size="medium" />
          </div>
        </div>

      );
    } else {
      listBody = this.renderItems(emojis);
    }

    return (
      <div className={styles.typeAheadListContainer}>
        <div className={classes}>
          <Scrollable
            ref={(ref) => { this.scrollable = ref; }}
          >
            {listBody}
          </Scrollable>
        </div>
      </div>
    );
  }
}
