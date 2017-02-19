import React from 'react';
import { TextAreaEditView as EditView } from './styled';
import SingleLineTextInput from './SingleLineTextInput';

export default class MultiLineTextInput extends SingleLineTextInput {
  renderEditView() {
    return (
      <EditView
        {...this.getInputProps()}
      />
    );
  }

  renderReadView() {
    return (
      <EditView
        readOnly
        {...this.getInputProps()}
      />
    );
  }
}
