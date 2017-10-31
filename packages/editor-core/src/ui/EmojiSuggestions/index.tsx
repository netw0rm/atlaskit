import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import Popup from '../Popup';
import {
  EmojiProvider,
  SearchSort,
  EmojiSearchResult,
  ToneSelection,
  EmojiDescription,
  SearchOptions
} from '@atlaskit/emoji';
import EmojiList from './EmojiList';

export interface Props {
  editorView: EditorView;
  emojiProvider: EmojiProvider;
  query?: string;
  anchorElement?: HTMLElement;
  insertEmoji: (editorView: EditorView, emojiId: any) => void;
}

export interface State {
  visible: boolean;
  emojis: EmojiDescription[];
  selectedTone?: ToneSelection;
}

const LIST_LIMIT: number = 5;

export default class EmojiSuggestions extends Component<Props, State> {
  ref?: EmojiList;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      emojis: [],
      selectedTone: props.emojiProvider.getSelectedTone(),
    };
  }

  componentDidMount() {
    this.props.emojiProvider.subscribe(this.onProviderChange);
    this.onSearch(this.props.query);
  }

  componentWillUnmount() {
    this.props.emojiProvider.unsubscribe(this.onProviderChange);
  }

  componentWillReceiveProps(nextProps: Props) {
    const prevEmojiProvider = this.props.emojiProvider;
    const nextEmojiProvider = nextProps.emojiProvider;
    if (prevEmojiProvider !== nextEmojiProvider) {
      prevEmojiProvider.unsubscribe(this.onProviderChange);
      nextEmojiProvider.subscribe(this.onProviderChange);
      this.onSearch(nextProps.query);
    } else if (this.props.query !== nextProps.query) {
      this.onSearch(nextProps.query);
    }
  }

  render() {
    const { query, emojiProvider, anchorElement } = this.props;
    if (!query || !anchorElement || !emojiProvider) {
      return null;
    }
    const { emojis, visible } = this.state;
    if (!visible) {
      return null;
    }

    return (
      <Popup
        target={anchorElement}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
      >
        <EmojiList
          ref={this.handleRef}
          emojis={emojis}
          onEmojiSelect={this.onEmojiSelect}
        />
      </Popup>
    );
  }

  selectCurrent = () => {
    if (this.ref) {
      (this.ref as EmojiList).selectCurrent();
    }
  }

  selectNext = () => {
    if (this.ref) {
      (this.ref as EmojiList).selectNext();
    }
  }

  selectPrevious = () => {
    if (this.ref) {
      (this.ref as EmojiList).selectPrevious();
    }
  }

  private onSearch(query?: string) {
    const { emojiProvider } = this.props;
    const options: SearchOptions = {
      limit: LIST_LIMIT,
      skinTone: this.state.selectedTone,
    };

    if (query) {
      options.sort = SearchSort.Default;
    } else {
      // if empty query (i.e. typeahead triggered only) then only sort by usage
      options.sort = SearchSort.UsageFrequency;
    }
    emojiProvider.filter(query, options);
  }

  private onSearchResult = (result: EmojiSearchResult): void => {
    const { emojis } = result;
    const visible = emojis.length > 0;

    this.setState({
      emojis: emojis,
      visible
    });
  }

  private onProviderChange = { result: this.onSearchResult };

  private onEmojiSelect = (emojiId: any, emoji: any) => {
    this.props.insertEmoji(this.props.editorView, emojiId);
  }

  private handleRef = (ref: EmojiList) => {
    this.ref = ref;
  }
}
