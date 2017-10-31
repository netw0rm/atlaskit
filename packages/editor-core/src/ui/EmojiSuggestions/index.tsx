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
import { PluginKey } from 'prosemirror-state';

export interface Props {
  editorView: EditorView;
  selectedIndex: number;
  emojiProvider?: EmojiProvider;
  query?: string;
  anchorElement?: HTMLElement;
  pluginKey: PluginKey;
  insertEmoji: (editorView: EditorView, emojiId: any) => void;
  dismiss: (editorView: EditorView) => void;
  setIndex: (editorView: EditorView, index: number) => void;
}

export interface State {
  emojis: EmojiDescription[];
}

const LIST_LIMIT: number = 5;

export default class EmojiSuggestions extends Component<Props, State> {
  ref?: EmojiList;
  private pluginInitialized: boolean = false;

  constructor(props) {
    super(props);
    this.state = { emojis: [] };
  }

  componentDidMount() {
    this.setPluginState(this.props);
  }

  componentWillUpdate(nextProps: Props) {
    this.setPluginState(nextProps);
  }

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
      anchorElement
    } = this.props;

    if (!query || !anchorElement || !emojiProvider) {
      return null;
    }
    const { emojis } = this.state;
    if (!emojis.length) {
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
          setIndex={this.setIndex}
          selectedIndex={selectedIndex}
        />
      </Popup>
    );
  }

  selectCurrent = () => {
    if (this.ref) {
      (this.ref as EmojiList).selectCurrent();
    }
    return true;
  }

  selectNext = () => {
    if (this.ref) {
      (this.ref as EmojiList).selectNext();
    }
    return true;
  }

  selectPrevious = () => {
    if (this.ref) {
      (this.ref as EmojiList).selectPrevious();
    }
    return true;
  }

  dismiss = () => {
    this.props.dismiss(this.props.editorView);
    return true;
  }

  setIndex = (index: number) => {
    this.props.setIndex(this.props.editorView, index);
  }

  private setPluginState (props: Props) {
    const { editorView, pluginKey } = props;
    if (!editorView || this.pluginInitialized) {
      return;
    }
    this.pluginInitialized = true;

    editorView.dispatch(editorView.state.tr.setMeta(pluginKey, {
      onSelectPrevious: this.selectPrevious,
      onSelectNext: this.selectNext,
      onSelectCurrent: this.selectCurrent,
      dismiss: this.dismiss
    }));
  }

  private onSearch(query?: string): void {
    const { emojiProvider } = this.props;
    if (!emojiProvider) {
      return;
    }
    const options: SearchOptions = {
      limit: LIST_LIMIT
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
    this.setState({ emojis });
  }

  private onProviderChange = { result: this.onSearchResult };

  private onEmojiSelect = (emojiId: any, emoji: any) => {
    this.props.insertEmoji(this.props.editorView, emojiId);
  }

  private handleRef = (ref: EmojiList) => {
    this.ref = ref;
  }
}
