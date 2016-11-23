import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';

import styles from '../less/styles.less';

export default class BaseItem extends PureComponent {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isHidden: PropTypes.bool,
    isActive: PropTypes.bool,
    elemBefore: PropTypes.node,
    elemAfter: PropTypes.node,
    ariaRole: PropTypes.string,
    onActivate: PropTypes.func,
    children: PropTypes.node,
    href: PropTypes.string,
    target: PropTypes.string,
    className: PropTypes.string,
  }

  static defaultProps = {
    onActivate: () => {},
    isDisabled: false,
    isHidden: false,
    isActive: false,
  }

  render = () => {
    const { elemBefore, elemAfter, children, ariaRole, href, target, isDisabled, isActive,
      isHidden, className, onActivate} = this.props;

    const Item = href
      ? props => <a href={href} target={target} className={props.className}>{props.children}</a>
      : props => <span className={props.className}>{props.children}</span>;

    const classes = classNames(
      [styles.locals.item, {
        [styles.locals.disabled]: isDisabled,
        [styles.locals.active]: isActive,
        [styles.locals.hidden]: isHidden,
      }, className]
    );

    console.log('styles.locals', styles.locals);

    return (
      <Item
        onKeydown={onActivate}
        onClick={onActivate}
        role={ariaRole}
        className={classes}
      >
        { elemBefore ? <span className={styles.locals.elemBefore}>{ elemBefore }</span> : null }
        <span className={styles.locals.content}>{ children }</span>
        { elemAfter ? <span className={styles.locals.elemAfter}>{ elemAfter }</span> : null }
      </Item>
    );
  }
}
