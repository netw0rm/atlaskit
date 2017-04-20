import React, { PureComponent, PropTypes } from 'react';
import styles from '../less/ContainerNavigationNested.less';

export default class ContainerNavigationNested extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onAnimationEnd: PropTypes.func,
    animationDirection: PropTypes.oneOf(['left', 'right']),
  }

  static defaultProps = {
    onAnimationEnd: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUpdate(nextProps) {
    if (nextProps.children !== this.props.children) {
      this.setState({ prevChildren: this.props.children });
    }
  }
  componentDidUpdate() {
    this.animateContainer.className = styles.containerNavigationNested;
    // handle left animation
    if (this.props.animationDirection === 'left') {
      this.animateContainer.classList.add(styles.containerNavigationNestedLeftAnimate);
    }
    // handle right animation
    if (this.props.animationDirection === 'right') {
      this.animateContainer.classList.add(styles.containerNavigationNestedRightAnimate);
    }
  }
  animationEndHandler = () => {
    if (this.props.animationDirection === 'left') {
      this.animateContainer.classList.remove(styles.containerNavigationNestedLeftAnimate);
      this.animateContainer.classList.add(styles.containerNavigationNestedLeftAnimateEnd);
    } else {
      this.animateContainer.classList.remove(styles.containerNavigationNestedRightAnimate);
      this.animateContainer.classList.add(styles.containerNavigationNestedRightAnimateEnd);
    }
    this.props.onAnimationEnd();
  }
  render() {
    const { children } = this.props;
    const { prevChildren } = this.state;
    const activePane = <div key="active-pane" className={styles.pageWrapper}>{children}</div>;
    const prevPane = <div key="prev-pane" className={styles.pageWrapper}>{prevChildren}</div>;
    const content = this.props.animationDirection === 'left' ? [prevPane, activePane] : [activePane, prevPane];
    return (<div
      className={styles.containerNavigationNested}
      onAnimationEnd={this.animationEndHandler}
      ref={(el) => { this.animateContainer = el; }}
    >{content}</div>);
  }
}
