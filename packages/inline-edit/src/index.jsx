import React, { PureComponent, PropTypes } from 'react';
import InlineEdit from './InlineEdit';

export { InlineEdit };

export default class extends PureComponent {
  static propTypes = {
    /**
     * @description Called when the user confirms a new value
     *
     * The typical response would be to save the user input currently in the 'editView'.
     *
     * 'onConfirm' will be called with a single arugment, a 'cancelConfirmation' callback function.
     * Calling this function will prevent the transition back into read mode. This would typically
     * be done if the user input is invalid.
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onConfirm: PropTypes.func.isRequired,
    /**
     * @description Called when the user cancels an edit
     *
     * @memberof InlineEdit
     * @type {Function}
     */
    onCancel: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
  }

  onConfirm = () => {
    this.exitEditingMode();
    const cancelConfirmation = this.enterEditingMode;
    this.props.onConfirm(cancelConfirmation);
  }

  onCancel = () => {
    this.exitEditingMode();
    this.props.onCancel();
  }

  enterEditingMode = () =>
    this.setState({ isEditing: true });

  exitEditingMode = () =>
    this.setState({ isEditing: false });

  render() {
    return (
      <InlineEdit
        isEditing={this.state.isEditing}
        {...this.props}
        onEditRequested={this.enterEditingMode}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
      />
    );
  }
}
