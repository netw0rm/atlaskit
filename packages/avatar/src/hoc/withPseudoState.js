// @flow
import React, { Component } from 'react';
import { omit, getDisplayName } from '../utils';
import type { ComponentType, ElementType, FunctionType } from '../types';

/* eslint-disable react/no-unused-prop-types */
type Props = {
  href?: string,
  isActive?: boolean,
  isFocus?: boolean,
  isHover?: boolean,
  isInteractive?: boolean,
  onBlur?: FunctionType,
  onClick?: FunctionType,
  onFocus?: FunctionType,
  onKeyDown?: FunctionType,
  onKeyUp?: FunctionType,
  onMouseDown?: FunctionType,
  onMouseEnter?: FunctionType,
  onMouseLeave?: FunctionType,
  onMouseUp?: FunctionType,
};
/* eslint-enable react/no-unused-prop-types */

const INTERNAL_HANDLERS_MAP = {
  onBlur: true,
  onFocus: true,
  onKeyDown: true,
  onKeyUp: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseUp: true,
};

const INTERNAL_HANDLERS = Object.keys(INTERNAL_HANDLERS_MAP);

/* eslint-disable no-undef*/
type InternalHandlers = $Keys<typeof INTERNAL_HANDLERS_MAP>;

function getInitialState({ href, isActive, isFocus, isHover, isInteractive, onClick }: {
  href?: string,
  isActive?: boolean,
  isFocus?: boolean,
  isHover?: boolean,
  isInteractive?: boolean,
  onClick?: FunctionType,
}) {
  return {
    isActive,
    isFocus,
    isHover,
    isInteractive: !!(href || isInteractive || onClick),
  };
}

export default function withPseudoState(WrappedComponent: ComponentType) {
  return class ComponentWithPseudoState extends Component {
    static displayName = getDisplayName('withPseudoState', WrappedComponent)
    component: { blur?: FunctionType, focus?: FunctionType };
    actionKeys: Array<string>;
    componentWillMount() {
      const { href, isInteractive, onClick } = this.props;

      if (href || isInteractive || onClick) {
        this.actionKeys = (onClick || isInteractive) ? ['Enter', ' '] : ['Enter'];
      }
    }

    props: Props;
    state = getInitialState(this.props);

    // expose blur/focus to consumers via ref
    blur = (e: FocusEvent) => {
      if (this.component.blur) this.component.blur(e);
    }
    focus = (e: FocusEvent) => {
      if (this.component.focus) this.component.focus(e);
    }

    onBlur = () => this.setState({ isActive: false, isFocus: false })
    onFocus = () => this.setState({ isFocus: true })
    onMouseLeave = () => this.setState({ isActive: false, isHover: false })
    onMouseEnter = () => this.setState({ isHover: true })
    onMouseUp = () => this.setState({ isActive: false })
    onMouseDown = () => this.setState({ isActive: true })

    onKeyDown = (event: KeyboardEvent) => {
      if (this.actionKeys.includes(event.key)) {
        this.setState({ isActive: true });
      }
    }
    onKeyUp = (event: KeyboardEvent) => {
      if (this.actionKeys.includes(event.key)) {
        this.setState({ isActive: false });
      }
    }

    getProps = () => {
      const { isInteractive } = this.state;
      const instance: any = this;

      // strip the consumer's handlers off props, then merge with our handlers
      // if the element is interactive
      const props: Props = omit(this.props, ...INTERNAL_HANDLERS);

      if (isInteractive) {
        INTERNAL_HANDLERS.forEach((handler: InternalHandlers) => {
          const originalHandler = this.props[handler];
          if (originalHandler) {
            props[handler] = (...args) => {
              instance[handler](...args);
              originalHandler(...args);
            };
          } else {
            props[handler] = instance[handler];
          }
        });
      }

      return props;
    }

    render() {
      const props: {} = this.getProps();

      return (
        <WrappedComponent
          ref={(r: ElementType) => (this.component = r)}
          {...this.state}
          {...props}
        />
      );
    }
  };
}
