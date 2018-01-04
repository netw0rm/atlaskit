import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InlineEditStateless from './InlineEditStateless';

export default class extends PureComponent {
  static propTypes = {
    /** Function passed to stateless component, isEditing will be set to false
    before the passed function is called. */
    onConfirm: PropTypes.func.isRequired,
    /** Function passed to stateless component, isEditing will be set to false
    before the passed function is called. */
    onCancel: PropTypes.func.isRequired,
    /** Initial value for editing state */
    isEditing: PropTypes.bool,
  }

  static defaultProps = {
    isEditing: false,
  }

  state = {
    isEditing: this.props.isEditing,
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
      <InlineEditStateless
        {...this.props}
        isEditing={this.state.isEditing}
        onEditRequested={this.enterEditingMode}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
      />
    );
  }
}
