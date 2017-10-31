import * as React from 'react';
import styled from 'styled-components';
import {
  Emoji,
  EmojiDescription
} from '@atlaskit/emoji';
import { akColorN30 } from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const Button = styled.div`
  padding: 5px;
  cursor: pointer;

  div & .emoji-sprite, & span img {
    height: 32px;
    width: 32px;
  }

  &:hover, &.selected {
    background: ${akColorN30};
  }
`;

export interface Props {
  emoji: EmojiDescription;
  selected?: boolean;
  onSelect: () => void;
}

// tslint:disable-next-line:variable-name
 const EmojiItem = ({ onSelect, selected, emoji }: Props) => (
  <Button onClick={onSelect} className={selected ? 'selected' : ''}>
    <Emoji emoji={emoji} />
  </Button>
);

export default EmojiItem;
