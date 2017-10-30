import * as React from 'react';
import { Component } from 'react';
import { EmojiProvider } from '@atlaskit/emoji';
import { EditorView } from 'prosemirror-view';
import { EmojiTypeAhead as AkEmojiTypeAhead } from '@atlaskit/emoji';
import Popup from '../Popup';

export interface Props {
  editorView: EditorView;
  emojiProvider: Promise<EmojiProvider>;
  query?: string;
  anchorElement?: HTMLElement;
  insertEmoji: (editorView: EditorView, emojiId: any) => void;
}

export default class EmojiSuggestions extends Component<Props, any> {
  typeAhead?: AkEmojiTypeAhead;

  render() {
    const { query, emojiProvider, anchorElement } = this.props;
    if (!query || !anchorElement) {
      return null;
    }

    return (
      <Popup
        target={anchorElement}
        fitHeight={350}
        fitWidth={350}
        offset={[0, 3]}
      >
        <AkEmojiTypeAhead
          query={query}
          emojiProvider={emojiProvider}
          onSelection={this.handleSelectedEmoji}
          ref={this.handleEmojiTypeAheadRef}
        />
      </Popup>
    );
  }

  private handleEmojiTypeAheadRef = (ref) => {
    this.typeAhead = ref;
  }

  private handleSelectedEmoji = (emojiId: any, emoji: any) => {
    this.props.insertEmoji(this.props.editorView, emojiId);
  }
}
