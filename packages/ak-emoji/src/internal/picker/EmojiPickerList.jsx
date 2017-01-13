import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import uid from 'uid';

import styles from 'style!../../style.less';
import EmojiPropTypes from '../ak-emoji-prop-types';
import EmojiPickerListCategory from './EmojiPickerListCategory';
import EmojiPickerListSearch from '../picker/EmojiPickerListSearch';
import Scrollable from '../common/Scrollable';
import { emojiPickerListHeight } from '../../shared-variables';

const categoryClassname = 'emoji-category';

const closestCategory = (element) => {
  const categoryElement = element.closest(`.${categoryClassname}`);
  if (categoryElement) {
    return categoryElement.getAttribute('data-category-id');
  }
  return null;
};

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

    this.idSuffix = uid();
    this.groups = this.buildList(props.emojis, props.selectedTone);
    this.activeCategory = null;

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
      this.reveal(nextProps.selectedCategory);
    }
  };

  componentWillUpdate = (nextProps) => {
    if (this.props.emojis !== nextProps.emojis ||
      this.props.selectedTone !== nextProps.selectedTone) {
      this.groups = this.buildList(nextProps.emojis, nextProps.selectedTone);
    }
  };

  // Internal
  onEmojiMouseEnter = (emoji) => {
    if (!this.state.selectedEmoji || this.state.selectedEmoji.id !== emoji.id) {
      this.setState({
        selectedEmoji: emoji,
      });
      this.props.onEmojiActive(emoji);
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

  /**
   * Scrolls to a category in the list view
   */
  reveal(category) {
    this.scrollable.reveal(`#${this.categoryId(category)}`, true);
  }

  buildList = (emojis, selectedTone) => {
    const existingCategories = new Map();

    let currentGroup;
    let currentCategory = null;

    const list = [];
    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];

      if (emoji.skinVariations.length && selectedTone) {
        emoji = {
          ...emoji,
          representation: emoji.skinVariations[selectedTone - 1],
        };
      }

      if (currentCategory !== emoji.category) {
        currentCategory = emoji.category;
        if (existingCategories.has(currentCategory)) {
          currentGroup = existingCategories.get(currentCategory);
        } else {
          currentGroup = {
            emojis: [],
            title: currentCategory,
            category: currentCategory,
          };
          existingCategories.set(currentCategory, currentGroup);
          list.push(currentGroup);
        }
      }
      currentGroup.emojis.push(emoji);
    }

    return list;
  };

  categoryId = category => `category_${category}_${this.idSuffix}`;

  checkCategoryChange = (event, firstElement) => {
    const currentCategory = closestCategory(firstElement);
    if (this.activeCategory !== currentCategory) {
      this.activeCategory = currentCategory;
      this.props.onCategoryActivated(currentCategory);
    }
  }

  renderGroups = () => {
    const selectedShortcut = this.state.selectedEmoji && this.state.selectedEmoji.shortcut;
    const selectedCategory = this.state.selectedEmoji && this.state.selectedEmoji.category;

    return this.groups.map((group) => {
      // Optimisation - avoid re-rendering unaffected groups for the current selectedShortcut
      // by not passing it to irrelevant groups
      const groupShortcut = selectedCategory === group.category ? selectedShortcut : undefined;

      return (
        <EmojiPickerListCategory
          title={group.title}
          emojis={group.emojis}
          key={group.category}
          selectedEmojiShortcut={groupShortcut}
          onEmojiMouseEnter={this.onEmojiMouseEnter}
          onEmojiSelected={this.props.onEmojiSelected}
          id={this.categoryId(group.category)}
          className={categoryClassname}
        />
      );
    });
  }

  render() {
    const classes = [styles.emojiPickerList];

    return (
      <div
        className={classNames(classes)}
        onMouseLeave={this.onMouseLeave}
      >
        <Scrollable
          ref={(ref) => { this.scrollable = ref; }}
          maxHeight={`${emojiPickerListHeight}px`}
          onScroll={this.checkCategoryChange}
        >
          <EmojiPickerListSearch
            onChange={this.onSearch}
            query={this.state.query}
          />
          {this.renderGroups()}
        </Scrollable>
      </div>
    );
  }
}
