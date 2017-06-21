import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tabbable from 'tabbable';

import { Gateway, GatewayRegistry } from '../../gateway';
import Portal from '../../portal';

import * as focusScope from '../utils/focus-scope';
import * as focusStore from '../utils/focus-store';
import { TabLoopTerminal } from '../styled/Modal';

import AnimationContainer from './AnimationContainer';

function getInitialState() {
  return {
    tabbableElements: [],
    tabDirection: null,
  };
}

export default class Modal extends Component {
  static propTypes = {
    /**
      Function that returns the element you want "aria-hidden=true" attributed to when mounted
    */
    // ariaHideElement: PropTypes.func, // TODO: consider removing
    /**
      String indicating how the content container should be announced to screenreaders
    */
    // ariaLabel: PropTypes.string, // TODO: consider removing
    /**
      Boolean OR Function indicating which element to focus when the component mounts
      TRUE will automatically find the first "tabbable" element within the modal
      Providing a function should return the element you want to focus
    */
    autoFocus: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    /**
      Content of the modal
    */
    children: PropTypes.node,
    /**
      Function that will be run after the modal has opened.
    */
    onOpenComplete: PropTypes.func,
    /**
      Function that will be run when the modal changes position in the stack
    */
    onStackChange: PropTypes.func,
    /**
      Function that will be run when the modal is requested to be closed, prior to actually closing.
    */
    onRequestClose: PropTypes.func.isRequired,
    /**
      Boolean indicating if clicking the overlay should close the modal
    */
    shouldCloseOnOverlayClick: PropTypes.bool,
    /**
      Boolean indicating if pressing the `esc` key should close the modal
    */
    shouldCloseOnEscapePress: PropTypes.bool,
  }
  static defaultProps = {
    ariaHideElement: null,
    autoFocus: false,
    shouldCloseOnEscapePress: true,
    shouldCloseOnOverlayClick: true,
  }
  static contextTypes = {
    appId: PropTypes.string.isRequired,
    gatewayRegistry: PropTypes.instanceOf(GatewayRegistry),
  }

  state = getInitialState();

  componentDidMount() {
    focusStore.storeFocus();
    this._isMounted = true;

    const hideEl = document.getElementById(this.context.appId);
    if (hideEl) hideEl.setAttribute('aria-hidden', true);

    this.initialiseFocus();
  }
  componentWillUnmount() {
    this._isMounted = false;
    const hideEl = document.getElementById(this.context.appId);

    if (hideEl) hideEl.removeAttribute('aria-hidden');
    focusScope.unscopeFocus();
    setTimeout(() => focusStore.restoreFocus());
  }

  setTabbableElements = () => {
    const tabbableElements = tabbable(this.dialog);

    if (tabbableElements.length !== this.state.tabbableElements.length) {
      this.setState({ tabbableElements });
    }
  }
  initialiseFocus() {
    const { autoFocus } = this.props;
    const hasFocusFunc = typeof autoFocus === 'function';

    // DOCS: explain deferral of focus to allow for refs to be resolved
    setTimeout(() => {
      if (!this._isMounted) return;

      this.setTabbableElements();

      focusScope.scopeFocus(this.dialog, autoFocus && !hasFocusFunc);

      if (hasFocusFunc) {
        const focusTarget = autoFocus();

        // DOCS: we've been given a focusTarget so assume it should work, and
        // if not we should warn the consumer
        if (!focusTarget || typeof focusTarget.focus !== 'function') {
          console.warn('Invalid `autoFocus` provided:', focusTarget); // eslint-disable-line no-console
          return;
        }

        focusTarget.focus();
      }
    });
  }
  handleKeyDown = (event) => {
    if (this.props.shouldCloseOnEscapePress && event.key === 'Escape') {
      this.props.onRequestClose();
      return;
    }

    if (event.key === 'Tab') {
      const tabDirection = event.shiftKey ? 'prev' : 'next';

      if (this._isMounted && (tabDirection !== this.state.tabDirection)) {
        this.setState({ tabDirection });
      }
    }
  }
  handleOverlayClick = () => {
    if (this.props.shouldCloseOnOverlayClick) {
      this.props.onRequestClose();
    }
  }
  handleDialogClick = (event) => {
    event.stopPropagation();
  }

  handleTabLoopEnd = () => {
    const { tabbableElements } = this.state;
    tabbableElements[0].focus();
  }
  handleTabLoopStart = () => {
    const { tabbableElements } = this.state;

    // handle case where user can tab from the dialog to the first element
    const targetIdx = this.state.tabDirection === 'prev'
      ? tabbableElements.length - 1
      : 0;

    const tabTarget = tabbableElements[targetIdx];

    tabTarget.focus();
  }

  handleStackChange = (stackIndex) => {
    const { onStackChange } = this.props;

    if (onStackChange) onStackChange(stackIndex);

    if (stackIndex === 0) {
      focusScope.unscopeFocus();
    } else {
      focusScope.unscopeFocus(this.dialog);
    }
  }

  render() {
    const { children, onOpenComplete } = this.props;
    const { tabbableElements, tabDirection } = this.state;
    const { gatewayRegistry } = this.context;

    const GatewayOrPortal = gatewayRegistry ? Gateway : Portal;
    const canTab = !!tabbableElements.length;
    const gatewayDestination = gatewayRegistry ? 'modal' : null;
    const tabStartIsAvailable = canTab && tabDirection && tabDirection === 'prev';
    const tabEndIsAvailable = canTab && tabDirection && tabDirection === 'next';

    return (
      <GatewayOrPortal into={gatewayDestination}>
        <AnimationContainer
          dialogRef={r => (this.dialog = r)}
          dialogOnClick={this.handleDialogClick}
          overlayOnClick={this.handleOverlayClick}
          onOpenComplete={onOpenComplete}
          onStackChange={this.handleStackChange}
          onKeyDown={this.handleKeyDown}
        >
          {tabStartIsAvailable && (
            <TabLoopTerminal onFocus={this.handleTabLoopStart} />
          )}
          {children}
          {tabEndIsAvailable && (
            <TabLoopTerminal onFocus={this.handleTabLoopEnd} />
          )}
        </AnimationContainer>
      </GatewayOrPortal>
    );
  }
}
