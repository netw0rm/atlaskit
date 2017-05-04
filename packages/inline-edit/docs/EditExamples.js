import React from 'react';
import InlineEditor from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';

const InlineEditorExamples = () => (
  <div>
    <InlineEditor
      label="Field info"
      editView={<SingleLineTextInput isEditing isInitiallySelected />}
      readView={<SingleLineTextInput isEditing={false} value="TEXT" />}
      onConfirm={e => console.log('really?', e)}
    />
  </div>
);

export default InlineEditorExamples;
