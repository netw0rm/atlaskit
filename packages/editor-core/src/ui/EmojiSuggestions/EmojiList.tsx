import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';
import { EmojiDescription } from '@atlaskit/emoji';
import EmojiItem from './EmojiItem';
import { akBorderRadius, akColorN30 } from '@atlaskit/util-shared-styles';

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
  * span > span + span {
    padding: 4px 7px 0px 2px;
    line-height: normal;
  }
`;

export interface Props {
  emojis: EmojiDescription[];
  onEmojiSelect: (emoji: EmojiDescription, event?) => void;
}

export interface State {
  selectedIndex: number;
}

export default class EmojiList extends Component<Props, State> {
  state: State = {
    selectedIndex: 0
  };

  selectCurrent = () => {
    const emoji = this.props.emojis[this.state.selectedIndex];
    this.props.onEmojiSelect(emoji);
  }

  selectNext = () => {
    const { selectedIndex } = this.state;
    const { emojis } = this.props;
    this.selectIndex(wrapIndex(emojis, selectedIndex + 1));
  }

  selectPrevious = () => {
    const { selectedIndex } = this.state;
    const { emojis } = this.props;
    this.selectIndex(wrapIndex(emojis, selectedIndex - 1));
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
            selected={index === this.state.selectedIndex}
          />
        ))}
      </Container>
    );
  }

  private selectIndex (index: number) {
    this.setState({ selectedIndex: index });
  }
}
