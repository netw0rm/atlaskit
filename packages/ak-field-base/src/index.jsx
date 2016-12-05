import React, { PureComponent, PropTypes } from 'react';
import FieldBase from './FieldBase';

export { FieldBase };

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

  render() {
    return (
      <FieldBase
        {...this.props}
        isFocused={this.state.isFocused}
        onFocusCallback={() => this.setState({ isFocused: true })}
        onBlurCallback={() => this.setState({ isFocused: false })}
      />
    );
  }
}
