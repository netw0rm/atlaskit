import React from 'react';
import FieldTextArea from '@atlaskit/field-text-area';

const Example = () => (
  <div>
    <FieldTextArea label="hidden label" isLabelHidden />
    <FieldTextArea autoFocus label="autofocused" />
    <FieldTextArea value="candy" label="With default value" />
    <FieldTextArea disabled label="disabled" value="no touching" />
    <FieldTextArea required label="Required" />
    <FieldTextArea isInvalid label="Is Invalid" />
    <FieldTextArea placeholder="Click here to input" label="With Placeholder" />
    <FieldTextArea onChange={e => console.console.log('value changed', e)} label="With change handler" />
    <FieldTextArea invalidMessage="Modal Dialog Text" label="with error message" />
    <FieldTextArea isSpellCheckEnabled={false} label="spell check disabled" />
    <FieldTextArea maxLength={5} label="Max length of 5" />
    <FieldTextArea type="Number" label="Number typed input" />
  </div>
);

export default Example;
