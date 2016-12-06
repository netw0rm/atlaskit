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
  }

  state = {
    isEditing: false,
  }

  onConfirm = () => {
    this.exitEditingMode();
    this.props.onConfirm(this.enterEditingMode);
  }

  enterEditingMode = () =>
    this.setState({ isEditing: true });

  exitEditingMode = () =>
    this.setState({ isEditing: false });

  render = () => (
    <InlineEdit
      {...this.props}
      isEditing={this.state.isEditing}
      onEditRequested={this.enterEditingMode}
      onConfirm={this.onConfirm}
      onCancel={this.exitEditingMode}
    />
  )
}
