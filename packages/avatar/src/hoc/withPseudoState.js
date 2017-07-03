import React, { Component } from 'react';
import { provideDisplayName } from '../utils';

export default function withPseudoState(WrappedComponent) {
  return class ComponentWithPseudoState extends Component {
    constructor(props, context) {
      super(props, context);

      // handle keyboard events on anchors and buttons
      /* eslint-disable react/prop-types */
      if (props.href || props.onClick) {
        this.actionKeys = props.onClick ? ['Enter', ' '] : ['Enter'];
      }
      /* eslint-enable react/prop-types */
    }
    static displayName = provideDisplayName('withPseudoState', WrappedComponent);
    state = {
      isActive: false,
      isFocus: false,
      isHover: false,
    }
    handleBlur = () => this.setState({ isActive: false, isFocus: false });
    handleFocus = () => this.setState({ isFocus: true })
    handleMouseOut = () => this.setState({ isActive: false, isHover: false });
    handleMouseOver = () => this.setState({ isHover: true });
    handleMouseUp = () => this.setState({ isActive: false });
    handleMouseDown = () => this.setState({ isActive: true });
    handleKeyDown = (event) => {
      if (!this.actionKeys) return;

      if (this.actionKeys.includes(event.key) && !this.state.isActive) {
        this.setState({ isActive: true });
      }
    }
    handleKeyUp = (event) => {
      if (!this.actionKeys) return;

      if (this.actionKeys.includes(event.key) && this.state.isActive) {
        this.setState({ isActive: false });
      }
    }
    render() {
      return (
        <WrappedComponent
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
          onMouseLeave={this.handleMouseOut}
          onMouseEnter={this.handleMouseOver}
          onMouseUp={this.handleMouseUp}
          onMouseDown={this.handleMouseDown}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          {...this.state}
          {...this.props}
        />
      );
    }
  };
}
