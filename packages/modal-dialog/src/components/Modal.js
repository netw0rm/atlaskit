// @flow
import React, { Component } from 'react';
import { withRenderTarget } from '@atlaskit/layer-manager';
import Blanket from '@atlaskit/blanket';

import type {
  AppearanceType,
  ChildrenType,
  ComponentType,
  ElementType,
  FunctionType,
  KeyboardOrMouseEvent,
} from '../types';
import { WIDTH_ENUM } from '../shared-variables';

import {
  Positioner as StyledPositioner,
  Dialog,
  FillScreen as StyledFillScreen,
} from '../styled/Modal';
import { Fade, SlideUp } from './Animation';
import Content from './Content';

// Rename transition components for easier parsing of the render method
const Positioner = props => <SlideUp component={StyledPositioner} {...props} />;
const FillScreen = props => <Fade component={StyledFillScreen} {...props} />;

function getScrollDistance() {
  return window.pageYOffset
  || document.documentElement.scrollTop
  || document.body.scrollTop
  || 0;
}
function getInitialState() {
  return {
    dialogNode: null,
    scrollDistance: getScrollDistance(),
  };
}

type Props = {
  /**
    Buttons to render in the footer
  */
  actions?: Array<{
    onClick?: FunctionType,
    text?: string,
  }>,
  /**
    Appearance of the primary action. Also adds an icon to the heading, if provided.
  */
  appearance?: AppearanceType,
  /**
    Boolean OR Function indicating which element to focus when the component mounts.
    TRUE will automatically find the first "tabbable" element within the modal.
    Providing a function should return the element you want to focus.
  */
  autoFocus?: boolean | () => ElementType,
  /**
    Content of the modal
  */
  children?: ChildrenType,
  /**
    Component to render the footer of the modal, replaces internal implementation.
  */
  footer?: ComponentType,
  /**
    Component to render the header of the modal, replaces internal implementation.
  */
  header?: ComponentType,
  /**
    The modal title; rendered in the header.
  */
  heading?: string,
  /**
    Height of the modal. If not set, the modal grows to fit the content until it
    runs out of vertical space, at which point scrollbars appear. If a number is
    provided, the height is set to that number in pixels. A string including pixels,
    or a percentage, will be directly applied as a style. Several size options are
    also recognised.
  */
  height?: number | string,
  /**
    Internal property for animation, provided by react-transition-group
  */
  in?: boolean,
  /**
    Function that will be called to initiate the exit transition.
  */
  onClose: (KeyboardOrMouseEvent) => void,
  /**
    Function that will be called when the exit transition is complete.
  */
  onCloseComplete?: (ElementType) => void,
  /**
    Function that will be called when the enter transition is complete.
  */
  onOpenComplete?: (ElementType) => void,
  /**
    Function that will be called when the modal changes position in the stack.
  */
  onStackChange?: (number) => void,
  /**
    Boolean indicating if clicking the overlay should close the modal.
  */
  shouldCloseOnOverlayClick?: boolean,
  /**
    Boolean indicating if pressing the `esc` key should close the modal.
  */
  shouldCloseOnEscapePress?: boolean,
  /**
    Boolean indicating content should be rendered on a transparent background.
  */
  chromeless?: boolean,
  /**
    Number representing where this instance lives in the stack of modals.
  */
  stackIndex?: number,
  /**
    Width of the modal. This can be provided in three different ways.
    If a number is provided, the width is set to that number in pixels.
    A string including pixels, or a percentage, will be directly applied as a style.
    Several size options are also recognised.
  */
  width?: number | string | ('small' | 'medium' | 'large' | 'x-large'),
};

class Modal extends Component {
  props: Props // eslint-disable-line react/sort-comp
  static defaultProps = {
    autoFocus: false,
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    chromeless: false,
    stackIndex: 0,
    width: 'medium',
  }

  state = getInitialState();

  getDialogNode = (dialogNode) => {
    this.setState(state => !state.dialogNode && ({ dialogNode }));
  }

  handleOverlayClick = () => {
    if (this.props.shouldCloseOnOverlayClick) {
      this.props.onClose();
    }
  }
  handleDialogClick = (event) => {
    event.stopPropagation();
  }

  render() {
    const {
      actions, appearance, autoFocus, children, footer, header, height,
      in: inProp, onClose, onCloseComplete, onOpenComplete, onStackChange,
      shouldCloseOnEscapePress, chromeless, stackIndex, heading, width,
    } = this.props;

    const { dialogNode, scrollDistance } = this.state;

    const isBackground = stackIndex > 0;
    const dialogRefIsReady = Boolean(dialogNode);
    const transitionProps = { in: inProp, stackIndex };

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const widthName = WIDTH_ENUM.values.includes(width) ? width : null;
    const widthValue = widthName ? null : width;

    return (
      <FillScreen
        {...transitionProps}
        aria-hidden={isBackground}
        scrollDistance={scrollDistance}
      >
        <Blanket
          isTinted
          onBlanketClicked={this.handleOverlayClick}
        />
        <Positioner
          {...transitionProps}
          onClick={this.handleOverlayClick}
          onEntered={onOpenComplete}
          onExited={onCloseComplete}
          widthName={widthName}
          widthValue={widthValue}
        >
          <Dialog
            heightValue={height}
            innerRef={this.getDialogNode}
            onClick={this.handleDialogClick}
            chromeless={chromeless}
            role="dialog"
            tabIndex="-1"
          >
            {dialogRefIsReady && (
              <Content
                actions={actions}
                appearance={appearance}
                autoFocus={autoFocus}
                dialogNode={dialogNode}
                footer={footer}
                heading={heading}
                header={header}
                onClose={onClose}
                shouldCloseOnEscapePress={shouldCloseOnEscapePress}
                onStackChange={onStackChange}
                stackIndex={stackIndex}
              >
                {children}
              </Content>
            )}
          </Dialog>
        </Positioner>
      </FillScreen>
    );
  }
}

export default withRenderTarget({
  target: 'modal',
  wrapWithTransitionGroup: true,
}, Modal);
