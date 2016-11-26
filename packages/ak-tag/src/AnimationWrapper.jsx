import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class AnimationWrapper extends PureComponent {

  static propTypes = {
    isRemoving: PropTypes.bool,
    isRemoved: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isRemoving: false,
      isRemoved: false,
    };
  }

  handleAnimationEnd = (e) => {
    if (e.animationName === styles.removeAnimation) {
      this.setState({ isRemoving: false, isRemoved: true });
    }
  }

  render() {
    const animationWrapperClasses = classNames({
      [styles.animationWrapper]: true,
      [styles.isRemoving]: this.props.isRemoving,
      [styles.isRemoved]: this.props.isRemoved,
    });

    return (<div
      className={animationWrapperClasses}
      onAnimationEnd={e => this.handleAnimationEnd(e)}
    >
      {this.props.children}
    </div>);
  }
}
