import React, { PureComponent, PropTypes } from 'react';
import Popper from 'popper.js';
import { akZIndexLayer } from '@atlaskit/util-shared-styles';

import { POSITION_ATTRIBUTE_ENUM, positionPropToPopperPosition } from './internal/helpers';

/* eslint-disable react/no-unused-prop-types */

export default class Layer extends PureComponent {
  static propTypes = {
    position: PropTypes.oneOf(POSITION_ATTRIBUTE_ENUM.values),
    boundariesElement: PropTypes.oneOf(['viewport', 'window', 'scrollParent']),
    autoPosition: PropTypes.bool,
    offset: PropTypes.string,
    content: PropTypes.node,
    onFlippedChange: PropTypes.func,
    children: PropTypes.node,
  }

  static defaultProps = {
    position: POSITION_ATTRIBUTE_ENUM.default,
    boundariesElement: 'viewport',
    autoPosition: true,
    offset: '0 0',
    content: null,
    onFlippedChange: () => {},
    children: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      position: null,
      transform: null,
      flipped: false,
      actualPosition: null,
      originalPosition: null,
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
    // we wrap our target in a div so that we can safely get a reference to it, but we pass the
    // actual target to popper
    const actualTarget = this.targetRef.firstChild;

    this.popper = new Popper(actualTarget, this.contentRef, {
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
          enabled: this.props.autoPosition,
          flipVariations: true,
          boundariesElement: this.props.boundariesElement,
          padding: 0, // leave 0 pixels between popper and the boundariesElement
        },
        preventOverflow: {
          enabled: this.props.autoPosition,
          escapeWithReference: true,
        },
      },
    });
  }

  render() {
    const { cssPosition, transform } = this.state;
    return (
      <div>
        <div ref={ref => (this.targetRef = ref)}>
          {this.props.children}
        </div>
        <div
          ref={ref => (this.contentRef = ref)}
          style={{ top: 0, left: 0, position: cssPosition, transform, zIndex: akZIndexLayer }}
        >
          {this.props.content}
        </div>
      </div>
    );
  }
}

/* eslint-enable react/no-unused-prop-types */
