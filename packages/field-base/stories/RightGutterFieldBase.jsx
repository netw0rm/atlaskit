import React from 'react';
import Input from '@atlaskit/input';
import uid from 'uid';
import AkFieldBase, { Label } from '../src';

/* eslint-disable react/prop-types */
export default (props) => {
  const id = uid();
  return (
    <div>
      <Label
        label={props.label}
        htmlFor={id}
      />
      <div style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center' }}>
        <AkFieldBase isFitContainerWidthEnabled>
          <Input id={id} value="Input children" isEditing />
        </AkFieldBase>
        <div style={{ marginLeft: 4 }}>
          {props.rightGutter}
        </div>
      </div>
    </div>
  );
};
