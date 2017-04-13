import React, { PureComponent, PropTypes } from 'react';
import FieldBase from './FieldBase';
import Label from './Label';

export { FieldBase, Label };

function waitForRender(cb) {
  // Execute the callback after any upcoming render calls in the execution queue
  setTimeout(cb, 0);
}

export default class extends PureComponent {
  static propTypes = {
    /** focus the element when initially rendered */
    defaultIsFocused: PropTypes.bool,
    /** focus event handler */
    onFocus: PropTypes.func,
    /** blur event handler */
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
    // Because the blur event fires before the focus event, we want to make sure that we don't
    // render and close the dialog before we can check if the dialog is focused.
    waitForRender(() => this.setState({ isFocused: false }));
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
    waitForRender(() => {
      if (this.state.shouldIgnoreNextDialogBlur) {
        // Ignore the blur event if we are still focused in the dialog.
        this.setState({ shouldIgnoreNextDialogBlur: false });
      } else {
        this.setState({ isDialogFocused: false });
      }
    });
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
