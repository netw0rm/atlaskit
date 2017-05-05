import React from 'react';
import InlineEditor from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';

const InlineEditorExamples = () => (
  <div>
    <InlineEditor
      label="My Inline Edit Field"
      editView={<SingleLineTextInput isEditing isInitiallySelected />}
      readView={<SingleLineTextInput isEditing={false} value="Field value" />}
      onConfirm={e => console.log('Edit confirmed:', e)}
    />
  </div>
);

export default InlineEditorExamples;
