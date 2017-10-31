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

  & .emoji-sprite, & span img {
    height: 24px;
    width: 24px;
  }

  &:hover, &.selected {
    background: ${akColorN30};
  }
`;

export interface Props {
  emoji: EmojiDescription;
  selected?: boolean;
  onSelected: (emoji: EmojiDescription, event?) => void;
}

export default class EmojiItem extends Component<Props, any> {
  render() {
    const { selected, emoji } = this.props;
    return (
      <Button onClick={this.onClick} className={selected ? 'selected' : ''}>
        <Emoji emoji={emoji} />
      </Button>
    );
  }

  onClick = (event) => {
    this.props.onSelected(this.props.emoji, event);
  }
}
