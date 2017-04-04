import React, { PropTypes, PureComponent } from 'react';
import ToggleStateless from './ToggleStateless';

export default class Toggle extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    isDefaultChecked: PropTypes.bool,
  }

  static defaultProps = {
    isDefaultChecked: false,
    onChange: () => {},
  }

  state = {
    isChecked: this.props.isDefaultChecked,
  }

  onChange = (e) => {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.onChange(e);
  }

  render() {
    return (
      <ToggleStateless
        {...this.props}
        isChecked={this.state.isChecked}
        onChange={this.onChange}
      />
    );
  }
}
