import React, { PureComponent, PropTypes } from 'react';
import FieldBase from './FieldBase';
import Label from './Label';

export { FieldBase, Label };

export default class extends PureComponent {
  static propTypes = {
    isFocused: PropTypes.bool,
  }

  static defaultProps = {
    isFocused: false,
  }

  state = {
    isFocused: this.props.isFocused,
  }

  onFocus = () => this.setState({ isFocused: true })
  onBlur = () => this.setState({ isFocused: false })

  render = () =>
    <FieldBase
      {...this.props}
      isFocused={this.state.isFocused}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
    />
}
