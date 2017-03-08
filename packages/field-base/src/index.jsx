import React, { PureComponent, PropTypes } from 'react';
import FieldBase from './FieldBase';
import Label from './Label';

export { FieldBase, Label };

export default class extends PureComponent {
  static propTypes = {
    defaultIsDialogOpen: PropTypes.bool,
    defaultIsFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onIconMouseDown: PropTypes.func,
  }

  static defaultProps = {
    defaultIsDialogOpen: false,
    defaultIsFocused: false,
    onFocus: () => {},
    onBlur: () => {},
    onIconMouseDown: () => {},
  }

  state = {
    isDialogOpen: this.props.defaultIsDialogOpen,
    isFocused: this.props.defaultIsFocused,
  }

  onFocus = (e) => {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
  }

  onBlur = (e) => {
    this.setState({ isFocused: false });
    this.props.onBlur(e);
  }

  onIconMouseDown = (e) => {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
    this.props.onIconMouseDown(e);
  }

  render() {
    return (
      <FieldBase
        {...this.props}
        isDialogOpen={this.state.isDialogOpen}
        isFocused={this.state.isFocused}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onIconMouseDown={this.onIconMouseDown}
      />
    );
  }
}
