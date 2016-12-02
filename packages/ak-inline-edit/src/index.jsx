import React, { PureComponent } from 'react';
import InlineEdit from './InlineEdit';

export { InlineEdit };

export default class extends PureComponent {
  state = {
    isEditing: false,
  }

  onEditRequested = () => {
    this.setEditing(true);
  }

  setEditing = (isEditing) => {
    this.setState({ isEditing });
  }

  render = () => (
    <InlineEdit
      {...this.props}
      isEditing={this.state.isEditing}
      onEditRequested={this.onEditRequested}
    />
  )
}
