import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';

import debug from '../../util/logger';
import CategorySelector from './CategorySelector';
import EmojiPickerList from './EmojiPickerList';
import EmojiPickerFooter from './EmojiPickerFooter';
import Popup from '../common/Popup';
import { EmojiSearchResult } from '../../api/EmojiRepository';
import { EmojiProvider, OnEmojiProviderChange } from '../../api/EmojiResource';
import { AvailableCategories, EmojiDescription, EmojiId, OnEmojiEvent, RelativePosition } from '../../types';

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
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
  query: string;
  // the picker is considered loaded when at least 1 set of emojis have loaded
  loading: boolean;
}

export default class EmojiPicker extends PureComponent<Props, State> {

  static defaultProps = {
    onSelection: () => {},
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      filteredEmojis: [],
      query: '',
      loading: true,
    };

  }

  componentWillMount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then(provider => {
        provider.subscribe(this.onProviderChange);
        this.onSearch(this.state.query);
      });
    }
  }

  componentWillUnmount() {
    if (this.props.emojiProvider) {
      this.props.emojiProvider.then(provider => {
        provider.unsubscribe(this.onProviderChange);
      });
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const prevEmojiProvider = this.props.emojiProvider;
    const nextEmojiProvider = nextProps.emojiProvider;
    if (prevEmojiProvider !== nextEmojiProvider) {
      if (prevEmojiProvider) {
        prevEmojiProvider.then(provider => {
          provider.unsubscribe(this.onProviderChange);
        });
      }
      if (nextEmojiProvider) {
        nextEmojiProvider.then(provider => {
          provider.subscribe(this.onProviderChange);
          this.onSearch(this.state.query);
        });
      }
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
    this.props.emojiProvider.then(provider => {
        provider.findInCategory(categoryId).then(emojisInCategory => {
        if (emojisInCategory && emojisInCategory.length) {
          this.setState({
            activeCategory: categoryId,
            selectedCategory: categoryId,
            selectedEmoji: emojisInCategory[0],
          } as State);
        }
      });
    });
  }

  private onSearch = (query) => {
    this.props.emojiProvider.then(provider => {
      provider.filter(query, {
        skinTone: this.state.selectedTone,
      });
    });
  }

  private onSearchResult = (searchResults: EmojiSearchResult): void => {
    const filteredEmojis = searchResults.emojis;
    const firstResult = filteredEmojis[0];
    const availableCategories = searchResults.categories;
    const query = searchResults.query;

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
      loading: false,
    } as State);
  }

  private onProviderChange: OnEmojiProviderChange = {
    result: this.onSearchResult,
  };

  private onToneSelected = (toneValue?: number) => {
    this.setState({
      selectedTone: toneValue,
    } as State);
  }

  render() {
    const { target, position, zIndex, offsetX, offsetY, onSelection } = this.props;
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
          loading={this.state.loading}
        />
        <EmojiPickerFooter
          selectedEmoji={this.state.selectedEmoji}
          selectedTone={this.state.selectedTone}
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
