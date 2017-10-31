import * as React from 'react';
import { Component } from 'react';
import { EditorView } from 'prosemirror-view';
import Popup from '../Popup';
import {
  EmojiProvider,
  SearchSort,
  EmojiSearchResult,
  EmojiDescription,
  SearchOptions
} from '@atlaskit/emoji';
import EmojiList from './EmojiList';
import { EditorState, Transaction, PluginKey } from 'prosemirror-state';

export interface Props {
  editorView: EditorView;
  selectedIndex: number;
  emojiProvider?: EmojiProvider;
  query?: string;
  emojis: EmojiDescription[];
  anchorElement?: HTMLElement;
  pluginKey: PluginKey;
  setEmojis: (state: EditorState, dispatch: (tr: Transaction) => void, emojis: EmojiDescription[]) => void;
  onSelect: (state: EditorState, dispatch: (tr: Transaction) => void) => void;
}

const LIST_LIMIT: number = 5;

export default class EmojiSuggestions extends Component<Props, any> {
  componentWillUnmount() {
    this.props.emojiProvider!.unsubscribe(this.onProviderChange);
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
      this.onSearch(nextProps.query);
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

  onSelect = () => {
    const { state, dispatch } = this.props.editorView;
    this.props.onSelect(state, dispatch);
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

  private onSearchResult = (result: EmojiSearchResult): void => {
    const { state, dispatch } = this.props.editorView;
    this.props.setEmojis(state, dispatch, result.emojis);
  }

  private onProviderChange = { result: this.onSearchResult };
}
