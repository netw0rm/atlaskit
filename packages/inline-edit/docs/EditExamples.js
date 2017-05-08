import React from 'react';
import InlineEditor from '@atlaskit/inline-edit';
import SingleLineTextInput from '@atlaskit/input';
// import Select from '@atlaskit/single-select';

const InlineEditorExamples = () => (
  <div>
    <InlineEditor
      label="My Inline Edit Field"
      editView={<SingleLineTextInput isEditing isInitiallySelected />}
      readView={<SingleLineTextInput isEditing={false} value="Field value" />}
      onConfirm={e => console.log('Edit confirmed:', e)}
      onCancel={e => console.log('cancele', e)}
    />
    {/* <InlineEditor
      label="Inline Edit select field"
      readView="The magic of experimentation"
      editView={
        <Select
          items={{ heading: 'letters', items: ['a', 'b', 'c'] }}
          onSelected={e => console.log('select made', e)}
          isDefaultOpen
          shouldFitContainer
          shouldFocus
        />
      }
    /> */}
  </div>
);

export default InlineEditorExamples;
