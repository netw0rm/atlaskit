import * as classNames from 'classnames';
import * as React from 'react';
import { MouseEvent } from 'react';
import Tooltip from '@atlaskit/tooltip';

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
  showTooltip?: boolean;
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
  const { emoji, selected, className, showTooltip } = props;
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
  const node = (
    <span
      className={styles.emojiSprite}
      style={style}
    />
  );
  const emojiNode = tooltipWrapper(node, emoji.shortName, showTooltip);

  return (
    <span
      className={classNames(classes)}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
    >
      {emojiNode}
    </span>
  );
};

// Keep as pure functional component, see renderAsSprite.
const renderAsImage = (props: Props) => {
  const { emoji, selected, className, showTooltip } = props;

  const classes = {
    [styles.emoji]: true,
    [styles.selected]: selected,
  };

  if (className) {
    classes[className] = true;
  }

  const representation = emoji.representation as ImageRepresentation;
  const node = (
    <img
      src={representation.imagePath}
      alt={emoji.shortName}
    />
  );
  const emojiNode = tooltipWrapper(node, emoji.shortName, showTooltip);
  return (
    <span
      className={classNames(classes)}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
    >
      {emojiNode}
    </span>
  );
};

const tooltipWrapper = (emojiNode: JSX.Element, shortName: string, showTooltip?: boolean): JSX.Element => {
  if (showTooltip) {
    return (
      <Tooltip
        description={shortName}
        position="top"
      >
        {emojiNode}
      </Tooltip>
    );
  }
  return emojiNode;
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
