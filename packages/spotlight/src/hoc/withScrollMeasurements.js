// @flow
/* eslint-disable react/sort-comp, react/no-multi-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SpotlightRegistry from '../components/SpotlightRegistry';

type State = {
  scrollY: number,
}

function getScrollY() {
  return window.pageYOffset
  || document.documentElement.scrollTop
  || document.body.scrollTop
  || 0;
}
function getInitialState() {
  return {
    scrollY: getScrollY(),
  };
}

let withScrollMeasurementsId = 0;

export default function withScrollMeasurements(WrappedComponent) {
  return class SpotlightWrapper extends Component {
    state: State = getInitialState();
    static contextTypes = {
      spotlightRegistry: PropTypes.instanceOf(SpotlightRegistry).isRequired,
    };
    componentWillMount() {
      // NOTE: we don't document the spotlightRegistry prop type because it
      // is provided by the HOC and not part of the public API.
      // eslint-disable-next-line react/prop-types
      const { target } = this.props;
      const { spotlightRegistry } = this.context;

      if (!spotlightRegistry) {
        throw Error('`Spotlight` requires `SpotlightManager` as an ancestor.');
      }

      spotlightRegistry.mount(target || `no_target_${++withScrollMeasurementsId}`);

      if (target) {
        const node = spotlightRegistry.get(target);
        this.measureAndScroll(node);
      }
    }
    componentWillUnmount() {
      // eslint-disable-next-line react/prop-types
      const { target } = this.props;
      const { spotlightRegistry } = this.context;

      spotlightRegistry.unmount(target || `no_target_${withScrollMeasurementsId}`);
    }
    measureAndScroll = (node) => {
      const { height, left, top: initialTop, width } = node.getBoundingClientRect();
      const { scrollY } = this.state;
      const gutter = 10; // enough room to be comfortable and not crop the pulse animation

      let top = initialTop;

      // hidden above viewport
      if (initialTop < 0) {
        top = gutter;
        window.scrollTo(0, scrollY + (initialTop - gutter));

      // hidden below viewport
      } else if ((initialTop + height) > (scrollY + window.innerHeight)) {
        top = gutter;
        window.scrollTo(0, (initialTop + scrollY) - gutter);
      }

      // get adjusted measurements after scrolling
      this.setState({
        clone: node.outerHTML,
        rect: { height, left, top, width },
        scrollY: getScrollY(),
      });
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          {...this.context}
        />
      );
    }
  };
}
