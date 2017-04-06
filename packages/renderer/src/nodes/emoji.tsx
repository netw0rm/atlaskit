import * as React from 'react';
import { PureComponent } from 'react';
import { EmojiId, EmojiProvider, ResourcedEmoji } from '@atlaskit/emoji';
import styled from 'styled-components';

const width = '20px';
const height = '20px';

// FIXME this whole file should be unncessary once FS-853 is fixed
// tslint:disable-next-line
export const EmojiWrapper = styled.span`
  display: inline-block;
  width: ${width};
  height: ${height};
  verticalAlign: middle;
  userSelect: all;
  /* workaround for text fallback */
  overflow: hidden;

  /* sprite */
  span.emoji-sprite {
    margin: 0;
    width: ${width};
    height: ${height};
  }

  /* image */
  > span {
    margin: 0;
    width: ${width};
    height: ${height};
    backgroundSize: ${width} ${height};
  }

  /* placeholder */
  > svg {
    margin: 0;
    width: ${width};
    height: ${height};

    circle {
      r: 16;
    }
  }
`;

export interface Props {
  emojiId: EmojiId;
  emojiProvider?: Promise<EmojiProvider>;
  text: string;
}

export default class Emoji extends PureComponent<Props, {}> {

  render() {
    const { emojiProvider, emojiId, text } = this.props;

    if (emojiProvider) {
      return (
        <EmojiWrapper>
          <ResourcedEmoji
            emojiId={emojiId}
            emojiProvider={emojiProvider}
          />
        </EmojiWrapper>
      );
    }

    return <span>{text}</span>;
  }
}
