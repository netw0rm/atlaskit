// @flow
/* eslint-disable react/sort-comp, react/no-unused-prop-types */

import React, { Children, PureComponent } from 'react';
// Disabling eslint in the line below because we have an unexplained,
// unreproducible issue in CI sometimes where popper is not always resolvable.
// See AK-2971.
import Popper from 'popper.js'; // eslint-disable-line  import/no-unresolved, import/extensions
import { akZIndexLayer } from '@atlaskit/util-shared-styles';

import type { ElementType, FunctionType, PlacementType } from '../types';
import { getFlipBehavior, getPlacement } from '../utils';

type Props = {
  autoFlip: boolean | Array<'top' | 'right' | 'bottom' | 'left'>,
  boundariesElement: 'viewport' | 'window' | 'scrollParent',
  children: ElementType,
  content?: ElementType,
  offset: string,
  onFlippedChange?: FunctionType,
  position?: PlacementType,
  zIndex?: number,
};
type State = {
  actualPosition: string,
  // fix Safari parent width: https://product-fabric.atlassian.net/browse/ED-1784
  cssPosition: 'absolute' | 'fixed',
  flipped: boolean,
  position: PlacementType,
  offsets: {
    popper: {
      left: number,
      top: number,
    },
  },
  originalPosition: string,
  transform: string,
}
function getInitialState() {
  return {
    actualPosition: null,

    // fix Safari parent width: https://product-fabric.atlassian.net/browse/ED-1784
    cssPosition: 'absolute',
    flipped: false,
    position: null,
    transform: null,

    // We set these default offsets to prevent a flash of popper content in the wrong position
    // which can cause incorrect height calculations. Popper will calculate these values
    offsets: {
      popper: {
        left: -9999,
        top: -9999,
      },
    },
    originalPosition: null,
  };
}

export default class Layer extends PureComponent {
  props: Props
  state: State = getInitialState()

  static defaultProps = {
    autoFlip: true,
    boundariesElement: 'viewport',
    offset: '0 0',
    onFlippedChange: () => {},
    position: 'right middle',
    zIndex: akZIndexLayer,
  }

  componentDidMount() {
    this.applyPopper(this.props);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.flipped !== this.state.flipped) {
      this.props.onFlippedChange({
        actualPosition: this.state.actualPosition,
        flipped: this.state.flipped,
        originalPosition: this.state.originalPosition,
      });
    }

    if (prevState.contentRef !== this.state.contentRef) {
      this.applyPopper(prevProps);
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
        actualPosition: state.position,
        cssPosition: state.offsets.popper.position, // position: fixed or absolute
        flipped: !!state.flipped, // state.flipped is either true or undefined
        originalPosition: state.originalPosition,
        transform: `translate3d(${left}px, ${top}px, 0px)`,
      });
    }
  };

  applyPopper(props) {
    const { contentRef } = this.state;
    const targetRef = this.rootRef.firstChild;

    if (!targetRef || !contentRef) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
    }

    const popperOpts = {
      placement: getPlacement(props.position),
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

    this.popper = new Popper(targetRef, contentRef, popperOpts);
  }

  getRootRef = node => (this.rootRef = node)
  getContentRef = (node) => {
    const { content } = this.props;

    // set our internal ref
    this.setState(state => state.contentRef !== node && ({ contentRef: node }));

    // resolve ref on cloned element if provided
    if (content && typeof content.ref === 'function') {
      content.ref(node);
    }
  }

  renderContent = () => {
    const { content, zIndex } = this.props;
    const { cssPosition, transform } = this.state;

    if (!content) return null;

    const style = {
      top: 0,
      left: 0,
      position: cssPosition,
      transform,
      zIndex,
    };

    // NOTE: the content element may contain a `transform` property,
    // which overrides Popper.js transform. Wrapping the element
    // in a span provides a node for the conflicting declarations.
    return (
      <span ref={this.getContentRef} style={style}>
        {content}
      </span>
    );
  }

  render() {
    const { children } = this.props;

    return (
      <div ref={this.getRootRef}>
        {Children.only(children)}
        {this.renderContent()}
      </div>
    );
  }
}
