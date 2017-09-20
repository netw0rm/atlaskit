// @flow

import { Children, Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import type { ElementType, ChildrenType } from '../types';
import * as focusScope from '../utils/focus-scope';
import * as focusStore from '../utils/focus-store';

/**
  NOTE: mounting more than one focusScope component at a time will cause
  unexpected behaviour, and unmounting any mounted focusScope will remove all
  focusScope locks from the document
*/
let mountedFocusScopes = 0;

type Props = {
  /**
    DOM Element to apply `aria-hidden=true` to when this component gains focus.
    This is provided via context when using within @atlaskit/layer-manager.
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
};

export default class FocusScope extends Component {
  props: Props // eslint-disable-line react/sort-comp
  static defaultProps = {
    autoFocus: true,
  }
  static contextTypes = {
    /** available when invoked within @atlaskit/layer-manager */
    ariaHiddenNode: PropTypes.object,
  }

  componentDidMount() {
    if (mountedFocusScopes > 0) {
      // eslint-disable-next-line no-console
      console.warn('Warning: more than one FocusScope has been mounted. This will cause unpredictable behaviour.');
    }
    mountedFocusScopes++;
    this._ariaHiddenNode = this.props.ariaHiddenNode || this.context.ariaHiddenNode;

    document.addEventListener('keydown', this.handleKeyDown, false);

    focusStore.storeFocus();
    this.initialiseFocus();

    if (this._ariaHiddenNode) this._ariaHiddenNode.setAttribute('aria-hidden', true);
  }
  componentWillUnmount() {
    mountedFocusScopes = Math.max(mountedFocusScopes - 1, 0);

    document.removeEventListener('keydown', this.handleKeyDown, false);

    if (this._ariaHiddenNode) this._ariaHiddenNode.removeAttribute('aria-hidden');

    focusScope.unscopeFocus();

    // wait one tick to restore focus; element may still be transitioning
    setTimeout(() => focusStore.restoreFocus());
  }
  initialiseFocus() {
    const { autoFocus } = this.props;

    const focusNode = findDOMNode(this);
    const hasFocusFunc = typeof autoFocus === 'function';
    const focusFirstAvailable = autoFocus && !hasFocusFunc;

    focusScope.scopeFocus(focusNode, focusFirstAvailable);

    if (hasFocusFunc) {
      const focusTarget = autoFocus();

      // check that the provided focusTarget is what we expect, and warn
      if (!focusTarget || typeof focusTarget.focus !== 'function') {
        console.warn('Invalid `autoFocus` provided:', focusTarget); // eslint-disable-line no-console
        return;
      }

      focusTarget.focus();
    }
  }

  render() {
    return Children.only(this.props.children);
  }
}
