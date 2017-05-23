import * as React from 'react';
import { MouseEvent } from 'react';

import {
  ContainerStyle,
  EmojiStyle,
  SpriteStyle,
} from './styles';
import { isSpriteRepresentation, toEmojiId } from '../../type-helpers';
import {
  EmojiDescription,
  ImageRepresentation,
  OnEmojiEvent,
  SpriteRepresentation,
  SpriteSheet,
} from '../../types';
import { leftClick } from '../../util/mouse';

export interface Props {
  emoji: EmojiDescription;
  preview?: boolean;
  selected?: boolean;
  onSelected?: OnEmojiEvent;
  onMouseMove?: OnEmojiEvent;
}

export const getSpriteProps = (props: Props) => {
  const { emoji } = props;
  const representation = emoji.representation as SpriteRepresentation;
  const sprite = representation.sprite as SpriteSheet;

  return {
    sprite,
    xPositionInPercent: (100 / (sprite.column - 1)) * (representation.xIndex - 0),
    yPositionInPercent: (100 / (sprite.row - 1)) * (representation.yIndex - 0),
  };
};

const handleMouseDown = (props: Props, event: MouseEvent<any>) => {
  const { emoji, onSelected } = props;
  event.preventDefault();
  if (onSelected && leftClick(event)) {
    onSelected(toEmojiId(emoji), emoji, event);
  }
};

const handleMouseMove = (props: Props, event: MouseEvent<any>) => {
  const { emoji, onMouseMove } = props;
  if (onMouseMove) {
    onMouseMove(toEmojiId(emoji), emoji, event);
  }
};

// Pure functional components are used in favour of class based components, due to the performance!
// When rendering 1500+ emoji using class based components had a significant impact.
const renderAsSprite = (props: Props) => {
  const { emoji, preview, selected } = props;
  const spriteProps = {
    ...getSpriteProps(props),
    preview,
    title: emoji.shortName,
  };

  return (
    <ContainerStyle
      selected={selected}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
    >
      <SpriteStyle {...spriteProps}/>
    </ContainerStyle>
  );
};

// Keep as pure functional component, see renderAsSprite.
const renderAsImage = (props: Props) => {
  const { emoji, selected } = props;
  const representation = emoji.representation as ImageRepresentation;

  return (
    <EmojiStyle
      selected={selected}
      title={emoji.shortName}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
    >
      <img
        src={representation.imagePath}
        alt={emoji.shortName}
        title={emoji.shortName}
      />
    </EmojiStyle>
  );
};

// tslint:disable-next-line:variable-name
export const Emoji = (props: Props) => {
  const { emoji } = props;
  if (isSpriteRepresentation(emoji.representation)) {
    return renderAsSprite(props);
  }
  return renderAsImage(props);
};

export default Emoji;
