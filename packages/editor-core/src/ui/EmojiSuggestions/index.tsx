import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import { EditorState, TextSelection, Transaction, PluginKey } from 'prosemirror-state';
import Popup from '../Popup';
import {
  EmojiProvider,
  SearchSort,
  EmojiSearchResult,
  EmojiDescription,
  SearchOptions
} from '@atlaskit/emoji';
import EmojiList from './EmojiList';

export interface Props {
  editorView: EditorView;
  selectedIndex: number;
  emojiProvider?: EmojiProvider;
  query?: string;
  emojis: EmojiDescription[];
  anchorElement?: HTMLElement;
  pluginKey: PluginKey;
  getLastSentance: (selection: TextSelection) => string | undefined;
  getLastWord: (query?: string) => string | undefined;
  setEmojis: (state: EditorState, dispatch: (tr: Transaction) => void, emojis: EmojiDescription[]) => void;
  onSelect: (state: EditorState, dispatch: (tr: Transaction) => void, selectedIndex?: number) => void;
  getEmojiSuggestions: (state: EditorState, dispatch: (tr: Transaction) => void, query: string) => void;
}

const LIST_LIMIT: number = 5;

export default class EmojiSuggestions extends Component<Props, any> {
  componentWillUnmount() {
    const { emojiProvider } = this.props;
    if (emojiProvider) {
      emojiProvider.unsubscribe(this.onProviderChange);
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    const { emojiProvider, query } = this.props;
    const nextEmojiProvider = nextProps.emojiProvider;
    if (emojiProvider !== nextEmojiProvider) {
      nextEmojiProvider!.subscribe(this.onProviderChange);
      if (emojiProvider) {
        emojiProvider.unsubscribe(this.onProviderChange);
      }
    }
    if (query !== nextProps.query) {
      const lastWord = this.props.getLastWord(nextProps.query);
      if (lastWord) {
        this.onSearch(lastWord);
      }
    }
  }

  render() {
    const {
      query,
      emojiProvider,
      selectedIndex,
      anchorElement,
      emojis
    } = this.props;

    if (!query || !anchorElement || !emojiProvider || !emojis.length) {
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
          emojis={emojis}
          onSelect={this.onSelect}
          selectedIndex={selectedIndex}
        />
      </Popup>
    );
  }

  onSelect = (selectedIndex: number) => {
    const { state, dispatch } = this.props.editorView;
    this.props.onSelect(state, dispatch, selectedIndex);
  }

  private onSearch(query?: string): void {
    const { emojiProvider } = this.props;
    if (!emojiProvider) {
      return;
    }
    const options: SearchOptions = { limit: LIST_LIMIT };

    if (query) {
      options.sort = SearchSort.Default;
    } else {
      // if empty query (i.e. typeahead triggered only) then only sort by usage
      options.sort = SearchSort.UsageFrequency;
    }
    emojiProvider.filter(query, options);
  }

  private onSuggestionsSearch = async (query?: string) => {
    if (query) {
      const { getEmojiSuggestions } = this.props;
      const { state, dispatch } = this.props.editorView;
      const emojisFallback = await getEmojiSuggestions(state, dispatch, query);
      if (Array.isArray(emojisFallback) && emojisFallback.length) {
        this.props.setEmojis(this.props.editorView.state, dispatch, emojisFallback);
      }
    }
  }

  private onSearchResult = (searchResult: EmojiSearchResult) => {
    const { state, dispatch } = this.props.editorView;
    const { emojis } = searchResult;

    // got response from emoji provider
    if (emojis && emojis.length) {
      this.props.setEmojis(state, dispatch, emojis);
    }
    // search for emojis in emoji suggestions service
    else {
      const { getLastSentance } = this.props;
      const query = getLastSentance(this.props.editorView.state.selection);
      this.onSuggestionsSearch(query);
    }
  }

  private onProviderChange = { result: this.onSearchResult };
}
