import * as React from 'react';
import { MouseEvent, PureComponent } from 'react';
import * as classNames from 'classnames';
import Spinner from '@atlaskit/spinner';
import * as uid from 'uid';
import 'element-closest';

import * as styles from './styles';
import Scrollable from '../common/Scrollable';
import EmojiPickerListCategory from './EmojiPickerListCategory';
import EmojiPickerListSearch from './EmojiPickerListSearch';
import { emojiPickerListHeight } from '../../shared-styles';
import { toOptionalEmojiId } from '../../type-helpers';
import { EmojiDescription, EmojiId, OnCategory, OnEmojiEvent } from '../../types';

const categoryClassname = 'emoji-category';

const closestCategory = (element: HTMLElement): string | null => {
  const categoryElement = element.closest(`.${categoryClassname}`);
  if (categoryElement) {
    return categoryElement.getAttribute('data-category-id');
  }
  return null;
};

export interface OnSearch {
  (query: string): void;
}

export interface Props {
  emojis: EmojiDescription[];
  onEmojiSelected?: OnEmojiEvent;
  onEmojiActive?: OnEmojiEvent;
  onCategoryActivated?: OnCategory;
  selectedCategory?: string;
  selectedTone?: number;
  onSearch?: OnSearch;
  loading?: boolean;
}

export interface State {
  selectedEmoji?: EmojiDescription;
  query?: string;
  initialListIndex?: number;
}

interface EmojiGroup {
  emojis: EmojiDescription[];
  title: string;
  category: string;
}

export default class EmojiPickerList extends PureComponent<Props, State> {
  private idSuffix = uid();
  private groups: EmojiGroup[];
  private activeCategory: string | undefined | null;
  private scrollable: Scrollable;

  static defaultProps = {
    onEmojiSelected: () => {},
    onEmojiActive: () => {},
    onCategoryActivated: () => {},
    onSearch: () => {},
  };

  constructor(props) {
    super(props);

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

    this.groups = this.buildList(props.emojis);
  }

  componentWillReceiveProps = (nextProps: Props) => {
    if (this.props.emojis !== nextProps.emojis) {
      this.setState({
        selectedEmoji: nextProps.emojis[0],
      });
    }

    if (nextProps.selectedCategory && nextProps.selectedCategory !== this.props.selectedCategory) {
      this.reveal(nextProps.selectedCategory);
    }
  }

  componentWillUpdate = (nextProps) => {
    if (this.props.emojis !== nextProps.emojis ||
      this.props.selectedTone !== nextProps.selectedTone ||
      this.props.loading !== nextProps.loading) {
      this.groups = this.buildList(nextProps.emojis);
    }
  }

  private onEmojiMouseEnter = (emojiId: EmojiId, emoji: EmojiDescription, event: MouseEvent<any>) => {
    if (!this.state.selectedEmoji || this.state.selectedEmoji.id !== emoji.id) {
      this.setState({
        selectedEmoji: emoji,
      });
      if (this.props.onEmojiActive) {
        this.props.onEmojiActive(emojiId, emoji, );
      }
    }
  }

  private onMouseLeave = () => {
    this.setState({
      selectedEmoji: undefined,
    });
  }

  private onSearch = (e) => {
    this.setState({
      query: e.target.value,
    });

    if (this.props.onSearch) {
      this.props.onSearch(e.target.value);
    }
  }

  /**
   * Scrolls to a category in the list view
   */
  reveal(category: String) {
    const idSelector = `#${this.categoryId(category)}`;
    const categoryElement = document.querySelector(idSelector);
    this.scrollable.reveal(categoryElement as HTMLElement, true);
  }

  private categoryId = category => `category_${category}_${this.idSuffix}`;

  private buildList = (emojis: EmojiDescription[]): EmojiGroup[] => {
    const existingCategories = new Map();
    const isSearching = !!this.state.query;

    let currentGroup;
    let currentCategory: string | undefined;

    const list: EmojiGroup[] = [];

    if (isSearching) {
      currentCategory = 'SEARCHRESULTS';
      currentGroup = {
        emojis: [],
        title: 'Search results',
        category: currentCategory,
      };
      list.push(currentGroup);
    }

    for (let i = 0; i < emojis.length; i++) {
      let emoji = emojis[i];

      if (!isSearching && currentCategory !== emoji.category) {
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
  }

  private checkCategoryChange = (firstElement: HTMLElement) => {
    const currentCategory = closestCategory(firstElement);
    if (this.activeCategory !== currentCategory) {
      this.activeCategory = currentCategory;
      if (this.props.onCategoryActivated) {
        this.props.onCategoryActivated(currentCategory);
      }
    }
  }

  private renderGroups = () => {
    const selectedEmojiId = toOptionalEmojiId(this.state.selectedEmoji);
    const selectedCategory = this.state.selectedEmoji && this.state.selectedEmoji.category;

    return this.groups.map((group) => {
      // Optimisation - avoid re-rendering unaffected groups for the current selectedShortcut
      // by not passing it to irrelevant groups
      const groupSelectedEmojiId = selectedCategory === group.category ? selectedEmojiId : undefined;

      return (
        <EmojiPickerListCategory
          id={this.categoryId(group.category)}
          title={group.title}
          emojis={group.emojis}
          key={group.category}
          selectedEmoji={groupSelectedEmojiId}
          onMouseMove={this.onEmojiMouseEnter}
          onSelected={this.props.onEmojiSelected}
          className={categoryClassname}
        />
      );
    });
  }


  render() {
    const classes = [styles.emojiPickerList];

    const loadingSpinner = !this.props.loading ? null : (
      <div className={styles.emojiPickerSpinnerContainer}>
        <div className={styles.emojiPickerSpinner}>
          <Spinner size="medium" />
        </div>
      </div>
    );

    return (
      <div
        className={classNames(classes)}
        onMouseLeave={this.onMouseLeave}
      >
        {loadingSpinner}
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
