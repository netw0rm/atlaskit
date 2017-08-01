import * as React from 'react';
import { PureComponent } from 'react';
import * as classNames from 'classnames';

import * as styles from './styles';

import { customCategory } from '../../constants';
import { EmojiDescription, OptionalEmojiDescriptionWithVariations, EmojiId, EmojiSearchResult, EmojiUpload, OnEmojiEvent, SearchOptions, ToneSelection } from '../../types';
import { containsEmojiId, isPromise /*, isEmojiIdEqual, isEmojiLoaded*/ } from '../../type-helpers';
// import debug from '../../util/logger';
import { getToneEmoji } from '../../util/filters';
import { EmojiContext } from '../common/internal-types';
import CategorySelector from './CategorySelector';
import EmojiPickerList from './EmojiPickerList';
import EmojiPickerFooter from './EmojiPickerFooter';
import { EmojiProvider, OnEmojiProviderChange, supportsUploadFeature } from '../../api/EmojiResource';

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
  filteredEmojis: EmojiDescription[];
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
        this.setState({ toneEmoji: toneEmoji });
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

        // this.loadEmoji(emojiProvider, selectedEmoji);
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
    const filteredEmojis = searchResults.emojis;

    // Only enable categories for full emoji list (non-search)
    const query = searchResults.query;
    const disableCategories = !!query;
    let dynamicCategories = this.state.dynamicCategories;
    if (!disableCategories && filteredEmojis.length !== this.state.filteredEmojis.length) {
      dynamicCategories = this.getDynamicCategories();
    }

    let selectedEmoji;
    let activeCategory;
    if (containsEmojiId(filteredEmojis, this.state.selectedEmoji)) {
      // Keep existing emoji selected if still in results
      selectedEmoji = this.state.selectedEmoji;
      activeCategory = this.state.activeCategory;
    } else {
      selectedEmoji = undefined;
      // Only enable categories for full emoji list (non-search)
      activeCategory = undefined;
    }

    this.setState({
      filteredEmojis,
      selectedEmoji,
      activeCategory,
      dynamicCategories,
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

  private updateEmojis = (query?: string, options?: SearchOptions) => {
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
    const { onSelection } = this.props;
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
          onEmojiSelected={onSelection}
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
