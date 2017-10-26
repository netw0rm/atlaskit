// @flow

import { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import type { ElementType, ChildrenType } from '../types';
import * as focusScope from '../utils/focus-scope';
import * as focusStore from '../utils/focus-store';

type Props = {|
  /**
    DOM Element to apply `aria-hidden=true` to when this component gains focus.
    This is provided via context when used within @atlaskit/layer-manager.
  */
  ariaHiddenNode?: ElementType,
  /**
    Boolean OR Function indicating which element to focus when the component mounts
    TRUE will automatically find the first "tabbable" element within the modal
    Providing a function should return the element you want to focus
  */
  autoFocus?: boolean | () => HTMLElement,
  /**
    Inner content
  */
  children?: ChildrenType,
  /**
    Toggle focus management outside of mount/unmount lifecycle methods
  */
  enabled?: boolean,
|};

let focusScopeInitFromProps = false;

/* eslint-disable react/sort-comp */
export default class FocusLock extends Component {
  props: Props
  static defaultProps = {
    autoFocus: false,
  }
  static contextTypes = {
    /** available when invoked within @atlaskit/layer-manager */
    ariaHiddenNode: PropTypes.object,
  }

  componentDidMount() {
    this._mounted = true;

    focusScopeInitFromProps = false;

    this.initialise();
  }
  componentWillUnmount() {
    this._mounted = false;

    if (!focusScopeInitFromProps && !this.teardownFromProps) {
      this.teardown({ shouldRestoreFocus: true });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.enabled && nextProps.enabled !== this.props.enabled) {
      focusScopeInitFromProps = true;
      this.initialise();
    }

    if (!nextProps.enabled && nextProps.enabled !== this.props.enabled) {
      this.teardownFromProps = true;
      this.teardown({ shouldRestoreFocus: true });
    }
  }
  initialise = () => {
    // NOTE: Only one element can be focused at a time.
    // Teardown all instances of FocusLock before another
    // initialises (mounts or becomes `enabled`).
    this.teardown({ shouldRestoreFocus: false });

    if (!this._mounted) return;

    this._ariaHiddenNode = this.props.ariaHiddenNode || this.context.ariaHiddenNode;

    document.addEventListener('keydown', this.handleKeyDown, false);

    focusStore.storeFocus();
    this.findFocusTarget();

    if (this._ariaHiddenNode) {
      this._ariaHiddenNode.setAttribute('aria-hidden', true);
    }
  }
  teardown = (options: { shouldRestoreFocus: boolean }) => {
    document.removeEventListener('keydown', this.handleKeyDown, false);

    if (this._ariaHiddenNode) {
      this._ariaHiddenNode.removeAttribute('aria-hidden');
    }

    focusScope.unscopeFocus();

    if (options.shouldRestoreFocus) {
      focusStore.restoreFocus();
    }
  }
  findFocusTarget() {
    const { autoFocus } = this.props;

    const focusNode = findDOMNode(this);
    const hasFocusFunc = typeof autoFocus === 'function';
    const focusFirstAvailable = autoFocus && !hasFocusFunc;

    // allow time for react's DOM reconciliation
    setTimeout(() => {
      focusScope.scopeFocus(focusNode, focusFirstAvailable);

      // call the consumer's ref function
      if (hasFocusFunc) {
        const focusTarget = autoFocus();

        // check that the provided focusTarget is what we expect, warn otherwise
        if (!focusTarget || typeof focusTarget.focus !== 'function') {
          console.warn('Invalid `autoFocus` provided:', focusTarget); // eslint-disable-line no-console
          return;
        }

        focusTarget.focus();
      }
    }, 1);
  }

  render() {
    return Children.only(this.props.children);
  }
}
