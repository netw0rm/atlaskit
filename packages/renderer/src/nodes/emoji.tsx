import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiId, EmojiProvider, ResourcedEmoji } from '@atlaskit/emoji';

export interface Props {
  emojiId: EmojiId;
  text: string;
  emojiProvider?: Promise<EmojiProvider>;
}

export default class Emoji extends PureComponent<Props, {}> {

  render() {
    const { emojiProvider, emojiId } = this.props;

    if (emojiProvider) {
      return (
        <ResourcedEmoji
          emojiId={emojiId}
          emojiProvider={emojiProvider}
        />
      );
    }

    return <span>{emojiId.fallback || emojiId.shortName}</span>;
  }
}
