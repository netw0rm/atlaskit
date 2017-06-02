import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import styles from '../less/ContainerNavigationNested.less';
import ContainerNavigationNestedPageWrapper from '../styled/ContainerNavigationNestedPageWrapper';
import NestedNavigationSplitButton from './NestedNavigationSplitButton';

export default class ContainerNavigationNested extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    onAnimationEnd: PropTypes.func,
    animationDirection: PropTypes.oneOf(['left', 'right']),
    backButtonIcon: PropTypes.node,
    onBackButtonClick: PropTypes.func,
    mainNavigationItem: PropTypes.element,
  }

  static defaultProps = {
    onAnimationEnd: () => {},
    onBackButtonClick: () => {},
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
    const { children, backButtonIcon, mainNavigationItem, onBackButtonClick } = this.props;
    const { prevChildren } = this.state;

    const shouldRenderSplitBackButton = backButtonIcon && mainNavigationItem;

    const splitBackButton = shouldRenderSplitBackButton ?
      (<NestedNavigationSplitButton
        backButtonIcon={backButtonIcon}
        onBackButtonClick={onBackButtonClick}
        mainNavigationItem={mainNavigationItem}
      />) : null;

    const activePane = <ContainerNavigationNestedPageWrapper key="active-pane" className={styles.pageWrapper}>{splitBackButton}{children}</ContainerNavigationNestedPageWrapper>;
    const prevPane = <ContainerNavigationNestedPageWrapper key="prev-pane" className={styles.pageWrapper}>{splitBackButton}{prevChildren}</ContainerNavigationNestedPageWrapper>;
    const content = this.props.animationDirection === 'left' ? [prevPane, activePane] : [activePane, prevPane];
    return (<div
      className={styles.containerNavigationNested}
      onAnimationEnd={this.animationEndHandler}
      ref={(el) => { this.animateContainer = el; }}
    >{content}</div>);
  }
}
