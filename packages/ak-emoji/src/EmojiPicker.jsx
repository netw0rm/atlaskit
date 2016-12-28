import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!./style.less';

import CategorySelector from './internal/picker/CategorySelector';
import EmojiPickerList from './internal/picker/EmojiPickerList';
import EmojiPickerFooter from './internal/picker/EmojiPickerFooter';
import EmojiPropTypes from './internal/ak-emoji-prop-types';
import EmojiService from './api/EmojiService';

export default class extends PureComponent {
  static propTypes = {
    emojis: PropTypes.arrayOf(EmojiPropTypes.emoji).isRequired,
    onSelection: PropTypes.func,
  };

  static defaultProps = {
    onSelection: () => {},
  }

  constructor(props) {
    super(props);

    const availableCategories = props.emojis.reduce((categories, emoji) => {
      categories[emoji.category] = true;
      return categories;
    }, {});

    this.emojiService = new EmojiService(props.emojis);

    this.state = {
      selectedEmoji: null,
      activeCategory: props.emojis[0].category,
      selectedCategory: null,
      filteredEmojis: props.emojis,
      selectedTone: null,
      availableCategories,
    };
  }

  onEmojiSelected = (emoji) => {
    this.props.onSelection(emoji);
  }

  onEmojiActive = (emoji) => {
    this.setState({
      selectedEmoji: emoji,
    });
  }

  onCategoryActivated = (category) => {
    this.setState({
      activeCategory: category,
    });
  }

  onCategorySelected = (categoryId) => {
    const emojisInCategory = this.props.emojis.filter(emoji => emoji.category === categoryId);

    if (emojisInCategory) {
      this.setState({
        activeCategory: categoryId,
        selectedCategory: categoryId,
        selectedEmoji: emojisInCategory[0],
      });
    }
  }

  onSearch = (query) => {
    const searchResults = this.emojiService.search(query);

    const filteredEmojis = searchResults.emojis;
    const firstResult = filteredEmojis[0];
    const availableCategories = searchResults.categories;

    let selectedEmoji;
    let activeCategory;
    if (firstResult) {
      selectedEmoji = firstResult;
      activeCategory = firstResult.category;
    }

    this.setState({
      filteredEmojis,
      selectedEmoji,
      activeCategory,
      availableCategories,
    });
  };

  onToneSelected = (toneValue) => {
    this.setState({
      selectedTone: toneValue,
    });
  }

  render() {
    const classes = [styles.emojiPicker];

    return (
      <div className={classNames(classes)}>
        <CategorySelector
          activeCategoryId={this.state.activeCategory}
          onCategorySelected={this.onCategorySelected}
          availableCategories={this.state.availableCategories}
        />
        <EmojiPickerList
          emojis={this.state.filteredEmojis}
          selectedCategory={this.state.selectedCategory}
          onEmojiSelected={this.onEmojiSelected}
          onEmojiActive={this.onEmojiActive}
          onCategoryActivated={this.onCategoryActivated}
          onSearch={this.onSearch}
          selectedTone={this.state.selectedTone}
          query={this.state.currentQuery}
        />
        <EmojiPickerFooter
          selectedEmoji={this.state.selectedEmoji}
          selectedTone={this.state.selectedTone}
          emojis={this.props.emojis}
          onToneSelected={this.onToneSelected}
        />
      </div>
    );
  }
}
