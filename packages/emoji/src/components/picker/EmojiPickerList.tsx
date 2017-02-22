import * as React from 'react';
import { MouseEvent, PureComponent } from 'react';
import * as classNames from 'classnames';
import { List } from 'react-virtualized';

import * as styles from './styles';
import EmojiPickerListCategory from './EmojiPickerListCategory';
import EmojiPickerListRow from './EmojiPickerListRow';
import EmojiPickerListSearch from './EmojiPickerListSearch';
import { emojiPickerListWidth, emojiPickerListHeight } from '../../shared-styles';
import { toEmojiId } from '../../api/EmojiService';
import { EmojiDescription, EmojiId, OnCategory, OnEmojiEvent } from '../../types';

const emojiPerRow = 8;

export interface OnSearch {
  (query: string): void;
}

export interface Props {
  emojis: EmojiDescription[];
  onEmojiSelected?: OnEmojiEvent;
  onEmojiActive?: OnEmojiEvent;
  onCategoryActivated?: OnCategory;
  selectedCategory?: string;
  selectedTone?: number;
  onSearch?: OnSearch;
}

export interface State {
  selectedEmoji?: EmojiDescription;
  query?: string;
  initialListIndex?: number;
}

interface SearchEntry {
  type: 'search';
  category: string;
};

interface CategoryEntry {
  type: 'category';
  title: string;
  category: string;
}

interface EmojiEntry {
  type: 'emoji';
  emojis: EmojiDescription[];
  category: string;
}

type ListItem = SearchEntry | CategoryEntry | EmojiEntry;

export default class EmojiPickerList extends PureComponent<Props, State> {
  private groupedItems: ListItem[];
  private initialListIndex: number;
  private list: List;
  private activeCategory: string;

  static defaultProps = {
    onEmojiSelected: () => {},
    onEmojiActive: () => {},
    onCategoryActivated: () => {},
    onSearch: () => {},
  };

  constructor(props) {
    super(props);

    this.groupedItems = this.buildList(props.emojis, props.selectedTone);

    let selectedEmoji = props.emojis[0];
    if (props.selectedCategory) {
      const emojiInCategory = props.emojis
        .filter(emoji => emoji.category === props.selectedCategory);
      if (emojiInCategory) {
        selectedEmoji = emojiInCategory[0];
      }
    }

    this.state = {
      selectedEmoji,
      query: '',
    };
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (this.props.emojis !== nextProps.emojis) {
      this.setState({
        selectedEmoji: nextProps.emojis[0],
      });
    }

    if (nextProps.selectedCategory) {
      for (this.initialListIndex = 0;
           this.initialListIndex < this.groupedItems.length;
           this.initialListIndex++) {
        if (nextProps.selectedCategory &&
          this.groupedItems[this.initialListIndex].category === nextProps.selectedCategory) {
          this.setState({
            initialListIndex: this.initialListIndex,
          });

          break;
        }
      }
    }
  }

  componentWillUpdate = (nextProps) => {
    if (this.props.emojis !== nextProps.emojis ||
      this.props.selectedTone !== nextProps.selectedTone) {
      this.groupedItems = this.buildList(nextProps.emojis, nextProps.selectedTone);
    }
  }

  onEmojiMouseEnter = (emojiId: EmojiId, emoji: EmojiDescription, event: MouseEvent<any>) => {
    this.setState({
      selectedEmoji: emoji,
    });
    const { onEmojiActive } = this.props;
    if (onEmojiActive) {
      onEmojiActive(emojiId, emoji, event);
    }
  }

  onRowsRendered = ({ startIndex }) => {
    const firstVisibleItem = this.groupedItems[startIndex];
    if (this.activeCategory !== firstVisibleItem.category) {
      this.activeCategory = firstVisibleItem.category;
      if (this.props.onCategoryActivated) {
        this.props.onCategoryActivated(this.activeCategory);
      }
    }
  }

  onMouseLeave = () => {
    this.setState({
      selectedEmoji: undefined,
    });
  }

  onSearch = (e) => {
    this.setState({
      query: e.target.value,
    });

    if (this.props.onSearch) {
      this.props.onSearch(e.target.value);
    }
  }

  private getItemSize = ({ index }) => {
    const item = this.groupedItems[index];
    if (item.type === 'emoji') {
      return 40;
    } else if (item.type === 'search') {
      return 50;
    } else if (item.type === 'category') {
      return 25;
    }

    return 20;
  }

  private buildList = (emojis: EmojiDescription[], selectedTone: number): ListItem[] => {
    let currentGroup;
    let currentCategory: string | undefined;

    const list: ListItem[] = [{
      type: 'search',
      category: '',
    }];
    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];

      if (emoji.skinVariations && emoji.skinVariations.length && selectedTone) {
        emoji = {
          ...emoji,
          representation: emoji.skinVariations[selectedTone - 1],
        };
      }

      if (currentCategory !== emoji.category) {
        if (currentGroup) {
          list.push(currentGroup);
        }

        currentGroup = {
          type: 'emoji',
          emojis: [],
          category: currentCategory,
        };

        list.push({
          type: 'category',
          title: emoji.category,
          category: emoji.category,
        });

        currentCategory = emoji.category;
      }

      if (currentGroup.emojis.length === emojiPerRow) {
        if (currentGroup) {
          list.push(currentGroup);
        }
        currentGroup = {
          type: 'emoji',
          emojis: [],
          category: currentCategory,
        };
      }

      if (i === emojis.length - 1 && currentGroup) {
        list.push(currentGroup);
      }

      currentGroup.emojis.push(emoji);
    }

    return list;
  }

  private renderItem = ({ index, key, style }) => {
    const item = this.groupedItems[index];

    if (item.type === 'emoji') {
      const { selectedEmoji } = this.state;
      const emojiId = selectedEmoji ? toEmojiId(selectedEmoji) : undefined;
      return (
        <EmojiPickerListRow
          key={key}
          style={style}
          emojis={item.emojis}
          selectedEmoji={emojiId}
          onMouseMove={this.onEmojiMouseEnter}
          onSelected={this.props.onEmojiSelected}
        />
      );
    } else if (item.type === 'category') {
      return (
        <EmojiPickerListCategory
          key={key}
          style={style}
          title={item.title}
        />
      );
    } else if (item.type === 'search') {
      return (
        <EmojiPickerListSearch
          key={key}
          style={style}
          onChange={this.onSearch}
          query={this.state.query}
        />
      );
    }

    return null;
  }

  render() {
    const classes = [styles.emojiPickerList];

    return (
      <div
        className={classNames(classes)}
        onMouseLeave={this.onMouseLeave}
      >
        <List
          rowRenderer={this.renderItem}
          rowCount={this.groupedItems.length}
          rowHeight={this.getItemSize}
          width={emojiPickerListWidth}
          height={emojiPickerListHeight}
          onRowsRendered={this.onRowsRendered}
          scrollToIndex={this.state.initialListIndex}
          scrollToAlignment="start"
          style={{
            willChange: 'auto', // https://github.com/bvaughn/react-virtualized/issues/453
          }}
          ref={(list) => { this.list = list; }}
          selectedEmoji={this.state.selectedEmoji}
        />
      </div>
    );
  }
}
