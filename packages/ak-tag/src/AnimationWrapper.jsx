import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './styles.less';

/* eslint-disable react/prop-types */
export default class AnimationWrapper extends Component {
  constructor(props) {
    super(props);

    this.onAnimationEnd = (e) => {
      if (e.animationName === styles.locals.removeAnimation) {
        this.props.afterAnimation();
      }
    };
  }
  render() {
    this.animationWrapperClasses = classnames({
      [styles.locals.animationWrapper]: true,
      [styles.locals.isRemoving]: this.props.isRemoving,
      [styles.locals.isRemoved]: this.props.isRemoved,
    });
    return (<div
      {...this.props}
      className={this.animationWrapperClasses}
      onAnimationEnd={this.onAnimationEnd}
    >
      {this.props.children}
    </div>);
  }
}
