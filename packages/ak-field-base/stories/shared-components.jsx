import React from 'react';
import Input from 'ak-input';
import uid from 'uid';
import AkFieldBase, { Label } from '../src';

const textStyle = {
  overflow: 'hidden',
};

const containerStyles = {
  display: 'inline-flex',
  flexDirection: 'column',
};

const renderRightGutter = gutter =>
  (gutter ? <div style={{ marginLeft: 4 }}>{gutter}</div> : false);

/* eslint-disable react/prop-types */
export const InputFieldBase = (props) => {
  const id = `input-field-base-${uid()}`;
  return (
    <div style={containerStyles}>
      <Label
        label={props.label}
        isLabelHidden={props.isLabelHidden}
        htmlFor={id}
      />
      <div style={{ display: (props.rightGutter ? 'inline-flex' : 'block'), alignItems: 'center' }}>
        <AkFieldBase
          {...props}
        >
          <Input
            value={props.text || 'A children input'}
            disabled={props.isDisabled}
            isEditing={!props.isReadOnly}
            id={id}
          />
        </AkFieldBase>
        {renderRightGutter(props.rightGutter)}
      </div>
    </div>
  );
};

export const DivFieldBase = (props) => {
  const id = `div-field-base-${uid()}`;
  return (
    <div style={containerStyles}>
      <Label
        label={props.label}
        isLabelHidden={props.isLabelHidden}
        htmlFor={id}
      />
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <AkFieldBase
          {...props}
        >
          <div style={textStyle} id={id}>
            {props.text || 'This is inside content'}
          </div>
        </AkFieldBase>
        {renderRightGutter(props.rightGutter)}
      </div>
    </div>
  );
};
