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


// tslint:disable-next-line:variable-name
export const Separator = styled.span`
  background: ${akColorN30};
  width: 1px;
  display: inline-block;
`;

export interface Props {
  emojis: EmojiDescription[];
  onEmojiSelect?: (emoji: EmojiDescription, event) => void;
}

export interface State {
  selectedIndex: number;
}

export default class EmojiList extends Component<Props, State> {
  state: State = {
    selectedIndex: 0
  };

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
          <span style={{display: 'flex'}} key={emoji.id}>
            {index > 0 && <Separator />}
            <EmojiItem
              emoji={emoji}
              onSelected={onEmojiSelect}
              selected={index === this.state.selectedIndex}
            />
          </span>
        ))}
      </Container>
    );
  }

  private selectIndex (index: number) {
    this.setState({ selectedIndex: index });
  }
}
