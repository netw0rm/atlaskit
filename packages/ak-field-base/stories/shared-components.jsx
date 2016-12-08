import React from 'react';
import AkFieldBase from '../src';

const inputStyle = {
  border: '0px',
  background: 'transparent',
  color: 'inherit',
  cursor: 'inherit',
  fontSize: '14px',
  outline: 0,
  width: '100%',
};

/* eslint-disable react/prop-types */
export const InputFieldBase = props =>
  <AkFieldBase
    label="Label for FieldBase"
    {...props}
  >
    <input
      type="text"
      style={inputStyle}
      defaultValue={props.text || 'A children input'}
      disabled={props.isDisabled}
    />
  </AkFieldBase>;

export const DivFieldBase = props =>
  <AkFieldBase
    label="Label for FieldBase"
    {...props}
  >
    <div>{props.text || 'This is inside content'}</div>
  </AkFieldBase>;
