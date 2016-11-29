import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./style.less';
import EmojiList from './EmojiList';
import EmojiPickerFooter from './EmojiPickerFooter';
import CategorySelector from './CategorySelector';

export default class extends PureComponent {
  static propTypes = {
    emojis: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);

    const availableCategories = props.emojis.reduce((categories, emoji) => {
      categories[emoji.category] = true;
      return categories;
    }, {});

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
    this.setState({
      selectedEmoji: emoji,
    });
  };

  onCategoryActivated = (category) => {
    this.setState({
      activeCategory: category,
    });
  };

  onCategorySelected = (categoryId) => {
    const emojisInCategory = this.props.emojis.filter(emoji => emoji.category === categoryId);

    if (emojisInCategory) {
      this.setState({
        activeCategory: categoryId,
        selectedCategory: categoryId,
        selectedEmoji: emojisInCategory[0],
      });
    }
  };

  onSearch = (query) => {
    function matchQuery(emoji) {
      return (emoji.name && emoji.name.indexOf(query) > 0) ||
        (emoji.shortcut && emoji.shortcut.indexOf(query) > 0);
    }

    const filteredEmojis = query ? this.props.emojis.filter(matchQuery) : this.props.emojis;

    const availableCategories = filteredEmojis.reduce((categories, emoji) => {
      categories[emoji.category] = true;
      return categories;
    }, {});

    let selectedEmoji;
    let activeCategory;
    if (filteredEmojis[0]) {
      selectedEmoji = filteredEmojis[0];
      activeCategory = filteredEmojis[0].category;
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
  };

  render() {
    const classes = [styles.emojiPicker];

    return (
      <div className={classNames(classes)}>
        <CategorySelector
          activeCategoryId={this.state.activeCategory}
          onCategorySelected={this.onCategorySelected}
          availableCategories={this.state.availableCategories}
        />
        <EmojiList
          emojis={this.state.filteredEmojis}
          selectedCategory={this.state.selectedCategory}
          onEmojiSelected={this.onEmojiSelected}
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
