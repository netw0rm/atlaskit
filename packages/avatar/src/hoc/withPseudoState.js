// @flow
import React, { Component } from 'react';
import { omit, getDisplayName } from '../utils';

type Props = {
  href?: string,
  isInteractive?: bool,
  onClick?: Function,
};

const handlers = [
  'onBlur',
  'onFocus',
  'onKeyDown',
  'onKeyUp',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseUp',
];

function getInitialState(props) {
  const { href, isActive, isFocus, isHover, isInteractive, onClick } = props;
  return {
    isActive,
    isFocus,
    isHover,
    isInteractive: !!(href || isInteractive || onClick),
  };
}

export default function withPseudoState(WrappedComponent) {
  return class ComponentWithPseudoState extends Component {
    static displayName = getDisplayName('withPseudoState', WrappedComponent);

    componentWillMount() {
      const { href, isInteractive, onClick } = this.props;

      if (href || isInteractive || onClick) {
        this.actionKeys = (onClick || isInteractive) ? ['Enter', ' '] : ['Enter'];
      }
    }

    props: Props;
    state = getInitialState(this.props)

    // expose blur/focus to consumers via ref
    blur = () => this.component.blur()
    focus = () => this.component.focus()

    onBlur = () => this.setState({ isActive: false, isFocus: false });
    onFocus = () => this.setState({ isFocus: true })
    onMouseLeave = () => this.setState({ isActive: false, isHover: false });
    onMouseEnter = () => this.setState({ isHover: true });
    onMouseUp = () => this.setState({ isActive: false });
    onMouseDown = () => this.setState({ isActive: true });

    onKeyDown = (event) => {
      if (this.actionKeys.includes(event.key)) {
        this.setState({ isActive: true });
      }
    }
    onKeyUp = (event) => {
      if (this.actionKeys.includes(event.key)) {
        this.setState({ isActive: false });
      }
    }

    getProps = () => {
      const { isInteractive } = this.state;

      // strip the consumer's handlers off props, then merge with our handlers
      // if the element is interactive
      const props = omit(this.props, ...handlers);

      if (isInteractive) {
        handlers.forEach((handler) => {
          if (this.props[handler]) {
            props[handler] = (...args) => {
              this[handler](...args);
              this.props[handler](...args);
            };
          } else {
            props[handler] = this[handler];
          }
        });
      }

      return props;
    }

    render() {
      const props = this.getProps();

      return (
        <WrappedComponent
          ref={r => (this.component = r)}
          {...props}
          {...this.state}
        />
      );
    }
  };
}
