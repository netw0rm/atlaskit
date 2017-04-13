import React from 'react';
import AkFieldBase from '@atlaskit/field-base';
import Input from '@atlaskit/input';

export default (
  <div style={{ maxWidth: '200px' }}>
    <AkFieldBase invalidMessage="foo">
      <Input
        value="input children"
        isEditing
        id="fieldbase"
      />
    </AkFieldBase>
  </div>
);
