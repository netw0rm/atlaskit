import React from 'react';
import { StatelessInlineEditor } from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';

const InlineEditorExamples = () => (
  <div>
    <StatelessInlineEditor
      label="My Inline Edit Field"
      editView={<SingleLineTextInput isEditing isInitiallySelected />}
      readView={<SingleLineTextInput isEditing={false} value="Field value" />}
      onConfirm={e => console.log('Edit confirmed:', e)}
      onEditRequested={e => console.log('edit requ', e)}
      onCancel={e => console.log('cancele', e)}
      labelHtmlFor="STRRRRINNNNGGG"
    />
  </div>
);

export default InlineEditorExamples;
