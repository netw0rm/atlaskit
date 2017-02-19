import React, { PureComponent } from 'react';
import { MultiLineTextInput } from '@atlaskit/input';
import TextInlineEdit from './TextInlineEdit';

export default class MultiLineInlineEdit extends TextInlineEdit {
  renderInput = ({ isEditing, id }) => (
    <MultiLineTextInput
      id={id}
      isEditing={isEditing}
      isInitiallySelected
      value={this.state.editValue}
      onChange={this.onChange}
    />
  )
}