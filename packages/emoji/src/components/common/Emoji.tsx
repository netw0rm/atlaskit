import * as classNames from 'classnames';
import * as React from 'react';
import { MouseEvent, SyntheticEvent } from 'react';
import TooltipWrapper from './TooltipWrapper';

import * as styles from './styles';
import { isImageRepresentation, isMediaRepresentation, isSpriteRepresentation, toEmojiId } from '../../type-helpers';
import { EmojiDescription, OnEmojiEvent, SpriteRepresentation } from '../../types';
import { leftClick } from '../../util/mouse';

export interface Props {
  /**
   * The emoji to render
   */
  emoji: EmojiDescription;

  /**
   * Show the emoji as selected
   */
  selected?: boolean;

  /**
   * Automatically show the emoji as selected based on mouse hover.
   *
   * CSS, fast, does not require a re-render, but selected state not
   * externally controlled via props.
   */
  selectOnHover?: boolean;

  /**
   * Called when an emoji is selected
   */
  onSelected?: OnEmojiEvent;

  /**
   * Called when the mouse moved over the emoji.
   */
  onMouseMove?: OnEmojiEvent;

  /**
   * Callback for if an emoji image fails to load.
   */
  onLoadError?: OnEmojiEvent<HTMLImageElement>;

  /**
   * Additional css classes, if required.
   */
  className?: string;

  /**
   * Show a tooltip on mouse hover.
   */
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

const handleImageError = (props: Props, event: SyntheticEvent<HTMLImageElement>) => {
  const { emoji, onLoadError } = props;

  // Hide error state (but keep space for it)
  const target = event.target as HTMLElement;
  target.style.visibility = 'hidden';

  if (onLoadError) {
    onLoadError(toEmojiId(emoji), emoji, event);
  }
};

// Pure functional components are used in favour of class based components, due to the performance!
// When rendering 1500+ emoji using class based components had a significant impact.
const renderAsSprite = (props: Props) => {
  const { emoji, selected, selectOnHover, className, showTooltip } = props;
  const representation = emoji.representation as SpriteRepresentation;
  const sprite = representation.sprite;
  const classes = {
    [styles.emojiContainer]: true,
    [styles.selected]: selected,
    [styles.selectOnHover]: selectOnHover,
  };

  if (className) {
    classes[className] = true;
  }

  let sizing = {};

  const xPositionInPercent = (100 / (sprite.column - 1)) * (representation.xIndex - 0);
  const yPositionInPercent = (100 / (sprite.row - 1)) * (representation.yIndex - 0);
  const style = {
    backgroundImage: `url(${sprite.url})`,
    backgroundPosition: `${xPositionInPercent}% ${yPositionInPercent}%`,
    backgroundSize: `${sprite.column * 100}% ${sprite.row * 100}%`,
    ...sizing,
  };
  const emojiNode = (
    <span
      className={styles.emojiSprite}
      style={style}
    />
  );

  return (
    <span
      className={classNames(classes)}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
      aria-label={emoji.shortName}
    >
      { showTooltip ?
        <TooltipWrapper description={emoji.shortName}>{emojiNode}</TooltipWrapper>
        : emojiNode
      }
    </span>
  );
};

// Keep as pure functional component, see renderAsSprite.
const renderAsImage = (props: Props) => {
  const { emoji, selected, selectOnHover, className, showTooltip } = props;

  const classes = {
    [styles.emoji]: true,
    [styles.selected]: selected,
    [styles.selectOnHover]: selectOnHover,
  };

  if (className) {
    classes[className] = true;
  }

  let src;
  const representation = emoji.representation;
  if (isImageRepresentation(representation)) {
    src = representation.imagePath;
  } else if (isMediaRepresentation(representation)) {
    src = representation.mediaPath;
  }

  let sizing = {};

  const onError = (event) => {
    handleImageError(props, event);
  };

  const onLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    let target = event.target as HTMLImageElement;
    target.style.visibility = 'visible';
  };

  // Pass src attribute as key to force React to rerender img node since browser does not
  // change preview image until loaded
  const emojiNode = (
    <img
      src={src}
      key={src}
      alt={emoji.shortName}
      style={{ visibility: 'hidden' }}
      onLoad={onLoad}
      onError={onError}
      {...sizing}
    />
  );
  return (
    <span
      className={classNames(classes)}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseDown={(event) => { handleMouseDown(props, event); }}
      // tslint:disable-next-line:jsx-no-lambda
      onMouseMove={(event) => { handleMouseMove(props, event); }}
      aria-label={emoji.shortName}
    >
    { showTooltip ?
      <TooltipWrapper description={emoji.shortName}>{emojiNode}</TooltipWrapper>
      : emojiNode
    }
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
