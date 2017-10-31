import * as React from 'react';
import styled from 'styled-components';
import { EmojiDescription } from '@atlaskit/emoji';
import EmojiItem from './EmojiItem';
import { akBorderRadius } from '@atlaskit/util-shared-styles';

// tslint:disable-next-line:variable-name
export const Container = styled.div`
  background: white;
  border-radius: ${akBorderRadius};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  overflow: hidden;

  * span > span + span {
    padding: 4px 7px 0px 2px;
    line-height: normal;
  }
`;

export interface Props {
  emojis: EmojiDescription[];
  selectedIndex: number;
  onSelect: () => void;
}

// tslint:disable-next-line:variable-name
const EmojiList = ({ emojis, onSelect, selectedIndex }: Props) => (
  <Container>
    {emojis.map((emoji, index) => (
      <EmojiItem
        key={emoji.id}
        emoji={emoji}
        onSelect={onSelect}
        selected={index === selectedIndex}
      />
    ))}
  </Container>
);

export default EmojiList;
