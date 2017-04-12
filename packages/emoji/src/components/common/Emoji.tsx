import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import * as styles from './styles';
import { EmojiDescription, ImageRepresentation, SpriteRepresentation } from '../../types';
import { isSpriteRepresentation } from '../../type-helpers';

export interface Props {
  emoji: EmojiDescription;
  selected?: boolean;
}

export default class Emoji extends PureComponent<Props, undefined> {
  static defaultProps = {
    selected: false,
  };

  renderAsSprite = () => {
    const { emoji } = this.props;
    const representation = emoji.representation as SpriteRepresentation;
    const sprite = representation.sprite;
    const classes = {
      [styles.emojiContainer]: true,
      [styles.selected]: this.props.selected,
    };

    const xPositionInPercent = (100 / (sprite.column - 1)) * (representation.xIndex - 0);
    const yPositionInPercent = (100 / (sprite.row - 1)) * (representation.yIndex - 0);
    const style = {
      backgroundImage: `url(${sprite.url})`,
      backgroundPosition: `${xPositionInPercent}% ${yPositionInPercent}%`,
      backgroundSize: `${sprite.column * 100}% ${sprite.row * 100}%`,
    };

    return (
      <span className={classNames(classes)}>
        <span
          className={styles.emojiSprite}
          title={emoji.shortName}
          style={style}
        />
      </span>
    );
  }

  renderAsImage = () => {
    const classes = {
      [styles.emoji]: true,
      [styles.selected]: this.props.selected,
    };

    const { emoji } = this.props;

    const representation = emoji.representation as ImageRepresentation;

    const style = {
      backgroundImage: `url(${representation.imagePath})`,
    };

    return (
      <span
        className={classNames(classes)}
        title={emoji.shortName}
        style={style}
      />);
  }

  render() {
    const { emoji } = this.props;
    if (isSpriteRepresentation(emoji.representation)) {
      return this.renderAsSprite();
    }
    return this.renderAsImage();
  }
}
