import React, { PropTypes, PureComponent } from 'react';
import classNames from 'classnames';

import styles from 'style!./style.less';

/**
 * @description A blanket which is placed over other page content
 * @class Blanket
 * @example @js import Blanket from 'ak-blanket';
 * ReactDOM.render(<Blanket />, container);
 */
export default class Blanket extends PureComponent {
  static propTypes = {
    /**
     * @description Whether clicks can pass through the blanket
     * @memberof Blanket
     * @instance
     * @type {Boolean}
     * @default false
     */
    canClickThrough: PropTypes.bool,
    /**
     * @description Whether the blanket has a tinted background color
     * @memberof Blanket
     * @instance
     * @type {Boolean}
     * @default false
     */
    isTinted: PropTypes.bool,
    /**
     * @description Handler function to be called when the blanket is clicked
     * @memberof Blanket
     * @instance
     * @type {function}
     */
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
        onClick={onBlanketClicked}
      />
    );
  }
}
