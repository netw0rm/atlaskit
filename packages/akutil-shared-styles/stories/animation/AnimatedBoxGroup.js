import React from 'react';

import storyStyles from './animation-story.less';
import AnimatedBox from './AnimatedBox';


const { Component } = React;

/* This component simply renders three AnimatedBoxes with a button underneath
   to run the animationClass of each at the same time */
class AnimatedBoxGroup extends Component {
  constructor(props) {
    super(props);
    this.clickAll = this.clickAll.bind(this);
  }
  clickAll() {
    this.boldBox.handleClick();
    this.optimisticBox.handleClick();
    this.combinedBox.handleClick();
  }

  render() {
    return (
      <div className={storyStyles.container}>
        <div>
          <AnimatedBox
            boxStyle="bold"
            animationClass="boldBounce"
            ref={n => (this.boldBox = n)}
          >Bold</AnimatedBox>
          <AnimatedBox
            boxStyle="optimistic"
            animationClass="optimisticBounce"
            ref={n => (this.optimisticBox = n)}
          >Optimistic</AnimatedBox>
          <AnimatedBox
            boxStyle="combined"
            animationClass="combinedBounce"
            ref={n => (this.combinedBox = n)}
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
