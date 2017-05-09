import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiId, EmojiProvider, ResourcedEmoji } from '@atlaskit/emoji';

export interface Props {
  emojiId: EmojiId;
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

    const text = emojiId.fallback || emojiId.shortName;
    return <span>{text}</span>;
  }
}
