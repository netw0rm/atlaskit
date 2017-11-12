import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
// We are continually getting errors trying to resolve popper in CI. I've decided to minify the file
// (saving 55.33kb!!) and just store it locally next to Layer.
import Popper from '../popper.js';
import { akZIndexLayer } from '@atlaskit/util-shared-styles';

import { POSITION_ATTRIBUTE_ENUM, getFlipBehavior, positionPropToPopperPosition } from './internal/helpers';

/* eslint-disable react/no-unused-prop-types */

export default class Layer extends PureComponent {
  static propTypes = {
    autoFlip: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(PropTypes.oneOf(['top', 'right', 'bottom', 'left'])),
    ]),
    boundariesElement: PropTypes.oneOf(['viewport', 'window', 'scrollParent']),
    children: PropTypes.node,
    content: PropTypes.node,
    offset: PropTypes.string,
    onFlippedChange: PropTypes.func,
    position: PropTypes.oneOf(POSITION_ATTRIBUTE_ENUM.values),
    zIndex: PropTypes.number,
  }

  static defaultProps = {
    autoFlip: true,
    boundariesElement: 'viewport',
    children: null,
    content: null,
    offset: '0 0',
    onFlippedChange: () => {},
    position: POSITION_ATTRIBUTE_ENUM.default,
    zIndex: akZIndexLayer,
  }

  constructor(props) {
    super(props);
    this.state = {
      hasExtractedStyles: false,
      position: null,
      transform: null,
      flipped: false,
      actualPosition: null,
      // We set these default offsets to prevent a flash of popper content in the wrong position
      // which can cause incorrect height calculations. Popper will calculate these values
      offsets: {
        popper: {
          left: -9999,
          top: -9999,
        },
      },
      originalPosition: null,
      // fix Safari parent width: https://product-fabric.atlassian.net/browse/ED-1784
      cssPosition: 'absolute',
    };
  }

  componentDidMount() {
    this.applyPopper(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.applyPopper(nextProps);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.flipped !== this.state.flipped) {
      this.props.onFlippedChange({
        flipped: this.state.flipped,
        actualPosition: this.state.actualPosition,
        originalPosition: this.state.originalPosition,
      });
    }
  }

  componentWillUnmount() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  extractStyles = (state) => {
    if (state) {
      const left = Math.round(state.offsets.popper.left);
      const top = Math.round(state.offsets.popper.top);

      this.setState({
        hasExtractedStyles: true,
        // position: fixed or absolute
        cssPosition: state.offsets.popper.position,
        transform: `translate3d(${left}px, ${top}px, 0px)`,
        // state.flipped is either true or undefined
        flipped: !!state.flipped,
        actualPosition: state.position,
        originalPosition: state.originalPosition,
      });
    }
  };

  applyPopper(props) {
    if (!this.targetRef || !this.contentRef) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
    }

    // "new Popper(...)" operation is very expensive when called on virtual DOM.
    // This condition reduces the number of calls so we can run our tests faster
    // (time was reduced from 100s to 13s).
    if (!props.content) {
      return;
    }

    // we wrap our target in a div so that we can safely get a reference to it, but we pass the
    // actual target to popper
    const actualTarget = this.targetRef.firstChild;

    const popperOpts = {
      placement: positionPropToPopperPosition(props.position),
      onCreate: this.extractStyles,
      onUpdate: this.extractStyles,
      modifiers: {
        applyStyle: {
          enabled: false,
        },
        hide: {
          enabled: false,
        },
        offset: {
          enabled: true,
          offset: this.props.offset,
        },
        flip: {
          enabled: !!this.props.autoFlip,
          flipVariations: true,
          boundariesElement: this.props.boundariesElement,
          padding: 0, // leave 0 pixels between popper and the boundariesElement
        },
        preventOverflow: {
          enabled: !!this.props.autoFlip,
          escapeWithReference: true,
        },
      },
    };

    const flipBehavior = getFlipBehavior(props);
    if (flipBehavior) {
      popperOpts.modifiers.flip.behavior = flipBehavior;
    }

    this.popper = new Popper(actualTarget, this.contentRef, popperOpts);
  }

  render() {
    const { zIndex } = this.props;
    const { cssPosition, transform, hasExtractedStyles } = this.state;
    const opacity = hasExtractedStyles ? {} : { opacity: 0 };

    return (
      <div>
        <div ref={ref => (this.targetRef = ref)}>
          {this.props.children}
        </div>
        <div
          ref={ref => (this.contentRef = ref)}
          style={{ top: 0, left: 0, position: cssPosition, transform, zIndex, ...opacity }}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
