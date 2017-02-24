import React, { PureComponent, PropTypes } from 'react';
import FieldBase from './FieldBase';
import Label from './Label';

export { FieldBase, Label };

export default class extends PureComponent {
  static propTypes = {
    isFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    isFocused: false,
    onFocus: () => {},
    onBlur: () => {},
  }

  state = {
    isFocused: this.props.isFocused,
  }

  onFocus = (e) => {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
  }

  onBlur = (e) => {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  }

  render() {
    return (
      <FieldBase
        {...this.props}
        isFocused={this.state.isFocused}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}
