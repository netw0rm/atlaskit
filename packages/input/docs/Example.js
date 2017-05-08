import React, { PureComponent } from 'react';
import InlineTextInput from '@atlaskit/input';
import Button from '@atlaskit/button';

export default class Example extends PureComponent {
  state = {
    isEditing: false,
    value: 'Type Here',
  }

  toggleEditing = () => this.setState({ isEditing: !this.state.isEditing })

  updateValue = e => this.setState({ value: e.target.value })

  render() {
    return (
      <div>
        <Button onClick={this.toggleEditing}>Toggle Field Edit</Button>
        <InlineTextInput
          isEditing={this.state.isEditing}
          value={this.state.isEditing ? this.state.value : 'Uneditable input'}
          onChange={this.updateValue}
        />
        <p>The last entered value: {this.state.value}</p>
      </div>
    );
  }
}
