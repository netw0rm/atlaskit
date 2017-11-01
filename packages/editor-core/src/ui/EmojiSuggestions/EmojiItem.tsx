import * as React from 'react';
import { Component } from 'react';
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
  onSelect: (index: number) => void;
  index: number;
}

export default class EmojiItem extends Component<Props, any> {
  render() {
    const {selected, emoji} = this.props;
    return (
      <Button onClick={this.onSelect} className={selected ? 'selected' : ''}>
        <Emoji emoji={emoji} />
      </Button>
    );
  }

  private onSelect = () => {
    this.props.onSelect(this.props.index);
  }
}
