// @flow
import React, { Component } from 'react';
import { FocusLock, withRenderTarget } from '@atlaskit/layer-manager';
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
  PositionerAbsolute,
  PositionerRelative,
  Dialog,
  FillScreen as StyledFillScreen,
} from '../styled/Modal';
import { Fade, SlideUp } from './Animation';
import Content from './Content';

// NOTE: Rename transition components so it's easier to read the render method
const FillScreen = props => <Fade component={StyledFillScreen} {...props} />;
// eslint-disable-next-line react/prop-types
const Positioner = ({ scrollBehavior, ...props }) => {
  const component = scrollBehavior === 'inside'
    ? PositionerAbsolute
    : PositionerRelative;

  return <SlideUp component={component} {...props} />;
};

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
    Where scroll behaviour should originate. When `inside` scroll only occurs
    on the modal body. When `outside` the entire modal will scroll within the viewport.
  */
  scrollBehavior?: 'inside' | 'outside',
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
  isChromeless?: boolean,
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
    scrollBehavior: 'inside',
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
    isChromeless: false,
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
  handleExit = () => {
    // disable FocusLock *before* unmount. animation may end after a new modal
    // has gained focus, breaking focus behaviour.
    this.setState({ isExiting: true });
  }

  render() {
    // NOTE: `in` is NOT public API, thus not documented (provided by react-transition-group)
    const {
      in: transitionIn, // eslint-disable-line react/prop-types
      actions, appearance, autoFocus, children, footer, header, height,
      isChromeless, onClose, onCloseComplete, onOpenComplete, onStackChange,
      shouldCloseOnEscapePress, stackIndex, heading, width, scrollBehavior,
    } = this.props;

    const { isExiting, scrollDistance } = this.state;

    const isBackground = stackIndex > 0;
    const transitionProps = { in: transitionIn, stackIndex };

    // If a custom width (number or percentage) is supplied, set inline style
    // otherwise allow styled component to consume as named prop
    const widthName = WIDTH_ENUM.values.includes(width) ? width : null;
    const widthValue = widthName ? null : width;

    return (
      <FillScreen
        {...transitionProps}
        aria-hidden={isBackground}
        onExit={this.handleExit}
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
          scrollBehavior={scrollBehavior}
          widthName={widthName}
          widthValue={widthValue}
        >
          <FocusLock enabled={stackIndex === 0 && !isExiting} autoFocus={autoFocus}>
            <Dialog
              heightValue={height}
              onClick={this.handleDialogClick}
              role="dialog"
              tabIndex="-1"
            >
              <Content
                actions={actions}
                appearance={appearance}
                footer={footer}
                heading={heading}
                header={header}
                onClose={onClose}
                shouldScroll={scrollBehavior === 'inside'}
                shouldCloseOnEscapePress={shouldCloseOnEscapePress}
                onStackChange={onStackChange}
                isChromeless={isChromeless}
                stackIndex={stackIndex}
              >
                {children}
              </Content>
            </Dialog>
          </FocusLock>
        </Positioner>
      </FillScreen>
    );
  }
}

export default withRenderTarget({
  target: 'modal',
  withTransitionGroup: true,
}, Modal);
