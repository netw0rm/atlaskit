import React, { PureComponent, PropTypes } from 'react';
import FieldBase from './FieldBase';
import Label from './Label';

export { FieldBase, Label };

export default class extends PureComponent {
  static propTypes = {
    defaultIsDialogOpen: PropTypes.bool,
    isFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onIconClick: PropTypes.func,
  }

  static defaultProps = {
    defaultIsDialogOpen: false,
    isFocused: false,
    onFocus: () => {},
    onBlur: () => {},
    onIconClick: () => {},
  }

  state = {
    isDialogOpen: this.props.defaultIsDialogOpen,
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

  onIconClick = (e) => {
    this.setState({ isDialogOpen: !this.state.isDialogOpen });
    this.props.onIconClick(e);
  }

  render() {
    return (
      <FieldBase
        {...this.props}
        isDialogOpen={this.state.isDialogOpen}
        isFocused={this.state.isFocused}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onIconClick={this.onIconClick}
      />
    );
  }
}
