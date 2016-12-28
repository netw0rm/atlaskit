import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import AkFieldBase from 'ak-field-base';
import { SearchIcon } from 'ak-icon';
import { List } from 'react-virtualized';
import styles from 'style!../style.less';
import EmojiPropTypes from './ak-emoji-prop-types';
import EmojiButton from './EmojiButton';
import { emojiListWidth, emojiListHeight } from '../shared-variables';

const emojiPerRow = 8;

export default class extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji).isRequired,
    onEmojiSelected: PropTypes.func,
    onCategoryActivated: PropTypes.func,
    selectedCategory: PropTypes.string,
    selectedTone: PropTypes.string,
    onSearch: PropTypes.func,
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

    if (this.props.onEmojiSelected) {
      this.props.onEmojiSelected(emoji);
    }
  };

  onRowsRendered = ({ startIndex }) => {
    const firstVisibleItem = this.groupedItems[startIndex];
    if (this.activeCategory !== firstVisibleItem.category) {
      this.activeCategory = firstVisibleItem.category;
      if (this.props.onCategoryActivated) {
        this.props.onCategoryActivated(this.activeCategory);
      }
    }
  };

  onMouseLeave = () => {
    this.setState({
      selectedEmoji: null,
    });

    if (this.props.onEmojiSelected) {
      this.props.onEmojiSelected(null);
    }
  };

  onSearch = (e) => {
    this.setState({
      query: e.target.value,
    });

    if (this.props.onSearch) {
      this.props.onSearch(e.target.value);
    }
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
      return (
        <div
          key={key}
          className={styles.emojiRow}
          style={style}
        >
          {item.emojis.map((emoji) => {
            let selected = false;
            if (this.state.selectedEmoji && emoji.shortcut === this.state.selectedEmoji.shortcut) {
              selected = true;
            }

            return (
              <div
                style={{ display: 'inline-block' }}
                onMouseOver={e => this.onEmojiMouseEnter(emoji, e)}
                key={emoji.shortcut}
              >

                <EmojiButton
                  {...emoji}
                  selected={selected}
                />
              </div>
            );
          })}
        </div>);
    } else if (item.type === 'category') {
      return (
        <div
          key={key}
          className={styles.categoryTitle}
          style={style}
        >
          {item.title}
        </div>);
    } else if (item.type === 'search') {
      return (
        <div className={styles.search} style={style} key={key}>
          <AkFieldBase
            appearance="compact"
            label="Search"
            isLabelHidden
            isFitContainerWidthEnabled
          >
            <span className={styles.searchIcon} >
              <SearchIcon label="Search" />
            </span>
            <input
              className={styles.input}
              type="text"
              disabled={false}
              name="search"
              placeholder="Search..."
              required={false}
              onChange={this.onSearch}
              value={this.state.query}
              ref={input => input && input.focus()}
            />
          </AkFieldBase>
        </div>
      );
    }

    return null;
  };

  render() {
    const classes = [styles.emojiList];

    return (
      <div
        className={classNames(classes)}
        onMouseLeave={this.onMouseLeave}
      >
        <List
          rowRenderer={this.renderItem}
          rowCount={this.groupedItems.length}
          rowHeight={this.getItemSize}
          width={emojiListWidth}
          height={emojiListHeight}
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
