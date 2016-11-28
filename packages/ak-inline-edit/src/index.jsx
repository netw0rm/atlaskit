import React, { PureComponent } from 'react';
import InlineEdit from './InlineEdit';

export { InlineEdit };

export default class extends PureComponent {
  state = {
    isEditing: false,
  }

  switch = () => this.setState({ isEditing: true })

  render() {
    return (<InlineEdit
      {...this.props}
      isEditing={this.state.isEditing}
      switchToEditing={() => this.setState({ isEditing: true })}
    />);
  }
}
