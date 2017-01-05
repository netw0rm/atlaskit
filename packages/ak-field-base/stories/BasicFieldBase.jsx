import React from 'react';
import AkFieldBase, { Label } from '../src';

const containerStyles = {
  padding: '20px',
  display: 'inline-flex',
  flexDirection: 'column',
};

/* eslint-disable react/prop-types */
export default props => (
  <div style={containerStyles}>
    <Label
      label={props.label}
      htmlFor={props.id}
      isLabelHidden={props.isLabelHidden}
      isRequired={props.isRequired}
    />
    <div style={{ backgroundColor: 'white' }}>
      <AkFieldBase
        isInvalid={props.isInvalid}
        isDisabled={props.isDisabled}
        isReadOnly={props.isReadOnly}
        appearance={props.appearance}
        isPaddingDisabled={props.isPaddingDisabled}
      >
        {props.children}
      </AkFieldBase>
    </div>
  </div>
);
