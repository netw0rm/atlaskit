import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import { List } from 'react-virtualized';
import styles from 'style!../../style.less';
import EmojiPropTypes from '../ak-emoji-prop-types';
import EmojiPickerListCategory from './EmojiPickerListCategory';
import EmojiPickerListRow from './EmojiPickerListRow';
import EmojiPickerListSearch from './EmojiPickerListSearch';
import { emojiPickerListWidth, emojiPickerListHeight } from '../../shared-variables';
import { toEmojiId } from '../../api/EmojiService';

const emojiPerRow = 8;

export default class EmojiPickerList extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji).isRequired,
    onEmojiSelected: PropTypes.func,
    onEmojiActive: PropTypes.func,
    onCategoryActivated: PropTypes.func,
    selectedCategory: PropTypes.string,
    selectedTone: PropTypes.string,
    onSearch: PropTypes.func,
  };

  static defaultProps = {
    onEmojiSelected: () => {},
    onEmojiActive: () => {},
    onCategoryActivated: () => {},
    onSearch: () => {},
  }

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

  componentWillReceiveProps = (nextProps) => {
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
  };

  componentWillUpdate = (nextProps) => {
    if (this.props.emojis !== nextProps.emojis ||
      this.props.selectedTone !== nextProps.selectedTone) {
      this.groupedItems = this.buildList(nextProps.emojis, nextProps.selectedTone);
    }
  };

  onEmojiMouseEnter = (emoji) => {
    this.setState({
      selectedEmoji: emoji,
    });
    this.props.onEmojiActive(emoji);
  };

  onRowsRendered = ({ startIndex }) => {
    const firstVisibleItem = this.groupedItems[startIndex];
    if (this.activeCategory !== firstVisibleItem.category) {
      this.activeCategory = firstVisibleItem.category;
      this.props.onCategoryActivated(this.activeCategory);
    }
  };

  onMouseLeave = () => {
    this.setState({
      selectedEmoji: null,
    });
  };

  onSearch = (e) => {
    this.setState({
      query: e.target.value,
    });

    this.props.onSearch(e.target.value);
  };

  getItemSize = ({ index }) => {
    const item = this.groupedItems[index];
    if (item.type === 'emoji') {
      return 40;
    } else if (item.type === 'search') {
      return 50;
    } else if (item.type === 'category') {
      return 25;
    }

    return 20;
  };

  buildList = (emojis, selectedTone) => {
    let currentGroup;
    let currentCategory = null;

    const list = [{
      type: 'search',
    }];
    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];

      if (emoji.skinVariations.length && selectedTone) {
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
  };

  renderItem = ({ index, key, style }) => {
    const item = this.groupedItems[index];

    if (item.type === 'emoji') {
      const selectedShortcut = this.state.selectedEmoji && this.state.selectedEmoji.shortcut;
      return (
        <EmojiPickerListRow
          key={key}
          style={style}
          emojis={item.emojis}
          selectedEmojiShortcut={selectedShortcut}
          onEmojiMouseEnter={emoji => this.onEmojiMouseEnter(emoji)}
          onEmojiSelected={emoji => this.props.onEmojiSelected(toEmojiId(emoji), emoji)}
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
  };

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
