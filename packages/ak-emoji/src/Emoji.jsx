import classNames from 'classnames';
import React, { PureComponent } from 'react';
import styles from 'style!./style.less';
import EmojiPropTypes from './internal/ak-emoji-prop-types';

export default class Emoji extends PureComponent {
  static propTypes = {
    ...EmojiPropTypes.emojiPropType,
  };

  renderAsSprite = () => {
    const sprite = this.props.representation.sprite;
    const classes = {
      [styles.emojiContainer]: true,
      [styles.selected]: this.props.selected,
    };

    const xPositionInPercent = (100 / (sprite.column - 1)) * (this.props.representation.xIndex - 0);
    const yPositionInPercent = (100 / (sprite.row - 1)) * (this.props.representation.yIndex - 0);
    const style = {
      backgroundImage: `url(${sprite.url})`,
      backgroundPosition: `${xPositionInPercent}% ${yPositionInPercent}%`,
      backgroundSize: `${sprite.column * 100}% ${sprite.row * 100}%`,
    };

    return (
      <div className={classNames(classes)}>
        <span
          className={styles.emojiSprite}
          title={this.props.shortcut}
          style={style}
        />
      </div>
    );
  }

  renderAsImage = () => {
    const classes = {
      [styles.emoji]: true,
      [styles.selected]: this.props.selected,
    };

    const style = {
      backgroundImage: `url(${this.props.representation.imagePath})`,
    };

    return (
      <span
        className={classNames(classes)}
        title={this.props.shortcut}
        style={style}
      />);
  }

  render() {
    if (this.props.representation.sprite) {
      return this.renderAsSprite();
    }
    return this.renderAsImage();
  }
}
