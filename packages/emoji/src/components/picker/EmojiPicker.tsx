import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';

import debug from '../../util/logger';
import CategorySelector from './CategorySelector';
import EmojiPickerList from './EmojiPickerList';
import EmojiPickerFooter from './EmojiPickerFooter';
import Popup from '../common/Popup';
import EmojiService from '../../api/EmojiService';
import { AvailableCategories, EmojiDescription, EmojiId, OnEmojiEvent, RelativePosition } from '../../types';

export interface Props {
  emojiService: EmojiService;
  onSelection?: OnEmojiEvent;

  target?: string | HTMLElement;
  position?: RelativePosition;
  zIndex?: string | number;
  offsetX?: number;
  offsetY?: number;
}

export interface State {
  filteredEmojis: EmojiDescription[];
  selectedEmoji?: EmojiDescription;
  activeCategory?: string;
  selectedCategory?: string;
  selectedTone?: number;
  availableCategories?: AvailableCategories;
  query?: string;
}

const newState = (emojiService: EmojiService, query?: string): State => {
  const { emojis, categories } = emojiService.search(query);
  const activeCategory = emojis.length ? emojis[0].category : undefined;

  const state: State = {
    selectedEmoji: undefined,
    activeCategory,
    selectedCategory: undefined,
    filteredEmojis: emojis,
    selectedTone: undefined,
    availableCategories: categories,
    query,
  };

  return state;
};

export default class EmojiPicker extends PureComponent<Props, State> {

  static defaultProps = {
    onSelection: () => {},
  };

  constructor(props: Props) {
    super(props);

    this.state = newState(props.emojiService, '');
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.emojiService !== nextProps.emojiService) {
      this.setState(newState(nextProps.emojiService, this.state.query));
    }
  }

  onEmojiActive = (emojiId: EmojiId, emoji: EmojiDescription) => {
    this.setState({
      selectedEmoji: emoji,
    } as State);
  }

  onCategoryActivated = (category: string) => {
    this.setState({
      activeCategory: category,
    } as State);
  }

  onCategorySelected = (categoryId: string) => {
    const emojisInCategory = this.props.emojiService.all().emojis.filter(
      emoji => emoji.category === categoryId
    );

    if (emojisInCategory) {
      this.setState({
        activeCategory: categoryId,
        selectedCategory: categoryId,
        selectedEmoji: emojisInCategory[0],
      } as State);
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
  }

  onToneSelected = (toneValue?: number) => {
    this.setState({
      selectedTone: toneValue,
    } as State);
  }

  render() {
    const { emojiService, target, position, zIndex, offsetX, offsetY, onSelection } = this.props;
    const { activeCategory, availableCategories } = this.state;
    const classes = [styles.emojiPicker];

    const picker = (
      <div className={classNames(classes)}>
        <CategorySelector
          activeCategoryId={activeCategory}
          onCategorySelected={this.onCategorySelected}
          availableCategories={availableCategories}
        />
        <EmojiPickerList
          emojis={this.state.filteredEmojis}
          selectedCategory={this.state.selectedCategory}
          onEmojiSelected={onSelection}
          onEmojiActive={this.onEmojiActive}
          onCategoryActivated={this.onCategoryActivated}
          onSearch={this.onSearch}
          selectedTone={this.state.selectedTone}
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
            relativePosition={position}
            zIndex={zIndex}
            offsetX={offsetX}
            offsetY={offsetY}
            children={picker}
          />
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
