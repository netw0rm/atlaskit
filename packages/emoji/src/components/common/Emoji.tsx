import * as classNames from 'classnames';
import * as React from 'react';
import { MouseEvent } from 'react';

import * as styles from './styles';
import { isSpriteRepresentation, toEmojiId } from '../../type-helpers';
import { EmojiDescription, ImageRepresentation, OnEmojiEvent, SpriteRepresentation } from '../../types';
import { leftClick } from '../../util/mouse';

export interface Props {
  emoji: EmojiDescription;
  selected?: boolean;
  onSelected?: OnEmojiEvent;
  onMouseMove?: OnEmojiEvent;
  className?: string;
}

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
  const { emoji, selected, className } = props;
  const representation = emoji.representation as SpriteRepresentation;
  const sprite = representation.sprite;
  const classes = {
    [styles.emojiContainer]: true,
    [styles.selected]: selected,
  };

  if (className) {
    classes[className] = true;
  }

  const xPositionInPercent = (100 / (sprite.column - 1)) * (representation.xIndex - 0);
  const yPositionInPercent = (100 / (sprite.row - 1)) * (representation.yIndex - 0);
  const style = {
    backgroundImage: `url(${sprite.url})`,
    backgroundPosition: `${xPositionInPercent}% ${yPositionInPercent}%`,
    backgroundSize: `${sprite.column * 100}% ${sprite.row * 100}%`,
  };

  return (
    <span
      className={classNames(classes)}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
    >
      <span
        className={styles.emojiSprite}
        title={emoji.shortName}
        style={style}
      />
    </span>
  );
};

// Keep as pure functional component, see renderAsSprite.
const renderAsImage = (props: Props) => {
  const { emoji, selected, className } = props;

  const classes = {
    [styles.emoji]: true,
    [styles.selected]: selected,
  };

  if (className) {
    classes[className] = true;
  }

  const representation = emoji.representation as ImageRepresentation;

  return (
    <span
      className={classNames(classes)}
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
    </span>
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
