import React, { PureComponent, PropTypes } from 'react';
import styles from 'style!../less/GlobalItem.less';
import classNames from 'classnames';
import keycode from 'keycode';

export default class GlobalItem extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onActivate: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    hasExpandedClickableArea: PropTypes.bool,
  };
  static defaultProps = {
    onActivate: () => {},
    size: 'medium',
    hasExpandedClickableArea: false,
  };

  render() {
    if (this.props.children === null) return null;
    return (
      // role="button" and the keyboard handlers are sufficient for this div.
      // We can't use a <button> because it may contain block elements.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        aria-haspopup="true"
        role="button"
        onClick={() => this.props.onActivate()}
        onKeyDown={(e) => {
          if ((e.keyCode === keycode('SPACE')) || (e.keyCode === keycode('ENTER'))) {
            this.props.onActivate();
          }
        }}
        onMouseDown={e => e.preventDefault()}
        tabIndex="0"
        className={classNames(styles.globalItem, {
          [styles.smallGlobalItem]: this.props.size === 'small',
          [styles.mediumGlobalItem]: this.props.size === 'medium',
          [styles.largeGlobalItem]: this.props.size === 'large',
          [styles.hasExpandedClickableArea]: this.props.hasExpandedClickableArea,
        })}
      >
        {this.props.children}
      </div>
    );
  }
}
