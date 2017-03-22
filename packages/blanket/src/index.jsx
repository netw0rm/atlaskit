import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';

import styles from 'style!./style.less';

export default class Blanket extends PureComponent {
  static propTypes = {
    canClickThrough: PropTypes.bool,
    isTinted: PropTypes.bool,
    onBlanketClicked: PropTypes.func,
  };

  static defaultProps = {
    isTinted: false,
    canClickThrough: false,
    onBlanketClicked: () => {},
  };

  render() {
    const {
      canClickThrough,
      isTinted,
      onBlanketClicked,
    } = this.props;

    // TODO make sure that the div onClick is accessible
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={classNames(styles.blanket, {
          [styles.tinted]: isTinted,
          [styles.canClickThrough]: canClickThrough,
        })}
        onClick={canClickThrough ? null : onBlanketClicked}
      />
    );
  }
}
