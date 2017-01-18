import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'style!../less/ContainerNavigationNested.less';
import { containerNavigationNestedPageSpacing } from '../../shared-variables';

export default class ContainerNavigationNested extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    animateDirection: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillUpdate(nextProps) {
    if (nextProps.children != this.props.children) {
        this.setState({prevChildren: this.props.children});
    }   
  }
  componentDidMount() {
      this.animateContainer.addEventListener("animationend",(e) => {
        if (this.props.animateDirection === 'left') {
          this.animateContainer.classList.remove(styles.containerNavigationNestedLeftAnimate);    
          this.animateContainer.classList.add(styles.containerNavigationNestedLeftAnimateEnd)
        } else {
          this.animateContainer.classList.remove(styles.containerNavigationNestedRightAnimate);    
          this.animateContainer.classList.add(styles.containerNavigationNestedRightAnimateEnd)
        }        
      });
  }
  componentDidUpdate() {
    this.animateContainer.className = styles.containerNavigationNested;
    // handle left animation  
    if (this.props.animateDirection === 'left') {
        this.animateContainer.classList.add(styles.containerNavigationNestedLeftAnimate);
    }
    // handle right animation
    if (this.props.animateDirection === 'right') {
        this.animateContainer.classList.add(styles.containerNavigationNestedRightAnimate);
    }
  }
  render() {
    const { pages, children } = this.props;
    const { prevChildren } = this.state;
    const activePane = <div key='active-pane' className={styles.pageWrapper}>{children}</div>
    const prevPane = <div key='prev-pane' className={styles.pageWrapper}>{prevChildren}</div>
    const content = this.props.animateDirection === 'left' ? [prevPane, activePane] : [activePane, prevPane];
    return <div className={styles.containerNavigationNested} ref={(el) => {this.animateContainer = el}}>{content}</div>
  }
}
