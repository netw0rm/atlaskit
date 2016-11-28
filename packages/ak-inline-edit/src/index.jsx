import React, { PureComponent, PropTypes } from 'react';
import InlineEdit from './InlineEdit';

export { InlineEdit };

export default class extends PureComponent {
  static propTypes = {
    onEditConfirmed: PropTypes.func.isRequired,
    onEditCancelled: PropTypes.func.isRequired,
  }

  state = {
    isEditing: false,
  }

  onEditRequested = () => {
    this.setEditing(true);
  }

  onEditConfirmed = () => {
    this.setEditing(false);
    this.props.onEditConfirmed();
  }

  onEditCancelled = () => {
    this.setEditing(false);
    this.props.onEditCancelled();
  }

  setEditing = (isEditing) => {
    this.setState({ isEditing });
  }

  render = () => (
    <InlineEdit
      {...this.props}
      isEditing={this.state.isEditing}
      onEditRequested={this.onEditRequested}
      onEditConfirmed={this.onEditConfirmed}
      onEditCancelled={this.onEditCancelled}
    />
  )
}
