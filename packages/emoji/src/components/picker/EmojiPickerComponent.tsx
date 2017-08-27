import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';

import { customCategory, frequentCategory } from '../../constants';
import { EmojiDescription, OptionalEmojiDescriptionWithVariations, EmojiId, EmojiSearchResult, EmojiUpload, OnEmojiEvent, SearchOptions, ToneSelection } from '../../types';
import { containsEmojiId, isPromise /*, isEmojiIdEqual, isEmojiLoaded*/ } from '../../type-helpers';
import { SearchSort } from '../../types';
import { getToneEmoji } from '../../util/filters';
import { EmojiContext } from '../common/internal-types';
import { createRecordSelectionDefault } from '../common/RecordSelectionDefault';
import CategorySelector from './CategorySelector';
import EmojiPickerList from './EmojiPickerList';
import EmojiPickerFooter from './EmojiPickerFooter';
import { EmojiProvider, OnEmojiProviderChange, supportsUploadFeature } from '../../api/EmojiResource';

const FREQUENTLY_USED_MAX = 16;

export interface PickerRefHandler {
  (ref: any): any;
}

export interface Props {
  emojiProvider: EmojiProvider;
  onSelection?: OnEmojiEvent;
  onPickerRef?: PickerRefHandler;
  hideToneSelector?: boolean;
}

export interface State {
  // The emojis to be rendered in the picker - will include searchEmojis and frequentlyUsedEmojis
  filteredEmojis: EmojiDescription[];
  // The emojis returned from a search against the EmojiProvider
  searchEmojis: EmojiDescription[];
  // The emojis that are frequently used.
  frequentlyUsedEmojis?: EmojiDescription[];
  selectedEmoji?: EmojiDescription;
  activeCategory?: string;
  disableCategories?: boolean;
  dynamicCategories: string[];
  selectedCategory?: string;
  selectedTone?: ToneSelection;
  toneEmoji?: OptionalEmojiDescriptionWithVariations;
  query: string;
  uploadErrorMessage?: string;
  uploadSupported: boolean;
  uploading: boolean;
  // the picker is considered loaded when at least 1 set of emojis have loaded
  loading: boolean;
}

export default class EmojiPickerComponent extends PureComponent<Props, State> {
  static childContextTypes = {
    emoji: React.PropTypes.object
  };

  static defaultProps = {
    onSelection: () => {},
  };

  constructor(props: Props) {
    super(props);
    const { emojiProvider, hideToneSelector } = props;

    this.state = {
      filteredEmojis: [],
      searchEmojis: [],
      frequentlyUsedEmojis: [],
      query: '',
      dynamicCategories: [],
      selectedTone: !hideToneSelector ? emojiProvider.getSelectedTone() : undefined,
      loading: true,
      uploadSupported: false,
      uploading: false,
    };
  }

  getChildContext(): EmojiContext {
    return {
      emoji: {
        emojiProvider: this.props.emojiProvider
      }
    };
  }

  componentDidMount() {
    const { emojiProvider, hideToneSelector } = this.props;
    emojiProvider.subscribe(this.onProviderChange);
    this.onSearch(this.state.query);
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.isUploadSupported().then(this.onUploadSupported);
    }
    if (!hideToneSelector) {
      const toneEmoji = getToneEmoji(emojiProvider);
      if (isPromise(toneEmoji)) {
        toneEmoji.then(emoji => this.setState({ toneEmoji: emoji }));
      } else {
        this.setState({ toneEmoji });
      }
    }
  }

  componentWillUnmount() {
    const { emojiProvider } = this.props;
    emojiProvider.unsubscribe(this.onProviderChange);
  }

  componentWillReceiveProps(nextProps: Props) {
    const prevEmojiProvider = this.props.emojiProvider;
    const nextEmojiProvider = nextProps.emojiProvider;
    if (prevEmojiProvider !== nextEmojiProvider) {
      prevEmojiProvider.unsubscribe(this.onProviderChange);

      nextEmojiProvider.subscribe(this.onProviderChange);
      this.onSearch(this.state.query);
      if (supportsUploadFeature(nextEmojiProvider)) {
        nextEmojiProvider.isUploadSupported().then(this.onUploadSupported);
      }
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.uploading && this.state.uploading !== prevState.uploading) {
      // Showing upload panel, ensure custom category in view due to increased height
      this.scrollToEndOfList();
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
    const { emojiProvider } = this.props;
    emojiProvider.findInCategory(categoryId).then(emojisInCategory => {
      const { disableCategories } = this.state;
      if (!disableCategories) {
        const selectedEmoji = emojisInCategory[0];
        this.setState({
          activeCategory: categoryId,
          selectedCategory: categoryId,
          selectedEmoji,
        } as State);
      }
    });
  }

  private onUploadSupported = (supported: boolean) => {
    this.setState({
      uploadSupported: supported,
    });
  }

  private onSearch = (query) => {
    this.setState({
      query
    });
    this.updateEmojis(query, { skinTone: this.state.selectedTone });
  }

  private onSearchResult = (searchResults: EmojiSearchResult): void => {
    const frequentlyUsedEmoji = this.state.frequentlyUsedEmojis || [];
    const searchQuery = searchResults.query || '';

    const emojiToRender = this.buildQuerySpecificEmojiList(searchQuery, searchResults.emojis, frequentlyUsedEmoji);
    this.setStateAfterEmojiChange(searchQuery, emojiToRender, searchResults.emojis, frequentlyUsedEmoji);
  }

  private onFrequentEmojiResult = (frequentEmoji: EmojiDescription[]): void => {
    const { query, searchEmojis } = this.state;

    frequentEmoji = frequentEmoji.slice(0, FREQUENTLY_USED_MAX);

    // change the category of each of the featured emoji
    const recategorised = frequentEmoji.map((emoji) => {
      const clone = JSON.parse(JSON.stringify(emoji));
      clone.category = frequentCategory;
      return clone;
    });

    const emojiToRender = this.buildQuerySpecificEmojiList(query, searchEmojis, recategorised);
    this.setStateAfterEmojiChange(query, emojiToRender, searchEmojis, recategorised);
  }

  /**
   * If there is no user search in the EmojiPicker then it should display all emoji received from the EmojiRepository and should
   * also include a special category of most frequently used emoji (if there are any). This method decides if we are in this 'no search'
   * state and appends the frequent emoji if necessary.
   *
   * @param searchEmoji the emoji last received from the EmojiRepository after a search (may be empty)
   * @param frequentEmoji the frequently used emoji last received from the EmojiRepository (may be empty)
   */
  private buildQuerySpecificEmojiList(query: string, searchEmoji: EmojiDescription[], frequentEmoji: EmojiDescription[]): EmojiDescription[] {
    // If there are no frequent emoji, or if there was a search query then we want to take the search result exactly as is.
    if (!frequentEmoji.length || query) {
      return searchEmoji;
    }

    return [
      ...searchEmoji,
      ...frequentEmoji
    ];
  }


  /**
   * Calculate and set the new state of the component in response to the list of emoji changing for some reason (a search has returned
   * or the frequently used emoji have updated.)
   */
  private setStateAfterEmojiChange(query: string, emojiToRender: EmojiDescription[], searchEmoji: EmojiDescription[], frequentEmoji: EmojiDescription[]) {
    const { dynamicCategories, filteredEmojis } = this.state;

    // Only enable categories for full emoji list (non-search)
    const disableCategories = !!query;
    let newDynamicCategories = dynamicCategories;
    if (!disableCategories && emojiToRender.length !== filteredEmojis.length) {
      newDynamicCategories = this.getDynamicCategories();
    }

    let selectedEmoji;
    let activeCategory;
    if (containsEmojiId(emojiToRender, this.state.selectedEmoji)) {
      // Keep existing emoji selected if still in results
      selectedEmoji = this.state.selectedEmoji;
      activeCategory = this.state.activeCategory;
    } else {
      selectedEmoji = undefined;
      // Only enable categories for full emoji list (non-search)
      activeCategory = undefined;
    }

    this.setState({
      filteredEmojis: emojiToRender,
      searchEmojis: searchEmoji,
      frequentlyUsedEmojis: frequentEmoji,
      selectedEmoji,
      activeCategory,
      dynamicCategories: newDynamicCategories,
      disableCategories,
      query,
      loading: false,
    } as State);
  }

  private onProviderChange: OnEmojiProviderChange = {
    result: this.onSearchResult,
  };

  private onToneSelected = (toneValue: ToneSelection) => {
    this.setState({
      selectedTone: toneValue,
    } as State);
    this.props.emojiProvider.setSelectedTone(toneValue);
    this.updateEmojis('', { skinTone: toneValue });
  }

  /**
   * Updates the emoji displayed by the picker. If there is no query specified then we expect to retrieve all emoji for display,
   * by category, in the picker. This differs from when there is a query in which case we expect to receive a sorted result matching
   * the search.
   */
  private updateEmojis = (query?: string, options?: SearchOptions) => {
    // if the query is empty then we want the emoji to be in service defined order, unless specified otherwise
    // and we want emoji for the 'frequently used' category to be refreshed as well.
    if (!query) {
      if (!options) {
        options = {};
      }

      if (!options.sort) {
        options.sort = SearchSort.None;
      }

      this.props.emojiProvider.getFrequentlyUsed().then(this.onFrequentEmojiResult);
    }

    this.props.emojiProvider.filter(query, options);
  }

  private onOpenUpload = () => {
    // Prime upload token so it's ready when the user adds
    const { emojiProvider } = this.props;
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.prepareForUpload();
    }

    this.setState({
      uploadErrorMessage: undefined,
      uploading: true,
    });
  }

  private onUploadEmoji = (upload: EmojiUpload) => {
    const { emojiProvider } = this.props;
    this.setState({
      uploadErrorMessage: undefined, // clear previous errors
    });
    if (supportsUploadFeature(emojiProvider)) {
      emojiProvider.uploadCustomEmoji(upload).then(emojiDescription => {
        this.setState({
          activeCategory: customCategory,
          selectedCategory: customCategory,
          selectedEmoji: emojiDescription,
          uploading: false,
        });
        // this.loadEmoji(emojiProvider, emojiDescription);
        this.scrollToEndOfList();
      }).catch(err => {
        this.setState({
          uploadErrorMessage: 'Upload failed.',
        });
        console.error('Unable to upload emoji', err);
      });
    }
  }

  private scrollToEndOfList = () => {
    const emojiPickerList = this.refs.emojiPickerList as EmojiPickerList;
    if (emojiPickerList) {
      // Wait a tick to ensure repaint and updated height for picker list
      setTimeout(() => {
        emojiPickerList.scrollToBottom();
      }, 0);
    }
  }

  private onUploadCancelled = () => {
    this.setState({
      uploading: false,
      uploadErrorMessage: undefined,
    });
  }

  private getDynamicCategories() {
    return this.props.emojiProvider.calculateDynamicCategories ? this.props.emojiProvider.calculateDynamicCategories() : [];
  }

  private handlePickerRef = (ref: any) => {
    if (this.props.onPickerRef) {
      this.props.onPickerRef(ref);
    }
  }

  render() {
    const { emojiProvider, onSelection } = this.props;
    const {
      activeCategory,
      disableCategories,
      dynamicCategories,
      filteredEmojis,
      loading,
      query,
      selectedCategory,
      selectedEmoji,
      selectedTone,
      toneEmoji,
      uploading,
      uploadErrorMessage,
      uploadSupported,
    } = this.state;

    const recordUsageOnSelection = createRecordSelectionDefault(emojiProvider, onSelection);

    const classes = [styles.emojiPicker];

    const picker = (
      <div className={classNames(classes)} ref={this.handlePickerRef}>
        <CategorySelector
          activeCategoryId={activeCategory}
          dynamicCategories={dynamicCategories}
          disableCategories={disableCategories}
          onCategorySelected={this.onCategorySelected}
        />
        <EmojiPickerList
          emojis={filteredEmojis}
          selectedCategory={selectedCategory}
          onEmojiSelected={recordUsageOnSelection}
          onEmojiActive={this.onEmojiActive}
          onCategoryActivated={this.onCategoryActivated}
          onOpenUpload={this.onOpenUpload}
          onSearch={this.onSearch}
          query={query}
          selectedTone={selectedTone}
          loading={loading}
          showCustomCategory={uploadSupported}
          showUploadOption={uploadSupported && !uploading}
          ref="emojiPickerList"
        />
        <EmojiPickerFooter
          initialUploadName={query}
          selectedEmoji={selectedEmoji}
          selectedTone={selectedTone}
          onToneSelected={this.onToneSelected}
          toneEmoji={toneEmoji}
          uploading={uploading}
          uploadErrorMessage={uploadErrorMessage}
          onUploadEmoji={this.onUploadEmoji}
          onUploadCancelled={this.onUploadCancelled}
        />
      </div>
    );

    return picker;
  }
}
