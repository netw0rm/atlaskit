import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Spinner from '@atlaskit/spinner';

import props from '../internal/props';
import { SMALL, MEDIUM, LARGE, XLARGE, LOADING_CONTENTS_OPACITY } from '../internal/constants';
import { Container, SpinnerBackdrop, SpinnerContainer } from '../styled/LoadingContainerAdvanced';

export default class LoadingContainerAdvanced extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isLoading: PropTypes.bool,
    spinnerSize: PropTypes.oneOf([SMALL, MEDIUM, LARGE, XLARGE, PropTypes.number]),
    contentsOpacity: props.isIn01Range,
    targetRef: PropTypes.func,
  }

  static defaultProps = {
    isLoading: true,
    spinnerSize: LARGE,
    contentsOpacity: LOADING_CONTENTS_OPACITY,
  }

  componentDidMount = () => {
    if (this.props.isLoading && this.hasTargetNode()) {
      this.attachListeners();
      this.updateTargetAppearance();
      this.updateSpinnerPosition();
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.isLoading) {
      this.detachListeners();
    } else if (!this.props.isLoading && this.hasTargetNode()) {
      this.attachListeners();
    }
  }

  componentDidUpdate = () => {
    if (this.hasTargetNode()) {
      this.updateTargetAppearance();

      if (this.props.isLoading) {
        this.updateSpinnerPosition();
      }
    }
  }

  componentWillUnmount = () => {
    this.detachListeners();
  }

  getTargetNode = () => {
    const { targetRef } = this.props;

    // targetRef prop may be defined but it is not guaranteed it returns an element
    const targetElement = targetRef ? targetRef() : this.children;
    const targetNode = findDOMNode(targetElement); // eslint-disable-line react/no-find-dom-node

    return targetNode;
  }

  hasTargetNode = () => !!this.getTargetNode()

  isVerticallyVisible = (elementRect, clientHeight) => {
    const { top, bottom, height } = elementRect;
    if (bottom <= 0) {
      return false;
    }
    return (top + height) > 0 && top < clientHeight;
  }

  isFullyVerticallyVisible = (elementRect, clientHeight) => {
    const { top, bottom } = elementRect;
    return top >= 0 && bottom <= clientHeight;
  }

  attachListeners = () => {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  }

  detachListeners = () => {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.updateSpinnerPosition();
  }

  handleScroll = () => {
    this.updateSpinnerPosition();
  }

  translateSpinner = (spinnerNode, transformY, isFixed) => {
    spinnerNode.style.position = isFixed ? 'fixed' : '';
    spinnerNode.style.transform = `translate3d(0, ${transformY}px, 0)`;
  }

  updateTargetAppearance = () => {
    const targetNode = this.getTargetNode();
    const { isLoading, contentsOpacity } = this.props;

    targetNode.style.pointerEvents = isLoading ? 'none' : '';
    targetNode.style.opacity = isLoading ? contentsOpacity : '';
  }

  updateSpinnerPosition = () => {
    const clientHeight = document.documentElement.clientHeight;
    const targetNode = this.getTargetNode();
    const targetRect = targetNode.getBoundingClientRect();
    const spinnerNode = findDOMNode(this.spinner); // eslint-disable-line react/no-find-dom-node
    const spinnerRect = spinnerNode.getBoundingClientRect();
    const spinnerHeight = spinnerRect.height;
    const isInViewport = this.isVerticallyVisible(targetRect, clientHeight);
    const { top, bottom, height } = targetRect;

    if (isInViewport) {
      // The spinner may follow the element only if there is enough space:
      // Let's say the element can fit at least three spinners (vertically)
      const canFollow = height >= spinnerHeight * 3;
      if (canFollow && !this.isFullyVerticallyVisible(targetRect, clientHeight)) {
        if (top >= 0) {
          // Only the head of the element is visible
          const viewportSpaceTakenByElement = clientHeight - top;
          const diff = ((viewportSpaceTakenByElement / 2) + top) - (spinnerHeight / 2);
          const y = viewportSpaceTakenByElement < spinnerHeight * 3 ? top + spinnerHeight : diff;
          this.translateSpinner(spinnerNode, y, true);
        } else if (top < 0 && bottom > clientHeight) {
          // The element takes all viewport, nor its head nor tail are visible
          const y = (clientHeight / 2) - (spinnerHeight / 2);
          this.translateSpinner(spinnerNode, y, true);
        } else {
          // Only the tail of the element is visible
          const diff = (bottom / 2) - (spinnerHeight / 2);
          const y = diff < spinnerHeight ? (diff - (spinnerHeight - diff)) : diff;
          this.translateSpinner(spinnerNode, y, true);
        }
        return;
      }
    } else {
      // If both the element and the spinner are off screen - quit
      // eslint-disable-next-line no-lonely-if
      if (!this.isVerticallyVisible(spinnerRect, clientHeight)) {
        return;
      }
    }

    // Three options here:
    // 1) the element is fully visible
    // 2) the element is too small for the spinner to follow
    // 3) the spinner might still be visible while the element isn't
    const thisNode = findDOMNode(this); // eslint-disable-line react/no-find-dom-node
    const thisTop = thisNode.getBoundingClientRect().top;
    const y = (top - thisTop) / 2;
    this.translateSpinner(spinnerNode, y, false);
  }

  render() {
    const {
      children,
      isLoading,
      spinnerSize,
    } = this.props;

    return (
      <Container>
        {React.cloneElement(children, {
          ref: el => (this.children = el),
        })}
        {isLoading && (
          <SpinnerBackdrop>
            <SpinnerContainer ref={el => (this.spinner = el)}>
              <Spinner size={spinnerSize} />
            </SpinnerContainer>
          </SpinnerBackdrop>
        )}
      </Container>
    );
  }
}
