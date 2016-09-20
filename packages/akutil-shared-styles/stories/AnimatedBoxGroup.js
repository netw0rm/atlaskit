import storyStyles from 'style!./stories.less';
import AnimatedBox from './AnimatedBox.js';

import React from 'react';
const { Component } = React;

/* This component simply renders three AnimatedBoxes with a button underneath
   to run the animationClass of each at the same time */
class AnimatedBoxGroup extends Component {
  constructor(props) {
    super(props);
    this.clickAll = this.clickAll.bind(this);
  }
  clickAll() {
    this.refs.boldBox.handleClick();
    this.refs.optimisticBox.handleClick();
    this.refs.combinedBox.handleClick();
  }

  render() {
    return (
      <div className={storyStyles.container}>
        <div>
          <AnimatedBox
            boxStyle="bold"
            animationClass="boldBounce"
            ref="boldBox"
          >Bold</AnimatedBox>
          <AnimatedBox
            boxStyle="optimistic"
            animationClass="optimisticBounce"
            ref="optimisticBox"
          >Optimistic</AnimatedBox>
          <AnimatedBox
            boxStyle="combined"
            animationClass="combinedBounce"
            ref="combinedBox"
          >Combined</AnimatedBox>
        </div>
        <div className={storyStyles.centerContent}>
          <button onClick={this.clickAll}>All</button>
        </div>
      </div>
    );
  }
}

export default AnimatedBoxGroup;
