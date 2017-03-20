import React, { PureComponent, PropTypes } from 'react';
import FieldBase from './FieldBase';
import Label from './Label';

export { FieldBase, Label };

export default class extends PureComponent {
  static propTypes = {
    defaultIsFocused: PropTypes.bool,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  }

  static defaultProps = {
    defaultIsFocused: false,
    onFocus: () => {},
    onBlur: () => {},
  }

  state = {
    isFocused: this.props.defaultIsFocused,
    isDialogFocused: false,
    shouldIgnoreNextDialogBlur: false,
  }

  onFocus = (e) => {
    this.setState({ isFocused: true });
    this.props.onFocus(e);
  }

  onBlur = (e) => {
    // We wrap this in a setTimeout so that when we are tabbing to an element in the warning dialog,
    // we do not render before the `onContentFocus` callback is called.
    setTimeout(() => this.setState({ isFocused: false }), 0);
    this.props.onBlur(e);
  }

  onContentFocus = () => {
    if (this.state.isDialogFocused) {
      // If we are tabbing between two elements in the warning dialog, we need to prevent the
      // dialog from closing.
      this.setState({ shouldIgnoreNextDialogBlur: true });
    } else {
      this.setState({ isDialogFocused: true });
    }
  }

  onContentBlur = () => {
    setTimeout(() => {
      if (this.state.shouldIgnoreNextDialogBlur) {
        // Ignore the blur event if we are still focused in the dialog.
        this.setState({ shouldIgnoreNextDialogBlur: false });
      } else {
        this.setState({ isDialogFocused: false });
      }
    }, 0);
  }

  render() {
    return (
      <FieldBase
        {...this.props}
        isDialogOpen={this.state.isFocused || this.state.isDialogFocused}
        isFocused={this.state.isFocused}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onDialogFocus={this.onContentFocus}
        onDialogBlur={this.onContentBlur}
      />
    );
  }
}
