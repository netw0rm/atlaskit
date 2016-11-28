import classNames from 'classnames';
import styles from 'style!./styles.less';
import React, { PureComponent, PropTypes } from 'react';

/* eslint-disable react/prefer-stateless-function */
export default class AnimationWrapper extends PureComponent {

  static propTypes = {
    isRemoving: PropTypes.bool,
    isRemoved: PropTypes.bool,
    children: PropTypes.node.isRequired,
    onRemovalCompletion: PropTypes.func,
  }

  state = {
    isRemoving: false,
    isRemoved: false,
  }

  handleAnimationEnd = (e) => {
    if (e.animationName === styles.removeAnimation) {
      this.setState({ isRemoving: false, isRemoved: true });
    }
    if (this.props.onRemovalCompletion) this.props.onRemovalCompletion();
  }

  render() {
    const { isRemoving, isRemoved } = this.props;
    const animationWrapperClasses = classNames({
      [styles.animationWrapper]: true,
      [styles.isRemoving]: isRemoving,
      [styles.isRemoved]: isRemoved,
    });

    return (
      <div
        className={animationWrapperClasses}
        onAnimationEnd={e => this.handleAnimationEnd(e)}
      >
        {this.props.children}
      </div>
    );
  }
}
