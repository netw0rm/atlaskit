import classNames from 'classnames';
import React from 'react';

import storyStyles from './animation-story.less';

const { Component } = React;
const boxClass = storyStyles.box;

/* This is a simple component used to consume an animation from shared-styles */
class AnimatedBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.animationDone = this.animationDone.bind(this);
  }
  componentDidMount() {
    const elem = this.refs.animated;
    elem.addEventListener('animationend', this.animationDone);
  }
  componentWillUnmount() {
    const elem = this.refs.animated;
    elem.removeEventListener('animationend', this.animationDone);
  }
  handleClick() {
    this.setState({ animating: true });
  }

  animationDone() {
    this.setState({ animating: false });
  }

  render() {
    const className = classNames({
      [boxClass]: true,
      [storyStyles[this.props.boxStyle]]: true,
      [storyStyles[this.props.animationClass]]: this.state.animating,
    });
    return (
      <div className={className} onClick={this.handleClick} ref="animated">
        <span>{this.props.children}</span>
      </div>
    );
  }
}

AnimatedBox.propTypes = {
  animationClass: React.PropTypes.string,
  boxStyle: React.PropTypes.string,
  children: React.PropTypes.node,
};

export default AnimatedBox;
