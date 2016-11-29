import classNames from 'classnames';
import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!./style.less';
import EmojiPropTypes from './internal/ak-emoji-prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export default class extends PureComponent {
  static propTypes = {
    ...EmojiPropTypes.emojiPropType,
    onClick: PropTypes.func,

  };

  renderAsSprite = () => {
    const sprite = this.props.representation.sprite;
    const classes = [styles.emojiContainer];
    if (this.props.selected) {
      classes.push(styles.selected);
    }

    const xPositionInPercent = (100 / (sprite.column - 1)) * (this.props.representation.xIndex - 0);
    const yPositionInPercent = (100 / (sprite.row - 1)) * (this.props.representation.yIndex - 0);
    const style = {
      backgroundImage: `url(${sprite.imagePath})`,
      backgroundPosition: `${xPositionInPercent}% ${yPositionInPercent}%`,
      backgroundSize: `${sprite.column * 100}% ${sprite.row * 100}%`,
    };

    return (
      <div className={classNames(classes)}>
        <button
          className={styles.emojiSprite}
          title={this.props.shortcut}
          style={style}
          onClick={this.props.onClick}
        />
      </div>
    );
  }

  render() {
    if (this.props.representation.sprite) {
      return this.renderAsSprite();
    }

    const classes = [styles.emoji];
    if (this.props.selected) {
      classes.push(styles.selected);
    }

    const style = {
      backgroundImage: `url(${this.props.representation.imagePath})`,
    };

    return (
      <button
        className={classNames(classes)}
        title={this.props.shortcut}
        style={style}
        onClick={this.props.onClick}
      />);
  }
}
