import React, { PropTypes, PureComponent } from 'react';
import Toggle from './Toggle';

export { Toggle };

export default class extends PureComponent {
  static propTypes = {
    isDefaultChecked: PropTypes.bool,
    isDefaultFocused: PropTypes.bool,
  }

  static defaultPrpps = {
    isDefaultChecked: false,
    isDefaultFocused: false,
  }

  state = {
    isChecked: this.props.isDefaultChecked,
    isFocused: this.props.isDefaultFocused,
  }

  onFocus = (e) => {
    console.log('test focus', e)
    // e.preventDefault();
    this.setState({ isFocused: true });
  }

  onBlur = (e) => {
    console.log('test blur',e)
    // e.preventDefault();
    this.setState({ isFocused: false });
  }

  render = () => (
    <Toggle
      {...this.props}
      isChecked={this.state.isChecked}
      isFocused={this.state.isFocused}
      onChange={() => this.setState({ isChecked: !this.state.isChecked })}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    />
  )
}
