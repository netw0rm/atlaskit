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
import { isEmojiIdEqual, isEmojiLoaded, toEmojiId } from '../../type-helpers';

export interface PickerRefHandler {
  (ref: any): any;
}

export interface Props {
  emojiProvider: Promise<EmojiProvider>;
  onSelection?: OnEmojiEvent;
  onPickerRef?: PickerRefHandler;
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
    if (this.state.selectedEmoji !== emoji) {
      this.setState({
        selectedEmoji: emoji,
      } as State);
    }
  }

  onCategoryActivated = (category: string) => {
    if (this.state.activeCategory !== category) {
      this.setState({
        activeCategory: category,
      } as State);
    }
  }

  onCategorySelected = (categoryId: string) => {
    this.props.emojiProvider.then(provider => {
      provider.findInCategory(categoryId).then(emojisInCategory => {
        if (emojisInCategory && emojisInCategory.length) {
          const selectedEmoji = emojisInCategory[0];
          this.setState({
            activeCategory: categoryId,
            selectedCategory: categoryId,
            selectedEmoji,
          } as State);

          if (!isEmojiLoaded(selectedEmoji)) {
            provider.findByEmojiId(toEmojiId(selectedEmoji)).then((loadedEmoji) => {
              const lastestSelectedEmoji = this.state.selectedEmoji;
              if (loadedEmoji && lastestSelectedEmoji && isEmojiIdEqual(toEmojiId(lastestSelectedEmoji), toEmojiId(loadedEmoji))) {
                // Emoji is still selected, update
                this.setState({
                  selectedEmoji: loadedEmoji,
                });
              }
            });
          }
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
    // Only enable categories for full emoji list (non-search)
    const availableCategories = searchResults.query ? [] : searchResults.categories;
    const query = searchResults.query;

    let selectedEmoji;
    let activeCategory;
    if (firstResult) {
      selectedEmoji = firstResult;
      // Only enable categories for full emoji list (non-search)
      activeCategory = searchResults.query ? undefined : firstResult.category;
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

  private handlePickerRef = (ref: any) => {
    if (this.props.onPickerRef) {
      this.props.onPickerRef(ref);
    }
  }

  render() {
    const { target, position, zIndex, offsetX, offsetY, onSelection } = this.props;
    const { activeCategory, availableCategories, filteredEmojis, loading, query, selectedCategory, selectedEmoji, selectedTone } = this.state;
    const classes = [styles.emojiPicker];

    const picker = (
      <div className={classNames(classes)} ref={this.handlePickerRef}>
        <CategorySelector
          activeCategoryId={activeCategory}
          onCategorySelected={this.onCategorySelected}
          availableCategories={availableCategories}
        />
        <EmojiPickerList
          emojis={filteredEmojis}
          selectedCategory={selectedCategory}
          onEmojiSelected={onSelection}
          onEmojiActive={this.onEmojiActive}
          onCategoryActivated={this.onCategoryActivated}
          onSearch={this.onSearch}
          query={query}
          selectedTone={selectedTone}
          loading={loading}
        />
        <EmojiPickerFooter
          selectedEmoji={selectedEmoji}
          selectedTone={selectedTone}
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
