import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';

import styles from 'style!./style.less';

import debug from './internal/logger';
import CategorySelector from './internal/picker/CategorySelector';
import EmojiPickerList from './internal/picker/EmojiPickerList';
import EmojiPickerFooter from './internal/picker/EmojiPickerFooter';
import EmojiPropTypes from './internal/ak-emoji-prop-types';
import Popup from './internal/common/Popup';

const newState = (emojiService, query) => {
  const { emojis, categories } = emojiService.search(query);
  const activeCategory = emojis.length && emojis[0].category;

  const state = {
    selectedEmoji: null,
    activeCategory,
    selectedCategory: null,
    filteredEmojis: emojis,
    selectedTone: null,
    availableCategories: categories,
    query,
  };

  return state;
};

export default class EmojiPicker extends PureComponent {
  static propTypes = {
    emojiService: EmojiPropTypes.emojiService.isRequired,  // used in applyPropChanges
    onSelection: PropTypes.func,

    // ak-inline-dialog
    /**
     * id of element to target the picker against.
     * if not specified the picker is rendered inline.
     */
    target: PropTypes.string,
    position: PropTypes.string,
    zIndex: PropTypes.number,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  };

  static defaultProps = {
    onSelection: () => {},
  }

  constructor(props) {
    super(props);

    this.state = newState(props.emojiService, '');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emojiService !== nextProps.emojiService) {
      this.setState(newState(nextProps.emojiService, this.state.query));
    }
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
    const emojisInCategory = this.props.emojiService.all().emojis.filter(
      emoji => emoji.category === categoryId
    );

    if (emojisInCategory) {
      this.setState({
        activeCategory: categoryId,
        selectedCategory: categoryId,
        selectedEmoji: emojisInCategory[0],
      });
    }
  }

  onSearch = (query) => {
    const searchResults = this.props.emojiService.search(query);

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
      query,
    });
  };

  onToneSelected = (toneValue) => {
    this.setState({
      selectedTone: toneValue,
    });
  }

  render() {
    const { emojiService, target, position, zIndex, offsetX, offsetY } = this.props;
    const classes = [styles.emojiPicker];

    const picker = (
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
          emojis={emojiService.all().emojis}
          onToneSelected={this.onToneSelected}
        />
      </div>
    );

    let content;

    if (position) {
      debug('target, position', target, position);
      if (target) {
        content = (
          <Popup
            target={target}
            position={position}
            zIndex={zIndex}
            offsetX={offsetX}
            offsetY={offsetY}
          >
            {picker}
          </Popup>
        );
      } else {
        // don't show if we have a position, but no target yet
        content = null;
      }
    } else {
      content = picker;
    }

    return content;
  }
}
