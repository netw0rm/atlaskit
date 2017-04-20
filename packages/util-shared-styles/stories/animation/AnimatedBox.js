import classNames from 'classnames';
import React, { PureComponent } from 'react';

import storyStyles from './animation-story.less';

/* This is a simple component used to consume an animation from shared-styles */
class AnimatedBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.animationDone = this.animationDone.bind(this);
  }
  componentDidMount() {
    const elem = this.animated;
    elem.addEventListener('animationend', this.animationDone);
  }
  componentWillUnmount() {
    const elem = this.animated;
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
      [storyStyles.box]: true,
      [storyStyles[this.props.boxStyle]]: true,
      [storyStyles[this.props.animationClass]]: this.state.animating,
    });
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className={className} onClick={this.handleClick} ref={n => (this.animated = n)}>
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
