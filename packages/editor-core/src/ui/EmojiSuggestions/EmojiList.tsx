import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { EmojiDescription } from '@atlaskit/emoji';
import EmojiItem from './EmojiItem';
import { akBorderRadius } from '@atlaskit/util-shared-styles';

function wrapIndex(emojis: EmojiDescription[], index: number): number {
  const len = emojis.length;
  let newIndex = index;
  while (newIndex < 0 && len > 0) {
    newIndex += len;
  }
  return newIndex % len;
}

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
  onEmojiSelect: (emoji: EmojiDescription, event?) => void;
  setIndex: (index: number) => void;
}


export default class EmojiList extends Component<Props, any> {
  selectCurrent = () => {
    if (this.props.selectedIndex > -1) {
      const emoji = this.props.emojis[this.props.selectedIndex];
      this.props.onEmojiSelect(emoji);
    }
  }

  selectNext = () => {
    const { emojis, selectedIndex } = this.props;
    this.props.setIndex(wrapIndex(emojis, selectedIndex + 1));
  }

  selectPrevious = () => {
    const { emojis, selectedIndex } = this.props;
    this.props.setIndex(wrapIndex(emojis, selectedIndex - 1));
  }

  render() {
    const { emojis, onEmojiSelect } = this.props;

    return (
      <Container>
        {emojis.map((emoji, index) => (
          <EmojiItem
            key={emoji.id}
            emoji={emoji}
            onSelected={onEmojiSelect}
            selected={index === this.props.selectedIndex}
          />
        ))}
      </Container>
    );
  }
}
