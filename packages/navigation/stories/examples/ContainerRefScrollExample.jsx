import React, { Component } from 'react';
import BasicNavigation from '../components/BasicNavigation';
import raf from 'raf-schd';

export default class ContainerRefScrollExample extends Component {
  state = {
    scrollPosition: 0,
  }

  handleRef = (scrollRef) => {
    this.scrollRef = scrollRef;
    if (this.scrollRef) {
      this.scrollRef.addEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll = raf((event) => {
    this.setState({
      scrollPosition: event.target.scrollTop,
    });
    console.log({ event: event.target.scrollTop });
  })

  render() {
    return (
      <BasicNavigation
        containerScrollRef={this.handleRef}
        containerHeaderComponent={() => (
          <div>Container scroll position: {this.state.scrollPosition}</div>
        )}
      >
        {this.props.children}
      </BasicNavigation>
    );
  }
}
